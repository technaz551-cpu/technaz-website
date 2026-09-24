import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogCard({ post }) {
  const cover =
    post.coverImage?.url || "/images/services/expertise-2.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={cover}
          alt={post.coverImage?.alt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {post.publishedAt ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-brand-gray">
            <Calendar size={14} aria-hidden="true" />
            {formatDate(post.publishedAt)}
          </p>
        ) : null}
        <h2 className="mt-2 text-lg font-bold text-brand-dark transition-colors group-hover:text-brand-green sm:text-xl">
          {post.title}
        </h2>
        <span
          className="mt-3 block h-px w-full bg-brand-dark/10"
          aria-hidden="true"
        />
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-dark/80">
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
          Read article
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
