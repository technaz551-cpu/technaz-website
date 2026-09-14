import Image from "next/image";

export default function Hero({ content }) {
  const hero = content?.hero;
  const title = hero?.title || "About Technaz";
  const description =
    hero?.description ||
    "We're an Australian technology partner empowering businesses to operate securely, scale with confidence, and maximize the value of their IT investments through reliable, innovative, and future-ready technology solutions.";
  const image = hero?.image?.url || "/images/about/hero-vr.png";
  const imageAlt = hero?.image?.alt || "Technaz — future-ready technology";

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 h-full pointer-events-none bg-grid-light" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="py-12 md:py-20 -mt-[5px]">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark">
            {title}
          </h1>
          <p className="mt-4 text-sm md:text-base text-brand-gray leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        <div className="relative h-[280px] sm:h-[350px] md:h-[420px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}