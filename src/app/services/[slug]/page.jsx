import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dbConnect from "@/lib/dbConnect";
import ServicesContent from "@/models/ServicesContent";

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;

  await dbConnect();
  const content = JSON.parse(
    JSON.stringify(await ServicesContent.findOne({}).lean())
  );

  const features = content?.features || [];
  const service = features.find((f) => f.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = features.filter((f) => f.slug !== slug);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 h-full pointer-events-none bg-grid-light" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray hover:text-brand-green transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Services
            </Link>

            <h1 className="mt-5 text-3xl md:text-4xl font-bold text-brand-dark">
              {service.title}
            </h1>

            <div className="mt-4 flex items-center max-w-md">
              <span className="text-brand-green text-base leading-none">◆</span>
              <span className="flex-1 h-[1.5px] bg-brand-green mx-1"></span>
              <span className="text-brand-green text-base leading-none">➤</span>
            </div>

            <p className="mt-5 text-sm md:text-base text-brand-gray leading-relaxed max-w-md">
              {service.description}
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-lg border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] rounded-2xl overflow-hidden p-1">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={service.image?.url}
                alt={service.image?.alt || service.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-green-light py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
            Ready to discuss your {service.title.toLowerCase()} project?
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">
            Tell us what you&apos;re working on and we&apos;ll get back to you
            with next steps.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-xl md:text-2xl font-bold text-brand-dark text-center">
            Explore Other Services
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-brand-border px-5 py-4 hover:border-brand-green hover:bg-brand-green-light transition-colors"
              >
                <span className="text-sm font-semibold text-brand-dark">
                  {item.title}
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-brand-gray group-hover:text-brand-green group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}