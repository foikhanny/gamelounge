"use client";

import { useEffect, useRef, useState } from "react";
import { emptyFilters, filterGroups, type FilterDraft, type FilterGroupId } from "@/data/casinos";

const SLIDE_MS = 300;

// Mounted only while open, so the draft always starts from the applied filters.
export function FilterModal({
  initial,
  countFor,
  onApply,
  onClose,
}: {
  initial: FilterDraft;
  countFor: (draft: FilterDraft) => number;
  onApply: (draft: FilterDraft) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(initial);
  const [closing, setClosing] = useState(false);
  // Groups that already have selections start expanded.
  const [open, setOpen] = useState(
    () =>
      new Set(
        filterGroups.filter((g) => initial.selections[g.id]?.length).map((g) => g.id),
      ),
  );

  const toggleOpen = (id: FilterGroupId) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  // Slide the panel out before the parent unmounts it.
  const closeThen = (action: () => void) => {
    if (closing) return;
    setClosing(true);
    setTimeout(action, SLIDE_MS);
  };
  const close = () => closeThen(onClose);

  const toggle = (group: FilterGroupId, option: string) =>
    setDraft((d) => {
      const current = d.selections[group] ?? [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...d, selections: { ...d.selections, [group]: next } };
    });

  const count = countFor(draft);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      aria-labelledby="filter-title"
      className={`my-0 mr-auto ml-0 h-dvh max-h-none w-full max-w-none bg-white p-0 shadow-[8px_0_24px_rgb(0_0_0/0.12)] transition-transform ease-out backdrop:bg-ink/50 starting:-translate-x-full motion-reduce:transition-none md:w-[583px] md:rounded-r-2xl ${
        closing ? "-translate-x-full" : "translate-x-0"
      }`}
      style={{ transitionDuration: `${SLIDE_MS}ms` }}
    >
      <div className="flex h-full flex-col">
        <div className="px-4 pt-8 md:px-4">
          <div className="flex items-start justify-between">
            <h2 id="filter-title" className="text-3xl font-bold md:text-[34px]">
              Filter Casinos
            </h2>
            <button type="button" onClick={close} aria-label="Close filters" className="p-1">
              <span aria-hidden className="icon-[akar-icons--cross] size-7" />
            </button>
          </div>
          <p className="mt-2 text-muted md:text-lg">Find casinos that match your preferences</p>
          <label className="mt-6 flex h-12 items-center gap-3 rounded-xl border border-[#c8c8c8] px-5">
            <span className="sr-only">Search casinos</span>
            <input
              type="search"
              value={draft.query}
              onChange={(e) => setDraft((d) => ({ ...d, query: e.target.value }))}
              placeholder="Search casinos, slots, games …"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#b5b5b5]"
            />
            <span aria-hidden className="icon-[akar-icons--search] size-6 text-subtle/60" />
          </label>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6 md:mt-12 md:px-[18px]">
          {filterGroups.map((group) => {
            const selected = draft.selections[group.id] ?? [];
            const isOpen = open.has(group.id);
            const panelId = `filter-${group.id}`;
            return (
              <div key={group.id} className="flex flex-col gap-[9px]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleOpen(group.id)}
                  className={`flex h-12 items-center justify-between rounded-lg px-4 text-left text-xl leading-[20.8px] font-bold transition-colors ${
                    isOpen ? "bg-white text-brand" : "bg-white text-black hover:bg-[#f4f8ff] hover:text-subtle"
                  }`}
                >
                  <span>
                    {group.label}
                    {selected.length > 0 && (
                      <span className="ml-2 rounded-full bg-brand px-2 py-0.5 align-middle text-xs text-white">
                        {selected.length}
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden
                    className={`icon-[akar-icons--chevron-down-small] size-6 text-subtle transition-transform ${
                      isOpen ? "-scale-y-100" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <ul id={panelId} className="flex flex-col">
                    {group.options.map((option) => (
                      <li key={option}>
                        <CheckboxRow
                          label={option}
                          checked={selected.includes(option)}
                          onChange={() => toggle(group.id, option)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4 bg-white px-4 py-6 shadow-[0_-4px_12px_rgb(0_0_0/0.06)]">
          <button
            type="button"
            onClick={() => setDraft(emptyFilters)}
            className="h-12 flex-1 rounded-full bg-chip text-lg text-subtle md:w-[196px] md:flex-none"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={() => closeThen(() => onApply(draft))}
            className="h-12 rounded-full bg-brand px-6 text-lg font-medium whitespace-nowrap text-white md:px-8"
          >
            Show {count} {count === 1 ? "Casino" : "Casinos"}
          </button>
        </div>
      </div>
    </dialog>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex h-12 cursor-pointer items-center gap-4 rounded-lg px-4 transition-colors hover:bg-[#f5f5f5] has-focus-visible:outline-2 has-focus-visible:outline-brand">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className={`grid size-5 shrink-0 place-items-center rounded-xs ${
          checked ? "bg-brand" : "border border-subtle"
        }`}
      >
        {checked && <span className="icon-[akar-icons--check] size-4 text-white" />}
      </span>
      <span className={`leading-[20.8px] ${checked ? "text-ink" : "text-subtle"}`}>{label}</span>
    </label>
  );
}
