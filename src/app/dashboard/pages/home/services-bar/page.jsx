"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function EditServicesBarSection() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/home");
        const data = await res.json();
        const items = data.content?.servicesBar?.items || [];
        setText(items.join("\n"));
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load content." });
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const items = text.split("\n").filter((line) => line.trim() !== "");

    try {
      const res = await fetch("/api/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicesBar: { items } }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({
        type: "success",
        text: "Services bar updated successfully.",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

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
          Edit <span className="text-brand-green">Services Bar</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the scrolling service names shown in the dark bar on the
          homepage. One item per line.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-brand-border bg-white p-6 md:p-8">
        <label className="mb-2 block text-sm font-semibold text-brand-dark">
          Services (one per line)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all bg-white"
          placeholder="Web Development
SAAS Development
UI UX Design"
        />
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