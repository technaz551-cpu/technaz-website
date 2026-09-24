import { getSeoSettings } from "@/lib/getSeoSettings";
import { SITE } from "@/lib/site";

export default async function robots() {
  const seo = await getSeoSettings();
  const baseUrl = seo.siteUrl || SITE.url;

  const disallow = seo.robotsDisallowPaths?.length
    ? seo.robotsDisallowPaths
    : ["/dashboard", "/login", "/api"];

  const rules = {
    userAgent: "*",
    allow: seo.robotsIndex !== false ? "/" : "",
    disallow: seo.robotsIndex !== false ? disallow : "/",
  };

  const result = { rules };

  if (seo.sitemapEnabled !== false) {
    result.sitemap = `${baseUrl}/sitemap.xml`;
  }

  return result;
}
