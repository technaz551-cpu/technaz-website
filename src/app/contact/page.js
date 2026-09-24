import ContactForm from "@/components/contact/ContactForm";
import ContactMapSection from "@/components/contact/ContactMapSection";
import { getContactContent } from "@/lib/getContactContent";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Technaz for managed IT, cloud solutions, custom software and technology support across Australia.",
  alternates: {
    canonical: `${SITE.url}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${SITE.name}`,
    description:
      "Speak with Technaz about managed IT, cloud migration, cyber security and custom software for your business.",
    url: `${SITE.url}/contact`,
  },
};

export default async function ContactPage() {
  const contactContent = await getContactContent();
  const hero = contactContent?.hero || {};

  return (
    <main>
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {hero.titleLine1 || "Ready to Discuss How We Can"}
            </h1>
            <p className="text-2xl font-bold text-brand-gray md:text-3xl">
              {hero.titleLine2 || "Help Your Business Grow?"}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <ContactMapSection content={contactContent} />
            <ContactForm emails={contactContent?.emails} />
          </div>
        </div>
      </section>
    </main>
  );
}
