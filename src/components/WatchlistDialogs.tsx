"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { markSyncPromptSeen, shouldShowSyncPrompt } from "@/lib/store";

type Step = "added" | "sync";

// "Added to your watchlist", then a one-time optional prompt to create an account.
export function WatchlistDialogs({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<Step>("added");

  const continueBrowsing = () => {
    if (shouldShowSyncPrompt()) {
      markSyncPromptSeen();
      setStep("sync");
    } else {
      onDone();
    }
  };

  return step === "added" ? (
    <DialogCard key="added" onClose={onDone} labelledBy="added-title">
      <SuccessIcon />
      <h2 id="added-title" className="mt-6 font-bold">
        Added to your watchlist
      </h2>
      <p className="mt-6 max-w-[226px] text-sm text-subtle">
        Your selection has been added to your watchlist.
      </p>
      <div className="mt-6 flex w-full flex-col items-center gap-1.5">
        <a
          href="#"
          rel="sponsored nofollow"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white"
        >
          Visit Casino
          <span aria-hidden className="icon-[akar-icons--arrow-up-right] size-5" />
        </a>
        <button type="button" onClick={continueBrowsing} className="h-8 font-semibold text-brand">
          Continue browsing
        </button>
      </div>
    </DialogCard>
  ) : (
    <DialogCard key="sync" onClose={onDone} labelledBy="sync-title">
      <SuccessIcon />
      <h2 id="sync-title" className="mt-6 font-bold">
        Keep your waitlist in sync
      </h2>
      <p className="mt-6 text-sm text-subtle">
        Access it on your devices
        <br />
        Get email notification about updates
        <br />
        it is free and takes only a min
      </p>
      <div className="mt-6 flex w-full flex-col items-center gap-1.5">
        <a
          href="#"
          className="inline-flex h-10 w-full items-center justify-center rounded-full bg-brand font-semibold text-white"
        >
          Create free account
        </a>
        <button type="button" onClick={onDone} className="h-8 font-semibold text-brand">
          Maybe later
        </button>
      </div>
    </DialogCard>
  );
}

function DialogCard({
  children,
  onClose,
  labelledBy,
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby={labelledBy}
      className="m-auto w-[322px] max-w-[calc(100vw-32px)] rounded-[18px] bg-[#f3f5fc] p-0 shadow-card backdrop:bg-ink/50"
    >
      <div className="flex flex-col items-center px-8 py-8 text-center">{children}</div>
    </dialog>
  );
}

function SuccessIcon() {
  return (
    <span className="grid size-10 place-items-center rounded-full bg-[#0b8b32]">
      <span aria-hidden className="icon-[akar-icons--check] size-5 text-white" />
    </span>
  );
}
