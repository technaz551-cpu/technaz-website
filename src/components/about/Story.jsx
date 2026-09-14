"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Story({ content }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const story = content?.story;
  const eyebrow = story?.eyebrow || "About Us";
  const heading = story?.heading || "Our Story";
  const description =
    story?.description ||
    "At Technaz, we pioneer in crafting innovative strategies and providing tailored solutions perfect for your business needs. From initial vision and conceptualization to streamlined execution, we transform your unique ideas into impactful and brand-elevating results.";
  const badgeText = story?.badgeText || "Innovate";
  const image = story?.image?.url || "/images/about/story.jpg";
  const imageAlt = story?.image?.alt || "Technaz team collaborating";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-green-light py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green">
            {eyebrow}
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
            {heading}
          </h2>

          <div
            className={`mt-4 h-1 rounded-full bg-brand-green transition-all duration-700 delay-300 ease-out ${
              isVisible ? "w-16" : "w-0"
            }`}
          />

          <p className="mt-6 text-sm md:text-base text-gray-700 leading-relaxed md:leading-8 max-w-lg">
            {description}
          </p>
        </div>

        <div
          className={`relative h-[260px] sm:h-[320px] md:h-[380px] w-full md:w-[92%] md:ml-auto transition-all duration-700 delay-150 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[28px]"
            style={{
              boxShadow:
                "18px -18px 0 color-mix(in srgb, var(--color-brand-green) 65%, transparent)",
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div
            className={`absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg transition-all duration-500 delay-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-brand-green" />
            <span className="text-xs font-bold uppercase tracking-wide text-brand-dark">
              {badgeText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}