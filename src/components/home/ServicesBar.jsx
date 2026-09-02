const SERVICES = [
    "Web Development",
    "SAAS Development",
    "UI UX Design",
    "SEO & E commerce",
    "Custom Software",
    "Maintenance & Support",
    "DevOps & CI/CD",
  ];
  
  export default function ServicesBar() {
    return (
      <div className="w-full bg-brand-dark overflow-hidden py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...SERVICES, ...SERVICES].map((service, i) => (
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