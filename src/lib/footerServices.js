/** Footer service labels and detail-page slugs (null → /services). */
export const FOOTER_SERVICES = [
  { label: "Web Development", slug: "web-development" },
  { label: "SaaS Development", slug: "product-development" },
  { label: "UI/UX Design", slug: "ui-ux-design" },
  { label: "SEO & E-commerce", slug: "web-development" },
  {
    label: "Custom Software Development",
    slug: "custom-software-development",
  },
  { label: "Maintenance & Support", slug: "dedicated-development-teams" },
  { label: "DevOps & CI/CD", slug: "cloud-devops" },
];

export function footerServiceHref(slug) {
  return slug ? `/services/${slug}` : "/services";
}
