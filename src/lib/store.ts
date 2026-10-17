"use client";

import { useSyncExternalStore } from "react";

// Visitor state lives in this browser only: no account is needed to compare or save casinos.
export const MAX_COMPARE = 3;

const KEYS = {
  compare: "svea:compare",
  watchlist: "svea:watchlist",
  recent: "svea:recent",
  syncPromptSeen: "svea:syncPromptSeen",
} as const;

type ListKey = "compare" | "watchlist" | "recent";

const EMPTY: string[] = [];
const cache = new Map<ListKey, string[]>();
const listeners = new Set<() => void>();

function read(key: ListKey): string[] {
  const cached = cache.get(key);
  if (cached) return cached;
  let value = EMPTY;
  try {
    const raw = localStorage.getItem(KEYS[key]);
    if (raw) value = JSON.parse(raw) as string[];
  } catch {
    // Unavailable or corrupt storage: start empty.
  }
  cache.set(key, value);
  return value;
}

function write(key: ListKey, value: string[]) {
  cache.set(key, value);
  try {
    localStorage.setItem(KEYS[key], JSON.stringify(value));
  } catch {
    // Keep the in-memory value for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key && Object.values(KEYS).includes(e.key as (typeof KEYS)[ListKey])) {
      cache.clear();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function useList(key: ListKey) {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => EMPTY,
  );
}

export const useCompare = () => useList("compare");
export const useWatchlist = () => useList("watchlist");
export const useRecent = () => useList("recent");

export function toggleCompare(slug: string) {
  const current = read("compare");
  if (current.includes(slug)) {
    write("compare", current.filter((s) => s !== slug));
  } else if (current.length < MAX_COMPARE) {
    write("compare", [...current, slug]);
  }
}

export function setCompare(slugs: string[]) {
  write("compare", slugs.slice(0, MAX_COMPARE));
}

export function clearCompare() {
  write("compare", []);
}

export function addToWatchlist(slugs: string[]) {
  const current = read("watchlist");
  write("watchlist", [...current, ...slugs.filter((s) => !current.includes(s))]);
}

export function removeFromWatchlist(slug: string) {
  write("watchlist", read("watchlist").filter((s) => s !== slug));
}

export function markViewed(slug: string) {
  write("recent", [slug, ...read("recent").filter((s) => s !== slug)].slice(0, 12));
}

export function shouldShowSyncPrompt() {
  try {
    return !localStorage.getItem(KEYS.syncPromptSeen);
  } catch {
    return false;
  }
}

export function markSyncPromptSeen() {
  try {
    localStorage.setItem(KEYS.syncPromptSeen, "1");
  } catch {
    // Not persisted; the prompt may show again next visit.
  }
}
