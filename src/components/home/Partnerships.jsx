import Image from "next/image";

const PARTNERS = [
  { src: "/images/partnerships/partner-1.png", alt: "1st Choice Rideshare Club partner" },
  { src: "/images/partnerships/partner-2.png", alt: "Prestige Rideshare Club partner" },
  { src: "/images/partnerships/partner-3.png", alt: "PTRS Club Platinum Taxi Ride Share partner" },
  { src: "/images/partnerships/partner-4.png", alt: "Brisbane Rideshare Club partner" },
];

export default function Partnerships() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="overflow-hidden bg-white px-6 py-8 lg:px-10 lg:py-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2
            id="partners-heading"
            className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl md:text-3xl"
          >
            Our Partners
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-brand-gray md:text-base">
            Trusted by growing businesses across Australia
          </p>
        </div>

        <div className="relative mt-6 overflow-hidden md:mt-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-marquee items-center">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-center px-8 sm:h-20 sm:px-10 md:px-12"
              >
                <div className="relative h-10 w-32 opacity-80 transition-opacity hover:opacity-100 sm:h-12 sm:w-36 md:h-14 md:w-40">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    fill
                    sizes="160px"
                    className="object-contain grayscale-[20%] transition-[filter,opacity] hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
