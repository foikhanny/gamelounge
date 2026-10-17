"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { casinoBySlug } from "@/data/casinos";
import { addToWatchlist, useCompare } from "@/lib/store";
import { WatchlistDialogs } from "./WatchlistDialogs";

// Floats at the bottom of the screen while casinos are selected; `inline` renders the compact
// action card that sits under the comparison table.
export function SelectionBar({ inline = false }: { inline?: boolean }) {
  const compare = useCompare();
  const [saved, setSaved] = useState(false);

  if (compare.length === 0 && !saved) return null;

  const save = () => {
    addToWatchlist(compare);
    setSaved(true);
  };

  return (
    <>
      {compare.length > 0 && (
        <div className={inline ? "mt-6 flex justify-end" : "fixed inset-x-0 bottom-3 z-30 px-3 md:bottom-6"}>
          <div
            role="region"
            aria-label="Selected casinos"
            className={
              inline
                ? "flex w-full justify-center rounded-lg bg-white px-2 py-4 md:w-[512px] md:p-4 md:py-7"
                : "mx-auto flex max-w-[1079px] flex-col gap-3 rounded-lg bg-white px-4 py-3 shadow-[0_4px_16px_0_rgb(0_0_0/0.15)] md:flex-row md:items-center md:justify-between md:px-[84px] md:py-7"
            }
          >
            {!inline && (
              <div className="flex items-center gap-1.5">
                <span className="grid size-6 place-items-center rounded-full bg-brand">
                  <span aria-hidden className="icon-[akar-icons--check] size-3.5 text-white" />
                </span>
                <p className="ml-0.5 text-muted">{compare.length} selected</p>
                <ul className="ml-1 flex gap-0.5">
                  {compare.map((slug) => {
                    const casino = casinoBySlug(slug);
                    if (!casino) return null;
                    return (
                      <li
                        key={slug}
                        className="relative h-10 w-11 overflow-hidden rounded-sm"
                        style={{ backgroundColor: casino.logoBg }}
                      >
                        <Image src={casino.logo} alt={casino.name} fill sizes="44px" className="object-cover" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="flex w-full gap-2 md:w-auto">
              <Link
                href="/compare"
                className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-2 text-[13px] whitespace-nowrap text-white transition-colors hover:bg-brand-navy md:w-64 md:flex-none md:gap-2.5 md:px-4 md:text-base"
              >
                {/* Full label doesn't fit half a phone screen. */}
                <span className="md:hidden">Compare ({compare.length})</span>
                <span className="hidden md:inline">Compare selected ({compare.length})</span>
                <span aria-hidden className="icon-[akar-icons--arrow-right] size-4 shrink-0 md:size-5" />
              </Link>
              <button
                type="button"
                onClick={save}
                className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-subtle px-2 text-[13px] whitespace-nowrap text-brand transition-colors hover:border-brand md:w-[185px] md:flex-none md:gap-2.5 md:text-base"
              >
                <Image src="/icons/bookmark.svg" alt="" width={24} height={24} className="size-5 shrink-0 md:size-6" />
                Save to watchlist
              </button>
            </div>
          </div>
        </div>
      )}
      {saved && <WatchlistDialogs onDone={() => setSaved(false)} />}
    </>
  );
}
