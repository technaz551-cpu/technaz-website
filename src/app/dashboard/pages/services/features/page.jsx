
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Loader2,
  Trash2,
  Plus,
  RotateCcw,
} from "lucide-react";
import {
  useGetServicesContentQuery,
  useUpdateServicesContentMutation,
  useUploadFileMutation,
} from "@/store/api/technazApi";

const DEFAULT_FEATURES = [
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    description:
      "We design and engineer tailored software solutions around the way your business actually operates—from intelligent internal platforms and automated workflow systems to scalable customer-facing applications that improve efficiency, enhance experiences, and support long-term growth.",
    image: {
      url: "/images/services/process-1.jpg",
      alt: "Developer building custom software at a multi-monitor workstation",
    },
  },
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "We build fast, accessible, and search-optimized web experiences using modern technologies and frameworks—designed to deliver seamless user experiences, strengthen digital visibility, and drive measurable business results.",
    image: {
      url: "/images/services/service-4.jpg",
      alt: "Web development and coding on a laptop",
    },
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description:
      "We create native and cross-platform mobile applications that feel fast, intuitive, and reliable—built around real user journeys so your customers can book, buy, and engage from anywhere.",
    image: {
      url: "/images/services/service-3.jpg",
      alt: "Mobile application development",
    },
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "We design clear, conversion-focused interfaces that make complex products feel simple—from research and wireframes through to polished visual systems that keep every screen consistent and accessible.",
    image: {
      url: "/images/services/expertise-2.jpg",
      alt: "UI UX design workshop",
    },
  },
  {
    title: "AI & Automation",
    slug: "ai-automation",
    description:
      "We help businesses automate repetitive work and add intelligent features where they create real value—from workflow automation and data-driven tools to practical AI integrations.",
    image: {
      url: "/images/services/service-1.jpg",
      alt: "Technology operations and automation",
    },
  },
  {
    title: "Dedicated Development Teams",
    slug: "dedicated-development-teams",
    description:
      "We provide dedicated engineers who work as an extension of your team—aligned to your tools, timelines, and product goals so you can scale delivery without the overhead of hiring.",
    image: {
      url: "/images/services/expertise-3.jpg",
      alt: "Dedicated software development team",
    },
  },
  {
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    description:
      "We design, migrate, and operate cloud environments with reliable CI/CD and infrastructure practices—so releases are faster, systems stay secure, and your platforms can scale.",
    image: {
      url: "/images/services/service-2.jpg",
      alt: "Cloud infrastructure and DevOps operations",
    },
  },
  {
    title: "Product Development",
    slug: "product-development",
    description:
      "We take products from idea to launch with a clear path through discovery, design, build, and iteration—helping you validate features early, ship with confidence, and keep improving.",
    image: {
      url: "/images/services/expertise-4.jpg",
      alt: "Product development and launch support",
    },
  },
];

