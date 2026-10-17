import type { Metadata } from "next";
import { SelectionBar } from "@/components/SelectionBar";
import { WatchlistView } from "@/components/WatchlistView";

export const metadata: Metadata = {
  title: "My Watchlist | SveaCasino",
  description: "Keep track of the casinos you are interested in.",
};

export default function WatchlistPage() {
  return (
    <>
      <main className="bg-surface pt-8 pb-40 md:pt-12">
        <WatchlistView />
      </main>
      <SelectionBar />
    </>
  );
}
