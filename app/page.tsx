import { HeroSection } from "@/components/sections/home/HeroSection";
import { MarqueeTicker } from "@/components/sections/home/MarqueeTicker";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import {
  ExpertiseSection,
  ProcessSection,
} from "@/components/sections/home/SplitSection";
import { PartnershipsSection } from "@/components/sections/home/PartnershipsSection";
import { TeamSection } from "@/components/sections/home/TeamSection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { ContactSection } from "@/components/sections/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <ServicesSection />
      <ExpertiseSection />
      <PartnershipsSection />
      <TeamSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
