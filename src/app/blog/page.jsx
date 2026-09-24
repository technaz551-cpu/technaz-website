import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import BlogCard from "@/components/blog/BlogCard";
import { getSeoSettings } from "@/lib/getSeoSettings";
import { SITE } from "@/lib/site";

export async function generateMetadata() {
  const seo = await getSeoSettings();
  const base = seo.siteUrl || SITE.url;

  return {
    title: "Blog",
    description:
      "Insights on managed IT, software development, cloud, and digital products from the Technaz team.",
    alternates: { canonical: `${base}/blog` },
  };
}

export default async function BlogPage() {
  await dbConnect();
  const posts = JSON.parse(
    JSON.stringify(
      await BlogPost.find({ published: true })
        .sort({ publishedAt: -1 })
        .lean()
    )
  );

  return (
    <main className="bg-white">
      <section className="border-b border-brand-border/60 bg-brand-green-light/40 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-5 lg:px-6">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
            Blog
          </h1>
          <div
            className="mt-3 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-base leading-none text-brand-green">◆</span>
            <span className="mx-2 h-[1.5px] w-16 bg-brand-green sm:w-24" />
            <span className="text-base leading-none text-brand-green">➤</span>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-brand-gray md:text-base">
            Practical updates on technology, product delivery, and IT operations
            for Australian businesses.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-brand-border bg-brand-green-light/30 p-12 text-center text-sm text-brand-gray">
              New articles will appear here once published from the admin
              dashboard.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
