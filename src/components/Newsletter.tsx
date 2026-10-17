"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  // Demo only: there is no newsletter backend in this concept build.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="overflow-hidden bg-night py-12 text-white md:pt-24 md:pb-8">
      <div className="container-page grid gap-8 lg:grid-cols-[700px_1fr] lg:items-center lg:gap-10">
        <div>
          <h2 className="font-display text-lg leading-snug md:text-[28px]">
            Subscribe to our newsletter and get all the exclusive offers and lastest deals
          </h2>
          <p className="mt-4 text-lg md:text-xl">
            We promise not to fill your inbox with junk, only exciting offers that you will like.
          </p>

          {submitted ? (
            <p role="status" className="mt-10 rounded-lg bg-white/10 p-5 text-lg">
              Thanks! Check your inbox to confirm your subscription.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 md:mt-16">
              <label className="hidden md:block">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  required
                  placeholder="Please enter your email address."
                  className="h-11 w-full rounded border border-[#c8c8c8] bg-white px-3 text-ink placeholder:text-[#b5b5b5]"
                />
              </label>
              <fieldset className="mt-4 flex flex-col gap-1 text-xs md:mt-2.5 md:text-base">
                <legend className="sr-only">Consent</legend>
                <Checkbox required>I am over 18 years old.</Checkbox>
                <Checkbox>I want to receive newsletters and agree to receive marketing emails.</Checkbox>
                <Checkbox required>
                  I approve <strong>cookie policy</strong>
                </Checkbox>
              </fieldset>
              <button
                type="submit"
                className="mt-8 h-10 w-full rounded-full bg-brand text-lg transition-colors hover:bg-brand-navy md:mt-6"
              >
                Register
              </button>
              <p className="mt-10 md:mt-7 md:px-5 md:text-base">
                By entering your email, you confirm that you have read and accepted our privacy and
                cookie policy.
              </p>
            </form>
          )}
        </div>

        <Image
          src="/newsletter/newsletter-envelope.png"
          alt=""
          width={1536}
          height={1024}
          sizes="(min-width: 1024px) 620px, 100vw"
          className="mx-auto w-full max-w-[620px]"
        />
      </div>
    </section>
  );
}

function Checkbox({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex items-start gap-2">
      <input type="checkbox" required={required} className="mt-0.5 size-3.5 accent-brand md:mt-1" />
      <span>{children}</span>
    </label>
  );
}
