"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EXPERTISE_SLIDES = [
  {
    src: "/images/expertise/expertise-1.jpg",
    label: "DISCOVER",
    bgColor: "#d9ecd0",
  },
  {
    src: "/images/expertise/expertise-2.jpg",
    label: "DESIGN",
    bgColor: "#dbe6f7",
  },
  {
    src: "/images/expertise/expertise-3.jpg",
    label: "DEVELOP",
    bgColor: "#f3dde0",
  },
  {
    src: "/images/expertise/expertise-4.jpg",
    label: "DEPLOY & SUPPORT",
    bgColor: "#e7f3de",
  },
];

export default function Expertise() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      const scrollDistance =
        sectionRef.current.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      let value = -rect.top / scrollDistance;

      value = Math.max(0, Math.min(value, 1));

      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const slideProgress = progress * (EXPERTISE_SLIDES.length - 1);

  const currentIndex = Math.min(
    Math.floor(slideProgress),
    EXPERTISE_SLIDES.length - 1
  );

  const nextIndex = Math.min(
    currentIndex + 1,
    EXPERTISE_SLIDES.length - 1
  );

  const transitionProgress = slideProgress - currentIndex;

  const hexToRgb = (hex) => {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  };

  const mixColors = (color1, color2, amount) => {
    const first = hexToRgb(color1);
    const second = hexToRgb(color2);
    const r = Math.round(first.r + (second.r - first.r) * amount);
    const g = Math.round(first.g + (second.g - first.g) * amount);
    const b = Math.round(first.b + (second.b - first.b) * amount);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const backgroundColor = mixColors(
    EXPERTISE_SLIDES[currentIndex].bgColor,
    EXPERTISE_SLIDES[nextIndex].bgColor,
    transitionProgress
  );

  const activeLabel =
    transitionProgress < 0.5
      ? EXPERTISE_SLIDES[currentIndex].label
      : EXPERTISE_SLIDES[nextIndex].label;

  // Reveal progress for each image layer (0 to 1)
  const image2Progress = Math.max(0, Math.min(1, slideProgress));
  const image3Progress = Math.max(0, Math.min(1, slideProgress - 1));
  const image4Progress = Math.max(0, Math.min(1, slideProgress - 2));

  const image2Clip = `inset(0 0 ${100 - image2Progress * 100}% 0)`;
  const image3Clip = `inset(0 0 ${100 - image3Progress * 100}% 0)`;
  const image4Clip = `inset(0 0 ${100 - image4Progress * 100}% 0)`;

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
          {/* LEFT SIDE - SAME TEXT */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl lg:text-4xl">
              Our Expertise
            </h2>

            <div className="mt-4 flex max-w-xs items-center">
              <span className="text-brand-green text-base leading-none">
                ◆
              </span>
              <span className="mx-1 h-[1.5px] flex-1 bg-brand-green" />
              <span className="text-brand-green text-base leading-none">
                ➤
              </span>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-700 md:text-base">
              At Technaz, we pioneer in crafting innovative
              strategies and providing tailored solutions
              perfect for your business needs. From initial
              vision and conceptualization to streamlined
              execution, we transform your unique ideas into
              impactful and brand-elevating results.
            </p>

            <Link
              href="#contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
            >
              Contact Now
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="absolute right-[5%] top-1/2 w-[42%] max-w-[500px] -translate-y-1/2 md:right-[6%]">
            <div
              className="relative h-[300px] overflow-hidden rounded-3xl p-5 shadow-xl md:h-[380px] md:p-6"
              style={{ backgroundColor }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                {/* IMAGE 1 - base layer, always visible */}
                <div className="absolute inset-0 z-[1]">
                  <Image
                    src={EXPERTISE_SLIDES[0].src}
                    alt="Technaz team working"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* IMAGE 2 */}
                <div
                  className="absolute inset-0 z-[2]"
                  style={{ clipPath: image2Clip }}
                >
                  <Image
                    src={EXPERTISE_SLIDES[1].src}
                    alt="Technaz team working"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* IMAGE 3 */}
                <div
                  className="absolute inset-0 z-[3]"
                  style={{ clipPath: image3Clip }}
                >
                  <Image
                    src={EXPERTISE_SLIDES[2].src}
                    alt="Technaz team working"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* IMAGE 4 - was missing before */}
                <div
                  className="absolute inset-0 z-[4]"
                  style={{ clipPath: image4Clip }}
                >
                  <Image
                    src={EXPERTISE_SLIDES[3].src}
                    alt="Technaz team working"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* LABEL */}
                <div className="absolute bottom-4 left-4 z-[10] rounded-lg bg-white px-4 py-2 shadow-md">
                  <span className="text-sm font-bold tracking-wide text-brand-dark">
                    {activeLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}