import { NextResponse } from "next/server";
import { getSeoSettings } from "@/lib/getSeoSettings";
import { resolveBrand, absoluteAssetUrl } from "@/lib/brandAssets";
import { SITE } from "@/lib/site";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const DEFAULT_LOCAL = "/images/footer/technaz-small-logo.png";

async function loadLocalFallback() {
  const filePath = path.join(process.cwd(), "public", DEFAULT_LOCAL.slice(1));
  const buffer = await readFile(filePath);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export async function GET() {
  try {
    const seo = await getSeoSettings();
    const brand = resolveBrand(seo);
    const baseUrl = seo?.siteUrl || SITE.url;
    const target =
      absoluteAssetUrl(brand.faviconUrl, baseUrl) ||
      absoluteAssetUrl(DEFAULT_LOCAL, baseUrl);

    if (target.startsWith("http")) {
      const upstream = await fetch(target, { cache: "no-store" });
      if (!upstream.ok) {
        return loadLocalFallback();
      }
      const body = await upstream.arrayBuffer();
      return new NextResponse(body, {
        headers: {
          "Content-Type":
            upstream.headers.get("content-type") || "image/png",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    return loadLocalFallback();
  } catch (error) {
    console.error("Favicon route error:", error);
    try {
      return loadLocalFallback();
    } catch {
      return new NextResponse(null, { status: 404 });
    }
  }
}
