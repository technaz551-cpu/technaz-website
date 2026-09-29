import dbConnect from "@/lib/dbConnect";
import HomeContent from "@/models/HomeContent";
import Hero from "@/components/home/Hero";
import ServicesBar from "@/components/home/ServicesBar";
import Services from "@/components/home/Services";
import Expertise from "@/components/home/Expertise";
import Partnerships from "@/components/home/Partnerships";
import Process from "@/components/home/Process";
import FAQ from "@/components/home/FAQ";
import { SITE, organizationJsonLd } from "@/lib/site";
import { cmsDynamic } from "@/lib/cmsDynamic";

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

export default async function Home() {
  cmsDynamic();
  await dbConnect();
  const homeContent = JSON.parse(
    JSON.stringify(await HomeContent.findOne({}).lean())
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        <Hero content={homeContent} />
        <ServicesBar content={homeContent}/>
        <Services content={homeContent} />
        <Expertise content={homeContent}/>
        <div className="partners-screen">
          <Partnerships content={homeContent}/>
        </div>
        <Process content={homeContent}/>
        <FAQ content={homeContent}/>
      </main>
    </>
  );
}