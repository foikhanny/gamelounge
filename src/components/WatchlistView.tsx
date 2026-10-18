"use client";

import Link from "next/link";
import { useState } from "react";
import {
  casinoBySlug,
  countActiveFilters,
  emptyFilters,
  matchesFilters,
  sortCasinos,
  sortOptions,
  type Casino,
  type FilterDraft,
  type SortOption,
} from "@/data/casinos";
import { useRecent, useWatchlist } from "@/lib/store";
import { CasinoCard } from "./CasinoCard";
import { FilterModal } from "./FilterModal";

type Tab = "saved" | "recent";

const toCasinos = (slugs: string[]) =>
  slugs.map(casinoBySlug).filter((c): c is Casino => Boolean(c));

export function WatchlistView() {
  const saved = toCasinos(useWatchlist());
  const recent = toCasinos(useRecent());
  const [tab, setTab] = useState<Tab>("saved");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);

  const source = tab === "saved" ? saved : recent;
  const results = sortCasinos(source.filter((c) => matchesFilters(c, filters)), sort);
  const activeFilterCount = countActiveFilters(filters);

  return (
    <div className="container-page">
      <h1 className="font-display text-[28px] md:text-[40px]">My Watchlist</h1>
      <p className="mt-4 max-w-[561px] text-subtle md:text-lg">
        Keep track of the casinos you’re interested in and see what’s since your last visit
      </p>

      <div className="mt-8 flex flex-col gap-4 md:mt-7 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Watchlist" className="flex gap-2">
          {(
            [
              ["saved", `Saved casinos (${saved.length})`],
              ["recent", "Recently viewed"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`border-b-3 p-1 font-semibold md:text-lg ${
                tab === id ? "border-brand text-brand" : "border-transparent text-subtle"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 items-center gap-3 rounded-xl bg-white px-3 py-4 shadow-[0_0_2px_0_rgb(104_104_104/0.15)] md:flex md:gap-4 md:px-5">
          <label htmlFor="watchlist-sort" className="col-span-2 text-sm">
            Sort by
          </label>
          <div className="relative">
            <select
              id="watchlist-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-10 w-full appearance-none rounded-md border border-[#c8c8c8] bg-white px-4 text-sm text-muted md:w-[200px] md:px-5 md:text-base"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="icon-[akar-icons--chevron-down] pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2"
            />
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-3 rounded-md border border-[#c8c8c8] px-4 text-lg md:px-6"
          >
            <span aria-hidden className="icon-[mdi--tune-variant] size-6 text-muted" />
            Filter
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-brand px-2 text-sm text-white">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-2.5 md:mt-4 md:gap-6 lg:grid-cols-4">
          {results.map((casino) => (
            <CasinoCard key={casino.slug} casino={casino} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-white p-10 text-center">
          <p className="text-lg font-semibold">
            {source.length === 0
              ? tab === "saved"
                ? "You haven’t saved any casinos yet"
                : "No recently viewed casinos"
              : "No casinos match these filters"}
          </p>
          <p className="mt-2 text-muted">
            Select casinos on the toplist and choose “Save to watchlist” to keep track of them here.
          </p>
          <Link
            href="/#top-casinos"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-white"
          >
            Browse casinos
            <span aria-hidden className="icon-[akar-icons--arrow-right] size-5" />
          </Link>
        </div>
      )}

      {filterOpen && (
        <FilterModal
          initial={filters}
          countFor={(draft) => source.filter((c) => matchesFilters(c, draft)).length}
          onApply={(draft) => {
            setFilters(draft);
            setFilterOpen(false);
          }}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
}
