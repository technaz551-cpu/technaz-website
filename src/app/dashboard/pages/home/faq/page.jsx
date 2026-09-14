"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Plus } from "lucide-react";

const EMPTY_FAQ = { heading: "", items: [] };
const EMPTY_ITEM = { question: "", answer: "" };

export default function EditFAQSection() {
  const [faq, setFaq] = useState(EMPTY_FAQ);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/home");
        const data = await res.json();
        if (data.content?.faq) {
          setFaq({
            heading: data.content.faq.heading || "",
            items: data.content.faq.items || [],
          });
        }
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load content." });
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleHeadingChange = (value) => {
    setFaq((prev) => ({ ...prev, heading: value }));
  };

  const handleItemChange = (index, field, value) => {
    setFaq((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const handleAddItem = () => {
    setFaq((prev) => ({
      ...prev,
      items: [...prev.items, { ...EMPTY_ITEM }],
    }));
  };

  const handleRemoveItem = (index) => {
    setFaq((prev) => {
      const items = [...prev.items];
      items.splice(index, 1);
      return { ...prev, items };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faq }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({ type: "success", text: "FAQ section updated successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all bg-white";

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-green" size={28} />
      </section>
    );
  }

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl">
          Edit <span className="text-brand-green">FAQ Section</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the heading and question/answer pairs shown on the homepage.
        </p>
      </div>

      <div className="max-w-3xl">
        <label className="mb-2 block text-sm font-semibold text-brand-dark">
          Heading
        </label>
        <input
          type="text"
          value={faq.heading}
          onChange={(e) => handleHeadingChange(e.target.value)}
          className={inputClasses}
          placeholder="Questions we hear often?"
        />
      </div>

      <div className="mt-6 max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-brand-dark">
            Questions & Answers
          </label>
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-green px-4 py-1.5 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
          >
            <Plus size={14} />
            Add Question
          </button>
        </div>

        {faq.items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-brand-border bg-white p-5"
          >
            <div className="flex items-start gap-3">
              <span className="mt-2.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
                {index + 1}
              </span>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) =>
                    handleItemChange(index, "question", e.target.value)
                  }
                  placeholder="Question"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-green"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    handleItemChange(index, "answer", e.target.value)
                  }
                  placeholder="Answer"
                  rows={3}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="flex items-center justify-center rounded-md border border-red-200 p-2 text-red-500 transition-colors hover:bg-red-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <p
          className={`mt-6 text-sm font-medium ${
            message.type === "error" ? "text-red-600" : "text-brand-green"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {saving && <Loader2 className="animate-spin" size={16} />}
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}