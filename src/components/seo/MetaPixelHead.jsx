import { resolveMetaPixelInjection } from "@/lib/metaPixel";

/**
 * Server-rendered pixel so Meta Events Manager / crawlers see fbq in HTML source.
 */
export default function MetaPixelHead({ seo }) {
  const { pixelId, inlineScript } = resolveMetaPixelInjection(seo);

  if (!inlineScript) {
    return null;
  }

  return (
    <>
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      {pixelId ? (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          />
        </noscript>
      ) : null}
    </>
  );
}
