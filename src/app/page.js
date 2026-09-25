import Hero from "@/components/Hero";
import Specialty from "@/components/Specialty";
import FounderTeaser from "@/components/FounderTeaser";
import PracticeAreas from "@/components/PracticeAreas";
import Process from "@/components/Process";
import QuoteStrip from "@/components/QuoteStrip";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Specialty />
      <FounderTeaser />
      <PracticeAreas />
      <Process />
      <QuoteStrip />
      <Contact />
    </main>
  );
}
