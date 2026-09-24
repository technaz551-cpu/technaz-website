import dbConnect from "@/lib/dbConnect";
import SeoSettings from "@/models/SeoSettings";
import { SITE } from "@/lib/site";

export async function getSeoSettings() {
  await dbConnect();
  let doc = await SeoSettings.findOne({}).lean();
  if (!doc) {
    doc = (await SeoSettings.create({})).toObject();
  }
  return JSON.parse(JSON.stringify(doc));
}

export function buildRootMetadata(seo) {
  const baseUrl = seo?.siteUrl || SITE.url;
  const title = seo?.siteTitle || SITE.title;
  const description = seo?.siteDescription || SITE.description;
  const keywords = seo?.keywords?.length ? seo.keywords : SITE.keywords;

  const verification = {};
  if (seo?.googleSearchConsoleVerification) {
    verification.google = seo.googleSearchConsoleVerification;
  }
  if (seo?.bingSiteVerification) {
    verification.other = {
      "msvalidate.01": seo.bingSiteVerification,
    };
  }

  const metadata = {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${SITE.name}`,
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
      canonical: baseUrl,
    },
  };

  if (Object.keys(verification).length > 0) {
    metadata.verification = verification;
  }

  return metadata;
}