const EMPTY_FEATURE = {
  title: "",
  slug: "",
  description: "",
  image: { url: "", alt: "" },
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditServiceFeatures() {
  const [features, setFeatures] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState(null);
  const { data, isLoading, isError } = useGetServicesContentQuery();
  const [updateServicesContent] = useUpdateServicesContentMutation();
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    if (isError) {
      setMessage({
        type: "error",
        text: "Failed to load content.",
      });
      return;
    }
    if (data?.content) {
      setFeatures(data.content.features || []);
    }
  }, [data, isError]);

  // Update a field
  const handleFieldChange = (index, field, value) => {
    setFeatures((prev) =>
      prev.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      )
    );
  };

  // Update image fields
  const handleImageFieldChange = (index, field, value) => {
    setFeatures((prev) =>
      prev.map((feature, i) =>
        i === index
          ? {
              ...feature,
              image: {
                ...feature.image,
                [field]: value,
              },
            }
          : feature
      )
    );
  };

  // Automatically generate slug from title
  const handleTitleChange = (index, title) => {
    setFeatures((prev) =>
      prev.map((feature, i) => {
        if (i !== index) return feature;

        const autoSlug =
          !feature.slug || feature.slug === slugify(feature.title);

        return {
          ...feature,
          title,
          slug: autoSlug ? slugify(title) : feature.slug,
        };
      })
    );
  };

  // Upload image
  const handleImageUpload = async (index, file) => {
    if (!file) return;

    setUploadingIndex(index);
    setMessage(null);

    try {
      const uploadData = await uploadFile(file).unwrap();

      setFeatures((prev) =>
        prev.map((feature, i) =>
          i === index
            ? {
                ...feature,
                image: {
                  ...feature.image,
                  url: uploadData.url,
                },
              }
            : feature
        )
      );
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Image upload failed.",
      });
    } finally {
      setUploadingIndex(null);
    }
  };

  // Reset image to original
  const handleResetImage = (index) => {
    setFeatures((prev) =>
      prev.map((feature, i) =>
        i === index
          ? {
              ...feature,
              image: {
                ...(DEFAULT_FEATURES[index]?.image || {
                  url: "",
                  alt: "",
                }),
              },
            }
          : feature
      )
    );
  };

  // Add service
  const handleAddFeature = () => {
    setFeatures((prev) => [
      ...prev,
      { ...EMPTY_FEATURE, image: { ...EMPTY_FEATURE.image } },
    ]);
  };

  // Remove service
  const handleRemoveFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Save services
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await updateServicesContent({ features }).unwrap();

      setMessage({
        type: "success",
        text: "Service cards updated successfully.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2
          className="animate-spin text-brand-green"
          size={28}
        />
      </section>
    );
  }

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl">
          Edit{" "}
          <span className="text-brand-green">Service Cards</span>
        </h1>

        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">
            ◆
          </span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>

        <p className="mt-3 text-sm text-brand-gray">
          Update each service's title, description, slug and image.
        </p>
      </div>

      <div className="max-w-3xl space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddFeature}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-green px-4 py-2 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
          >
            <Plus size={14} />
            Add Service
          </button>
        </div>

        {features.map((feature, index) => {
          const isUploading = uploadingIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl border border-brand-border bg-white p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:w-32">
                  {feature.image?.url ? (
                    <Image
                      src={feature.image.url}
                      alt={feature.image.alt || "Preview"}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-brand-gray">
                      No image
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <Loader2
                        className="animate-spin text-brand-green"
                        size={18}
                      />
                    </div>
                  )}

                  {feature.image?.url && !isUploading && (
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

                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <label className="mb-1 block text-xs text-brand-gray">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) =>
                        handleTitleChange(index, e.target.value)
                      }
                      placeholder="Service title"
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-green"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-brand-gray">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={feature.slug}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "slug",
                          slugify(e.target.value)
                        )
                      }
                      placeholder="service-slug"
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs font-mono outline-none focus:border-brand-green"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-brand-gray">
                      Description
                    </label>
                    <textarea
                      value={feature.description}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Description"
                      rows={4}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-brand-gray">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      value={feature.image?.alt || ""}
                      onChange={(e) =>
                        handleImageFieldChange(
                          index,
                          "alt",
                          e.target.value
                        )
                      }
                      placeholder="Describe the image"
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-brand-border px-3 py-2 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
                      <Upload size={13} />
                      {feature.image?.url
                        ? "Replace Image"
                        : "Upload Image"}

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => {
                          handleImageUpload(
                            index,
                            e.target.files?.[0]
                          );
                          e.target.value = "";
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs text-red-500 transition-colors hover:bg-red-50"
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

        {features.length === 0 && (
          <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-brand-gray">
            No services added yet. Click Add Service to create one.
          </p>
        )}
      </div>

      {message && (
        <p
          role="status"
          className={`mt-6 text-sm font-medium ${
            message.type === "error"
              ? "text-red-600"
              : "text-brand-green"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || uploadingIndex !== null}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {saving && <Loader2 className="animate-spin" size={16} />}
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}