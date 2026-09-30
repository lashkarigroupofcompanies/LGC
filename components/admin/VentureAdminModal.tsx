"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  Sliders,
  Globe,
  Tag,
  FileText,
  ListPlus,
  Lock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  VentureItem,
  LgcStats,
  getStoredVentures,
  saveStoredVenturesAsync,
  getStoredStats,
  saveStoredStatsAsync,
  syncWithCloud,
  INITIAL_VENTURES,
  INITIAL_STATS,
} from "@/lib/venturesStore";
import { cn } from "@/lib/utils";

interface VentureAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VentureAdminModal({ isOpen, onClose }: VentureAdminModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);

  const [activeTab, setActiveTab] = useState<"list" | "add" | "stats">("list");
  const [ventures, setVentures] = useState<VentureItem[]>([]);
  const [stats, setStats] = useState<LgcStats>(INITIAL_STATS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    status: "ACTIVE" as VentureItem["status"],
    short: "",
    description: "",
    featuresStr: "",
    image: "",
    href: "",
  });

  useEffect(() => {
    if (isOpen) {
      setVentures(getStoredVentures());
      setStats(getStoredStats());
      setEditingId(null);
      resetForm();
      syncWithCloud().then(() => {
        setVentures(getStoredVentures());
        setStats(getStoredStats());
      });
    } else {
      setIsAuthenticated(false);
      setPasswordInput("");
      setPasswordError(false);
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      tag: "",
      status: "ACTIVE",
      short: "",
      description: "",
      featuresStr: "",
      image: "",
      href: "",
    });
    setEditingId(null);
  };

  const startEdit = (item: VentureItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      tag: item.tag,
      status: item.status,
      short: item.short,
      description: item.description,
      featuresStr: item.features.join(", "),
      image: item.image,
      href: item.href,
    });
    setActiveTab("add");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this venture card from the active ecosystem?")) {
      const updated = ventures.filter((v) => v.id !== id);
      setIsSavingCloud(true);
      showToast("Syncing removal to Global Cloud...");
      try {
        await saveStoredVenturesAsync(updated, "LGC@2026");
        setVentures(updated);
        showToast("☁️ Venture card removed and synced globally!");
      } catch (err) {
        showToast(`❌ Cloud Sync Error: ${err instanceof Error ? err.message : "check Vercel storage"}`);
      } finally {
        setIsSavingCloud(false);
      }
    }
  };

  const handleResetDefaults = async () => {
    if (confirm("Reset all ventures and stats to original factory defaults? Any custom added ventures will be reset.")) {
      setIsSavingCloud(true);
      showToast("Resetting global ecosystem to defaults...");
      try {
        await saveStoredVenturesAsync(INITIAL_VENTURES, "LGC@2026");
        await saveStoredStatsAsync(INITIAL_STATS, "LGC@2026");
        setVentures(INITIAL_VENTURES);
        setStats(INITIAL_STATS);
        resetForm();
        showToast("☁️ Factory defaults restored & synced globally!");
      } catch (err) {
        showToast(`❌ Cloud Sync Error: ${err instanceof Error ? err.message : "check Vercel storage"}`);
      } finally {
        setIsSavingCloud(false);
      }
    }
  };

  const handleSaveVenture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a venture name.");
      return;
    }

    const features = formData.featuresStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Clean subdomain from href or create from name
    let cleanHref = formData.href.trim();
    if (cleanHref && !cleanHref.startsWith("http://") && !cleanHref.startsWith("https://")) {
      cleanHref = `https://${cleanHref}`;
    }

    let subdomain = "";
    try {
      if (cleanHref) {
        subdomain = new URL(cleanHref).hostname;
      }
    } catch {
      subdomain = `${formData.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.lashkarigroup.online`;
    }

    const fallbackImage =
      formData.image.trim() ||
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop";

    let updated: VentureItem[];
    let actionName = "";

    if (editingId) {
      // Update existing
      updated = ventures.map((item) => {
        if (item.id === editingId) {
          return {
            ...item,
            name: formData.name.trim().toUpperCase(),
            tag: formData.tag.trim() || "Venture Portfolio",
            status: formData.status,
            isComplete: formData.status === "ACTIVE",
            short: formData.short.trim() || formData.description.slice(0, 80),
            description: formData.description.trim(),
            features: features.length > 0 ? features : ["Sovereign Infrastructure", "Scalable Growth"],
            image: fallbackImage,
            href: cleanHref || `https://${subdomain}`,
            subdomain: subdomain || item.subdomain,
          };
        }
        return item;
      });
      actionName = `"${formData.name.toUpperCase()}" updated`;
    } else {
      // Create new
      const nextIndex = ventures.length + 1;
      const numStr = nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`;
      const kanjiMap = ["壱", "弐", "参", "四", "五", "六", "七", "八", "九", "十"];
      const kanjiNum = kanjiMap[nextIndex - 1] || "創";

      const newItem: VentureItem = {
        id: formData.name.toLowerCase().replace(/[^a-z0-9]/g, "") || `venture-${Date.now()}`,
        num: numStr,
        kanjiNum: kanjiNum,
        kanjiTag: "事業",
        name: formData.name.trim().toUpperCase(),
        tag: formData.tag.trim() || "Venture Portfolio",
        status: formData.status,
        isComplete: formData.status === "ACTIVE",
        short: formData.short.trim() || formData.description.slice(0, 80),
        description: formData.description.trim() || "Proprietary LGC enterprise venture solving real market problems.",
        features: features.length > 0 ? features : ["Sovereign Operations", "Scalable Infrastructure"],
        image: fallbackImage,
        href: cleanHref || `https://${subdomain}`,
        subdomain: subdomain || `${formData.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.lashkarigroup.online`,
      };

      updated = [...ventures, newItem];
      actionName = `New Venture "${newItem.name}" added`;
    }

    setIsSavingCloud(true);
    showToast("Transmitting changes to Global Cloud...");

    try {
      await saveStoredVenturesAsync(updated, "LGC@2026");
      setVentures(updated);
      showToast(`☁️ ${actionName} and live globally across all devices!`);
      resetForm();
      setActiveTab("list");
    } catch (err) {
      showToast(`❌ Cloud Save Failed: ${err instanceof Error ? err.message : "Vercel storage error"}`);
    } finally {
      setIsSavingCloud(false);
    }
  };

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCloud(true);
    showToast("Transmitting numbers to Global Cloud...");
    try {
      await saveStoredStatsAsync(stats, "LGC@2026");
      showToast("☁️ Ecosystem metrics saved globally across all devices!");
    } catch (err) {
      showToast(`❌ Cloud Save Failed: ${err instanceof Error ? err.message : "Vercel storage error"}`);
    } finally {
      setIsSavingCloud(false);
    }
  };

  if (!isOpen) return null;

  // ── MASTER SECURITY GATE: REQUIRES PASSWORD LGC@2026 ──
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#0B0207]/85 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-md rounded-[28px] border border-[#C9A84C]/60 bg-gradient-to-br from-[#1C0513] via-[#14020D] to-[#0A0107] text-white p-7 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(201,168,76,0.22)] overflow-hidden">
          {/* Top Gold Horizon */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C9A84C] pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C9A84C] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 hover:border-[#C9A84C] text-white/50 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3D0A23] to-[#200512] border border-[#C9A84C]/60 flex items-center justify-center text-[#DFC17B] shadow-[0_0_24px_rgba(201,168,76,0.35)]">
              <Lock className="w-6 h-6 text-[#C9A84C]" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#C9A84C] font-semibold block">
                LGC SOVEREIGN SECURITY
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium mt-1">
                Executive Console Access
              </h2>
              <p className="text-xs text-white/60 font-mono mt-1">
                Enter Master Authorization Key to configure live ventures
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (passwordInput === "LGC@2026") {
                  setIsAuthenticated(true);
                  setPasswordError(false);
                } else {
                  setPasswordError(true);
                }
              }}
              className="w-full space-y-4 pt-2"
            >
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  autoFocus
                  placeholder="Enter Master Key (e.g. LGC@2026)"
                  className={cn(
                    "w-full px-4 py-3.5 rounded-xl bg-black/50 border text-sm text-center tracking-[0.25em] font-mono text-[#DFC17B] placeholder:text-white/30 placeholder:tracking-normal focus:outline-none transition-all",
                    passwordError
                      ? "border-red-500 shadow-[0_0_18px_rgba(239,68,68,0.45)]"
                      : "border-[#C9A84C]/45 focus:border-[#C9A84C] focus:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
                  )}
                />

                {passwordError && (
                  <div className="flex items-center justify-center gap-1.5 mt-2.5 text-xs font-mono text-red-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>ACCESS DENIED · INVALID MASTER KEY</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E2C97E] to-[#C9A84C] text-[#120A0E] text-xs font-mono tracking-[0.25em] font-bold uppercase hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(201,168,76,0.4)] cursor-pointer"
              >
                Unlock Console →
              </button>
            </form>

            <div className="pt-2">
              <span className="text-[9.5px] font-mono text-white/40 tracking-wider">
                CENTRAL CLOUD STORAGE // MULTI-DEVICE WORLDWIDE REPLICATION
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-[#0B0207]/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-5 py-3 rounded-full bg-[#18030E] border border-[#FF3366] text-[#DFC17B] text-xs font-mono font-semibold shadow-[0_0_30px_rgba(255,51,102,0.6)] animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Admin Plinth */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[28px] border border-[#C9A84C]/50 bg-gradient-to-br from-[#1E0513] via-[#14020C] to-[#0A0106] text-white shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(201,168,76,0.18)] overflow-hidden"
      >
        {/* Top Gold & Cherry Accent Rim */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C9A84C] pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C9A84C] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A84C]/25 shrink-0 bg-[#18030E]/70">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#3D0A23] border border-[#FF3366]/50 flex items-center justify-center text-[#DFC17B] shadow-inner">
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9A84C] uppercase font-semibold">
                  SECRET EXECUTIVE CONSOLE
                </span>
                <span className="px-2 py-0.2 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  ONLINE
                </span>
                <span className="px-2 py-0.2 rounded-full text-[9px] font-mono bg-[#C9A84C]/20 text-[#DFC17B] border border-[#C9A84C]/40 flex items-center gap-1">
                  <span>☁️</span>
                  <span>CLOUD SYNC</span>
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.2 rounded-full text-[9px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 items-center gap-1">
                  <span>🏛️</span>
                  <span>MSME: UDYAM-GJ-01-0689750</span>
                </span>
              </div>
              <h3
                className="text-lg sm:text-xl font-serif text-white font-medium tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Venture & Metrics Architecture
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 hover:border-[#FF3366] hover:bg-[#FF3366]/20 text-[#DFC17B] hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close Admin Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 border-b border-white/10 bg-[#12020A]/80 shrink-0 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setActiveTab("list");
                resetForm();
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-lg flex items-center space-x-2 transition-all cursor-pointer",
                activeTab === "list"
                  ? "bg-[#FF3366]/25 border border-[#FF3366] text-white shadow-sm font-semibold"
                  : "text-[#D8D4CC]/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Layers className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>VENTURE CARDS ({ventures.length})</span>
            </button>

            <button
              onClick={() => {
                resetForm();
                setActiveTab("add");
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-lg flex items-center space-x-2 transition-all cursor-pointer",
                activeTab === "add"
                  ? "bg-[#FF3366]/25 border border-[#FF3366] text-white shadow-sm font-semibold"
                  : "text-[#D8D4CC]/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{editingId ? "EDIT VENTURE" : "ADD NEW VENTURE"}</span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg flex items-center space-x-2 transition-all cursor-pointer",
                activeTab === "stats"
                  ? "bg-[#FF3366]/25 border border-[#FF3366] text-white shadow-sm font-semibold"
                  : "text-[#D8D4CC]/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Sliders className="w-3.5 h-3.5 text-[#DFC17B]" />
              <span>VENTURE NUMBERS ({stats.activeVentures})</span>
            </button>
          </div>

          <button
            onClick={handleResetDefaults}
            className="text-[10px] font-mono text-[#A89886] hover:text-[#FF3366] flex items-center space-x-1 transition-colors cursor-pointer"
            title="Reset to factory settings"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">RESET DEFAULTS</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* ════════ TAB 1: LIST ALL EXISTING VENTURE CARDS ════════ */}
          {activeTab === "list" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs text-[#D8D4CC] font-light">
                  All active ventures are rendered in the auto-scrolling 3D carousel and footer directory. Click any card to edit its details or add a new one.
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab("add");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#DFC17B] text-[#120A0E] text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD VENTURE</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ventures.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-white/10 bg-[#16040F]/90 hover:border-[#FF3366]/60 transition-all flex flex-col justify-between space-y-3 group relative overflow-hidden"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#0B0107]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono text-[#DFC17B] font-semibold">
                            CARD {item.num || `0${index + 1}`}
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/15 bg-white/5 text-[#EAD5DE]">
                            {item.status}
                          </span>
                        </div>
                        <h4 className="text-base font-serif font-bold text-white tracking-wide truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-mono text-[#FF4D80] truncate">
                          {item.tag}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#D8D4CC] line-clamp-2 font-light leading-relaxed">
                      {item.short || item.description}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#DFC17B] hover:text-white flex items-center space-x-1 truncate max-w-[200px]"
                      >
                        <Globe className="w-3 h-3 text-[#C9A84C] shrink-0" />
                        <span className="truncate">{item.subdomain || item.href}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-1.5 rounded-lg hover:bg-[#FF3366]/20 text-[#DFC17B] hover:text-white transition-colors cursor-pointer"
                          title="Edit Card Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                          title="Delete Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ TAB 2: ADD OR EDIT VENTURE CARD ════════ */}
          {activeTab === "add" && (
            <form onSubmit={handleSaveVenture} className="space-y-5">
              <div className="p-4 rounded-xl border border-[#FF3366]/30 bg-[#250616]/70 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#DFC17B] uppercase font-semibold">
                    {editingId ? "UPDATING EXISTING VENTURE" : "CONFIGURING NEW VENTURE CARD"}
                  </span>
                  <p className="text-xs text-[#EAD5DE] font-light">
                    Fill in the details below. As soon as you save, this venture will appear in the automatic scrolling cards and footer.
                  </p>
                </div>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-mono text-[#DFC17B] hover:underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {/* Grid 1: Name & Domain Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Venture Name (Card Title) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. PEROIX, VOIDEX, LASHKARI PHARMA"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white placeholder-white/25 text-sm font-mono focus:outline-none focus:border-[#FF3366] transition-colors"
                  />
                  <span className="text-[10px] text-[#A89886] font-mono block">
                    Large heading displayed prominently on top of the card.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                    <Layers className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Domain / Category Tag *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. Web & Digital, Frontier AI, Transport & EV"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white placeholder-white/25 text-sm font-mono focus:outline-none focus:border-[#FF3366] transition-colors"
                  />
                  <span className="text-[10px] text-[#A89886] font-mono block">
                    Badge category displayed above the title.
                  </span>
                </div>
              </div>

              {/* Status & Website Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider font-semibold">
                    Card Operational Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as VentureItem["status"] })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white text-sm font-mono focus:outline-none focus:border-[#FF3366] transition-colors"
                  >
                    <option value="ACTIVE">ACTIVE (Live in Production)</option>
                    <option value="UNDER DEVELOPMENT">UNDER DEVELOPMENT (Building Phase)</option>
                    <option value="FUTURE PROJECT">FUTURE PROJECT (Strategic Pipeline)</option>
                    <option value="INTERNAL STEALTH">INTERNAL STEALTH (Proprietary Lab)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                    <Globe className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Website URL / Subdomain Link *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    placeholder="https://example.lashkarigroup.online"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white placeholder-white/25 text-sm font-mono focus:outline-none focus:border-[#FF3366] transition-colors"
                  />
                  <span className="text-[10px] text-[#A89886] font-mono block">
                    Destination link when visitor clicks the card or &quot;ACCESS VENTURE&quot;.
                  </span>
                </div>
              </div>

              {/* Card Hook / Short Summary */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                  <FileText className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Card Detail / Short Hook (1-2 lines) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.short}
                  onChange={(e) => setFormData({ ...formData, short: e.target.value })}
                  placeholder="e.g. Premium digital presence for doctors, clinics, and modern enterprises."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white placeholder-white/25 text-sm font-light focus:outline-none focus:border-[#FF3366] transition-colors"
                />
                <span className="text-[10px] text-[#A89886] font-mono block">
                  The primary summary visible immediately on the card body.
                </span>
              </div>

              {/* Side Text / Features */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                  <ListPlus className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Card Side Text / Features (Comma-Separated) *</span>
                </label>
                <input
                  type="text"
                  value={formData.featuresStr}
                  onChange={(e) => setFormData({ ...formData, featuresStr: e.target.value })}
                  placeholder="e.g. Clinic Portfolios, Doctor Landing Pages, SEO & Digital Setup, Custom Web Apps"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white placeholder-white/25 text-sm font-mono focus:outline-none focus:border-[#FF3366] transition-colors"
                />
                <span className="text-[10px] text-[#A89886] font-mono block">
                  Enter key capabilities separated by commas. These will render as bullet pills on the card.
                </span>
              </div>

              {/* Full Narrative Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider font-semibold">
                  Full Venture Narrative (Expanded)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the full mission, technology stack, and business model of this venture..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white placeholder-white/25 text-sm font-light focus:outline-none focus:border-[#FF3366] transition-colors resize-none"
                />
              </div>

              {/* Image URL with preview */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#DFC17B] uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                  <ImageIcon className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Venture Image URL (Cover Photo)</span>
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#10030B] border border-[#C9A84C]/40 text-white placeholder-white/25 text-sm font-mono focus:outline-none focus:border-[#FF3366] transition-colors"
                />
                {formData.image && (
                  <div className="mt-2 w-36 h-20 rounded-xl overflow-hidden border border-white/20">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab("list");
                  }}
                  className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-mono font-semibold transition-all cursor-pointer"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={isSavingCloud}
                  className={cn(
                    "px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3366] via-[#E23E6E] to-[#C9A84C] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(255,51,102,0.4)] transition-all cursor-pointer",
                    isSavingCloud ? "opacity-75 cursor-wait" : "hover:scale-105"
                  )}
                >
                  {isSavingCloud ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#DFC17B]" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>
                    {isSavingCloud
                      ? "SAVING TO GLOBAL CLOUD..."
                      : editingId
                      ? "SAVE CHANGES TO CARD"
                      : "ADD CARD TO ECOSYSTEM"}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* ════════ TAB 3: STATS & VENTURE NUMBERS ════════ */}
          {activeTab === "stats" && (
            <form onSubmit={handleSaveStats} className="space-y-6">
              <div className="p-4 rounded-xl border border-[#C9A84C]/40 bg-[#1D0C15]/80">
                <span className="text-[10px] font-mono text-[#DFC17B] uppercase tracking-widest font-semibold block mb-1">
                  DYNAMIC STATS & METRICS CONFIGURATION
                </span>
                <p className="text-xs text-[#D8D4CC] font-light leading-relaxed">
                  Modify the high-level counters rendered across the site (About monolithic stats ribbon, Header badges, and Footer credentials).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl border border-white/10 bg-[#14030D] space-y-2">
                  <label className="text-xs font-mono text-[#DFC17B] uppercase tracking-wider font-semibold block">
                    Active Ventures Counter *
                  </label>
                  <input
                    type="text"
                    required
                    value={stats.activeVentures}
                    onChange={(e) => setStats({ ...stats, activeVentures: e.target.value })}
                    placeholder="e.g. 05+ or 5+"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090105] border border-[#C9A84C]/40 text-[#DFC17B] font-serif text-2xl font-bold focus:outline-none focus:border-[#FF3366]"
                  />
                  <span className="text-[10px] text-[#A89886] font-mono block">
                    Default is <strong className="text-white">05+</strong>. You can change this to 5+, 06+, 10+, etc.
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-[#14030D] space-y-2">
                  <label className="text-xs font-mono text-[#DFC17B] uppercase tracking-wider font-semibold block">
                    Founders Count
                  </label>
                  <input
                    type="text"
                    value={stats.totalFounders}
                    onChange={(e) => setStats({ ...stats, totalFounders: e.target.value })}
                    placeholder="06"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090105] border border-[#C9A84C]/40 text-[#DFC17B] font-serif text-2xl font-bold focus:outline-none focus:border-[#FF3366]"
                  />
                  <span className="text-[10px] text-[#A89886] font-mono block">
                    Displayed in the About ribbon and closing thesis.
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-[#14030D] space-y-2">
                  <label className="text-xs font-mono text-[#DFC17B] uppercase tracking-wider font-semibold block">
                    Shared Vision Number
                  </label>
                  <input
                    type="text"
                    value={stats.sharedVision}
                    onChange={(e) => setStats({ ...stats, sharedVision: e.target.value })}
                    placeholder="01"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090105] border border-[#C9A84C]/40 text-[#DFC17B] font-serif text-2xl font-bold focus:outline-none focus:border-[#FF3366]"
                  />
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-[#14030D] space-y-2">
                  <label className="text-xs font-mono text-[#DFC17B] uppercase tracking-wider font-semibold block">
                    Established Year
                  </label>
                  <input
                    type="text"
                    value={stats.established}
                    onChange={(e) => setStats({ ...stats, established: e.target.value })}
                    placeholder="2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090105] border border-[#C9A84C]/40 text-[#DFC17B] font-serif text-2xl font-bold focus:outline-none focus:border-[#FF3366]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSavingCloud}
                  className={cn(
                    "px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#DFC17B] to-[#C9A84C] text-[#120A0E] text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(201,168,76,0.35)] transition-all cursor-pointer",
                    isSavingCloud ? "opacity-75 cursor-wait" : "hover:scale-105"
                  )}
                >
                  {isSavingCloud ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#120A0E]" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>
                    {isSavingCloud ? "SAVING NUMBERS TO CLOUD..." : "SAVE ECOSYSTEM NUMBERS"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
