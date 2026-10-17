import type { Metadata } from "next";
import { CompareView } from "@/components/CompareView";

export const metadata: Metadata = {
  title: "Compare casinos side by side | SveaCasino",
  description: "Compare bonuses, wagering, payment methods and features of Swedish licensed casinos.",
};

export default function ComparePage() {
  return (
    <main className="bg-surface pt-8 pb-16 md:pt-12 md:pb-24">
      <CompareView />
    </main>
  );
}
