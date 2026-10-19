"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { casinoBySlug, paymentLogos, type Casino } from "@/data/casinos";
import { clearCompare, markViewed, setCompare, useCompare } from "@/lib/store";
import { SelectionBar } from "./SelectionBar";

type Row = { label: string; render: (c: Casino, compact?: boolean) => ReactNode; highlight?: boolean };

const Check = () => (
  <span className="block md:p-2.5">
    <span aria-label="Yes" className="icon-[akar-icons--check] block size-5 text-brand-deep md:size-6" />
  </span>
);

const rows: Row[] = [
  { label: "Swedish licence", render: (c) => (c.compare.swedishLicence ? <Check /> : "No") },
  { label: "Welcome bonus", render: (c) => c.compare.welcomeBonus },
  { label: "Wagering requirement", render: (c) => c.compare.wagering },
  {
    label: "Payment method",
    highlight: true,
    render: (c, compact) => (
      <span className={`flex items-center ${compact ? "flex-wrap gap-1.5" : "gap-2.5"}`}>
        {c.compare.payments.map((p) => {
          const logo = paymentLogos[p];
          return (
            <Image
              key={p}
              src={logo.src}
              alt={logo.label}
              width={logo.w}
              height={logo.h}
              className={compact ? "h-6 w-auto" : undefined}
            />
          );
        })}
      </span>
    ),
  },
  { label: "Number of games", render: (c) => c.compare.games },
  { label: "Mobile app", render: (c) => (c.compare.mobileApp ? <Check /> : "No") },
  { label: "Special features", render: (c) => c.compare.specialFeatures },
];

