import Image from "next/image";

const PARTNERS = [
  { src: "/images/partnerships/partner-1.png", alt: "Partner 1" },
  { src: "/images/partnerships/partner-2.png", alt: "Partner 2" },
  { src: "/images/partnerships/partner-3.png", alt: "Partner 3" },
  { src: "/images/partnerships/partner-4.png", alt: "Partner 4" },
];

export default function Partnerships() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-24 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark text-center px-4">
        Our Partnerships
      </h2>

      <div className="mt-6 md:mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-14 h-24 sm:h-28 md:h-32"
            >
              <div className="relative w-36 h-14 sm:w-40 sm:h-16 md:w-48 md:h-20">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}