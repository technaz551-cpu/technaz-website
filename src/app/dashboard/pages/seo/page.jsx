"use client";

import { useEffect, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import {
  useGetSeoSettingsQuery,
  useUpdateSeoSettingsMutation,
} from "@/store/api/technazApi";
import { SITE } from "@/lib/site";

const EMPTY = {
  siteTitle: "",
  siteDescription: "",
  keywords: [],
  siteUrl: "",
  locale: "",
  ogImage: "",
  twitterCard: "summary_large_image",
  googleAnalyticsId: "",
  googleTagManagerId: "",
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
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-dark">
              Default Open Graph image URL
            </label>
            <input
              type="url"
              value={form.ogImage}
              onChange={(e) => handleChange("ogImage", e.target.value)}
              className={inputClasses}
              placeholder="https://..."
            />
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
              Loaded site-wide via gtag.js (skipped if GTM ID is set).
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
              placeholder="verification code (content value only)"
            />
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
