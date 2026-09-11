"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, Trash2 } from "lucide-react";

const EMPTY_HERO = {
  headline: "",
  highlightWord: "",
  description: "",
  ctaText: "",
  images: [],
};

const DEFAULT_IMAGES = [
    { url: "/images/hero/collage-03.jpg", alt: "Software development and coding at Technaz" },
    { url: "/images/hero/collage-04.jpg", alt: "Business analytics and technology monitoring" },
    { url: "/images/hero/collage-05.jpg", alt: "Modern workspace and collaboration tools" },
    { url: "/images/hero/collage-06.jpg", alt: "Professional IT support and development team" },
  ];

export default function EditHomePage() {
  const [hero, setHero] = useState(EMPTY_HERO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/home");
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

      setHero((prev) => {
        const images = [...(prev.images || [])];
        images[index] = { url: data.url, alt: images[index]?.alt || "" };
        return { ...prev, images };
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleAltChange = (index, alt) => {
    setHero((prev) => {
      const images = [...(prev.images || [])];
      images[index] = { ...images[index], alt };
      return { ...prev, images };
    });
  };

  const handleRemoveImage = (index) => {
    setHero((prev) => {
      const images = [...(prev.images || [])];
      images[index] = { ...DEFAULT_IMAGES[index] }; // wapis original image
      return { ...prev, images };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({ type: "success", text: "Home page updated successfully." });
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
          Edit <span className="text-brand-green">Home Page</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the hero section text and images shown on the homepage.
        </p>
      </div>

      <div className="max-w-3xl space-y-6 rounded-2xl border border-brand-border bg-white p-6 md:p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Headline
          </label>
          <input
            type="text"
            value={hero.headline}
            onChange={(e) => handleTextChange("headline", e.target.value)}
            className={inputClasses}
            placeholder="We Build Support & Scale your"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Highlighted word (shown in green)
          </label>
          <input
            type="text"
            value={hero.highlightWord}
            onChange={(e) => handleTextChange("highlightWord", e.target.value)}
            className={inputClasses}
            placeholder="Technology"
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
            placeholder="From managed IT and cloud to cyber security..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Button text
          </label>
          <input
            type="text"
            value={hero.ctaText}
            onChange={(e) => handleTextChange("ctaText", e.target.value)}
            className={inputClasses}
            placeholder="Explore Services"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-brand-dark">
            Collage images (4 recommended)
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((index) => {
              const image = hero.images?.[index];
              const isUploading = uploadingIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-lg border border-dashed border-brand-border p-3"
                >
                  <div className="relative mb-2 h-32 w-full overflow-hidden rounded-md bg-gray-50">
                    {image?.url ? (
                      <Image
                        src={image.url}
                        alt={image.alt || "Preview"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-brand-gray">
                        No image
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                        <Loader2 className="animate-spin text-brand-green" size={20} />
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={image?.alt || ""}
                    onChange={(e) => handleAltChange(index, e.target.value)}
                    placeholder="Image description (alt text)"
                    className="mb-2 w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-brand-green"
                  />

                  <div className="flex gap-2">
                    <label className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
                      <Upload size={14} />
                      {image?.url ? "Replace" : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(index, e.target.files?.[0])
                        }
                      />
                    </label>
                    {image?.url && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="flex items-center justify-center rounded-md border border-red-200 px-2.5 text-red-500 transition-colors hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
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