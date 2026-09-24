import { descriptionToHtml } from "@/lib/stripHtml";

export default function BlogPostBody({ html }) {
  const content = descriptionToHtml(html);
  if (!content) return null;

  return (
    <div
      className="product-prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
