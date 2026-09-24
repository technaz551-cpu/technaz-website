import { descriptionToHtml } from "@/lib/stripHtml";

export default function ProductRichText({ html }) {
  const content = descriptionToHtml(html);
  if (!content) return null;

  return (
    <div
      className="product-prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
