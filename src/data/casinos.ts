export type FilterGroupId =
  | "popular"
  | "bonusType"
  | "games"
  | "payments"
  | "withdrawalLimit"
  | "currency"
  | "license"
  | "chatLanguage"
  | "userFeedback"
  | "producers";

export type FilterGroup = {
  id: FilterGroupId;
  label: string;
  options: string[];
};

export const filterGroups: FilterGroup[] = [
  {
    id: "popular",
    label: "Popular Filters",
    options: [
      "Mobile -friendly casinos",
      "Live roulette casinos",
      "High roller casinos",
      "Live Casinos",
      "No deposit casinos",
    ],
  },
  {
    id: "bonusType",
    label: "Bonus Type",
    options: ["No deposit bonus", "Deposit bonus", "Loyalty bonus", "Cash back", "Reload bonus"],
  },
  {
    id: "games",
    label: "Casino games",
    options: [
      "Slots",
      "Roulette",
      "Blackjack",
      "Live games",
      "Video joker",
      "Betting",
      "Poker",
      "Craps & dice games",
      "Crash games",
    ],
  },
  {
    id: "payments",
    label: "Payment options",
    options: ["Swish", "Trustly", "Visa", "Mastercard", "Apple Pay"],
  },
  {
    id: "withdrawalLimit",
    label: "Withdrawal limit",
    options: ["Under 50,000 SEK", "50,000–100,000 SEK", "No limit"],
  },
  {
    id: "currency",
    label: "Currency",
    options: ["SEK", "EUR"],
  },
  {
    id: "license",
    label: "Licensing authority",
    options: ["Spelinspektionen", "Malta Gaming Authority"],
  },
  {
    id: "chatLanguage",
    label: "Live Chat language",
    options: ["Swedish", "English"],
  },
  {
    id: "userFeedback",
    label: "User feedback",
    options: ["4.5 and above", "4.0 and above", "3.5 and above"],
  },
  {
    id: "producers",
    label: "Game producers",
    options: ["NetEnt", "Pragmatic Play", "Evolution", "Play'n GO", "Hacksaw Gaming"],
  },
];

export type CasinoTab = "new" | "bonuses" | "fastWithdrawals" | "all";

export type PaymentMethod = "trustly" | "mastercard" | "visa";

export const paymentLogos: Record<PaymentMethod, { src: string; label: string; w: number; h: number }> =
  {
    trustly: { src: "/payments/trustly.png", label: "Trustly", w: 57, h: 50 },
    mastercard: { src: "/payments/mastercard.png", label: "Mastercard", w: 56, h: 34 },
    visa: { src: "/payments/visa.png", label: "Visa", w: 66, h: 41 },
  };

export type Casino = {
  slug: string;
  name: string;
  logo: string;
  logoBg: string;
  tagline: string;
  rating: number;
  bonus: string;
  bonusTurnover: string;
  freeSpins: string;
  freeSpinsTurnover: string;
  addedAt: string;
  tabs: CasinoTab[];
  attributes: Record<FilterGroupId, string[]>;
  compare: {
    swedishLicence: boolean;
    welcomeBonus: string;
    wagering: string;
    payments: PaymentMethod[];
    games: string;
    mobileApp: boolean;
    specialFeatures: string;
  };
};

