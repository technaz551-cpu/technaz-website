"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PROCESS_STEPS = [
  {
    label: "Discovery & Planning",
    shortLabel: "Discovery",
    tagline: "Clarity before commitment",
    description:
      "We begin every engagement with a structured discovery phase — reviewing your infrastructure, workflows, pain points and growth targets. This gives Australian businesses a clear technology roadmap before any build or migration starts.",
    includes: [
      "Stakeholder workshops and requirements gathering",
      "Infrastructure, cloud and security audit",
      "Risk assessment and prioritised recommendations",
      "Technology roadmap with timelines and milestones",
    ],
    bestSuitedFor: [
      "Businesses planning cloud migration or IT modernisation",
      "Teams unsure where to start with custom software",
      "Organisations needing a second opinion on existing IT setup",
    ],
    boxColor: "#eef2f6",
  },
  {
    label: "Architecture & Design",
    shortLabel: "Design",
    tagline: "Architecture built for scale",
    description:
      "Our architects and designers translate discovery insights into secure, scalable solution designs — covering cloud architecture, cyber security, UX flows and technical specifications aligned to your budget and compliance needs.",
    includes: [
      "Solution architecture and system diagrams",
      "UI/UX wireframes for web and SaaS products",
      "Security and compliance planning",
      "Detailed scope, milestones and cost estimates",
    ],
    bestSuitedFor: [
      "SaaS products and customer-facing web applications",
      "Multi-cloud or Microsoft 365 environments",
      "Businesses requiring ISO or industry compliance",
    ],
    boxColor: "#e8f0ea",
  },
  {
    label: "Build & Integrate",
    shortLabel: "Development",
    tagline: "Agile delivery, visible progress",
    description:
      "Engineers build in agile sprints — delivering web apps, API integrations, DevOps pipelines and custom software with regular demos. You see working features early, provide feedback often, and launch with confidence.",
    includes: [
      "Agile sprints with fortnightly demos",
      "Custom software, web apps and API integrations",
      "DevOps, CI/CD and automated testing",
      "Code reviews and documentation",
    ],
    bestSuitedFor: [
      "Startups launching MVPs or SaaS platforms",
      "Enterprises replacing legacy systems",
      "Teams needing dedicated development capacity",
    ],
    boxColor: "#eef2f6",
  },
  {
    label: "Launch & Ongoing Care",
    shortLabel: "Deploy & Support",
    tagline: "Launch with ongoing care",
    description:
      "We handle production deployment, performance monitoring and proactive managed IT support — with clear SLAs, responsive helpdesk and continuous improvements so your technology keeps pace with your business.",
    includes: [
      "Production deployment and go-live support",
      "24/7 monitoring and incident response",
      "Managed IT, patching and cyber security updates",
      "Feature enhancements and scalability planning",
    ],
    bestSuitedFor: [
      "Businesses needing reliable post-launch IT support",
      "Growing teams without in-house IT staff",
      "Organisations requiring defined SLAs and uptime guarantees",
    ],
    boxColor: "#e8f0ea",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollDistance =
        sectionRef.current.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const value = Math.max(0, Math.min(1, -rect.top / scrollDistance));
      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slideProgress = progress * (PROCESS_STEPS.length - 1);
  const activeIndex = Math.min(
    Math.round(slideProgress),
    PROCESS_STEPS.length - 1
  );

  const indicatorHeight = 100 / PROCESS_STEPS.length;
  const indicatorTop = slideProgress * indicatorHeight;
  const activeStep = PROCESS_STEPS[activeIndex];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative h-[400vh] bg-white"
      aria-label="Our process"
    >
      <div className="process-section sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-start px-4 pt-14 pb-2 sm:px-6 md:pt-16 lg:px-8 lg:pt-20 lg:pb-4">
          <header className="mb-6 md:mb-8">
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl lg:text-4xl">
              Our Process
            </h2>

            <div
              className="mt-3 flex max-w-xl items-center md:max-w-2xl"
              aria-hidden="true"
            >
              <span className="text-base leading-none text-brand-green">◆</span>
              <span className="mx-1 h-[1.5px] flex-1 bg-brand-green" />
              <span className="text-base leading-none text-brand-green">➤</span>
            </div>

            <p className="mt-3 text-base font-medium text-brand-gray md:text-lg">
              Where custom software meets boundless potential
            </p>
          </header>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[minmax(240px,300px)_1fr] md:gap-8 lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-12">
            <aside>
              <nav
                className="relative md:pl-1"
                aria-label="Process steps"
              >
                <div
                  className="absolute bottom-0 left-0 top-0 hidden w-px bg-gray-200 md:block"
                  aria-hidden="true"
                >
                  <div
                    className="absolute left-0 w-[3px] -translate-x-[1px] rounded-full bg-brand-dark transition-[top,height] duration-150 ease-out"
                    style={{
                      top: `${indicatorTop}%`,
                      height: `${indicatorHeight}%`,
                    }}
                  />
                </div>

                <ul className="flex flex-row flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-0 md:pl-6">
                  {PROCESS_STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    const isPast = index < activeIndex;

                    return (
                      <li key={step.label} className="md:py-3.5 lg:py-4">
                        <span
                          className={`block transition-colors duration-150 ${
                            isActive
                              ? "text-base font-bold text-brand-dark lg:text-lg"
                              : isPast
                                ? "text-sm font-medium text-brand-dark/45 lg:text-base"
                                : "text-sm font-medium text-brand-gray lg:text-base"
                          }`}
                          aria-current={isActive ? "step" : undefined}
                        >
                          {step.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <div className="relative">
              <article
                key={activeStep.label}
                className="rounded-3xl p-6 sm:p-7 md:p-9 lg:p-10"
                style={{ backgroundColor: activeStep.boxColor }}
              >
                <h3 className="text-xl font-bold text-brand-dark md:text-2xl lg:text-3xl">
                  {activeStep.label}
                </h3>

                <p className="mt-2 text-sm font-medium text-brand-dark/75 md:text-base">
                  {activeStep.tagline}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-gray-700 md:text-base md:leading-7">
                  {activeStep.description}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 md:mt-7">
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark">
                      What this includes:
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {activeStep.includes.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-gray-700"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-dark"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-brand-dark">
                      Best suited for:
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {activeStep.bestSuitedFor.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-gray-700"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-dark"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-green md:mt-8"
                >
                  Learn More
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-dark/20 bg-white">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        {PROCESS_STEPS.map((step) => (
          <article key={step.label}>
            <h3>
              {step.label} — {step.tagline}
            </h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
