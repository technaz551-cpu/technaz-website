export const DEFAULT_BRAND = {
  faviconUrl: "",
  siteLogoUrl: "/images/footer/technaz-large-logo.png",
  siteLogoSmallUrl: "/images/footer/technaz-small-logo.png",
};

export function resolveBrand(seo) {
  const siteLogoUrl = seo?.siteLogoUrl?.trim() || DEFAULT_BRAND.siteLogoUrl;
  const siteLogoSmallUrl =
    seo?.siteLogoSmallUrl?.trim() ||
    seo?.siteLogoUrl?.trim() ||
    DEFAULT_BRAND.siteLogoSmallUrl;

  return {
    faviconUrl: seo?.faviconUrl?.trim() || "",
    siteLogoUrl,
    siteLogoSmallUrl,
  };
}

export function absoluteAssetUrl(url, baseUrl) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const base = baseUrl?.replace(/\/$/, "") || "";
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}
