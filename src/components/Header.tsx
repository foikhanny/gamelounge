"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/content";
import { useWatchlist } from "@/lib/store";

export function Header() {
  const [open, setOpen] = useState(false);
  const watchlist = useWatchlist();

  return (
    <header className="sticky top-0 z-40 bg-brand-navy text-white">
      <div className="container-page flex h-[75px] items-center justify-between md:h-[100px]">
        <Link href="/" aria-label="SveaCasino home" className="shrink-0">
          <Image
            src="/brand/logo.png"
            alt="Svea Casino"
            width={2171}
            height={724}
            preload
            sizes="210px"
            className="h-11 w-auto md:h-[68px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10 text-[15px]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-yellow">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button type="button" aria-label="Search" className="grid size-10 place-items-center">
            <span aria-hidden className="icon-[akar-icons--search] size-6" />
          </button>
          <Link
            href="/watchlist"
            aria-label={`My watchlist (${watchlist.length} saved)`}
            className="relative grid size-10 place-items-center"
          >
            <span aria-hidden className="icon-[mdi--bookmark-outline] size-6" />
            {watchlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 grid size-4 place-items-center rounded-full bg-yellow text-[10px] font-bold text-brand-deep">
                {watchlist.length}
              </span>
            )}
          </Link>
          <a
            href="#"
            className="hidden h-10 items-center rounded-full border border-yellow px-6 text-[15px] font-semibold text-yellow transition-colors hover:bg-yellow hover:text-brand-navy lg:inline-flex"
          >
            Login
          </a>
          <a
            href="#"
            className="hidden h-10 items-center rounded-full bg-white px-6 text-[15px] font-semibold text-brand-navy transition-colors hover:bg-yellow lg:inline-flex"
          >
            Sign Up
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center lg:hidden"
          >
            <span
              aria-hidden
              className={`${open ? "icon-[akar-icons--cross]" : "icon-[akar-icons--three-line-horizontal]"} size-8`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 lg:hidden">
          <ul className="container-page flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-3 flex gap-3">
              <a
                href="#"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-yellow font-semibold text-yellow"
              >
                Login
              </a>
              <a
                href="#"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-white font-semibold text-brand-navy"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
