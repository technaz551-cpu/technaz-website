import dbConnect from "@/lib/dbConnect";
import ProductsContent from "@/models/ProductsContent";
import BlogPost from "@/models/BlogPost";
import { getSeoSettings } from "@/lib/getSeoSettings";
import { SITE } from "@/lib/site";

export default async function sitemap() {
  const seo = await getSeoSettings();

  if (seo.sitemapEnabled === false) {
    return [];
  }

  await dbConnect();
  const [productsDoc, blogPosts] = await Promise.all([
    ProductsContent.findOne({}).lean(),
    BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean(),
  ]);

  const base = seo.siteUrl || SITE.url;
  const products = productsDoc?.products || [];

  const corePaths = [
    "/",
    "/about",
    "/services",
    "/products",
    "/blog",
    "/contact",
  ];

  const extraPaths = seo.sitemapExtraPaths || [];
  const allStatic = [...new Set([...corePaths, ...extraPaths])];

  const staticRoutes = allStatic.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
