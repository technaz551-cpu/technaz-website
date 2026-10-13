const GA_ID_RE = /^(G-[A-Z0-9]+|UA-\d+-\d+)$/i;
const GTM_ID_RE = /^GTM-[A-Z0-9]+$/i;

function firstNonEmpty(...values) {
  for (const v of values) {
    const t = typeof v === "string" ? v.trim() : "";
    if (t) return t;
  }
  return "";
}

/** Accept raw verification token or a pasted `<meta name="google-site-verification" …>` tag. */
export function normalizeSearchConsoleVerification(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  const fromMeta = trimmed.match(
    /google-site-verification["'\s]+content=["']([^"']+)["']/i
  );
  if (fromMeta?.[1]) return fromMeta[1].trim();
  const contentOnly = trimmed.match(/^content=["']([^"']+)["']$/i);
  if (contentOnly?.[1]) return contentOnly[1].trim();
  return trimmed;
}

export function normalizeGaMeasurementId(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  if (GA_ID_RE.test(trimmed)) return trimmed;
  const extracted = trimmed.match(/(G-[A-Z0-9]+|UA-\d+-\d+)/i);
  return extracted?.[1] || "";
}

export function normalizeGtmId(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  if (GTM_ID_RE.test(trimmed)) return trimmed;
  const extracted = trimmed.match(/(GTM-[A-Z0-9]+)/i);
  return extracted?.[1] || "";
}

/**
 * CMS values first, then production env (for migration from Base44 without re-saving SEO).
 */
export function resolveTrackingSettings(seo) {
  const googleAnalyticsId = normalizeGaMeasurementId(
    firstNonEmpty(
      seo?.googleAnalyticsId,
      process.env.GOOGLE_ANALYTICS_ID,
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      process.env.GA_MEASUREMENT_ID
    )
  );

  const googleTagManagerId = normalizeGtmId(
    firstNonEmpty(
      seo?.googleTagManagerId,
      process.env.GOOGLE_TAG_MANAGER_ID,
      process.env.NEXT_PUBLIC_GTM_ID,
      process.env.GTM_ID
    )
  );

  const googleSearchConsoleVerification = normalizeSearchConsoleVerification(
    firstNonEmpty(
      seo?.googleSearchConsoleVerification,
      process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION,
      process.env.GSC_VERIFICATION,
      process.env.NEXT_PUBLIC_GSC_VERIFICATION
    )
  );

  return {
    googleAnalyticsId,
    googleTagManagerId,
    googleSearchConsoleVerification,
  };
}

/** Merge tracking (+ pass-through other seo fields). */
export function withResolvedTracking(seo) {
  const tracking = resolveTrackingSettings(seo);
  return {
    ...seo,
    ...tracking,
  };
}