// Illustrative data from the design concept, not live operator offers.
export const casinos: Casino[] = [
  {
    slug: "casinostugan",
    name: "Casinostugan",
    logo: "/casinos/casinostugan.png",
    logoBg: "#7a0f18",
    tagline: "4000+ games",
    rating: 4.2,
    bonus: "1,000 SEK",
    bonusTurnover: "35x turnover",
    freeSpins: "100",
    freeSpinsTurnover: "0x turnover",
    addedAt: "2026-05-02",
    tabs: ["new", "bonuses"],
    attributes: {
      popular: ["Mobile -friendly casinos", "Live roulette casinos", "Live Casinos"],
      bonusType: ["Deposit bonus", "Reload bonus"],
      games: ["Slots", "Roulette", "Live games"],
      payments: ["Swish", "Trustly", "Visa"],
      withdrawalLimit: ["50,000–100,000 SEK"],
      currency: ["SEK"],
      license: ["Spelinspektionen"],
      chatLanguage: ["Swedish"],
      userFeedback: ["4.0 and above", "3.5 and above"],
      producers: ["NetEnt", "Evolution"],
    },
    compare: {
      swedishLicence: true,
      welcomeBonus: "100% up to 5000Kr",
      wagering: "35x",
      payments: ["trustly", "mastercard", "visa"],
      games: "1000+",
      mobileApp: true,
      specialFeatures: "Daily drops and missions",
    },
  },
  {
    slug: "videoslots",
    name: "Videoslots",
    logo: "/casinos/videoslots.png",
    logoBg: "#000000",
    tagline: "4000+ games",
    rating: 4.8,
    bonus: "2,000 SEK",
    bonusTurnover: "20x turnover",
    freeSpins: "11",
    freeSpinsTurnover: "0x turnover",
    addedAt: "2026-02-10",
    tabs: ["bonuses", "fastWithdrawals"],
    attributes: {
      popular: ["Mobile -friendly casinos", "Live roulette casinos", "High roller casinos", "Live Casinos"],
      bonusType: ["Deposit bonus", "Loyalty bonus"],
      games: ["Slots", "Roulette", "Blackjack", "Live games", "Video joker", "Poker", "Craps & dice games"],
      payments: ["Trustly", "Visa", "Mastercard"],
      withdrawalLimit: ["No limit"],
      currency: ["SEK", "EUR"],
      license: ["Spelinspektionen", "Malta Gaming Authority"],
      chatLanguage: ["Swedish", "English"],
      userFeedback: ["4.5 and above", "4.0 and above", "3.5 and above"],
      producers: ["NetEnt", "Pragmatic Play", "Evolution", "Play'n GO", "Hacksaw Gaming"],
    },
    compare: {
      swedishLicence: true,
      welcomeBonus: "200% up to 10,000Kr",
      wagering: "30x",
      payments: ["visa", "trustly", "mastercard"],
      games: "4000+",
      mobileApp: true,
      specialFeatures: "Exclusive tournaments",
    },
  },
  {
    slug: "frank-and-fred",
    name: "Frank & Fred",
    logo: "/casinos/frank-and-fred.png",
    logoBg: "#000000",
    tagline: "Varied game selection",
    rating: 4.6,
    bonus: "0 kr",
    bonusTurnover: "0x turnover",
    freeSpins: "0",
    freeSpinsTurnover: "0x turnover",
    addedAt: "2025-11-18",
    tabs: ["fastWithdrawals"],
    attributes: {
      popular: ["Mobile -friendly casinos", "High roller casinos"],
      bonusType: ["Cash back", "Loyalty bonus"],
      games: ["Slots", "Blackjack", "Live games", "Crash games"],
      payments: ["Trustly", "Apple Pay"],
      withdrawalLimit: ["No limit"],
      currency: ["SEK", "EUR"],
      license: ["Spelinspektionen"],
      chatLanguage: ["Swedish", "English"],
      userFeedback: ["4.5 and above", "4.0 and above", "3.5 and above"],
      producers: ["Pragmatic Play", "Play'n GO"],
    },
    compare: {
      swedishLicence: true,
      welcomeBonus: "100% up to 4000Kr",
      wagering: "35x",
      payments: ["mastercard", "visa", "trustly"],
      games: "1000+",
      mobileApp: true,
      specialFeatures: "No wagering on selected games",
    },
  },
  {
    slug: "lodur",
    name: "Loudur",
    logo: "/casinos/lodur.png",
    logoBg: "#4a3f3d",
    tagline: "4000+ games",
    rating: 3.8,
    bonus: "2,500 SEK",
    bonusTurnover: "20x turnover",
    freeSpins: "0",
    freeSpinsTurnover: "0x turnover",
    addedAt: "2026-06-21",
    tabs: ["new", "bonuses"],
    attributes: {
      popular: ["No deposit casinos"],
      bonusType: ["No deposit bonus", "Deposit bonus"],
      games: ["Slots", "Roulette", "Crash games"],
      payments: ["Swish", "Visa", "Mastercard"],
      withdrawalLimit: ["Under 50,000 SEK"],
      currency: ["SEK"],
      license: ["Spelinspektionen"],
      chatLanguage: ["Swedish"],
      userFeedback: ["3.5 and above"],
      producers: ["Hacksaw Gaming", "Play'n GO"],
    },
    compare: {
      swedishLicence: true,
      welcomeBonus: "100% up to 2500Kr",
      wagering: "20x",
      payments: ["visa", "mastercard"],
      games: "4000+",
      mobileApp: false,
      specialFeatures: "Weekly reload bonus",
    },
  },
  {
    slug: "happy-casino",
    name: "Happy Casino",
    logo: "/casinos/happy-casino.png",
    logoBg: "#5a1e9c",
    tagline: "2000+ games",
    rating: 4.3,
    bonus: "1,500 SEK",
    bonusTurnover: "25x turnover",
    freeSpins: "50",
    freeSpinsTurnover: "0x turnover",
    addedAt: "2026-09-12",
    tabs: ["new", "bonuses"],
    attributes: {
      popular: ["Mobile -friendly casinos", "No deposit casinos"],
      bonusType: ["No deposit bonus", "Reload bonus"],
      games: ["Slots", "Live games", "Video joker"],
      payments: ["Swish", "Trustly", "Mastercard"],
      withdrawalLimit: ["50,000–100,000 SEK"],
      currency: ["SEK"],
      license: ["Spelinspektionen"],
      chatLanguage: ["Swedish", "English"],
      userFeedback: ["4.0 and above", "3.5 and above"],
      producers: ["Pragmatic Play", "Evolution"],
    },
    compare: {
      swedishLicence: true,
      welcomeBonus: "100% up to 1500Kr",
      wagering: "25x",
      payments: ["trustly", "mastercard"],
      games: "2000+",
      mobileApp: true,
      specialFeatures: "Daily free spins wheel",
    },
  },
  {
    slug: "coolbet",
    name: "Coolbet",
    logo: "/casinos/coolbet.png",
    logoBg: "#2b2b31",
    tagline: "Casino & sportsbook",
    rating: 4.4,
    bonus: "1,500 SEK",
    bonusTurnover: "25x turnover",
    freeSpins: "50",
    freeSpinsTurnover: "0x turnover",
    addedAt: "2026-08-30",
    tabs: ["new", "fastWithdrawals"],
    attributes: {
      popular: ["Mobile -friendly casinos", "Live Casinos", "Live roulette casinos"],
      bonusType: ["Deposit bonus", "Cash back"],
      games: ["Slots", "Roulette", "Blackjack", "Live games", "Betting", "Poker"],
      payments: ["Swish", "Trustly", "Visa"],
      withdrawalLimit: ["50,000–100,000 SEK"],
      currency: ["SEK", "EUR"],
      license: ["Spelinspektionen", "Malta Gaming Authority"],
      chatLanguage: ["Swedish", "English"],
      userFeedback: ["4.0 and above", "3.5 and above"],
      producers: ["NetEnt", "Evolution", "Play'n GO"],
    },
    compare: {
      swedishLicence: true,
      welcomeBonus: "100% up to 1500Kr",
      wagering: "25x",
      payments: ["trustly", "visa"],
      games: "3000+",
      mobileApp: true,
      specialFeatures: "Casino and sportsbook in one",
    },
  },
];

