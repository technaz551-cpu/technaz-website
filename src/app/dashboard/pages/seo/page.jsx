"use client";

import { useEffect, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import {
  useGetSeoSettingsQuery,
  useUpdateSeoSettingsMutation,
  useUploadFileMutation,
} from "@/store/api/technazApi";
import { SITE } from "@/lib/site";

const EMPTY = {
  siteTitle: "",
  siteDescription: "",
  keywords: [],
  siteUrl: "",
  locale: "",
  faviconUrl: "",
  siteLogoUrl: "",
  siteLogoSmallUrl: "",
  ogImage: "",
  twitterCard: "summary_large_image",
  googleAnalyticsId: "",
  googleTagManagerId: "",
  metaPixelId: "",
  metaPixelScript: "",
  googleSearchConsoleVerification: "",
  bingSiteVerification: "",
  robotsIndex: true,
  robotsFollow: true,
  robotsDisallowPaths: [],
  sitemapEnabled: true,
  sitemapExtraPaths: [],
};

export default function SeoSettingsPage() {
  const [form, setForm] = useState(EMPTY);
  const [keywordsText, setKeywordsText] = useState("");
  const [disallowText, setDisallowText] = useState("");
  const [extraPathsText, setExtraPathsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const { data, isLoading, isError } = useGetSeoSettingsQuery();
  const [updateSeo] = useUpdateSeoSettingsMutation();
  const [uploadFile] = useUploadFileMutation();
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    if (isError) {
      setMessage({ type: "error", text: "Failed to load SEO settings." });
      return;
    }
    if (data?.settings) {
      const s = data.settings;
      setForm({ ...EMPTY, ...s });
      setKeywordsText((s.keywords || []).join(", "));
      setDisallowText((s.robotsDisallowPaths || []).join("\n"));
      setExtraPathsText((s.sitemapExtraPaths || []).join("\n"));
    }
  }, [data, isError]);

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all bg-white";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBrandUpload = async (field, file) => {
    if (!file) return;
    setUploadingField(field);
    setMessage(null);
    try {
      const uploadData = await uploadFile(file).unwrap();
      handleChange(field, uploadData.url);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Image upload failed.",
      });
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const payload = {
      ...form,
      keywords: keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      robotsDisallowPaths: disallowText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
      sitemapExtraPaths: extraPathsText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    try {
      await updateSeo(payload).unwrap();
      setMessage({ type: "success", text: "SEO settings saved." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  const siteUrl = form.siteUrl || SITE.url;

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-green" size={28} />
      </section>
    );
  }

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
          <span className="text-brand-green">SEO</span> &amp; Analytics
        </h1>
        <p className="mt-3 text-sm text-brand-gray">
          Manage site-wide meta tags, search engine tools, robots.txt, and
          sitemap behaviour. Changes apply to public pages after save.
        </p>
      </div>

      <div className="max-w-3xl space-y-8">
        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Logo &amp; favicon
          </legend>
          <p className="text-sm text-brand-gray">
            Used in the header, footer, browser tab, and Google search results.
            Upload a square PNG or ICO for the favicon (at least 48×48px).
          </p>
          {[
            {
              field: "faviconUrl",
              label: "Favicon",
              hint: "Browser tab & Google search icon",
            },
            {
              field: "siteLogoUrl",
              label: "Header logo",
              hint: "Main navbar & admin sidebar",
            },
            {
              field: "siteLogoSmallUrl",
              label: "Footer logo (optional)",
              hint: "Leave empty to reuse the header logo",
            },
          ].map(({ field, label, hint }) => {
            const url = form[field] || "";
            const uploading = uploadingField === field;
            return (
              <div
                key={field}
                className="rounded-xl border border-dashed border-brand-border p-4"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">
                      {label}
                    </p>
                    <p className="text-xs text-brand-gray">{hint}</p>
                  </div>
                  <label className="cursor-pointer rounded-full bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green-dark">
                    {uploading ? "Uploading…" : url ? "Replace" : "Upload"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/x-icon,image/vnd.microsoft.icon,.ico"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleBrandUpload(field, file);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                {url ? (
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className={
                        field === "faviconUrl"
                          ? "h-12 w-12 rounded border border-brand-border object-contain bg-white p-1"
                          : "h-10 max-w-[200px] object-contain"
                      }
                    />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-brand-gray">
                    No image yet — uses site default until you upload.
                  </p>
                )}
              </div>
            );
          })}
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Site metadata
          </legend>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Site title
            </label>
            <input
              type="text"
              value={form.siteTitle}
              onChange={(e) => handleChange("siteTitle", e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Meta description
            </label>
            <textarea
              value={form.siteDescription}
              onChange={(e) =>
                handleChange("siteDescription", e.target.value)
              }
              rows={3}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={keywordsText}
              onChange={(e) => setKeywordsText(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-dark">
                Site URL
              </label>
              <input
                type="url"
                value={form.siteUrl}
                onChange={(e) => handleChange("siteUrl", e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-dark">
                Locale
              </label>
              <input
                type="text"
                value={form.locale}
                onChange={(e) => handleChange("locale", e.target.value)}
                className={inputClasses}
                placeholder="en_AU"
              />
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-brand-border p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-brand-dark">
                  Default Open Graph image
                </p>
                <p className="text-xs text-brand-gray">
                  Shown when links are shared (Facebook, LinkedIn, etc.).
                  Recommended 1200×630px.
                </p>
              </div>
              <label className="cursor-pointer rounded-full bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green-dark">
                {uploadingField === "ogImage"
                  ? "Uploading…"
                  : form.ogImage
                    ? "Replace"
                    : "Upload"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={uploadingField === "ogImage"}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    handleBrandUpload("ogImage", file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            {form.ogImage ? (
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.ogImage}
                  alt=""
                  className="max-h-40 w-full max-w-md rounded-lg border border-brand-border object-cover"
                />
                <input
                  type="url"
                  value={form.ogImage}
                  onChange={(e) => handleChange("ogImage", e.target.value)}
                  className={inputClasses}
                  placeholder="https://..."
                />
              </div>
            ) : (
              <input
                type="url"
                value={form.ogImage}
                onChange={(e) => handleChange("ogImage", e.target.value)}
                className={inputClasses}
                placeholder="https://... or use Upload"
              />
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Twitter card type
            </label>
            <select
              value={form.twitterCard}
              onChange={(e) => handleChange("twitterCard", e.target.value)}
              className={inputClasses}
            >
              <option value="summary_large_image">Summary large image</option>
              <option value="summary">Summary</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Google &amp; Bing
          </legend>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Google Analytics measurement ID
            </label>
            <input
              type="text"
              value={form.googleAnalyticsId}
              onChange={(e) =>
                handleChange("googleAnalyticsId", e.target.value)
              }
              className={inputClasses}
              placeholder="G-XXXXXXXXXX"
            />
            <p className="mt-1 text-xs text-brand-gray">
              Injected in the page &lt;head&gt; via gtag.js. If GTM is set,
              GA loads through GTM instead (do not duplicate). You can also set{" "}
              <code className="text-brand-dark">GOOGLE_ANALYTICS_ID</code> in
              hosting env vars.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Google Tag Manager container ID
            </label>
            <input
              type="text"
              value={form.googleTagManagerId}
              onChange={(e) =>
                handleChange("googleTagManagerId", e.target.value)
              }
              className={inputClasses}
              placeholder="GTM-XXXXXXX"
            />
            <p className="mt-1 text-xs text-brand-gray">
              Or set <code className="text-brand-dark">GOOGLE_TAG_MANAGER_ID</code>{" "}
              in hosting env vars.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Google Search Console verification
            </label>
            <input
              type="text"
              value={form.googleSearchConsoleVerification}
              onChange={(e) =>
                handleChange(
                  "googleSearchConsoleVerification",
                  e.target.value
                )
              }
              className={inputClasses}
              placeholder="verification code or full meta tag"
            />
            <p className="mt-1 text-xs text-brand-gray">
              Renders{" "}
              <code className="text-brand-dark">
                google-site-verification
              </code>{" "}
              in HTML. Or set{" "}
              <code className="text-brand-dark">
                GOOGLE_SEARCH_CONSOLE_VERIFICATION
              </code>{" "}
              in env.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Bing Webmaster verification
            </label>
            <input
              type="text"
              value={form.bingSiteVerification}
              onChange={(e) =>
                handleChange("bingSiteVerification", e.target.value)
              }
              className={inputClasses}
              placeholder="msvalidate.01 content"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Meta (Facebook) Pixel
          </legend>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Pixel ID
            </label>
            <input
              type="text"
              value={form.metaPixelId}
              onChange={(e) => handleChange("metaPixelId", e.target.value)}
              className={inputClasses}
              placeholder="123456789012345"
            />
            <p className="mt-1 text-xs text-brand-gray">
              Numeric ID from Meta Events Manager. Used to build the standard
              PageView pixel if no custom script is pasted below.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Pixel script (optional)
            </label>
            <textarea
              value={form.metaPixelScript}
              onChange={(e) =>
                handleChange("metaPixelScript", e.target.value)
              }
              rows={8}
              className={`${inputClasses} font-mono text-xs`}
              placeholder="Paste the full Meta Pixel base code from Events Manager…"
            />
            <p className="mt-1 text-xs text-brand-gray">
              Paste Meta&apos;s snippet as-is (including{" "}
              <code className="text-brand-dark">&lt;script&gt;</code> tags). It
              is injected in the site <strong>HTML head</strong> so Meta can
              detect it. Save here on <strong>production</strong> admin (MongoDB
              is per environment). Optional env fallback:{" "}
              <code className="text-brand-dark">META_PIXEL_ID</code>.
            </p>
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <legend className="px-1 text-sm font-bold text-brand-dark">
            Robots &amp; sitemap
          </legend>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-brand-dark">
              <input
                type="checkbox"
                checked={form.robotsIndex}
                onChange={(e) => handleChange("robotsIndex", e.target.checked)}
                className="rounded border-gray-300 text-brand-green"
              />
              Allow indexing (robots index)
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-dark">
              <input
                type="checkbox"
                checked={form.robotsFollow}
                onChange={(e) =>
                  handleChange("robotsFollow", e.target.checked)
                }
                className="rounded border-gray-300 text-brand-green"
              />
              Allow following links (robots follow)
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-dark">
              <input
                type="checkbox"
                checked={form.sitemapEnabled}
                onChange={(e) =>
                  handleChange("sitemapEnabled", e.target.checked)
                }
                className="rounded border-gray-300 text-brand-green"
              />
              Sitemap enabled
            </label>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Disallow paths (one per line, for robots.txt)
            </label>
            <textarea
              value={disallowText}
              onChange={(e) => setDisallowText(e.target.value)}
              rows={4}
              className={inputClasses}
              placeholder="/dashboard&#10;/login"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Extra sitemap paths (one per line, relative URLs)
            </label>
            <textarea
              value={extraPathsText}
              onChange={(e) => setExtraPathsText(e.target.value)}
              rows={3}
              className={inputClasses}
              placeholder="/about&#10;/services"
            />
          </div>
          <div className="rounded-lg bg-brand-green-light/50 p-4 text-sm text-brand-dark">
            <p className="font-semibold">Live endpoints</p>
            <ul className="mt-2 space-y-1 text-brand-gray">
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-green hover:underline"
                >
                  {siteUrl}/robots.txt
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-green hover:underline"
                >
                  {siteUrl}/sitemap.xml
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
            <p className="mt-2 text-xs text-brand-gray">
              Sitemap auto-includes home, main pages, products, and published
              blog posts.
            </p>
          </div>
        </fieldset>

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
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
        >
          {saving && <Loader2 className="animate-spin" size={16} />}
          {saving ? "Saving..." : "Save SEO settings"}
        </button>
      </div>
    </section>
  );
}
