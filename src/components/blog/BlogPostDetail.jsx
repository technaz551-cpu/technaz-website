import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Tag, User } from "lucide-react";
import BlogPostBody from "@/components/blog/BlogPostBody";
import BlogCard from "@/components/blog/BlogCard";

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogPostDetail({ post, relatedPosts = [] }) {
  const cover =
    post.coverImage?.url || "/images/services/expertise-2.jpg";

  return (
    <main className="bg-white">
      <article>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-brand-border/60 bg-white pb-8 pt-6 md:pb-10 md:pt-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[45%] bg-grid-light md:block" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray transition-colors hover:text-brand-green"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <div className="mt-6 max-w-4xl">
              <h1 className="text-3xl font-bold leading-tight text-brand-dark md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                {post.title}
              </h1>

              <div
                className="mt-4 flex max-w-md items-center"
                aria-hidden="true"
              >
                <span className="text-base leading-none text-brand-green">
                  ◆
                </span>
                <span className="mx-2 h-[1.5px] flex-1 bg-brand-green" />
                <span className="text-base leading-none text-brand-green">
                  ➤
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {post.publishedAt ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white px-3 py-1.5 text-xs font-semibold text-brand-dark">
                    <Calendar size={14} className="text-brand-green" />
                    {formatDate(post.publishedAt)}
                  </span>
                ) : null}
                {post.author ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white px-3 py-1.5 text-xs font-semibold text-brand-dark">
                    <User size={14} className="text-brand-green" />
                    {post.author}
                  </span>
                ) : null}
              </div>

              {post.tags?.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold text-brand-green-dark"
                    >
                      <Tag size={12} aria-hidden="true" />
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              {post.excerpt ? (
                <p className="mt-6 border-l-4 border-brand-green pl-4 text-base leading-relaxed text-brand-dark/90 md:text-lg md:leading-8">
                  {post.excerpt}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* Cover + body */}
        <section className="bg-brand-green-light/25 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:rounded-[28px]">
                <Image
                  src={cover}
                  alt={post.coverImage?.alt || post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-border/80 bg-white p-6 shadow-sm sm:p-8 md:mt-12 md:p-10 lg:max-w-4xl">
              <BlogPostBody html={post.content} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-brand-border/60 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-5 lg:px-6">
            <h2 className="text-xl font-bold text-brand-dark md:text-2xl">
              Want to discuss your next project?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-brand-gray md:text-base">
              Talk to Technaz about managed IT, custom software, or product
              delivery.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Contact us
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-dark px-8 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
              >
                More articles
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="border-t border-brand-border/60 bg-brand-green-light py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">
                  Related articles
                </h2>
                <div
                  className="mt-3 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-base leading-none text-brand-green">
                    ◆
                  </span>
                  <span className="mx-2 h-[1.5px] w-16 bg-brand-green sm:w-24" />
                  <span className="text-base leading-none text-brand-green">
                    ➤
                  </span>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {relatedPosts.map((related) => (
                  <BlogCard key={related.slug} post={related} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
