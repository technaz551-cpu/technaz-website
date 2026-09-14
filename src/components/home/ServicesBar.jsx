const DEFAULT_ITEMS = [
  "Web Development",
  "SAAS Development",
  "UI UX Design",
  "SEO & E commerce",
  "Custom Software",
  "Maintenance & Support",
  "DevOps & CI/CD",
];

export default function ServicesBar({ content }) {
  const items =
    content?.servicesBar?.items && content.servicesBar.items.length > 0
      ? content.servicesBar.items
      : DEFAULT_ITEMS;

  return (
    <div className="w-full bg-brand-dark overflow-hidden py-4">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((service, i) => (
          <span
            key={i}
            className="flex items-center text-sm text-white/90 px-4"
          >
            {service}
            <span className="mx-4 text-brand-green">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}