import dbConnect from "@/lib/dbConnect";
import ServicesContent from "@/models/ServicesContent";
import Hero from "@/components/services/Hero";
import ServiceFeatures from "@/components/services/ServiceFeatures";

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