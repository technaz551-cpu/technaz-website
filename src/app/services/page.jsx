import dbConnect from "@/lib/dbConnect";
import ServicesContent from "@/models/ServicesContent";
import Hero from "@/components/services/Hero";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import { getSeoSettings } from "@/lib/getSeoSettings";
import {
  buildPageMetadata,
  STATIC_PAGE_SEO,
} from "@/lib/pageMetadata";

export async function generateMetadata() {
  const seo = await getSeoSettings();
  return buildPageMetadata(seo, STATIC_PAGE_SEO.services);
}

export default async function ServicesPage() {
  await dbConnect();
  const servicesContent = JSON.parse(
    JSON.stringify(await ServicesContent.findOne({}).lean())
  );

  return (
    <main>
      <Hero content={servicesContent} />
      <ServiceFeatures content={servicesContent} />
    </main>
  );
}