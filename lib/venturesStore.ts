export interface VentureItem {
  id: string;
  num: string;
  kanjiNum: string;
  kanjiTag: string;
  name: string;
  tag: string;
  status: "ACTIVE" | "UNDER DEVELOPMENT" | "FUTURE PROJECT" | "INTERNAL STEALTH" | string;
  isComplete: boolean;
  short: string;
  description: string;
  features: string[];
  subdomain: string;
  href: string;
  image: string;
}

export const INITIAL_VENTURES: VentureItem[] = [
  {
    id: "peroix",
    num: "01",
    kanjiNum: "壱",
    kanjiTag: "創業",
    name: "PEROIX",
    tag: "Web & Digital",
    status: "ACTIVE",
    isComplete: true,
    short: "Premium digital presence for doctors, clinics, and local businesses.",
    description:
      "Peroix builds high-end bespoke websites and digital ecosystems for medical professionals and forward-thinking enterprises who demand institutional prestige.",
    features: ["Clinic Portfolios", "Doctor Landing Pages", "SEO & Digital Setup", "Custom Web Apps"],
    subdomain: "peroix.lashkarigroup.online",
    href: "https://peroix.lashkarigroup.online",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "voidex",
    num: "02",
    kanjiNum: "弐",
    kanjiTag: "知能",
    name: "VOIDEX",
    tag: "AI & Research",
    status: "ACTIVE",
    isComplete: true,
    short: "Independent AI research lab building the frontier of intelligent systems.",
    description:
      "Home to NATSU, a 33M parameter specialized language model, and ARIA, a proprietary AGI architecture exploring autonomous agentic workflows and AI-native OS layers.",
    features: ["NATSU 33M LLM", "ARIA AGI Framework", "AI-Native OS Layer", "Voice & Vision Agents"],
    subdomain: "voidex.lashkarigroup.online",
    href: "https://voidex.lashkarigroup.online",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "meetrix",
    num: "03",
    kanjiNum: "参",
    kanjiTag: "媒介",
    name: "MEETRIX",
    tag: "Media & Marketing",
    status: "UNDER DEVELOPMENT",
    isComplete: false,
    short: "Connecting micro-creators with real brands with zero follower barriers.",
    description:
      "A virtual influencer-brand matchmaking agency bridging grassroots content creators with local enterprises. Democratizing influencer commerce starting in Ahmedabad, scaling pan-India.",
    features: ["Zero Minimum Followers", "Performance-Based Deals", "Local Brand Syndication", "Automated Escrow"],
    subdomain: "meetrix.lashkarigroup.online",
    href: "https://meetrix.lashkarigroup.online",
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "foodtraf",
    num: "04",
    kanjiNum: "四",
    kanjiTag: "食流",
    name: "FOODTRAF",
    tag: "Food & Lifestyle",
    status: "UNDER DEVELOPMENT",
    isComplete: false,
    short: "Driving recurring restaurant footfall through smart subscription rewards.",
    description:
      "Connecting passionate diners with premier dining establishments through a subscription loyalty framework. Delivers steady weekday foot traffic while diners earn compounding perks.",
    features: ["Subscription Footfall Engine", "Gamified Dine-In Rewards", "Restaurant CRM Analytics", "Local Food Joint Network"],
    subdomain: "foodtraf.lashkarigroup.online",
    href: "https://foodtraf.lashkarigroup.online",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "mobility",
    num: "05",
    kanjiNum: "五",
    kanjiTag: "移動",
    name: "LASHKARI MOBILITY",
    tag: "Transport",
    status: "FUTURE PROJECT",
    isComplete: false,
    short: "Redefining last-mile urban transport for everyday commuters.",
    description:
      "A forward-looking mobility infrastructure project starting with organized e-rickshaw fleet electrification, driver income enhancement, and smart route allocation across urban Gujarat.",
    features: ["E-Rickshaw Fleet Ops", "Driver Income Optimization", "Smart Route Telematics", "Tier-2 Transit Expansion"],
    subdomain: "mobility.lashkarigroup.online",
    href: "https://mobility.lashkarigroup.online",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "trade",
    num: "06",
    kanjiNum: "六",
    kanjiTag: "自動",
    name: "QUANT AUTOMATION",
    tag: "Finance & Systems",
    status: "INTERNAL STEALTH",
    isComplete: false,
    short: "Automated trading systems built for disciplined, quantitative returns.",
    description:
      "Internal financial automation wing developing systematic algorithmic strategies, high-frequency risk controls, and automated market intelligence. Internal venture, non-client facing.",
    features: ["Algorithmic Execution", "Market Regime Analysis", "Quantitative Risk Engine", "Automated Portfolio Rebalancing"],
    subdomain: "trade.lashkarigroup.online",
    href: "https://trade.lashkarigroup.online",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
  },
];

