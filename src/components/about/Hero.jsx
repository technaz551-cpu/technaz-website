import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Grid background - left side on desktop, full width on mobile */}
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 h-full pointer-events-none bg-grid-light" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="py-12 md:py-20 -mt-[5px]">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark">
            About Technaz
          </h1>
          <p className="mt-4 text-sm md:text-base text-brand-gray leading-relaxed max-w-md">
            We&apos;re an Australian technology partner empowering businesses
            to operate securely, scale with confidence, and maximize the
            value of their IT investments through reliable, innovative, and
            future-ready technology solutions.
          </p>
        </div>

        <div className="relative h-[280px] sm:h-[350px] md:h-[420px]">
          <Image
            src="/images/about/hero-vr.png"
            alt="Technaz — future-ready technology"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}