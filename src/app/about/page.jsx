import dbConnect from "@/lib/dbConnect";
import AboutContent from "@/models/AboutContent";
import Hero from "@/components/about/Hero";
import Story from "@/components/about/Story";
import Mission from "@/components/about/Mission";
import Value from "@/components/about/Value";
import Vision from "@/components/about/Vision";
import FAQ from "@/components/about/FAQ";

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
      <Vision />
      <FAQ />
    </main>
  );
}