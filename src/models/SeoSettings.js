import mongoose from "mongoose";
import { SITE } from "@/lib/site";

const SeoSettingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: SITE.title },
    siteDescription: { type: String, default: SITE.description },
    keywords: {
      type: [String],
      default: SITE.keywords,
    },
    siteUrl: { type: String, default: SITE.url },
    locale: { type: String, default: SITE.locale },
    ogImage: { type: String, default: "" },
    twitterCard: {
      type: String,
      enum: ["summary", "summary_large_image"],
      default: "summary_large_image",
    },
    googleAnalyticsId: { type: String, default: "" },
    googleTagManagerId: { type: String, default: "" },
    metaPixelId: { type: String, default: "" },
    metaPixelScript: { type: String, default: "" },
    googleSearchConsoleVerification: { type: String, default: "" },
    bingSiteVerification: { type: String, default: "" },
    robotsIndex: { type: Boolean, default: true },
    robotsFollow: { type: Boolean, default: true },
    robotsDisallowPaths: {
      type: [String],
      default: ["/dashboard", "/login", "/api"],
    },
    sitemapEnabled: { type: Boolean, default: true },
    sitemapExtraPaths: { type: [String], default: [] },
    customMetaTags: {
      type: [
        {
          name: { type: String, default: "" },
          content: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.SeoSettings ||
  mongoose.model("SeoSettings", SeoSettingsSchema);
