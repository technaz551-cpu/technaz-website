import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProductGrid({ content }) {
  const products = content?.products?.length ? content.products : [];

  return (
    <section className="-mt-2 bg-brand-green-light pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-brand-dark sm:text-2xl md:text-3xl">
            Platforms we build &amp; support
          </h2>
          <div
            className="mt-3 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-base leading-none text-brand-green">◆</span>
            <span className="mx-2 h-[1.5px] w-16 bg-brand-green sm:w-24" />
            <span className="text-base leading-none text-brand-green">➤</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-gray md:text-base">
            Explore the software products Technaz delivers for membership
            communities, operations teams, and growing businesses.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
          {products.map((product) => {
            const logo =
              product.logo?.url ||
              product.image?.url ||
              "/images/partnerships/partner-1.png";
            const coverIsLogo =
              !product.image?.url ||
              product.image?.url === product.logo?.url;

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="relative flex h-44 items-center justify-center border-b border-brand-border/80 bg-white px-8 py-6 sm:h-48">
                  {coverIsLogo ? (
                    <div className="relative h-24 w-full max-w-[280px] sm:h-28">
                      <Image
                        src={logo}
                        alt={product.logo?.alt || product.title}
                        fill
                        sizes="(max-width: 768px) 80vw, 320px"
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={product.image.url}
                        alt={product.image?.alt || product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-lg font-bold text-brand-dark transition-colors group-hover:text-brand-green sm:text-xl">
                    {product.title}
                  </h3>
                  <span
                    className="mt-3 block h-px w-full bg-brand-dark/15"
                    aria-hidden="true"
                  />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-dark/80 md:text-[15px] md:leading-7">
                    {product.excerpt || product.description}
                  </p>

                  <span className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-brand-dark px-5 py-2.5 text-sm font-semibold text-brand-dark transition-colors group-hover:bg-brand-dark group-hover:text-white">
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

        {products.length === 0 && (
          <p className="mt-10 rounded-xl border border-dashed border-brand-border bg-white p-10 text-center text-sm text-brand-gray">
            Products will appear here once they are published from the admin
            dashboard.
          </p>
        )}
      </div>
    </section>
  );
}
