/** Strip HTML script tags from pasted Meta Pixel snippet. */
export function normalizeMetaPixelScript(raw) {
  if (!raw || typeof raw !== "string") return "";
  return raw
    .replace(/<\/?script[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

/** Extract Pixel ID from numeric input or pasted fbq('init', '…') code. */
export function extractMetaPixelId(pixelIdField, scriptField) {
  const id = pixelIdField?.trim();
  if (id && /^\d+$/.test(id)) return id;

  const script = normalizeMetaPixelScript(scriptField || "");
  const match = script.match(
    /fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d+)['"]/
  );
  return match?.[1] || "";
}

export function buildDefaultMetaPixelScript(pixelId) {
  const safeId = String(pixelId).replace(/\D/g, "");
  if (!safeId) return "";

  return `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${safeId}');
fbq('track', 'PageView');
`.trim();
}

export function resolveMetaPixelInjection(seo) {
  const scriptField = seo?.metaPixelScript?.trim();
  const normalized = normalizeMetaPixelScript(scriptField);
  const pixelId = extractMetaPixelId(seo?.metaPixelId, scriptField);

  if (normalized && normalized.includes("fbq")) {
    return { pixelId, inlineScript: normalized };
  }

  if (pixelId) {
    return { pixelId, inlineScript: buildDefaultMetaPixelScript(pixelId) };
  }

  return { pixelId: "", inlineScript: "" };
}
