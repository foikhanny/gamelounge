"use client";

import { useMemo, useState } from "react";
import {
  casinoTabs,
  casinos,
  countActiveFilters,
  emptyFilters,
  matchesFilters,
  sortCasinos,
  sortOptions,
  type Casino,
  type CasinoTab,
  type FilterDraft,
  type SortOption,
} from "@/data/casinos";
import { CasinoCard } from "./CasinoCard";
import { FilterModal } from "./FilterModal";
import { OutlineButton, SectionTitle } from "./ui";

const INITIAL_VISIBLE = 4;

const matches = (casino: Casino, tab: CasinoTab, filters: FilterDraft) =>
  (tab === "all" || casino.tabs.includes(tab)) && matchesFilters(casino, filters);

export function TopCasinos() {
  const [tab, setTab] = useState<CasinoTab>("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const results = useMemo(
    () => sortCasinos(casinos.filter((c) => matches(c, tab, filters)), sort),
    [tab, filters, sort],
  );
  const visible = expanded ? results : results.slice(0, INITIAL_VISIBLE);
  const activeFilterCount = countActiveFilters(filters);

  return (
    <section id="top-casinos" className="scroll-mt-24 bg-surface py-10 md:py-14">
      <div className="container-page">
        <SectionTitle className="text-center md:text-left md:text-[44px]">
          Top rated casinos October 2026
        </SectionTitle>
        <p className="mt-3 text-center text-muted md:mt-6 md:text-left md:text-xl">
          Compare the best casino online in sweden. Our experts review games, withdrawal and more.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 rounded-xl bg-white px-2 py-3 md:flex-row md:items-center md:justify-between md:px-9 md:py-4">
          <p aria-live="polite" className="text-muted md:text-[22px]">
            <span className="text-xl font-semibold text-ink md:text-[32px]">{results.length}</span>{" "}
            casinos found
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <label htmlFor="sort" className="text-sm md:text-base">
              Sort by
            </label>
            <div className="grid grid-cols-2 gap-3 md:flex md:gap-4">
              <div className="relative">
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="h-10 w-full appearance-none rounded-md border border-[#c8c8c8] bg-white px-4 text-sm md:h-10 md:w-[200px] md:px-5 md:text-base md:text-muted"
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
                className="inline-flex h-10 items-center justify-center gap-3 rounded-md border border-[#c8c8c8] px-7 text-lg md:text-xl"
              >
                <span aria-hidden className="icon-[mdi--tune-variant] size-6 text-muted" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-brand px-2 text-sm text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div role="tablist" aria-label="Casino categories" className="mt-4 flex flex-wrap gap-2 md:gap-4">
          {casinoTabs.map((t) => {
            const count = casinos.filter((c) => matches(c, t.id, filters)).length;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setTab(t.id);
                  setExpanded(false);
                }}
                className={`inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs transition-colors md:h-10 md:px-3 md:text-[15px] ${
                  active ? "bg-brand text-white" : "bg-white hover:bg-surface-alt"
                }`}
              >
                {t.label}
                <span
                  className={`rounded-full px-1.5 text-[8px] md:text-[11px] ${
                    active ? "bg-white/20" : "bg-chip text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {visible.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-2.5 md:mt-8 md:gap-6 lg:grid-cols-4">
            {visible.map((casino) => (
              <CasinoCard key={casino.slug} casino={casino} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl bg-white p-10 text-center">
            <p className="text-lg font-semibold">No casinos match these filters</p>
            <button
              type="button"
              onClick={() => {
                setFilters(emptyFilters);
                setTab("all");
              }}
              className="mt-3 text-brand underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {results.length > INITIAL_VISIBLE && (
          <div className="mt-6 flex justify-center md:mt-16">
            <OutlineButton onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Show less" : "Show more"}
            </OutlineButton>
          </div>
        )}
      </div>

      {filterOpen && (
        <FilterModal
          initial={filters}
          countFor={(draft) => casinos.filter((c) => matches(c, tab, draft)).length}
          onApply={(draft) => {
            setFilters(draft);
            setExpanded(false);
            setFilterOpen(false);
          }}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </section>
  );
}
