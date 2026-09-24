import { CONTACT_MAP_EMBED_SRC } from "@/lib/contact.constants";

export default function ContactLayout({ children }) {
  const embedOrigin = new URL(CONTACT_MAP_EMBED_SRC).origin;

  return (
    <>
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href={embedOrigin} crossOrigin="" />
      <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      {children}
    </>
  );
}
