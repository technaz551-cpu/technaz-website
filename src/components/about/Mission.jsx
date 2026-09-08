// import Image from "next/image";

// export default function Mission() {
//   return (
//     <section className="bg-white py-16 md:py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//         <div className="relative h-[220px] md:h-[260px] w-full md:w-[90%] rounded-2xl overflow-hidden p-1">
//           <div className="relative w-full h-full rounded-xl overflow-hidden">
//             <Image
//               src="/images/about/mission.jpg"
//               alt="Technaz team collaborating"
//               fill
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover"
//             />
//           </div>
//           <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-md">
//             <span className="text-sm font-bold text-brand-dark tracking-wide">
//               INNOVATE
//             </span>
//           </div>
//         </div>

//         <div className="md:pl-8 lg:pl-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
//             Mission
//           </h2>
//           <div className="mt-3 h-px w-full max-w-xs bg-brand-dark" />
//           <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed max-w-md text-justify">
//             Empowering growing Australian businesses with enterprise-grade
//             technology that is practical, scalable, and cost-effective—helping
//             you streamline operations, enhance productivity, embrace digital
//             transformation, and scale with confidence.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Mission() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className="bg-white py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: Image - fades/slides in from the left */}
        <div
          className={`relative h-[240px] sm:h-[280px] md:h-[340px] w-full md:w-[88%] transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
          }`}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[28px]"
            style={{
              boxShadow: "-18px -18px 0 color-mix(in srgb, var(--color-brand-green) 65%, transparent)",
            }}
          >
            <Image
              src="/images/about/mission.jpg"
              alt="Technaz team in a strategy meeting"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Innovate Badge */}
          <div
            className={`absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg transition-all duration-500 delay-500 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-wide text-brand-dark">
              Innovate
            </span>
          </div>
        </div>

        {/* Right: Text content */}
        <div
          className={`md:pl-4 lg:pl-8 transition-all duration-700 delay-150 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-green">
            Our Purpose
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
            Mission
          </h2>

          {/* Green Line */}
          <div
            className={`mt-4 h-1 rounded-full bg-brand-green transition-all duration-700 delay-300 ease-out ${
              isVisible ? "w-16" : "w-0"
            }`}
          />

          <p className="mt-6 text-sm md:text-base text-gray-700 leading-relaxed md:leading-8 max-w-lg">
            Empowering growing Australian businesses with enterprise-grade
            technology that is practical, scalable, and cost-effective—helping
            you streamline operations, enhance productivity, embrace digital
            transformation, and scale with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}