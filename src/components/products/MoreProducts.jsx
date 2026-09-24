import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { stripHtml } from "@/lib/stripHtml";

export default function MoreProducts({ products, currentSlug }) {
  const others = products.filter((p) => p.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="border-t border-brand-border/60 bg-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-brand-dark sm:text-2xl md:text-3xl">
            More products
          </h2>
          <div
            className="mt-3 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-base leading-none text-brand-green">◆</span>
            <span className="mx-2 h-[1.5px] w-16 bg-brand-green sm:w-24" />
            <span className="text-base leading-none text-brand-green">➤</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {others.map((item) => {
            const logo =
              item.logo?.url ||
              item.image?.url ||
              "/images/partnerships/partner-1.png";

            return (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-28 items-center justify-center border-b border-brand-border/80 bg-brand-green-light/40 px-6 py-4">
                  <div className="relative h-14 w-full max-w-[180px]">
                    <Image
                      src={logo}
                      alt={item.logo?.alt || item.title}
                      fill
                      sizes="180px"
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-brand-dark transition-colors group-hover:text-brand-green sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-brand-gray">
                    {item.excerpt || stripHtml(item.description)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                    View product
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-brand-dark px-8 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
