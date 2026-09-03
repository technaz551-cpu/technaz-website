"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EXPERTISE_SLIDES = [
  {
    src: "/images/expertise/expertise-1.jpg",
    alt: "Technaz discovery workshop assessing business IT requirements in Australia",
    label: "DISCOVER",
    phase: "Discovery & Assessment",
    description:
      "We map your infrastructure, workflows and growth goals to build a clear technology roadmap — identifying risks, gaps and quick wins for Australian businesses ready to modernise.",
    bgColor: "#d9ecd0",
  },
  {
    src: "/images/expertise/expertise-2.jpg",
    alt: "Technaz solution design for cloud, security and custom software architecture",
    label: "DESIGN",
    phase: "Solution Design",
    description:
      "Our architects design secure, scalable systems across cloud, cyber security and custom software — aligned to your budget, compliance needs and long-term business objectives.",
    bgColor: "#dbe6f7",
  },
  {
    src: "/images/expertise/expertise-3.jpg",
    alt: "Technaz software development team building web apps and integrations",
    label: "DEVELOP",
    phase: "Agile Development",
    description:
      "Engineers deliver web applications, SaaS platforms, API integrations and DevOps pipelines using agile sprints — so you see progress early and launch with confidence.",
    bgColor: "#f3dde0",
  },
  {
    src: "/images/expertise/expertise-4.jpg",
    alt: "Technaz managed IT support and deployment for growing businesses",
    label: "DEPLOY & SUPPORT",
    phase: "Deploy & Ongoing Support",
    description:
      "We deploy, monitor and maintain your environment with proactive managed IT, clear SLAs and responsive support — keeping your team productive long after go-live.",
    bgColor: "#e7f3de",
  },
];

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function mixColors(color1, color2, amount) {
  const first = hexToRgb(color1);
  const second = hexToRgb(color2);
  const r = Math.round(first.r + (second.r - first.r) * amount);
  const g = Math.round(first.g + (second.g - first.g) * amount);
  const b = Math.round(first.b + (second.b - first.b) * amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Expertise() {
  const sectionRef = useRef(null);
  const textTrackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [textSlideHeight, setTextSlideHeight] = useState(220);

  useEffect(() => {
    const measureTextSlide = () => {
      const firstSlide = textTrackRef.current?.firstElementChild;
      if (firstSlide) {
        setTextSlideHeight(firstSlide.getBoundingClientRect().height);
      }
    };

    measureTextSlide();
    window.addEventListener("resize", measureTextSlide);

    return () => window.removeEventListener("resize", measureTextSlide);
  }, []);

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

  const slideProgress = progress * (EXPERTISE_SLIDES.length - 1);
  const currentIndex = Math.min(
    Math.floor(slideProgress),
    EXPERTISE_SLIDES.length - 1
  );
  const nextIndex = Math.min(currentIndex + 1, EXPERTISE_SLIDES.length - 1);
  const transitionProgress = slideProgress - currentIndex;

  const backgroundColor = mixColors(
    EXPERTISE_SLIDES[currentIndex].bgColor,
    EXPERTISE_SLIDES[nextIndex].bgColor,
    transitionProgress
  );

  const currentSlide = EXPERTISE_SLIDES[currentIndex];
  const nextSlide = EXPERTISE_SLIDES[nextIndex];

  const imageClips = EXPERTISE_SLIDES.map((_, index) => {
    if (index === 0) return "inset(0 0 0% 0)";
    const layerProgress = Math.max(0, Math.min(1, slideProgress - (index - 1)));
    return `inset(0 0 ${100 - layerProgress * 100}% 0)`;
  });

  const textScrollOffset = slideProgress * textSlideHeight;

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative h-[400vh]"
      aria-label="Our expertise process"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-150"
        style={{ backgroundColor }}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-16 md:flex-row md:gap-12 lg:px-10 lg:py-20">
          <div className="relative z-10 w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl lg:text-4xl">
              Our Expertise
            </h2>

            <div className="mt-4 flex max-w-xs items-center" aria-hidden="true">
              <span className="text-base leading-none text-brand-green">◆</span>
              <span className="mx-1 h-[1.5px] flex-1 bg-brand-green" />
              <span className="text-base leading-none text-brand-green">➤</span>
            </div>

            <div className="relative mt-6 h-[190px] overflow-hidden sm:h-[210px] md:h-[220px]">
              <div
                ref={textTrackRef}
                className="will-change-transform"
                style={{
                  transform: `translateY(-${textScrollOffset}px)`,
                }}
              >
                {EXPERTISE_SLIDES.map((slide) => (
                  <div
                    key={slide.label}
                    className="flex h-[190px] flex-col justify-start sm:h-[210px] md:h-[220px]"
                  >
                    <h3 className="text-lg font-bold text-brand-dark md:text-xl">
                      {slide.phase}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-700 md:text-base md:leading-7">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
            >
              Contact Now
            </Link>

            <div className="mt-8 flex gap-2" aria-hidden="true">
              {EXPERTISE_SLIDES.map((slide, index) => (
                <span
                  key={slide.label}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: index === currentIndex ? "2rem" : "0.5rem",
                    backgroundColor:
                      index === currentIndex
                        ? "#6fcf43"
                        : "rgba(30, 42, 38, 0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-1/2 md:max-w-[500px]">
            <div
              className="relative h-[280px] overflow-hidden rounded-3xl p-4 shadow-xl transition-transform duration-150 sm:h-[320px] md:h-[380px] md:p-6"
              style={{
                backgroundColor,
                transform: `translateY(-${slideProgress * 12}px)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                {EXPERTISE_SLIDES.map((slide, index) => (
                  <div
                    key={slide.src}
                    className="absolute inset-0"
                    style={{
                      zIndex: index + 1,
                      clipPath: imageClips[index],
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover"
                    />
                  </div>
                ))}

                <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-white px-4 py-2 shadow-md">
                  <span className="text-sm font-bold tracking-wide text-brand-dark">
                    {transitionProgress < 0.5
                      ? currentSlide.label
                      : nextSlide.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        {EXPERTISE_SLIDES.map((slide) => (
          <article key={slide.label}>
            <h3>{slide.phase}</h3>
            <p>{slide.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
