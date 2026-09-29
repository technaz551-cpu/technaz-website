import { revalidatePath } from "next/cache";

/**
 * Bust Next.js static cache after admin CMS updates so production reflects
 * changes immediately without redeploy.
 */
export function revalidatePublicSite(extraPaths = []) {
  try {
    revalidatePath("/", "layout");

    const paths = new Set([
      "/",
      "/about",
      "/services",
      "/contact",
      "/blog",
      "/products",
      "/robots.txt",
      "/sitemap.xml",
      ...extraPaths,
    ]);

    for (const path of paths) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error("revalidatePublicSite error:", error);
  }
}
