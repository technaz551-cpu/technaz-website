import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white pt-6 md:pt-10 pb-0 overflow-hidden mb-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Text content */}
        <div className="pt-9 md:pt-10">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Our Services
          </h1>
          <p className="mt-4 text-sm md:text-base text-brand-gray leading-relaxed max-w-md">
            From product strategy to engineering and long-term optimization,
            TECHNAZ provides the technology capabilities businesses need to
            build and scale.
          </p>
        </div>

        {/* Right: Just the image */}
        <div className="relative h-[320px] md:h-[400px] -mb-px">
          <Image
            src="/images/services/hero-woman.png"
            alt="Technaz services"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}