export interface LgcStats {
  activeVentures: string;
  totalFounders: string;
  sharedVision: string;
  established: string;
}

export const INITIAL_STATS: LgcStats = {
  activeVentures: "05+",
  totalFounders: "06",
  sharedVision: "01",
  established: "2026",
};

const SYNC_EVENT_NAME = "lgc_universal_ventures_sync";

// ── UNIVERSAL MEMORY STATE (NO LOCAL STORAGE SKEW) ──
let memoryVentures: VentureItem[] = [...INITIAL_VENTURES];
let memoryStats: LgcStats = { ...INITIAL_STATS };

// Purge any legacy localStorage cache on startup so no device is trapped in a local offline divergence
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem("lgc_ventures_data_v1");
    localStorage.removeItem("lgc_stats_data_v1");
    sessionStorage.removeItem("lgc_ventures_data_v1");
    sessionStorage.removeItem("lgc_stats_data_v1");
  } catch {
    // Non-fatal if storage access is restricted
  }
}

export function getStoredVentures(): VentureItem[] {
  return memoryVentures;
}

export function getStoredStats(): LgcStats {
  return memoryStats;
}

export async function saveStoredVenturesAsync(
  ventures: VentureItem[],
  password?: string
): Promise<{ success: boolean; url?: string }> {
  // Push directly to cloud Vercel Blob store with master authorization
  const currentStats = getStoredStats();
  const res = await fetch("/api/ventures", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ventures,
      stats: currentStats,
      password: password || "LGC@2026",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || `Server responded with ${res.status}`);
  }

  const data = await res.json();
  // Update universal memory state strictly upon successful cloud response
  memoryVentures = ventures;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME));
  }

  return { success: true, url: data.url };
}

export async function saveStoredStatsAsync(
  stats: LgcStats,
  password?: string
): Promise<{ success: boolean; url?: string }> {
  // Push directly to cloud Vercel Blob store with master authorization
  const currentVentures = getStoredVentures();
  const res = await fetch("/api/ventures", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ventures: currentVentures,
      stats,
      password: password || "LGC@2026",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || `Server responded with ${res.status}`);
  }

  const data = await res.json();
  // Update universal memory state strictly upon successful cloud response
  memoryStats = stats;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME));
  }

  return { success: true, url: data.url };
}

let isSyncing = false;

export async function syncWithCloud(): Promise<void> {
  if (typeof window === "undefined" || isSyncing) return;
  isSyncing = true;
  try {
    // Cache-busting timestamp to prevent mobile browsers from serving stale cache
    const res = await fetch(`/api/ventures?t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });
    if (res.ok) {
      const data = await res.json();
      let hasChanges = false;
      if (data && Array.isArray(data.ventures) && data.ventures.length > 0) {
        memoryVentures = data.ventures;
        hasChanges = true;
      }
      if (data && data.stats && typeof data.stats === "object") {
        memoryStats = { ...INITIAL_STATS, ...data.stats };
        hasChanges = true;
      }
      if (hasChanges && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME));
      }
    }
  } catch (e) {
    console.warn("Could not sync ventures with cloud:", e);
  } finally {
    isSyncing = false;
  }
}

export function subscribeVenturesStore(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(SYNC_EVENT_NAME, handler);
  return () => {
    window.removeEventListener(SYNC_EVENT_NAME, handler);
  };
}
