import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import {
  AboutSection,
  ExpertsSection,
  FaqSection,
  GuidesSection,
  NewsSection,
  RatingSection,
  ResponsibleGambling,
  SlotsSection,
  StreamersSection,
} from "@/components/sections";
import { SelectionBar } from "@/components/SelectionBar";
import { TopCasinos } from "@/components/TopCasinos";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TopCasinos />
        <RatingSection />
        <ResponsibleGambling />
        <SlotsSection />
        <NewsSection />
        <AboutSection />
        <ExpertsSection />
        <GuidesSection />
        <StreamersSection />
        <FaqSection />
        <Newsletter />
      </main>
      <SelectionBar />
    </>
  );
}
