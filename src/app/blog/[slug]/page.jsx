import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import BlogPostDetail from "@/components/blog/BlogPostDetail";
import { getSeoSettings } from "@/lib/getSeoSettings";
import { stripHtml } from "@/lib/stripHtml";
import {
  buildPageMetadata,
  buildBlogPostingJsonLd,
  resolveBlogSeo,
} from "@/lib/pageMetadata";
import { resolveBrand, absoluteAssetUrl } from "@/lib/brandAssets";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  await dbConnect();
  const posts = await BlogPost.find({ published: true }).lean();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await dbConnect();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  const seo = await getSeoSettings();

  if (!post) {
    return { title: { absolute: "Article not found | TECHNAZ" } };
  }

  const { title, description } = resolveBlogSeo(post, slug);
  const plain =
    description ||
    post.excerpt ||
    stripHtml(post.content).slice(0, 160);

  return buildPageMetadata(seo, {
    title,
    description: plain,
    pathname: `/blog/${slug}`,
    ogType: "article",
    ogImage: post.coverImage?.url || seo?.ogImage,
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  await dbConnect();

  const [post, others, seo] = await Promise.all([
    BlogPost.findOne({ slug, published: true }).lean(),
    BlogPost.find({ published: true, slug: { $ne: slug } })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean(),
    getSeoSettings(),
  ]);

  if (!post) {
    notFound();
  }

  const serialized = JSON.parse(JSON.stringify(post));
  const { title, description, coverAlt } = resolveBlogSeo(serialized, slug);
  const brand = resolveBrand(seo);
  const baseUrl = seo.siteUrl || "https://technaz.com.au";
  const logoUrl = absoluteAssetUrl(brand.siteLogoUrl, baseUrl);

  const blogPostingJsonLd = buildBlogPostingJsonLd({
    post: serialized,
    seo: { ...seo, siteLogoUrl: logoUrl },
    slug,
    title,
    description:
      description ||
      serialized.excerpt ||
      stripHtml(serialized.content).slice(0, 160),
  });

  if (coverAlt && serialized.coverImage) {
    serialized.coverImage = { ...serialized.coverImage, alt: coverAlt };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <BlogPostDetail
        post={serialized}
        relatedPosts={JSON.parse(JSON.stringify(others))}
      />
    </>
  );
}
