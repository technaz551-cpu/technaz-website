import { SITE } from "@/lib/site";

export const FOOTER_TAGLINE_DEFAULT =
  "Software Development & Technology Solutions for Modern Businesses";

export const ORGANIZATION_SAME_AS = [
  "https://www.linkedin.com/company/technaz1/",
];

/** Approved on-page SEO copy (canonical paths without domain). */
export const STATIC_PAGE_SEO = {
  home: {
    pathname: "/",
    title: "Technology & Software Development Company | TECHNAZ",
    description:
      "TECHNAZ provides software development and technology solutions, including custom software, web and mobile development, UI/UX, AI automation and DevOps.",
  },
  services: {
    pathname: "/services",
    title: "Software & Technology Services | TECHNAZ",
    description:
      "Explore TECHNAZ services including custom software, web and mobile development, product development, UI/UX, AI automation, Cloud & DevOps.",
  },
  about: {
    pathname: "/about",
    title: "About TECHNAZ | Software & Technology Company",
    description:
      "Learn about TECHNAZ, our approach to technology, the values behind our work and how we help businesses build reliable digital solutions.",
  },
  contact: {
    pathname: "/contact",
    title: "Contact TECHNAZ | Discuss Your Technology Project",
    description:
      "Contact TECHNAZ to discuss your software, web, mobile, product development, UI/UX, AI automation or cloud technology requirements.",
  },
  products: {
    pathname: "/products",
    title: "Digital Products & Software Solutions | TECHNAZ",
    description:
      "Explore digital products developed by TECHNAZ to simplify business processes, improve operations and solve practical business challenges.",
  },
  blog: {
    pathname: "/blog",
    title: "Software & Technology Insights | TECHNAZ Blog",
    description:
      "Read TECHNAZ insights on software development, digital products, web and mobile development, AI, automation and modern technology.",
  },
};

export const BLOG_SEO_BY_SLUG = {
  "how-custom-software-can-improve-business-operations": {
    title: "How Custom Software Improves Business Operations | TECHNAZ",
    description:
      "Learn how custom software can simplify workflows, automate repetitive tasks, connect business systems and support long-term growth.",
    coverAlt:
      "Team discussing custom software solutions to improve business operations",
  },
  "from-idea-to-mvp-a-practical-product-development-process": {
    title: "From Idea to MVP: Product Development Process | TECHNAZ",
    description:
      "Learn how to turn a digital product idea into an MVP through planning, UI/UX design, development, testing and continuous improvement.",
    coverAlt:
      "Product development process from idea and UI/UX planning to MVP launch",
  },
  "how-ai-automation-can-reduce-repetitive-work-in-your-business": {
    title: "AI Automation for Business Workflows | TECHNAZ",
    description:
      "Explore practical ways businesses can use AI and automation to simplify repetitive work and improve everyday processes.",
    coverAlt:
      "How AI Automation Can Reduce Repetitive Work in Your Business",
  },
};

export function normalizeBaseUrl(seo) {
  return (seo?.siteUrl || SITE.url).replace(/\/$/, "");
}

export function canonicalUrl(seo, pathname) {
  const base = normalizeBaseUrl(seo);
  if (pathname === "/" || pathname === "") {
    return `${base}/`;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function buildPageMetadata(
  seo,
  { title, description, pathname, ogType = "website", ogImage }
) {
  const canonical = canonicalUrl(seo, pathname);
  const image = ogImage || seo?.ogImage;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: ogType,
      url: canonical,
      title,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: seo?.twitterCard || "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function resolveBlogSeo(post, slug) {
  const approved = BLOG_SEO_BY_SLUG[slug];
  const title =
    post.metaTitle?.trim() ||
    approved?.title ||
    `${post.title} | TECHNAZ`;
  const description =
    post.metaDescription?.trim() ||
    approved?.description ||
    post.excerpt ||
    "";
  const coverAlt =
    post.coverImage?.alt?.trim() || approved?.coverAlt || post.title;

  return { title, description, coverAlt };
}

export function buildBlogPostingJsonLd({ post, seo, slug, title, description }) {
  const canonical = canonicalUrl(seo, `/blog/${slug}`);
  const image = post.coverImage?.url || seo?.ogImage;
  const base = normalizeBaseUrl(seo);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    name: title,
    description,
    ...(image ? { image: [image] } : {}),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      "@type": "Organization",
      name: post.author || "Technaz Team",
    },
    publisher: {
      "@type": "Organization",
      name: "TECHNAZ",
      url: `${base}/`,
      ...(seo?.siteLogoUrl || seo?.ogImage
        ? {
            logo: {
              "@type": "ImageObject",
              url: seo.siteLogoUrl || seo.ogImage,
            },
          }
        : {}),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };
}
