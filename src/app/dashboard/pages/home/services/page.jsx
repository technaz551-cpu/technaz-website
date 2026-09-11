"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, Trash2, Plus, RotateCcw } from "lucide-react";

const DEFAULT_SERVICES = [
  {
    title: "Managed IT",
    desc: "Proactive monitoring and support for your entire infrastructure.",
    image: {
      url: "/images/services/service-1.jpg",
      alt: "Managed IT services and infrastructure monitoring by Technaz Australia",
    },
  },
  {
    title: "Cloud Solutions",
    desc: "Migration, optimisation and management across Azure, AWS and Microsoft 365.",
    image: {
      url: "/images/services/service-2.jpg",
      alt: "Cloud solutions and Microsoft 365 migration services in Australia",
    },
  },
  {
    title: "Custom Software",
    desc: "Tailored applications built around how your business actually works.",
    image: {
      url: "/images/services/service-3.jpg",
      alt: "Custom software development tailored for Australian businesses",
    },
  },
  {
    title: "Web Development",
    desc: "Fast, modern websites and web apps built for growth.",
    image: {
      url: "/images/services/service-4.jpg",
      alt: "Professional web development and SaaS application building",
    },
  },
];

const EMPTY_SERVICES = {
  heading: "",
  description1: "",
  description2: "",
  items: [],
};

const EMPTY_ITEM = {
  title: "",
  desc: "",
  image: { url: "", alt: "" },
};

export default function EditServicesSection() {
  const [services, setServices] = useState(EMPTY_SERVICES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content/home");
        const data = await res.json();
        if (data.content?.services) {
          setServices({
            ...EMPTY_SERVICES,
            ...data.content.services,
            items: data.content.services.items || [],
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
    setServices((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setServices((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
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

      setServices((prev) => {
        const items = [...prev.items];
        items[index] = {
          ...items[index],
          image: { url: data.url, alt: items[index]?.image?.alt || "" },
        };
        return { ...prev, items };
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleResetImage = (index) => {
    setServices((prev) => {
      const items = [...prev.items];
      const fallback = DEFAULT_SERVICES[index]?.image || { url: "", alt: "" };
      items[index] = { ...items[index], image: { ...fallback } };
      return { ...prev, items };
    });
  };

  const handleAddItem = () => {
    setServices((prev) => ({
      ...prev,
      items: [...prev.items, { ...EMPTY_ITEM }],
    }));
  };

  const handleRemoveItem = (index) => {
    setServices((prev) => {
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
        body: JSON.stringify({ services }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setMessage({ type: "success", text: "Services section updated successfully." });
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
          Edit <span className="text-brand-green">Services Section</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Update the services heading, description and cards shown on the homepage.
        </p>
      </div>

      <div className="max-w-3xl space-y-6 rounded-2xl border border-brand-border bg-white p-6 md:p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Heading
          </label>
          <input
            type="text"
            value={services.heading}
            onChange={(e) => handleTextChange("heading", e.target.value)}
            className={inputClasses}
            placeholder="Services built around your business"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Description (main paragraph)
          </label>
          <textarea
            value={services.description1}
            onChange={(e) => handleTextChange("description1", e.target.value)}
            rows={3}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Description (second paragraph)
          </label>
          <textarea
            value={services.description2}
            onChange={(e) => handleTextChange("description2", e.target.value)}
            rows={2}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-6 max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-brand-dark">
            Service Cards
          </label>
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-green px-4 py-1.5 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
          >
            <Plus size={14} />
            Add Card
          </button>
        </div>

        {services.items.map((item, index) => {
          const isUploading = uploadingIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl border border-brand-border bg-white p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:w-32">
                  {item.image?.url ? (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || "Preview"}
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
                  {item.image?.url && !isUploading && (
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
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(index, "title", e.target.value)}
                    placeholder="Service title (e.g. Managed IT)"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-green"
                  />
                  <textarea
                    value={item.desc}
                    onChange={(e) => handleItemChange(index, "desc", e.target.value)}
                    placeholder="Short description"
                    rows={2}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />

                  <div className="flex items-center gap-2">
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
                      <Upload size={13} />
                      {item.image?.url ? "Replace Image" : "Upload Image"}
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
                      onClick={() => handleRemoveItem(index)}
                      className="flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs text-red-500 transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>
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