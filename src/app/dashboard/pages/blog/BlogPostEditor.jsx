"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Upload, ArrowLeft } from "lucide-react";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import {
  useGetBlogPostQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useUploadFileMutation,
} from "@/store/api/technazApi";

const EMPTY = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: { url: "", alt: "" },
  author: "Technaz Team",
  published: false,
  metaTitle: "",
  metaDescription: "",
  tags: [],
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogPostEditor() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const routeSlug = params?.slug;
  const isNew =
    pathname?.endsWith("/blog/new") || routeSlug === "new";

  const [form, setForm] = useState(EMPTY);
  const [tagsText, setTagsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const { data, isLoading, isError } = useGetBlogPostQuery(routeSlug, {
    skip: isNew || !routeSlug,
  });
  const [createPost] = useCreateBlogPostMutation();
  const [updatePost] = useUpdateBlogPostMutation();
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    if (isNew) {
      setForm(EMPTY);
      setTagsText("");
      return;
    }
    if (isError) {
      setMessage({ type: "error", text: "Post not found." });
      return;
    }
    if (data?.post) {
      setForm({ ...EMPTY, ...data.post });
      setTagsText((data.post.tags || []).join(", "));
    }
  }, [data, isError, isNew]);

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all bg-white";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (title) => {
    setForm((prev) => {
      const autoSlug =
        isNew && (!prev.slug || prev.slug === slugify(prev.title));
      return {
        ...prev,
        title,
        slug: autoSlug ? slugify(title) : prev.slug,
      };
    });
  };

  const handleCoverUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file).unwrap();
      setForm((prev) => ({
        ...prev,
        coverImage: {
          url: res.url,
          alt: prev.coverImage?.alt || prev.title,
        },
      }));
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || "Upload failed.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const payload = {
      ...form,
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isNew) {
        const res = await createPost(payload).unwrap();
        router.replace(`/dashboard/pages/blog/${res.post.slug}`);
        setMessage({ type: "success", text: "Post created." });
      } else {
        await updatePost({ slug: routeSlug, body: payload }).unwrap();
        if (payload.slug !== routeSlug) {
          router.replace(`/dashboard/pages/blog/${payload.slug}`);
        }
        setMessage({ type: "success", text: "Post saved." });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isNew && isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-green" size={28} />
      </section>
    );
  }

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <Link
        href="/dashboard/pages/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray hover:text-brand-green"
      >
        <ArrowLeft size={16} />
        All posts
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-brand-dark md:text-3xl">
        {isNew ? "New blog post" : "Edit blog post"}
      </h1>

      <div className="mt-8 max-w-3xl space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => handleChange("slug", slugify(e.target.value))}
            className={`${inputClasses} font-mono text-xs`}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => handleChange("excerpt", e.target.value)}
            rows={2}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Content
          </label>
          <RichTextEditor
            value={form.content}
            onChange={(html) => handleChange("content", html)}
            placeholder="Write your article..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Cover image
          </label>
          <div className="relative mb-2 h-40 max-w-sm overflow-hidden rounded-lg border border-dashed border-brand-border bg-gray-50">
            {form.coverImage?.url ? (
              <Image
                src={form.coverImage.url}
                alt={form.coverImage.alt || "Cover"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-brand-gray">
                No cover image
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                <Loader2 className="animate-spin text-brand-green" size={20} />
              </div>
            )}
          </div>
          <input
            type="text"
            value={form.coverImage?.alt || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                coverImage: { ...prev.coverImage, alt: e.target.value },
              }))
            }
            placeholder="Cover image alt text"
            className={`${inputClasses} mb-2`}
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand-border px-3 py-2 text-xs font-medium hover:border-brand-green">
            <Upload size={14} />
            Upload cover
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleCoverUpload(e.target.files?.[0])}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <fieldset className="space-y-3 rounded-xl border border-brand-border p-4">
          <legend className="px-1 text-xs font-bold uppercase text-brand-gray">
            SEO (optional)
          </legend>
          <input
            type="text"
            value={form.metaTitle}
            onChange={(e) => handleChange("metaTitle", e.target.value)}
            placeholder="Meta title"
            className={inputClasses}
          />
          <textarea
            value={form.metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
            placeholder="Meta description"
            rows={2}
            className={inputClasses}
          />
        </fieldset>

        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => handleChange("published", e.target.checked)}
            className="rounded border-gray-300 text-brand-green"
          />
          Published (visible on /blog)
        </label>

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
          type="button"
          onClick={handleSave}
          disabled={saving || uploading}
          className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
        >
          {saving && <Loader2 className="animate-spin" size={16} />}
          {saving ? "Saving..." : isNew ? "Create post" : "Save changes"}
        </button>
      </div>
    </section>
  );
}
