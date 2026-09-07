import Image from "next/image";
import Link from "next/link";

export function ServiceContent({ title, description, slug }) {
  return (
    <div className="pt-3 sm:pt-4 md:pt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-brand-dark md:text-3xl">
        {title}
      </h2>
      <div className="mt-2 sm:mt-3 h-px w-full bg-brand-dark" aria-hidden="true" />
      <p className="mt-4 sm:mt-5 max-w-xl text-sm leading-relaxed text-brand-dark/80 md:text-base md:leading-7">
        {description}
      </p>
      <Link
        href={`/services/${slug}`}
        className="mt-5 inline-flex items-center justify-center rounded-full border border-brand-dark px-6 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
      >
        View More
      </Link>
    </div>
  );
}

export function ServiceImage({ src, alt }) {
  return (
    <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}

export default function ServiceSplit({
  title,
  description,
  imageSrc,
  imageAlt,
  slug,
  reverse = false,
}) {
  return (
    <div
      className={`flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-12 lg:gap-16 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2">
        <ServiceContent title={title} description={description} slug={slug} />
      </div>
      <div className="md:w-1/2">
        <ServiceImage src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}