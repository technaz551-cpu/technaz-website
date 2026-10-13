import dbConnect from "@/lib/dbConnect";
import SeoSettings from "@/models/SeoSettings";
import { SITE } from "@/lib/site";
import { cmsDynamic } from "@/lib/cmsDynamic";
import { resolveBrand, absoluteAssetUrl } from "@/lib/brandAssets";
import { ORGANIZATION_SAME_AS, canonicalUrl } from "@/lib/pageMetadata";
import { withResolvedTracking } from "@/lib/trackingSettings";

export async function getSeoSettings() {
  cmsDynamic();
  await dbConnect();
  let doc = await SeoSettings.findOne({}).lean();
  if (!doc) {
    doc = (await SeoSettings.create({})).toObject();
  }
  return withResolvedTracking(JSON.parse(JSON.stringify(doc)));
}

export function buildRootMetadata(seo) {
  const baseUrl = seo?.siteUrl || SITE.url;
  const title = seo?.siteTitle || SITE.title;
  const description = seo?.siteDescription || SITE.description;
  const keywords = seo?.keywords?.length ? seo.keywords : SITE.keywords;

  const verification = {};
  // GSC meta is emitted in GoogleTrackingHead (raw HTML for validators).
  if (seo?.bingSiteVerification) {
    verification.other = {
      "msvalidate.01": seo.bingSiteVerification,
    };
  }

  const metadata = {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s",
    },
    description,
    keywords,
    authors: [{ name: SITE.name, url: baseUrl }],
    creator: SITE.name,
    robots: {
      index: seo?.robotsIndex !== false,
      follow: seo?.robotsFollow !== false,
    },
    openGraph: {
      type: "website",
      locale: seo?.locale || SITE.locale,
      url: baseUrl,
      siteName: SITE.name,
      title,
      description,
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card: seo?.twitterCard || "summary_large_image",
      title,
      description,
      ...(seo?.ogImage ? { images: [seo.ogImage] } : {}),
    },
    alternates: {
      canonical: canonicalUrl(seo, "/"),
    },
  };

  if (Object.keys(verification).length > 0) {
    metadata.verification = verification;
  }

  const brand = resolveBrand(seo);
  const favicon =
    absoluteAssetUrl(brand.faviconUrl, baseUrl) ||
    absoluteAssetUrl("/favicon.ico", baseUrl);
  const appleIcon =
    absoluteAssetUrl(brand.faviconUrl, baseUrl) ||
    absoluteAssetUrl(brand.siteLogoSmallUrl, baseUrl);

  metadata.icons = {
    icon: [{ url: favicon, sizes: "any" }],
    shortcut: favicon,
    apple: appleIcon,
  };

  return metadata;
}

export function buildOrganizationJsonLd(seo) {
  const baseUrl = (seo?.siteUrl || SITE.url).replace(/\/?$/, "/");
  const brand = resolveBrand(seo);
  const logo = absoluteAssetUrl(brand.siteLogoUrl, baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TECHNAZ",
    url: baseUrl,
    ...(logo ? { logo } : {}),
    sameAs: ORGANIZATION_SAME_AS,
  };
}
