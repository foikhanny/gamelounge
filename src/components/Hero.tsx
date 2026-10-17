import Image from "next/image";
import { CompareCard } from "./CompareCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#0242a7] via-[#033588] to-[#022a6a] text-white">
      {/* Placement from the Figma frame (1440 wide); on mobile it sits behind everything. */}
      <div className="absolute inset-0 lg:inset-auto lg:top-[-130px] lg:left-[calc(40%-12px)] lg:h-[727px] lg:w-[1091px]">
        <Image
          src="/hero/hero-background.png"
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 1091px, 100vw"
          className="object-cover opacity-[0.08]"
        />
      </div>
      <Image
        src="/hero/glow-left.svg"
        alt=""
        width={674}
        height={583}
        className="pointer-events-none absolute top-[159px] left-[-188px] max-w-none"
      />
      <Image
        src="/hero/glow-right.svg"
        alt=""
        width={674}
        height={583}
        className="pointer-events-none absolute top-[-61px] left-[calc(80%-176px)] hidden max-w-none lg:block"
      />

      <div className="relative container-page grid gap-10 py-12 md:py-20 lg:grid-cols-[1fr_410px] lg:items-start lg:gap-16 lg:pt-[90px] lg:pb-[130px]">
        <div>
          <p className="text-base text-yellow md:text-2xl">Find the best casino on SveaCasino</p>
          <h1 className="mt-2 max-w-[658px] font-display text-[28px] leading-tight md:mt-3 md:text-[48px] md:leading-[1.45]">
            Compare Online Casinos 2026
          </h1>
          <p className="mt-3 max-w-[660px] text-base leading-relaxed md:mt-5 md:text-lg md:leading-[26px]">
            Welcome to SveaCasino.se. We have been comparing and reviewing Swedish casinos, table
            games and slots since 2012. We collect daily bonuses and offers for Sweden&apos;s most
            popular gaming companies in 2026.
          </p>
          <div className="mt-12 flex items-start gap-2.5 text-sm text-[#a9b7d9] md:mt-14 md:items-center md:text-base">
            <Image
              src="/hero/reviewer-avatar.png"
              alt=""
              width={40}
              height={40}
              className="size-[30px] shrink-0 rounded-full md:size-10"
            />
            <p>
              Reviewed by{" "}
              <a href="#experts" className="font-semibold text-yellow">
                Christoffer Söderlund
              </a>
              . Updated <time dateTime="2026-09-30">30 September 2026</time>.
            </p>
          </div>
        </div>

        <div className="lg:pr-11">
          <CompareCard />
        </div>
      </div>
    </section>
  );
}
