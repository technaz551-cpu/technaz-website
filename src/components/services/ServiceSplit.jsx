import Image from "next/image";

export function ServiceContent({ title, description }) {
  return (
    <div className="pt-3 sm:pt-4 md:pt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-brand-dark md:text-3xl">
        {title}
      </h2>
      <div className="mt-2 sm:mt-3 h-px w-full bg-brand-dark" aria-hidden="true" />
      <p className="mt-4 sm:mt-5 max-w-xl text-sm leading-relaxed text-brand-dark/80 md:text-base md:leading-7">
        {description}
      </p>
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
  reverse = false,
}) {
  return (
    <div
      className={`flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-12 lg:gap-16 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2">
        <ServiceContent title={title} description={description} />
      </div>
      <div className="md:w-1/2">
        <ServiceImage src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}