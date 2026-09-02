"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SERVICES = [
  {
    src: "/images/services/service-1.jpg",
    alt: "Technaz service — infrastructure",
    title: "Managed IT",
    desc: "Proactive monitoring and support for your entire infrastructure.",
  },
  {
    src: "/images/services/service-2.jpg",
    alt: "Cloud Solutions",
    title: "Cloud Solutions",
    desc: "Migration, optimisation and management across Azure, AWS and Microsoft 365.",
  },
  {
    src: "/images/services/service-3.jpg",
    alt: "Technaz service — collaboration",
    title: "Custom Software",
    desc: "Tailored applications built around how your business actually works.",
  },
  {
    src: "/images/services/service-4.jpg",
    alt: "Technaz service — development",
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
      className="bg-white py-16 md:py-24 overflow-x-clip overflow-y-visible"
    >
      {/* Heading */}
      <div className="max-w-2xl mx-auto text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
          Services built around your business
        </h2>

        <p className="mt-3 text-sm md:text-base text-brand-gray">
          One partner across infrastructure, cloud, security and software —
          with clear SLAs and no jargon.
        </p>
      </div>

      {/* Auto-scrolling image row */}
      <div
        className="mt-24 overflow-x-clip overflow-y-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex gap-4 md:gap-5 w-max"
          style={{
            animation: "marquee-scroll 30s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
          }}
        >
          {[...SERVICES, ...SERVICES].map((service, i) => (
            <div
              key={i}
              className="group/card relative flex-shrink-0 w-[220px] md:w-[280px] h-[380px] rounded-3xl overflow-visible bg-white"
              style={{ transform: "translateZ(0)" }}
            >
              {/* Image */}
              <div
                className="
                  relative
                  w-full
                  h-full
                  rounded-3xl
                  transition-all
                  duration-300
                  ease-out
                  group-hover/card:-translate-y-20
                "
              >
                <Image
                  src={service.src}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 220px, 280px"
                  className="object-cover rounded-3xl"
                />
              </div>

              {/* Caption */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-0
                  group-hover/card:h-24
                  overflow-hidden
                  transition-[height]
                  duration-300
                  ease-out
                  px-3
                  flex
                  flex-col
                  justify-center
                "
              >
                <h3 className="text-sm font-bold text-brand-dark">
                  {service.title}
                </h3>

                <p className="text-xs text-brand-gray mt-1">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}