import dbConnect from "@/lib/dbConnect";
import AboutContent from "@/models/AboutContent";
import Hero from "@/components/about/Hero";
import Story from "@/components/about/Story";
import Mission from "@/components/about/Mission";
import Value from "@/components/about/Value";
import Vision from "@/components/about/Vision";
import FAQ from "@/components/about/FAQ";
import { getSeoSettings } from "@/lib/getSeoSettings";
import {
  buildPageMetadata,
  STATIC_PAGE_SEO,
} from "@/lib/pageMetadata";

export async function generateMetadata() {
  const seo = await getSeoSettings();
  return buildPageMetadata(seo, STATIC_PAGE_SEO.about);
}

export default async function AboutPage() {
  await dbConnect();
  const aboutContent = JSON.parse(
    JSON.stringify(await AboutContent.findOne({}).lean())
  );
  return (
    <main>
      <Hero content={aboutContent}/>
      <Story content={aboutContent}/>
      <Mission content={aboutContent}/>
      <Value content={aboutContent}/>
      <Vision content={aboutContent}/>
      <FAQ content={aboutContent}/>
    </main>
  );
}