export const casinoBySlug = (slug: string) => casinos.find((c) => c.slug === slug);

export const casinoTabs: { id: CasinoTab; label: string }[] = [
  { id: "new", label: "New casinos" },
  { id: "bonuses", label: "Bonuses" },
  { id: "fastWithdrawals", label: "Fast withdrawals" },
  { id: "all", label: "All casinos" },
];

export const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
] as const;

export type SortOption = (typeof sortOptions)[number]["id"];

export type FilterDraft = { query: string; selections: Partial<Record<FilterGroupId, string[]>> };

export const emptyFilters: FilterDraft = { query: "", selections: {} };

export function matchesFilters(casino: Casino, { query, selections }: FilterDraft) {
  const q = query.trim().toLowerCase();
  if (q && !casino.name.toLowerCase().includes(q)) return false;
  return Object.entries(selections).every(
    ([group, options]) =>
      !options?.length ||
      options.some((o) => casino.attributes[group as FilterGroupId].includes(o)),
  );
}

export function sortCasinos(list: Casino[], sort: SortOption) {
  if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
  if (sort === "newest") return [...list].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  return list;
}

export function countActiveFilters({ query, selections }: FilterDraft) {
  return (
    Object.values(selections).reduce((n, o) => n + (o?.length ?? 0), 0) + (query.trim() ? 1 : 0)
  );
}
