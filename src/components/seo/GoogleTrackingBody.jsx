import { resolveTrackingSettings } from "@/lib/trackingSettings";

/** GTM noscript fallback — must be first in <body> when GTM is used. */
export default function GoogleTrackingBody({ seo }) {
  const { googleTagManagerId: gtmId } = resolveTrackingSettings(seo);

  if (!gtmId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
