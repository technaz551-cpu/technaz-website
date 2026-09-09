import Hero from "@/components/home/Hero";
import ServicesBar from "@/components/home/ServicesBar";
import Services from "@/components/home/Services";
import Expertise from "@/components/home/Expertise";
import Partnerships from "@/components/home/Partnerships";
import Process from "@/components/home/Process";
import FAQ from "@/components/home/FAQ";
import { SITE, organizationJsonLd } from "@/lib/site";

export const metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        <Hero />
        <ServicesBar />
        <Services />
        <Expertise />
        <div className="partners-screen">
          <Partnerships />
        </div>
        <Process />
        <FAQ />
      </main>
    </>
  );
}


// username -> technaz_website_company 
// password -> NBRTa0hv9YGyJgrX
// mongodb+srv://technaz_website_company:NBRTa0hv9YGyJgrX@technaz-website.k9dnn7p.mongodb.net/emailusers
// app email password -> gdas jdxg flpd zkai