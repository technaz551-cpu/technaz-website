"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  Loader2,
  Trash2,
  Plus,
  ExternalLink,
} from "lucide-react";
import {
  useGetProductsContentQuery,
  useUpdateProductsContentMutation,
  useUploadFileMutation,
} from "@/store/api/technazApi";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

const EMPTY_PRODUCT = {
  title: "",
  slug: "",
  excerpt: "",
  description: "",
  highlights: [],
  externalUrl: "",
  showInNav: false,
  navGroup: "platforms",
  image: { url: "", alt: "" },
  logo: { url: "", alt: "" },
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditProductsList() {
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [message, setMessage] = useState(null);
  const { data, isLoading, isError } = useGetProductsContentQuery();
  const [updateProductsContent] = useUpdateProductsContentMutation();
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    if (isError) {
      setMessage({ type: "error", text: "Failed to load products." });
      return;
    }
    if (data?.content) {
      setProducts(data.content.products || []);
    }
  }, [data, isError]);

  const handleFieldChange = (index, field, value) => {
    setProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleNestedChange = (index, parent, field, value) => {
    setProducts((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [parent]: { ...item[parent], [field]: value } }
          : item
      )
    );
  };

  const handleTitleChange = (index, title) => {
    setProducts((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const autoSlug =
          !item.slug || item.slug === slugify(item.title);
        return {
          ...item,
          title,
          slug: autoSlug ? slugify(title) : item.slug,
        };
      })
    );
  };

  const handleHighlightsChange = (index, text) => {
    const highlights = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    handleFieldChange(index, "highlights", highlights);
  };

  const handleImageUpload = async (index, field, file) => {
    if (!file) return;
    setUploadingKey(`${index}-${field}`);
    setMessage(null);

    try {
      const uploadData = await uploadFile(file).unwrap();
      handleNestedChange(index, field, "url", uploadData.url);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Upload failed.",
      });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleAdd = () => {
    setProducts((prev) => [...prev, { ...EMPTY_PRODUCT }]);
  };

  const handleRemove = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await updateProductsContent({ products }).unwrap();
      setMessage({ type: "success", text: "Products updated successfully." });
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
        <Loader2 className="animate-spin text-brand-green" size={28} />
      </section>
    );
  }

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl">
          Manage <span className="text-brand-green">Products</span>
        </h1>
        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>
        <p className="mt-3 text-sm text-brand-gray">
          Each product appears on{" "}
          <Link href="/products" className="text-brand-green hover:underline">
            /products
          </Link>{" "}
          and has its own detail page. Enable &quot;Show in navbar&quot; to
          include it in the Product menu dropdown.
        </p>
      </div>

      <div className="max-w-3xl space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-green px-4 py-2 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
          >
            <Plus size={14} />
            Add product
          </button>
        </div>

        {products.map((product, index) => {
          const uploadingImage = uploadingKey === `${index}-image`;
          const uploadingLogo = uploadingKey === `${index}-logo`;

          return (
            <div
              key={index}
              className="rounded-2xl border border-brand-border bg-white p-5"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray">
                  Product {index + 1}
                </p>
                {product.slug ? (
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-green hover:underline"
                  >
                    Preview
                    <ExternalLink size={12} />
                  </Link>
                ) : null}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-brand-gray">
                    Title
                  </label>
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-brand-gray">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={product.slug}
                    onChange={(e) =>
                      handleFieldChange(index, "slug", slugify(e.target.value))
                    }
                    className="w-full rounded-md border border-gray-200 px-3 py-2 font-mono text-xs outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-brand-gray">
                    Short excerpt (listing card)
                  </label>
                  <textarea
                    value={product.excerpt}
                    onChange={(e) =>
                      handleFieldChange(index, "excerpt", e.target.value)
                    }
                    rows={2}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-brand-gray">
                    Full description (detail page, rich text)
                  </label>
                  <RichTextEditor
                    value={product.description || ""}
                    onChange={(html) =>
                      handleFieldChange(index, "description", html)
                    }
                    placeholder="Write the full product story — headings, lists, and links are supported."
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-brand-gray">
                    Key responsibilities (one per line)
                  </label>
                  <textarea
                    value={(product.highlights || []).join("\n")}
                    onChange={(e) =>
                      handleHighlightsChange(index, e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-brand-gray">
                    External website URL (optional)
                  </label>
                  <input
                    type="url"
                    value={product.externalUrl}
                    onChange={(e) =>
                      handleFieldChange(index, "externalUrl", e.target.value)
                    }
                    placeholder="https://"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-brand-dark">
                    <input
                      type="checkbox"
                      checked={Boolean(product.showInNav)}
                      onChange={(e) =>
                        handleFieldChange(index, "showInNav", e.target.checked)
                      }
                      className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    />
                    Show in navbar dropdown
                  </label>

                  <select
                    value={product.navGroup || "platforms"}
                    onChange={(e) =>
                      handleFieldChange(index, "navGroup", e.target.value)
                    }
                    className="rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-brand-green"
                  >
                    <option value="platforms">Nav: Platforms</option>
                    <option value="solutions">Nav: Solutions</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {["image", "logo"].map((field) => {
                    const isLogo = field === "logo";
                    const uploading = isLogo ? uploadingLogo : uploadingImage;
                    const asset = product[field] || { url: "", alt: "" };

                    return (
                      <div key={field}>
                        <label className="mb-1 block text-xs text-brand-gray">
                          {isLogo ? "Logo (nav / card)" : "Cover image"}
                        </label>
                        <div className="relative mb-2 h-28 overflow-hidden rounded-lg bg-gray-50">
                          {asset.url ? (
                            <Image
                              src={asset.url}
                              alt={asset.alt || "Preview"}
                              fill
                              sizes="160px"
                              className={isLogo ? "object-contain p-2" : "object-cover"}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-brand-gray">
                              No {field}
                            </div>
                          )}
                          {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                              <Loader2
                                className="animate-spin text-brand-green"
                                size={18}
                              />
                            </div>
                          )}
                        </div>
                        <input
                          type="text"
                          value={asset.alt || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              field,
                              "alt",
                              e.target.value
                            )
                          }
                          placeholder="Alt text"
                          className="mb-2 w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-brand-green"
                        />
                        <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-brand-border px-3 py-2 text-xs font-medium text-brand-dark transition-colors hover:border-brand-green">
                          <Upload size={13} />
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                            onChange={(e) => {
                              handleImageUpload(
                                index,
                                field,
                                e.target.files?.[0]
                              );
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs text-red-500 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={13} />
                  Remove product
                </button>
              </div>
            </div>
          );
        })}

        {products.length === 0 && (
          <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-brand-gray">
            No products yet. Click Add product to create one.
          </p>
        )}
      </div>

      {message && (
        <p
          role="status"
          className={`mt-6 text-sm font-medium ${
            message.type === "error" ? "text-red-600" : "text-brand-green"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || uploadingKey !== null}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {saving && <Loader2 className="animate-spin" size={16} />}
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}
