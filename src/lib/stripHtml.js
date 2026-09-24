/** Strip HTML tags for plain-text excerpts (metadata, previews). */
export function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalize plain text or HTML for rich display on the product detail page. */
export function descriptionToHtml(description) {
  if (!description) return "";
  if (/<[a-z][\s\S]*>/i.test(description)) {
    return description;
  }
  return description
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const escaped = escapeHtml(block);
      return `<p>${escaped.replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
