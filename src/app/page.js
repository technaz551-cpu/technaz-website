import dbConnect from "@/lib/dbConnect";
import HomeContent from "@/models/HomeContent";
import Hero from "@/components/home/Hero";
import ServicesBar from "@/components/home/ServicesBar";
import Services from "@/components/home/Services";
import Expertise from "@/components/home/Expertise";
import Partnerships from "@/components/home/Partnerships";
import Process from "@/components/home/Process";
import FAQ from "@/components/home/FAQ";
import { getSeoSettings, buildOrganizationJsonLd } from "@/lib/getSeoSettings";
import { cmsDynamic } from "@/lib/cmsDynamic";
import {
  buildPageMetadata,
  STATIC_PAGE_SEO,
} from "@/lib/pageMetadata";

export async function generateMetadata() {
  const seo = await getSeoSettings();
  const page = STATIC_PAGE_SEO.home;
  return buildPageMetadata(seo, page);
}

export default async function Home() {
  cmsDynamic();
  const [seo] = await Promise.all([getSeoSettings()]);
  await dbConnect();
  const homeContent = JSON.parse(
    JSON.stringify(await HomeContent.findOne({}).lean())
  );
  const organizationJsonLd = buildOrganizationJsonLd(seo);
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