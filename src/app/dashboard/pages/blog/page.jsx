"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  useGetBlogPostsQuery,
  useDeleteBlogPostMutation,
} from "@/store/api/technazApi";

export default function BlogAdminListPage() {
  const { data, isLoading, isError, refetch } = useGetBlogPostsQuery();
  const [deletePost] = useDeleteBlogPostMutation();
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [message, setMessage] = useState(null);

  const posts = data?.posts || [];

  const handleDelete = async (slug) => {
    if (!window.confirm("Delete this blog post permanently?")) return;
    setDeletingSlug(slug);
    setMessage(null);
    try {
      await deletePost(slug).unwrap();
      setMessage({ type: "success", text: "Post deleted." });
      refetch();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || "Delete failed.",
      });
    } finally {
      setDeletingSlug(null);
    }
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-green" size={28} />
      </section>
    );
  }

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
            <span className="text-brand-green">Blog</span> posts
          </h1>
          <p className="mt-2 text-sm text-brand-gray">
            Create and publish articles for the public blog at{" "}
            <Link href="/blog" className="text-brand-green hover:underline">
              /blog
            </Link>
            .
          </p>
        </div>
        <Link
          href="/dashboard/pages/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark"
        >
          <Plus size={16} />
          New post
        </Link>
      </div>

      {isError && (
        <p className="mb-4 text-sm text-red-600">Failed to load posts.</p>
      )}

      <div className="overflow-hidden rounded-2xl border border-brand-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-brand-border bg-gray-50/80 text-xs uppercase tracking-wide text-brand-gray">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                Slug
              </th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.slug}
                className="border-b border-brand-border/60 last:border-0"
              >
                <td className="px-4 py-3 font-medium text-brand-dark">
                  {post.title}
                </td>
                <td className="hidden px-4 py-3 font-mono text-xs text-brand-gray sm:table-cell">
                  {post.slug}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      post.published
                        ? "bg-brand-green-light text-brand-green-dark"
                        : "bg-gray-100 text-brand-gray"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {post.published ? (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-md border border-brand-border p-2 text-brand-gray hover:text-brand-green"
                        title="View live"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    ) : null}
                    <Link
                      href={`/dashboard/pages/blog/${post.slug}`}
                      className="rounded-md border border-brand-border p-2 text-brand-gray hover:text-brand-green"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.slug)}
                      disabled={deletingSlug === post.slug}
                      className="rounded-md border border-red-200 p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="p-8 text-center text-sm text-brand-gray">
            No posts yet. Create your first article.
          </p>
        )}
      </div>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.type === "error" ? "text-red-600" : "text-brand-green"
          }`}
        >
          {message.text}
        </p>
      )}
    </section>
  );
}