export function CompareView() {
  const slugs = useCompare();
  const [copied, setCopied] = useState(false);
  const selected = slugs.map(casinoBySlug).filter((c): c is Casino => Boolean(c));

  // A shared link (?ids=a,b,c) replaces the visitor's current selection.
  useEffect(() => {
    const ids = new URLSearchParams(window.location.search).get("ids");
    if (ids) setCompare(ids.split(",").filter((id) => casinoBySlug(id)));
  }, []);

  const share = async () => {
    const url = `${window.location.origin}/compare?ids=${slugs.join(",")}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Casino comparison", url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Share sheet dismissed.
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1256px] px-4 md:px-4">
      <div className="flex flex-col gap-6 md:px-2.5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-[28px] md:text-[40px]">
            Compare {selected.length > 1 ? `${selected.length} casinos` : "casinos"}
          </h1>
          <p className="mt-4 max-w-[561px] text-subtle md:text-lg">
            See how these casinos cmpare across the feature that matters to you
          </p>
        </div>
        {selected.length > 0 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={share}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2.5 rounded-lg border border-brand px-3 whitespace-nowrap text-brand md:w-64 md:flex-none"
            >
              <span aria-hidden className="icon-[mdi--share-variant-outline] size-6" />
              {copied ? (
                "Link copied"
              ) : (
                <>
                  <span className="md:hidden">Share</span>
                  <span className="hidden md:inline">Share comparison</span>
                </>
              )}
              <span aria-hidden className="icon-[akar-icons--arrow-right] size-5 opacity-20" />
            </button>
            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex h-10 items-center justify-center gap-2.5 rounded-lg border border-subtle px-4 text-subtle md:w-[140px]"
            >
              <span aria-hidden className="icon-[mdi--trash-can-outline] size-6" />
              Clear all
            </button>
          </div>
        )}
      </div>

      {selected.length < 2 ? (
        <div className="mt-10 rounded-xl bg-white p-10 text-center">
          <p className="text-lg font-semibold">
            {selected.length === 0 ? "No casinos selected yet" : "Add one more casino to compare"}
          </p>
          <p className="mt-2 text-muted">Tick the circle on up to 3 casino cards to compare them side by side.</p>
          <Link
            href="/#top-casinos"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-white"
          >
            Browse casinos
            <span aria-hidden className="icon-[akar-icons--arrow-right] size-5" />
          </Link>
        </div>
      ) : (
        <>
          <MobileComparison casinos={selected} />
          <div className="mt-6 hidden lg:block">
            <table className="w-full table-fixed border-separate border-spacing-0">
              <caption className="sr-only">Casino comparison</caption>
              <thead>
                <tr>
                  <td className="w-1/4" />
                  {selected.map((c) => (
                    <th key={c.slug} scope="col" className="p-0 align-top font-normal">
                      <CasinoHeader casino={c} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className={`h-20 border-t border-l border-t-subtle/10 border-l-[#b3d0ff] bg-white p-2.5 text-left font-semibold ${
                        i === 0 ? "rounded-tl-lg" : ""
                      } ${i === rows.length - 1 ? "h-[133px] rounded-bl-lg align-top pt-6" : ""}`}
                    >
                      {row.label}
                    </th>
                    {selected.map((c) => (
                      <td
                        key={c.slug}
                        className={`h-20 border-t border-l border-t-subtle/10 border-l-subtle/30 p-2.5 font-semibold text-subtle ${
                          row.highlight ? "bg-white" : "bg-[#f5f5f5]/50"
                        } ${i === rows.length - 1 ? "align-top pt-6" : ""}`}
                      >
                        {row.render(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SelectionBar inline />
        </>
      )}
    </div>
  );
}

function CasinoHeader({ casino }: { casino: Casino }) {
  return (
    <div className="overflow-hidden rounded-t-[14px] bg-white pb-10">
      <div className="relative aspect-[306/190]" style={{ backgroundColor: casino.logoBg }}>
        <Image src={casino.logo} alt="" fill sizes="306px" className="object-cover" />
        <span className="absolute inset-0 bg-black/20" />
      </div>
      <div className="px-6 pt-7 text-left">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold tracking-[-0.03em]">{casino.name}</p>
            <p className="mt-1 text-xs text-subtle">{casino.tagline}</p>
          </div>
          <p className="flex items-center gap-0.5 text-xs text-subtle">
            <span aria-hidden className="icon-[mdi--star] size-2.5 text-yellow" />
            {casino.rating}/5
          </p>
        </div>
        <div className="mt-5 flex flex-col items-center gap-1.5">
          <a
            href="#"
            rel="sponsored nofollow"
            onClick={() => markViewed(casino.slug)}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand-navy"
          >
            Visit Casino
            <span aria-hidden className="icon-[akar-icons--arrow-up-right] size-5" />
          </a>
          <a href="#" onClick={() => markViewed(casino.slug)} className="py-1.5 text-sm font-semibold text-brand underline">
            Read Review
          </a>
        </div>
      </div>
    </div>
  );
}

// Phones and tablets: a sticky strip of the selected casinos, then one block per feature with a value per casino.
function MobileComparison({ casinos }: { casinos: Casino[] }) {
  const cols = casinos.length === 2 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className="mt-6 lg:hidden">
      <ul className={`sticky top-[75px] z-10 -mx-4 md:top-[100px] grid ${cols} gap-2 bg-surface px-4 py-2`}>
        {casinos.map((c) => (
          <li key={c.slug} className="overflow-hidden rounded-lg bg-white shadow-soft">
            <div className="relative h-12 md:h-20" style={{ backgroundColor: c.logoBg }}>
              <Image src={c.logo} alt="" fill sizes="33vw" className="object-cover" />
            </div>
            <div className="px-2 py-1.5">
              <p className="truncate text-xs font-bold">{c.name}</p>
              <p className="flex items-center gap-0.5 text-[10px] text-subtle">
                <span aria-hidden className="icon-[mdi--star] size-2.5 text-yellow" />
                {c.rating}/5
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className={`grid ${cols} gap-2 pt-1 pb-2`}>
        {casinos.map((c) => (
          <div key={c.slug}>
            <a
              href="#"
              rel="sponsored nofollow"
              onClick={() => markViewed(c.slug)}
              aria-label={`Visit ${c.name}`}
              className="flex h-8 items-center justify-center gap-1 rounded-full bg-brand text-xs font-semibold text-white"
            >
              Visit
              <span aria-hidden className="icon-[akar-icons--arrow-up-right] size-3.5" />
            </a>
            <a
              href="#"
              onClick={() => markViewed(c.slug)}
              className="mt-1 block py-1 text-center text-[11px] font-semibold text-brand underline"
            >
              Read Review
            </a>
          </div>
        ))}
      </div>

      <dl className="overflow-hidden rounded-xl bg-white">
        {rows.map((row) => (
          <div key={row.label} className="border-t border-subtle/10 px-3 py-3 first:border-t-0">
            <dt className="text-sm font-semibold">{row.label}</dt>
            <dd className={`mt-2 grid ${cols} gap-2`}>
              {casinos.map((c) => (
                <div key={c.slug} className="min-w-0 rounded-md bg-[#f5f5f5]/70 p-2 text-xs font-semibold text-subtle">
                  <span className="sr-only">{c.name}: </span>
                  {row.render(c, true)}
                </div>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
