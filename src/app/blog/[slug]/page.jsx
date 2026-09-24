import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import BlogPostDetail from "@/components/blog/BlogPostDetail";
import { getSeoSettings } from "@/lib/getSeoSettings";
import { SITE } from "@/lib/site";
import { stripHtml } from "@/lib/stripHtml";

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
  const base = seo.siteUrl || SITE.url;

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.metaTitle || post.title,
    description:
      post.metaDescription ||
      post.excerpt ||
      stripHtml(post.content).slice(0, 160),
    alternates: { canonical: `${base}/blog/${slug}` },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      ...(post.coverImage?.url
        ? { images: [{ url: post.coverImage.url }] }
        : {}),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  await dbConnect();

  const [post, others] = await Promise.all([
    BlogPost.findOne({ slug, published: true }).lean(),
    BlogPost.find({ published: true, slug: { $ne: slug } })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostDetail
      post={JSON.parse(JSON.stringify(post))}
      relatedPosts={JSON.parse(JSON.stringify(others))}
    />
  );
}
