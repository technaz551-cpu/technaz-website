export const SITE = {
  name: "Technaz",
  title: "Technaz | Managed IT & Custom Software",
  description:
    "Technaz gives growing Australian businesses dependable technology support — managed IT, cloud, cyber security and custom software from one team.",
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
