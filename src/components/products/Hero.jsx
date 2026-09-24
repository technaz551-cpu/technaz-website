import Image from "next/image";

export default function ProductsHero({ content }) {
  const hero = content?.hero;
  const title = hero?.title || "Our Products";
  const description =
    hero?.description ||
    "Software platforms and digital products engineered by Technaz—built to launch, scale, and support real-world communities and businesses.";
  const image = hero?.image?.url || "/images/services/expertise-4.jpg";
  const imageAlt = hero?.image?.alt || "Technaz digital products";

  return (
    <section className="bg-white pb-0 pt-6 md:pt-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-5 md:grid-cols-2 md:gap-10 lg:px-6">
        <div className="pt-6 md:pt-10">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-gray md:text-base">
            {description}
          </p>
        </div>

        <div className="relative h-[280px] sm:h-[320px] md:h-[400px] md:min-w-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="object-contain object-center md:object-right"
            priority
          />
        </div>
      </div>
    </section>
  );
}
