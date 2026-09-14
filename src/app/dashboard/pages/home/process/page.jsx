"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const EMPTY_PROCESS = { subheading: "", steps: [] };

export default function EditProcessSection() {
  const [process, setProcess] = useState(EMPTY_PROCESS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/home");
        const data = await res.json();
        if (data.content?.process) {
          setProcess({
            subheading: data.content.process.subheading || "",
            steps: data.content.process.steps || [],
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

  const handleSubheadingChange = (value) => {
    setProcess((prev) => ({ ...prev, subheading: value }));
  };

  const handleStepChange = (index, field, value) => {
    setProcess((prev) => {
      const steps = [...prev.steps];
      steps[index] = { ...steps[index], [field]: value };
      return { ...prev, steps };
    });
  };

  const handleListChange = (index, field, text) => {
    const list = text.split("\n").filter((line) => line.trim() !== "");
    handleStepChange(index, field, list);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ process }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({ type: "success", text: "Process section updated successfully." });
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
          Edit <span className="text-brand-green">Process Section</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the 4 process steps shown in the scrolling section on the homepage.
        </p>
      </div>

      <div className="max-w-3xl">
        <label className="mb-2 block text-sm font-semibold text-brand-dark">
          Subheading
        </label>
        <input
          type="text"
          value={process.subheading}
          onChange={(e) => handleSubheadingChange(e.target.value)}
          className={inputClasses}
          placeholder="Where custom software meets boundless potential"
        />
      </div>

      <div className="mt-6 max-w-3xl space-y-4">
        {process.steps.map((step, index) => (
          <div
            key={index}
            className="rounded-2xl border border-brand-border bg-white p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
                {index + 1}
              </span>
              <input
                type="color"
                value={step.boxColor || "#eef2f6"}
                onChange={(e) =>
                  handleStepChange(index, "boxColor", e.target.value)
                }
                title="Background color for this step's card"
                className="h-8 w-12 cursor-pointer rounded-md border border-gray-200"
              />
              <span className="text-xs text-brand-gray">Card background color</span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={step.label}
                onChange={(e) => handleStepChange(index, "label", e.target.value)}
                placeholder="Step title (e.g. Discovery & Planning)"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-green"
              />

              <input
                type="text"
                value={step.tagline}
                onChange={(e) => handleStepChange(index, "tagline", e.target.value)}
                placeholder="Tagline (e.g. Clarity before commitment)"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />

              <textarea
                value={step.description}
                onChange={(e) =>
                  handleStepChange(index, "description", e.target.value)
                }
                placeholder="Description"
                rows={3}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-brand-dark">
                    What this includes (one point per line)
                  </label>
                  <textarea
                    value={(step.includes || []).join("\n")}
                    onChange={(e) =>
                      handleListChange(index, "includes", e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-brand-dark">
                    Best suited for (one point per line)
                  </label>
                  <textarea
                    value={(step.bestSuitedFor || []).join("\n")}
                    onChange={(e) =>
                      handleListChange(index, "bestSuitedFor", e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />
                </div>
              </div>
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