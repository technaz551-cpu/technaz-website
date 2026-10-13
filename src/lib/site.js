export const SITE = {
  name: "TECHNAZ",
  title: "Technology & Software Development Company | TECHNAZ",
  description:
    "TECHNAZ provides software development and technology solutions, including custom software, web and mobile development, UI/UX, AI automation and DevOps.",
  url: "https://technaz.com.au",
  locale: "en_AU",
  keywords: [
    "managed IT",
    "custom software",
    "cloud solutions",
    "cyber security",
    "web development",
    "DevOps",
    "Australian IT support",
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  areaServed: "AU",
  serviceType: [
    "Managed IT Services",
    "Cloud Solutions",
    "Cyber Security",
    "Custom Software Development",
    "Web Development",
  ],
};
