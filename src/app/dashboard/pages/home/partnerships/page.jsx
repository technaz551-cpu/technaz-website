"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, Trash2, Plus, RotateCcw } from "lucide-react";

const DEFAULT_LOGOS = [
  { url: "/images/partnerships/partner-1.png", alt: "1st Choice Rideshare Club partner" },
  { url: "/images/partnerships/partner-2.png", alt: "Prestige Rideshare Club partner" },
  { url: "/images/partnerships/partner-3.png", alt: "PTRS Club Platinum Taxi Ride Share partner" },
  { url: "/images/partnerships/partner-4.png", alt: "Brisbane Rideshare Club partner" },
];

const EMPTY_PARTNERSHIPS = { heading: "", subtext: "", logos: [] };
const EMPTY_LOGO = { url: "", alt: "" };

export default function EditPartnershipsSection() {
  const [partnerships, setPartnerships] = useState(EMPTY_PARTNERSHIPS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/home");
        const data = await res.json();
        if (data.content?.partnerships) {
          setPartnerships({
            ...EMPTY_PARTNERSHIPS,
            ...data.content.partnerships,
            logos: data.content.partnerships.logos || [],
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

  const handleTextChange = (field, value) => {
    setPartnerships((prev) => ({ ...prev, [field]: value }));
  };

  const handleAltChange = (index, alt) => {
    setPartnerships((prev) => {
      const logos = [...prev.logos];
      logos[index] = { ...logos[index], alt };
      return { ...prev, logos };
    });
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    setUploadingIndex(index);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed.");

      setPartnerships((prev) => {
        const logos = [...prev.logos];
        logos[index] = { url: data.url, alt: logos[index]?.alt || "" };
        return { ...prev, logos };
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleResetLogo = (index) => {
    setPartnerships((prev) => {
      const logos = [...prev.logos];
      logos[index] = { ...(DEFAULT_LOGOS[index] || EMPTY_LOGO) };
      return { ...prev, logos };
    });
  };

  const handleAddLogo = () => {
    setPartnerships((prev) => ({
      ...prev,
      logos: [...prev.logos, { ...EMPTY_LOGO }],
    }));
  };

  const handleRemoveLogo = (index) => {
    setPartnerships((prev) => {
      const logos = [...prev.logos];
      logos.splice(index, 1);
      return { ...prev, logos };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerships }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({
        type: "success",
        text: "Partnerships section updated successfully.",
      });
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
          Edit <span className="text-brand-green">Partnerships Section</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the heading, subtext and partner logos shown on the homepage.
        </p>
      </div>

      <div className="max-w-3xl space-y-6 rounded-2xl border border-brand-border bg-white p-6 md:p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Heading
          </label>
          <input
            type="text"
            value={partnerships.heading}
            onChange={(e) => handleTextChange("heading", e.target.value)}
            className={inputClasses}
            placeholder="Our Partners"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Subtext
          </label>
          <input
            type="text"
            value={partnerships.subtext}
            onChange={(e) => handleTextChange("subtext", e.target.value)}
            className={inputClasses}
            placeholder="Trusted by growing businesses across Australia"
          />
        </div>
      </div>

      <div className="mt-6 max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-brand-dark">
            Partner Logos
          </label>
          <button
            type="button"
            onClick={handleAddLogo}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-green px-4 py-1.5 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
          >
            <Plus size={14} />
            Add Logo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {partnerships.logos.map((logo, index) => {
            const isUploading = uploadingIndex === index;

            return (
              <div
                key={index}
                className="rounded-lg border border-dashed border-brand-border p-3"
              >
                <div className="relative mb-2 flex h-20 w-full items-center justify-center overflow-hidden rounded-md bg-gray-50">
                  {logo.url ? (
                    <Image
                      src={logo.url}
                      alt={logo.alt || "Preview"}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="text-xs text-brand-gray">No logo</div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <Loader2 className="animate-spin text-brand-green" size={20} />
                    </div>
                  )}
                  {logo.url && !isUploading && (
                    <button
                      type="button"
                      onClick={() => handleResetLogo(index)}
                      title="Reset to original logo"
                      className="absolute right-1 top-1 rounded-md bg-white/90 p-1 text-brand-dark shadow-sm transition-colors hover:text-brand-green"
                    >
                      <RotateCcw size={13} />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={logo.alt || ""}
                  onChange={(e) => handleAltChange(index, e.target.value)}
                  placeholder="Logo description (alt text)"
                  className="mb-2 w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-brand-green"
                />

                <div className="flex gap-2">
                  <label className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
                    <Upload size={14} />
                    {logo.url ? "Replace" : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(index, e.target.files?.[0])
                      }
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveLogo(index)}
                    className="flex items-center justify-center rounded-md border border-red-200 px-2.5 text-red-500 transition-colors hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
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