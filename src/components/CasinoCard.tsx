"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import type { Casino } from "@/data/casinos";
import { MAX_COMPARE, markViewed, toggleCompare, useCompare } from "@/lib/store";
import { ResponsibleLine } from "./ui";

export function CasinoCard({ casino }: { casino: Casino }) {
  const compare = useCompare();
  const selected = compare.includes(casino.slug);
  const full = !selected && compare.length >= MAX_COMPARE;
  const [bonusMult, ...bonusRest] = casino.bonusTurnover.split(" ");
  const [spinsMult, ...spinsRest] = casino.freeSpinsTurnover.split(" ");

  // Clicking anywhere on the card selects it; its own links and buttons keep their normal behaviour.
  const onCardClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (!full) toggleCompare(casino.slug);
  };

  return (
    <article
      onClick={onCardClick}
      className={`group flex flex-col overflow-hidden rounded-[14px] bg-card shadow-[0_4px_4px_0_rgb(104_104_104/0.1)] cursor-pointer ${
        selected ? "pointer-coarse:ring-2 pointer-coarse:ring-brand" : ""
      }`}
    >
      <div className="relative aspect-[291/190]" style={{ backgroundColor: casino.logoBg }}>
        <Image
          src={casino.logo}
          alt={`${casino.name} logo`}
          fill
          sizes="(min-width: 1024px) 291px, 50vw"
          className="object-cover"
        />
        {!full && (
          <button
            type="button"
            onClick={() => toggleCompare(casino.slug)}
            aria-pressed={selected}
            aria-label={
              selected ? `Remove ${casino.name} from comparison` : `Select ${casino.name} to compare`
            }
            className={`absolute top-2.5 left-2.5 grid size-6 place-items-center rounded-full transition md:top-5 md:left-5 md:size-8 ${
              selected
                ? "bg-brand"
                : // Hidden until the card is hovered or the circle is focused.
                  "border-2 border-white/40 opacity-0 group-hover:opacity-100 hover:border-white focus-visible:opacity-100"
            }`}
          >
            {selected && (
              <span aria-hidden className="icon-[akar-icons--check] size-3.5 text-white md:size-4" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2.5 pt-2 pb-4 md:px-4 md:pt-3 md:pb-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xs font-bold tracking-[-0.03em] md:text-base">{casino.name}</h3>
            <p className="text-[8px] text-subtle md:mt-1 md:text-xs">{casino.tagline}</p>
          </div>
          <p className="flex shrink-0 items-center gap-0.5 text-[8px] text-subtle md:text-xs">
            <span aria-hidden className="icon-[mdi--star] size-2.5 text-yellow" />
            {casino.rating}/5
          </p>
        </div>

        <dl className="mt-2 grid grid-cols-2 gap-1.5 md:mt-5 md:gap-2">
          <Stat label="Bonus" value={casino.bonus} mult={bonusMult} rest={bonusRest.join(" ")} />
          <Stat label="Free spins" value={casino.freeSpins} mult={spinsMult} rest={spinsRest.join(" ")} />
        </dl>

        <div className="mt-3 flex flex-col items-center gap-1.5 md:mt-5">
          <a
            href="#"
            rel="sponsored nofollow"
            onClick={() => markViewed(casino.slug)}
            className="inline-flex h-7 w-full items-center justify-center gap-1.5 rounded-full bg-brand text-xs font-semibold text-white transition-colors hover:bg-brand-navy md:h-10 md:gap-2 md:text-base"
          >
            Visit Casino
            <span aria-hidden className="icon-[akar-icons--arrow-up-right] size-3 md:size-5" />
          </a>
          <a
            href="#"
            onClick={() => markViewed(casino.slug)}
            className="py-1 text-[11px] font-semibold text-brand underline md:py-1.5 md:text-sm"
          >
            Read Review
          </a>
        </div>

        <ResponsibleLine className="mt-auto pt-3 text-subtle md:pt-8" />
      </div>
    </article>
  );
}

function Stat({ label, value, mult, rest }: { label: string; value: string; mult: string; rest: string }) {
  return (
    <div className="rounded-md bg-chip px-1.5 py-1.5 md:rounded-lg md:px-2.5 md:py-3">
      <dt className="text-[6px] font-semibold text-subtle uppercase md:text-[10px]">{label}</dt>
      <dd>
        <span className="block text-[10px] font-bold md:mt-1 md:text-[17px]">{value}</span>
        <span className="block text-[6px] text-subtle md:mt-0.5 md:text-xs">
          <span className="font-semibold">{mult}</span> {rest}
        </span>
      </dd>
    </div>
  );
}
