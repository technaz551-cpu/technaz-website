"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Mail,
  Phone,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import {
  useGetContactQueriesQuery,
  useUpdateContactQueryMutation,
  useDeleteContactQueryMutation,
} from "@/store/api/technazApi";

function formatDateTime(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function ContactQueriesPage() {
  const { data, isLoading, isError, refetch } = useGetContactQueriesQuery();
  const [updateQuery] = useUpdateContactQueryMutation();
  const [deleteQuery] = useDeleteContactQueryMutation();
  const [expandedId, setExpandedId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState(null);

  const queries = data?.queries || [];
  const unreadCount = queries.filter((q) => !q.read).length;

  const handleToggleRead = async (item) => {
    setBusyId(item._id);
    try {
      await updateQuery({ id: item._id, read: !item.read }).unwrap();
    } catch {
      setMessage({ type: "error", text: "Could not update status." });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    setBusyId(id);
    setMessage(null);
    try {
      await deleteQuery(id).unwrap();
      if (expandedId === id) setExpandedId(null);
      refetch();
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    } finally {
      setBusyId(null);
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
      <Link
        href="/dashboard/pages/contact"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray hover:text-brand-green"
      >
        <ArrowLeft size={16} />
        Contact settings
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
            Form <span className="text-brand-green">enquiries</span>
          </h1>
          <p className="mt-2 text-sm text-brand-gray">
            Messages submitted from the public contact form.
            {unreadCount > 0 ? (
              <span className="ml-1 font-semibold text-brand-green">
                {unreadCount} unread
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {isError && (
        <p className="mt-4 text-sm text-red-600">Failed to load enquiries.</p>
      )}

      <div className="mt-8 space-y-3">
        {queries.map((item) => {
          const isExpanded = expandedId === item._id;
          const isBusy = busyId === item._id;

          return (
            <article
              key={item._id}
              className={`rounded-2xl border bg-white transition-colors ${
                item.read
                  ? "border-brand-border"
                  : "border-brand-green/50 shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setExpandedId(isExpanded ? null : item._id);
                  if (!item.read && !isExpanded) {
                    updateQuery({ id: item._id, read: true });
                  }
                }}
                className="flex w-full items-start gap-4 p-5 text-left"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-bold text-brand-dark">
                      {item.name}
                    </h2>
                    {!item.read ? (
                      <span className="rounded-full bg-brand-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        New
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-brand-gray">
                    {formatDateTime(item.createdAt)}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-brand-dark/80">
                    {item.message}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp size={18} className="shrink-0 text-brand-gray" />
                ) : (
                  <ChevronDown size={18} className="shrink-0 text-brand-gray" />
                )}
              </button>

              {isExpanded ? (
                <div className="border-t border-brand-border/60 px-5 pb-5 pt-4">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold uppercase text-brand-gray">
                        Email
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${item.email}`}
                          className="inline-flex items-center gap-1.5 font-medium text-brand-green hover:underline"
                        >
                          <Mail size={14} />
                          {item.email}
                        </a>
                      </dd>
                    </div>
                    {item.contact ? (
                      <div>
                        <dt className="text-xs font-semibold uppercase text-brand-gray">
                          Phone
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={`tel:${item.contact.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1.5 font-medium text-brand-dark hover:text-brand-green"
                          >
                            <Phone size={14} />
                            {item.contact}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase text-brand-gray">
                      Message
                    </p>
                    <p className="mt-2 whitespace-pre-wrap rounded-xl bg-brand-green-light/40 p-4 text-sm leading-relaxed text-brand-dark">
                      {item.message}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleToggleRead(item)}
                      className="rounded-full border border-brand-border px-4 py-2 text-xs font-semibold text-brand-dark hover:border-brand-green"
                    >
                      Mark as {item.read ? "unread" : "read"}
                    </button>
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center gap-1 rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}

        {queries.length === 0 && !isError && (
          <p className="rounded-2xl border border-dashed border-brand-border p-12 text-center text-sm text-brand-gray">
            No enquiries yet. Submissions from{" "}
            <Link href="/contact" className="text-brand-green hover:underline">
              /contact
            </Link>{" "}
            will appear here.
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
