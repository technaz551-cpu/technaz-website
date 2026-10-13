import { resolveTrackingSettings } from "@/lib/trackingSettings";

/**
 * Server-rendered GA / GTM / GSC so View Source and Google validators see tags in <head>.
 */
export default function GoogleTrackingHead({ seo }) {
  const {
    googleAnalyticsId: gaId,
    googleTagManagerId: gtmId,
    googleSearchConsoleVerification: gsc,
  } = resolveTrackingSettings(seo);

  return (
    <>
      {gsc ? (
        <meta name="google-site-verification" content={gsc} />
      ) : null}

      {gtmId ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      ) : null}

      {gaId && !gtmId ? (
        <>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
