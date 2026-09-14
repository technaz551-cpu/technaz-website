"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, RotateCcw } from "lucide-react";

const EMPTY_HERO = {
  title: "",
  description: "",
  image: { url: "", alt: "" },
};

const DEFAULT_IMAGE = {
  url: "/images/about/hero-vr.png",
  alt: "Technaz — future-ready technology",
};

export default function EditAboutHero() {
  const [hero, setHero] = useState(EMPTY_HERO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/about");
        const data = await res.json();
        if (data.content?.hero) {
          setHero(data.content.hero);
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
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const handleAltChange = (alt) => {
    setHero((prev) => ({ ...prev, image: { ...prev.image, alt } }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
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

      setHero((prev) => ({
        ...prev,
        image: { url: data.url, alt: prev.image?.alt || "" },
      }));
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleResetImage = () => {
    setHero((prev) => ({ ...prev, image: { ...DEFAULT_IMAGE } }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({ type: "success", text: "About hero updated successfully." });
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
          Edit <span className="text-brand-green">About — Hero Section</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the title, description and image shown at the top of the
          About page.
        </p>
      </div>

      <div className="max-w-3xl space-y-6 rounded-2xl border border-brand-border bg-white p-6 md:p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Title
          </label>
          <input
            type="text"
            value={hero.title}
            onChange={(e) => handleTextChange("title", e.target.value)}
            className={inputClasses}
            placeholder="About Technaz"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Description
          </label>
          <textarea
            value={hero.description}
            onChange={(e) => handleTextChange("description", e.target.value)}
            rows={4}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-brand-dark">
            Image
          </label>
          <div className="max-w-xs rounded-lg border border-dashed border-brand-border p-3">
            <div className="relative mb-2 h-40 w-full overflow-hidden rounded-md bg-gray-50">
              {hero.image?.url ? (
                <Image
                  src={hero.image.url}
                  alt={hero.image.alt || "Preview"}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-brand-gray">
                  No image
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                  <Loader2 className="animate-spin text-brand-green" size={20} />
                </div>
              )}
              {hero.image?.url && !uploading && (
                <button
                  type="button"
                  onClick={handleResetImage}
                  title="Reset to original image"
                  className="absolute right-1 top-1 rounded-md bg-white/90 p-1 text-brand-dark shadow-sm transition-colors hover:text-brand-green"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>

            <input
              type="text"
              value={hero.image?.alt || ""}
              onChange={(e) => handleAltChange(e.target.value)}
              placeholder="Image description (alt text)"
              className="mb-2 w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-brand-green"
            />

            <label className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
              <Upload size={14} />
              {hero.image?.url ? "Replace" : "Upload"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        {message && (
          <p
            className={`text-sm font-medium ${
              message.type === "error" ? "text-red-600" : "text-brand-green"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
        >
          {saving && <Loader2 className="animate-spin" size={16} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </section>
  );
}