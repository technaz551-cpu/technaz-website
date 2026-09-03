"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SERVICES = [
  {
    src: "/images/services/service-1.jpg",
    alt: "Managed IT services and infrastructure monitoring by Technaz Australia",
    title: "Managed IT",
    desc: "Proactive monitoring and support for your entire infrastructure.",
  },
  {
    src: "/images/services/service-2.jpg",
    alt: "Cloud solutions and Microsoft 365 migration services in Australia",
    title: "Cloud Solutions",
    desc: "Migration, optimisation and management across Azure, AWS and Microsoft 365.",
  },
  {
    src: "/images/services/service-3.jpg",
    alt: "Custom software development tailored for Australian businesses",
    title: "Custom Software",
    desc: "Tailored applications built around how your business actually works.",
  },
  {
    src: "/images/services/service-4.jpg",
    alt: "Professional web development and SaaS application building",
    title: "Web Development",
    desc: "Fast, modern websites and web apps built for growth.",
  },
];

export default function Services() {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const isPaused = isHovered || isScrolling;

  return (
    <section
      id="services"
      className="bg-white py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <h2 className="text-balance text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl md:text-4xl">
          Services built around your business
        </h2>

        <p className="mx-auto mt-6 max-w-4xl text-pretty text-base leading-7 text-brand-gray sm:mt-8 sm:text-lg sm:leading-8">
          Technaz is your single technology partner for managed IT, cloud
          solutions, cyber security and custom software development. We help
          growing Australian businesses simplify their IT stack, reduce
          downtime, and scale with confidence — from day-to-day support and
          DevOps to web development, SaaS builds and UI/UX design.
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-pretty text-sm leading-6 text-brand-gray/90 sm:text-base sm:leading-7">
          Every engagement comes with clear SLAs, transparent communication and
          no jargon — so your team always knows what is happening, what it
          costs, and what comes next.
        </p>
      </div>

      <div
        className="mt-12 overflow-x-clip pb-6 sm:mt-14 md:mt-16 lg:mt-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex w-max items-end gap-5 animate-marquee md:gap-6"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
          }}
        >
          {[...SERVICES, ...SERVICES].map((service, i) => (
            <article
              key={i}
              className="group/card relative h-[380px] w-[260px] flex-shrink-0 overflow-visible sm:h-[400px] sm:w-[280px] md:h-[420px] md:w-[300px] lg:h-[440px] lg:w-[320px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out group-hover/card:-translate-y-[5.5rem]">
                <Image
                  src={service.src}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 320px"
                  className="object-cover"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover/card:translate-y-0 group-hover/card:opacity-100">
                <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <h3 className="text-base font-bold text-brand-dark">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {service.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
