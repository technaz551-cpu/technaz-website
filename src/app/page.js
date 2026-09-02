import Hero from "@/components/home/Hero";
import ServicesBar from "@/components/home/ServicesBar";
import Services from "@/components/home/Services";
import Expertise from "@/components/home/Expertise";
import Partnerships from "@/components/home/Partnerships";
import Team from "@/components/home/Team";
import Process from "@/components/home/Process";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesBar />
      <Services />
      <Expertise />
      <Partnerships />
      <Team />
      <Process />
      <FAQ />
    </main>
  );
}