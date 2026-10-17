"use client";

import Image from "next/image";
import Link from "next/link";
import { casinoBySlug } from "@/data/casinos";
import { MAX_COMPARE, useCompare } from "@/lib/store";

export function CompareCard() {
  const compare = useCompare();
  const started = compare.length > 0;
  const slots = Array.from({ length: MAX_COMPARE }, (_, i) => compare[i]);

  return (
    <aside
      aria-labelledby="compare-heading"
      className="w-full rounded-[18px] bg-[#f3f5fc] px-5 pt-4 pb-4 text-ink shadow-card md:w-[366px]"
    >
      <div className="flex items-center gap-2.5 py-2.5">
        <span className="grid size-[31px] shrink-0 place-items-center rounded-lg bg-[#1818dd] shadow-[0_4px_4px_0_rgb(0_0_0/0.25)]">
          <Image src="/compare/compare-icon.svg" alt="" width={24} height={24} className="-rotate-90" />
        </span>
        <h2 id="compare-heading" className="font-semibold text-brand">
          {started ? "Continue comparing Casinos" : "Compare Casinos side by side"}
        </h2>
      </div>
      <p className="pl-[41px] text-sm text-muted">
        {started
          ? "Pick up where you left of and compare your selected casinos"
          : "See the difference in one place"}
      </p>

      <div className="mt-3 rounded-lg bg-white px-3.5 pt-4 pb-5">
        <p className="text-xs text-muted">
          {started ? `You selected (${compare.length})` : `Select up to ${MAX_COMPARE} casinos to compare`}
        </p>
        <ul className="mt-4 grid grid-cols-3 gap-[5px]">
          {slots.map((slug, i) => {
            const casino = slug ? casinoBySlug(slug) : undefined;
            return (
              <li key={slug ?? `empty-${i}`}>
                {casino ? (
                  <div
                    className="relative h-[59px] overflow-hidden rounded-lg"
                    style={{ backgroundColor: casino.logoBg }}
                  >
                    <Image src={casino.logo} alt={casino.name} fill sizes="96px" className="scale-125 object-cover" />
                  </div>
                ) : (
                  <a
                    href="#top-casinos"
                    className="flex h-[59px] flex-col items-center justify-center gap-1 rounded-lg bg-[#f5f7ff] text-xs transition-colors hover:bg-surface-alt"
                  >
                    <Image src="/compare/add-slot.svg" alt="" width={16} height={16} />
                    Casino {i + 1}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5 flex flex-col items-center gap-1.5">
        <Link
          href={compare.length >= 2 ? "/compare" : "#top-casinos"}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand-navy"
        >
          Start comparing
          <span aria-hidden className="icon-[akar-icons--arrow-right] size-5" />
        </Link>
        {started ? (
          <a href="#top-casinos" className="py-0.5 font-semibold text-brand">
            Change selection
          </a>
        ) : (
          <p className="text-xs text-muted">No account required</p>
        )}
      </div>
    </aside>
  );
}
