import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
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

export default function ContactPage() {
  return (
    <main>
      <ContactForm />

      {/* <section
        aria-hidden="true"
        className="relative h-[167px] w-full overflow-hidden bg-white"
      >
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative flex h-full w-full items-center justify-center">
          <Image
            src="/images/footer/technaz-large-logo.png"
            alt=""
            width={1200}
            height={150}
            className="h-auto w-[1200px] max-w-none object-contain"
          />
        </div>
      </section> */}
    </main>
  );
}
