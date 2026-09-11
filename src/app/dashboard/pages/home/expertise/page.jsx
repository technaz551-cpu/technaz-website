"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, RotateCcw } from "lucide-react";

const DEFAULT_SLIDES = [
  {
    label: "DISCOVER",
    phase: "Discovery & Assessment",
    description:
      "We map your infrastructure, workflows and growth goals to build a clear technology roadmap — identifying risks, gaps and quick wins for Australian businesses ready to modernise.",
    bgColor: "#d9ecd0",
    image: {
      url: "/images/expertise/expertise-1.jpg",
      alt: "Technaz discovery workshop assessing business IT requirements in Australia",
    },
  },
  {
    label: "DESIGN",
    phase: "Solution Design",
    description:
      "Our architects design secure, scalable systems across cloud, cyber security and custom software — aligned to your budget, compliance needs and long-term business objectives.",
    bgColor: "#dbe6f7",
    image: {
      url: "/images/expertise/expertise-2.jpg",
      alt: "Technaz solution design for cloud, security and custom software architecture",
    },
  },
  {
    label: "DEVELOP",
    phase: "Agile Development",
    description:
      "Engineers deliver web applications, SaaS platforms, API integrations and DevOps pipelines using agile sprints — so you see progress early and launch with confidence.",
    bgColor: "#f3dde0",
    image: {
      url: "/images/expertise/expertise-3.jpg",
      alt: "Technaz software development team building web apps and integrations",
    },
  },
  {
    label: "DEPLOY & SUPPORT",
    phase: "Deploy & Ongoing Support",
    description:
      "We deploy, monitor and maintain your environment with proactive managed IT, clear SLAs and responsive support — keeping your team productive long after go-live.",
    bgColor: "#e7f3de",
    image: {
      url: "/images/expertise/expertise-4.jpg",
      alt: "Technaz managed IT support and deployment for growing businesses",
    },
  },
];

const EMPTY_EXPERTISE = { slides: [] };

export default function EditExpertiseSection() {
  const [expertise, setExpertise] = useState(EMPTY_EXPERTISE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/home");
        const data = await res.json();
        if (data.content?.expertise) {
          setExpertise({
            slides: data.content.expertise.slides || [],
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

  const handleSlideChange = (index, field, value) => {
    setExpertise((prev) => {
      const slides = [...prev.slides];
      slides[index] = { ...slides[index], [field]: value };
      return { slides };
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

      setExpertise((prev) => {
        const slides = [...prev.slides];
        slides[index] = {
          ...slides[index],
          image: { url: data.url, alt: slides[index]?.image?.alt || "" },
        };
        return { slides };
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleResetImage = (index) => {
    setExpertise((prev) => {
      const slides = [...prev.slides];
      const fallback = DEFAULT_SLIDES[index]?.image || { url: "", alt: "" };
      slides[index] = { ...slides[index], image: { ...fallback } };
      return { slides };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expertise }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({ type: "success", text: "Expertise section updated successfully." });
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
          Edit <span className="text-brand-green">Expertise Section</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the 4 process steps (Discover, Design, Develop, Deploy) shown
          in the scrolling expertise section on the homepage.
        </p>
      </div>

      <div className="max-w-3xl space-y-4">
        {expertise.slides.map((slide, index) => {
          const isUploading = uploadingIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl border border-brand-border bg-white p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:w-32">
                  {slide.image?.url ? (
                    <Image
                      src={slide.image.url}
                      alt={slide.image.alt || "Preview"}
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
                      <Loader2 className="animate-spin text-brand-green" size={18} />
                    </div>
                  )}
                  {slide.image?.url && !isUploading && (
                    <button
                      type="button"
                      onClick={() => handleResetImage(index)}
                      title="Reset to original image"
                      className="absolute right-1 top-1 rounded-md bg-white/90 p-1 text-brand-dark shadow-sm transition-colors hover:text-brand-green"
                    >
                      <RotateCcw size={13} />
                    </button>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={slide.label}
                      onChange={(e) =>
                        handleSlideChange(index, "label", e.target.value)
                      }
                      placeholder="Badge label (e.g. DISCOVER)"
                      className="w-1/2 rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide outline-none focus:border-brand-green"
                    />
                    <input
                      type="color"
                      value={slide.bgColor || "#d9ecd0"}
                      onChange={(e) =>
                        handleSlideChange(index, "bgColor", e.target.value)
                      }
                      title="Background color for this slide"
                      className="h-9 w-14 cursor-pointer rounded-md border border-gray-200"
                    />
                  </div>

                  <input
                    type="text"
                    value={slide.phase}
                    onChange={(e) =>
                      handleSlideChange(index, "phase", e.target.value)
                    }
                    placeholder="Step title (e.g. Discovery & Assessment)"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-green"
                  />

                  <textarea
                    value={slide.description}
                    onChange={(e) =>
                      handleSlideChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    rows={3}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />

                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
                    <Upload size={13} />
                    {slide.image?.url ? "Replace Image" : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(index, e.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
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