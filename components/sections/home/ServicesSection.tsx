"use client";

import { motion } from "framer-motion";
import { servicesSection } from "@/constants/home";
import { Container } from "@/components/ui/Container";

const cardGradients = [
  "from-[#475569] to-[#334155]",
  "from-[#3f4f5f] to-[#1e293b]",
  "from-[#52525b] to-[#3f3f46]",
  "from-[#64748b] to-[#475569]",
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-[72px] lg:py-[88px]">
      <Container>
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="text-[26px] font-bold leading-tight text-brand-dark sm:text-[30px] lg:text-[34px]">
            {servicesSection.title}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-brand-muted lg:text-[15px]">
            {servicesSection.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {servicesSection.items.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group relative overflow-hidden rounded-[14px]"
            >
              <div
                className={`relative h-[280px] bg-gradient-to-br sm:h-[300px] lg:h-[320px] ${cardGradients[index]}`}
              >
                {service.featured ? (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-5 pt-16">
                    <h3 className="text-[15px] font-semibold text-white">
                      {service.title}
                    </h3>
                    {"description" in service && service.description && (
                      <p className="mt-1.5 text-[12px] leading-relaxed text-white/75">
                        {service.description}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="text-[13px] font-medium text-white/90">
                      {service.label}
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
