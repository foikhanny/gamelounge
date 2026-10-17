import Image from "next/image";
import { footerColumns } from "@/data/content";

export function Footer() {
  return (
    <footer className="bg-ink pt-12 pb-10 text-white lg:pt-24 lg:pb-[140px]">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[336px_240px_240px_240px] lg:gap-8">
          <div>
            {/* The logo is taller than its row and overflows it evenly, so it centres on the column headings. */}
            <div className="flex h-7 items-center">
              <Image
                src="/brand/logo.png"
                alt="Svea Casino"
                width={2171}
                height={724}
                sizes="212px"
                className="h-[71px] w-[212px] max-w-none"
              />
            </div>
            <p className="mt-3 max-w-[289px] text-sm leading-[22.4px] text-[#a8b0c2]">
              SveaCasino is your safe guide to Swedish online casinos. With us you can easily find
              and read reviews of casinos and slots with a valid license via the Swedish Gambling
              Authority.
            </p>
            <p className="mt-2 text-sm font-bold md:hidden">18+ · Stödlinjen.se · Spelpaus.se</p>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[15px] leading-[23.25px] font-bold">{col.title}</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm leading-[21.7px] text-[#a8b0c2]">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#222] pt-5 text-sm leading-[21.7px] md:flex-row md:justify-between">
          <p className="hidden font-bold md:block">18+ · Stödlinjen.se · Spelpaus.se</p>
          <p className="text-center text-[#a8b0c2] md:text-left">
            Gambling can be addictive. Spela ansvarsfullt. Design concept: casino data is
            illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
