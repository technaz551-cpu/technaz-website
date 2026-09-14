"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, RotateCcw } from "lucide-react";

const EMPTY_MISSION = {
  eyebrow: "",
  heading: "",
  description: "",
  badgeText: "",
  image: { url: "", alt: "" },
};

const DEFAULT_IMAGE = {
  url: "/images/about/mission.jpg",
  alt: "Technaz team in a strategy meeting",
};

export default function EditAboutMission() {
  const [mission, setMission] = useState(EMPTY_MISSION);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/about");
        const data = await res.json();
        if (data.content?.mission) {
          setMission({ ...EMPTY_MISSION, ...data.content.mission });
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
    setMission((prev) => ({ ...prev, [field]: value }));
  };

  const handleAltChange = (alt) => {
    setMission((prev) => ({ ...prev, image: { ...prev.image, alt } }));
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

      setMission((prev) => ({
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
    setMission((prev) => ({ ...prev, image: { ...DEFAULT_IMAGE } }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mission }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({ type: "success", text: "Mission section updated successfully." });
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
          Edit <span className="text-brand-green">About — Mission Section</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the eyebrow label, heading, description, image and badge for
          the Mission section.
        </p>
      </div>

      <div className="max-w-3xl space-y-6 rounded-2xl border border-brand-border bg-white p-6 md:p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Eyebrow label (small text above heading)
          </label>
          <input
            type="text"
            value={mission.eyebrow}
            onChange={(e) => handleTextChange("eyebrow", e.target.value)}
            className={inputClasses}
            placeholder="Our Purpose"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Heading
          </label>
          <input
            type="text"
            value={mission.heading}
            onChange={(e) => handleTextChange("heading", e.target.value)}
            className={inputClasses}
            placeholder="Mission"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Description
          </label>
          <textarea
            value={mission.description}
            onChange={(e) => handleTextChange("description", e.target.value)}
            rows={4}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Badge text (small pill on the image)
          </label>
          <input
            type="text"
            value={mission.badgeText}
            onChange={(e) => handleTextChange("badgeText", e.target.value)}
            className={inputClasses}
            placeholder="Innovate"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-brand-dark">
            Image
          </label>
          <div className="max-w-xs rounded-lg border border-dashed border-brand-border p-3">
            <div className="relative mb-2 h-40 w-full overflow-hidden rounded-md bg-gray-50">
              {mission.image?.url ? (
                <Image
                  src={mission.image.url}
                  alt={mission.image.alt || "Preview"}
                  fill
                  className="object-cover"
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
              {mission.image?.url && !uploading && (
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
              value={mission.image?.alt || ""}
              onChange={(e) => handleAltChange(e.target.value)}
              placeholder="Image description (alt text)"
              className="mb-2 w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-brand-green"
            />

            <label className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
              <Upload size={14} />
              {mission.image?.url ? "Replace" : "Upload"}
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