import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ProductRichText from "@/components/products/ProductRichText";

export default function ProductDetailHero({ product }) {
  const logo =
    product.logo?.url ||
    product.image?.url ||
    "/images/partnerships/partner-1.png";
  const coverIsLogo =
    !product.image?.url || product.image?.url === product.logo?.url;

  return (
    <section className="relative bg-white pb-10 pt-6 md:pb-14 md:pt-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-grid-light md:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray transition-colors hover:text-brand-green"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <h1 className="mt-5 text-3xl font-bold text-brand-dark md:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {product.title}
        </h1>

        <div
          className="mt-4 flex max-w-xl items-center"
          aria-hidden="true"
        >
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-2 h-[1.5px] flex-1 max-w-xs bg-brand-green" />
          <span className="text-base leading-none text-brand-green">➤</span>
        </div>

        {product.excerpt ? (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-gray md:text-base">
            {product.excerpt}
          </p>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="order-2 min-w-0 lg:order-1 lg:col-span-8">
            <ProductRichText html={product.description} />
          </article>

          <aside className="order-1 lg:order-2 lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
                <div className="flex h-44 items-center justify-center border-b border-brand-border/80 bg-white px-6 py-5 sm:h-52">
                  {coverIsLogo ? (
                    <div className="relative h-28 w-full max-w-[240px]">
                      <Image
                        src={logo}
                        alt={product.logo?.alt || product.title}
                        fill
                        sizes="240px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={product.image.url}
                        alt={product.image?.alt || product.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 320px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  {product.externalUrl ? (
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-dark px-5 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
                    >
                      Visit website
                      <ExternalLink size={16} />
                    </a>
                  ) : null}
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
