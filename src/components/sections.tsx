import Image from "next/image";
import {
  experts,
  faqs,
  featuredNews,
  guides,
  news,
  ratingPoints,
  responsibleLinks,
  slots,
  streamers,
} from "@/data/content";
import { ArrowLink, Eyebrow, OutlineButton, ResponsibleLine, SectionTitle } from "./ui";

export function RatingSection() {
  return (
    <section className="bg-surface-alt py-12 md:py-20">
      <div className="container-page grid gap-6 lg:grid-cols-[540px_1fr] lg:gap-5">
        <div>
          <Eyebrow>Casino rating</Eyebrow>
          <SectionTitle className="mt-3 md:mt-6 md:text-[34px]">How do we rate casinos</SectionTitle>
          <p className="mt-4 text-muted md:mt-8 md:text-lg">
            In order for you to have a satisfactory gaming experience, it is of course important to
            choose the right casino. Unfortunately, this is not always easy.
            <br />
            Our experts evaluate casinos across six criteria, using a{" "}
            <strong>100-point rating system.</strong>
          </p>
          <div className="mt-6 hidden lg:block">
            <ArrowLink href="#">Read our full methodology</ArrowLink>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 md:p-7 lg:-mt-0">
          <ul className="flex flex-col gap-3">
            {ratingPoints.map((point) => (
              <li
                key={point.title}
                className="flex items-center gap-4 rounded-2xl bg-[#f7f5f5] px-4 py-5 md:gap-5 md:px-10 md:py-7"
              >
                {point.icon ? (
                  <Image src={point.icon} alt="" width={40} height={64} className="h-10 w-auto shrink-0" />
                ) : (
                  <span aria-hidden className={`${point.iconClass} size-10 shrink-0`} />
                )}
                <div>
                  <h3 className="text-sm font-semibold md:text-xl">{point.title}</h3>
                  <p className="mt-1 text-xs text-muted md:text-lg">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:hidden">
          <ArrowLink href="#">Read our full methodology</ArrowLink>
        </div>
      </div>
    </section>
  );
}

export function ResponsibleGambling() {
  return (
    <section className="bg-brand-bright py-12 text-white md:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_526px] lg:items-center lg:gap-16">
        <div>
          <SectionTitle className="md:text-[34px]">Responsible Gambling</SectionTitle>
          <p className="mt-4 text-base leading-relaxed md:text-lg">
            Before you enter the casino world, it is important that you are over 18 years of age
            and know the risks of casino gambling. A gambling addiction can also be very difficult
            to get rid of. One basic rule that you should never ignore is:{" "}
            <strong className="text-yellow">do not gamble with money you cannot afford to lose.</strong>
          </p>
          <p className="mt-4 text-base leading-relaxed md:text-lg">
            If you feel that you or someone close to you is gambling too much, we recommend that you
            read our page on{" "}
            <a href="#" className="underline">
              responsible gambling
            </a>{" "}
            for tips on how to create healthy gambling habits.
          </p>
          <ArrowLink href="#" className="mt-8 text-yellow">
            Read More
          </ArrowLink>
        </div>

        <ul className="flex flex-col gap-2.5">
          {responsibleLinks.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                className="flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-brand-bright-card px-3 py-3 transition-colors hover:bg-white/15 md:px-5 md:py-5"
              >
                <span>
                  <span className="block text-sm font-bold md:text-base">{link.title}</span>
                  <span className="block text-[11px] text-white/75 md:text-sm">{link.body}</span>
                </span>
                <span aria-hidden className="icon-[akar-icons--chevron-right] size-4 text-yellow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SlotsSection() {
  return (
    <section id="slots" className="scroll-mt-24 bg-surface py-12 md:py-20">
      <div className="container-page">
        <Eyebrow>Slots completely free on Sveacasino</Eyebrow>
        <SectionTitle className="mt-3 md:mt-6 md:text-[34px]">Find the right slots for you</SectionTitle>
        <p className="mt-4 max-w-[930px] text-muted md:text-lg">
          We give you the opportunity to explore different slots according to your own taste and
          preferences. Sort, compare and find your favorites among the thousands of slots available
          on Swedish gaming sites. We also give you the opportunity to test play lots of slots
          completely free right here at SveaCasino!
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-6 lg:grid-cols-4">
          {slots.map((slot) => (
            <article
              key={slot.name}
              className="flex flex-col overflow-hidden rounded-lg bg-linear-to-br from-brand-deep from-40% to-[#4a5246] text-white"
            >
              <div className="relative aspect-[291/279]">
                <Image
                  src={slot.image}
                  alt={`${slot.name} slot`}
                  fill
                  sizes="(min-width: 1024px) 291px, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-3 pt-3 pb-3 md:px-4 md:pt-4">
                <h3 className="text-xs font-semibold md:text-xl">{slot.name}</h3>
                <p className="text-[10px] md:text-xs">{slot.provider}</p>
                <div className="mt-3 flex flex-col gap-2 md:mt-6">
                  <a
                    href="#"
                    className="inline-flex h-8 items-center justify-center rounded-full bg-brand text-xs transition-colors hover:bg-brand-navy md:h-10 md:text-base"
                  >
                    Play
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-8 items-center justify-center rounded-full bg-chip text-xs text-muted md:h-10 md:text-base"
                  >
                    Review
                  </a>
                </div>
                <ResponsibleLine className="mt-3 md:mt-6" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:mt-12">
          <OutlineButton href="#">Show more</OutlineButton>
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  return (
    <section id="news" className="scroll-mt-24 bg-surface pt-4 pb-12 md:pt-[55px] md:pb-[70px]">
      <div className="container-page">
        <SectionTitle className="text-center md:text-[32px]">Lastest News &amp; Updates</SectionTitle>
        <p className="mx-auto mt-4 max-w-[955px] text-center text-muted md:text-lg">
          We constantly stay up to date with what is happening in the gaming industry and provide
          you with all the important news related to the gaming market in general - and Swedish
          online casinos in particular.
        </p>

        <div className="mx-auto mt-6 grid max-w-[1167px] gap-4 md:mt-7 lg:grid-cols-[572px_1fr]">
          <a
            href={featuredNews.href}
            className="relative block aspect-[572/428] overflow-hidden rounded-2xl bg-ink"
          >
            <Image
              src={featuredNews.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 572px, 100vw"
              className="-scale-x-100 object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent" />
            <h3 className="absolute inset-x-5 bottom-8 text-sm font-bold text-white md:inset-x-[43px] md:bottom-[60px] md:max-w-[491px] md:text-[21.6px] md:leading-snug">
              {featuredNews.title}
            </h3>
          </a>

          <div className="flex flex-col gap-2">
            {news.map((item, i) => (
              <article
                key={`${item.title}-${i}`}
                className="flex items-center gap-3 rounded-lg bg-white p-2 md:gap-4 md:p-[11px]"
              >
                <Image
                  src={item.image}
                  alt=""
                  width={103}
                  height={108}
                  className="h-[60px] w-[56px] shrink-0 rounded-md object-cover md:h-[108px] md:w-[103px]"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-[10px] font-bold md:text-[15px]">{item.title}</h3>
                  <p className="mt-1 text-[7px] text-muted md:mt-2 md:text-[11.3px]">{item.excerpt}</p>
                  <div className="mt-2 flex items-end justify-between md:mt-3">
                    <p className="text-[7px] text-muted md:text-[9.4px]">
                      <span className="block text-[7px] font-semibold md:mb-1.5 md:text-[11.3px]">
                        {item.author}
                      </span>
                      {item.date}&nbsp;&nbsp;{item.readTime}
                    </p>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1.5 p-1 text-[8px] text-link md:p-2 md:text-[13px]"
                    >
                      Read
                      <span aria-hidden className="icon-[akar-icons--arrow-up-right] size-2.5 md:size-[15px]" />
                      <span className="sr-only">{item.title}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center md:mt-7">
          <OutlineButton href="#" className="px-9">
            Show all
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="bg-surface pb-12 md:pb-24">
      <div className="container-page grid gap-6 lg:grid-cols-2 lg:gap-5">
        <div>
          <Eyebrow>About SveaCasino</Eyebrow>
          <SectionTitle className="mt-4 md:text-[34px]">
            SveaCasino- Helping Swedish Players Make Informed Choices Since 2012
          </SectionTitle>
          <p className="mt-4 text-muted md:mt-11 md:text-lg">
            The ambition behind SveaCasino is to give Swedish players a clear insight into Swedish
            online casinos and{" "}
            <a href="#" className="underline">
              betting sites
            </a>{" "}
            with as objective an eye as possible . The large number of gaming companies on
            today&apos;s market can often make it difficult for the average person to distinguish
            which ones are reliable and which ones offer the most value for money - that&apos;s why
            we are here for you.
          </p>
          <ArrowLink href="#" className="mt-6 text-brand md:mt-14">
            More abouth SveaCasino
          </ArrowLink>
        </div>
        <div className="relative aspect-[624/399] overflow-hidden rounded-md lg:mt-9">
          <Image
            src="/about/casinoguide-since-2012.png"
            alt="Sveriges största casinoguide sedan 2012"
            fill
            sizes="(min-width: 1024px) 624px, 100vw"
            className="object-cover object-left"
          />
        </div>
      </div>
    </section>
  );
}

export function ExpertsSection() {
  return (
    <section id="experts" className="scroll-mt-24 bg-surface-alt py-12 md:py-20">
      <div className="container-page">
        <SectionTitle className="text-center md:text-[34px]">Meet Our Casino Experts</SectionTitle>
        <p className="mx-auto mt-4 max-w-[860px] text-center text-muted md:text-lg">
          Here at SveaCasino we have brought in real experts in several different areas of the
          casino industry.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-4">
          {experts.map((expert) => (
            <li key={expert.name}>
              <a
                href="#"
                className="group relative block aspect-[295/462] overflow-hidden rounded-tl-[60px] rounded-br-[60px] md:rounded-tl-[90px] md:rounded-br-[90px]"
              >
                <Image
                  src={expert.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 295px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
                <span className="absolute inset-x-2 bottom-3 flex items-end justify-between gap-2 text-white md:inset-x-3 md:bottom-6">
                  <span>
                    <span className="block text-[9px] font-semibold md:text-lg">{expert.name}</span>
                    <span className="block text-[8px] text-white/80 md:text-[15px]">{expert.role}</span>
                  </span>
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand md:size-10">
                    <span aria-hidden className="icon-[akar-icons--arrow-up-right] size-3 md:size-5" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center md:mt-10">
          <OutlineButton href="#" className="px-5">
            See all our experts
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

export function GuidesSection() {
  return (
    <section id="guides" className="scroll-mt-24 bg-surface py-12 md:py-16">
      <div className="container-page">
        <Eyebrow>Guides for casinos</Eyebrow>
        <SectionTitle className="mt-4 max-w-[940px] md:text-[34px]">
          Casino games - easy to find the right one with our game guides
        </SectionTitle>
        <p className="mt-4 max-w-[940px] text-muted md:text-lg">
          There are a multitude of casino games and each game often comes in several different
          variants.
          <br />
          If you&apos;ve never played before and are curious to explore the full range of options
          available, then you&apos;re welcome to take a look at our general{" "}
          <a href="#" className="underline">
            guide to casino games
          </a>{" "}
          .
        </p>

        <ul className="mx-auto mt-8 grid max-w-[250px] gap-3 md:mx-0 md:mt-10 md:max-w-[1124px] md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {guides.map((guide, i) => (
            <li
              key={guide.title}
              className={`rounded-md bg-white px-5 py-6 shadow-soft md:px-6 ${i >= 4 ? "hidden md:block" : ""}`}
            >
              <h3 className="font-semibold md:text-lg">{guide.title}</h3>
              <p className="mt-3 text-xs text-muted md:text-[13px]">{guide.body}</p>
              <a href="#" className="mt-3 inline-block text-[#1d6ee6] underline">
                Guide
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center md:hidden">
          <OutlineButton href="#" className="px-11">
            View all guides
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

export function StreamersSection() {
  return (
    <section className="bg-linear-to-br from-[#0c2f63] via-[#41504d] to-[#64663f] py-12 text-white md:py-20">
      <div className="container-page">
        <SectionTitle className="text-center md:text-[34px]">See Our Biggest Streamers Win</SectionTitle>
        <p className="mx-auto mt-4 max-w-[860px] text-center md:text-lg">
          Watch standout gameplay moments from SveaCasino’s featured streamers and discover the
          casino’s behind the action
        </p>

        <ul className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
          {streamers.map((image, i) => (
            <li key={image} className="w-[210px] shrink-0 snap-start md:w-auto">
              <button
                type="button"
                aria-label={`Play streamer highlight ${i + 1}`}
                className="group relative block aspect-[295/406] w-full overflow-hidden rounded-[40px]"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 295px, 210px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="icon-[mdi--play] absolute top-1/2 left-1/2 size-12 -translate-1/2 text-white drop-shadow"
                />
                <span className="absolute inset-x-0 bottom-9 text-center underline md:text-lg">
                  Terms &amp; conditions apply
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-surface-faq py-12 md:py-24">
      <div className="container-page">
        <SectionTitle className="text-center md:text-[44px]">Frequently Asked Questions</SectionTitle>
        <div className="mx-auto mt-6 flex max-w-[549px] flex-col gap-2 md:mt-10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-3xl bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1.5 pr-1.5 pl-4 text-xs md:py-1 md:pr-2 md:pl-6 md:text-lg">
                {faq.q}
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-chip md:size-10">
                  <span
                    aria-hidden
                    className="icon-[akar-icons--plus] size-3 transition-transform group-open:rotate-45 md:size-5"
                  />
                </span>
              </summary>
              <p className="px-4 pb-4 text-xs text-muted md:px-6 md:pb-5 md:text-base">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
