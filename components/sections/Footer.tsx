"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Mail, MapPin, Send, Sparkles, Building, Globe, CheckCircle2, ShieldCheck } from "lucide-react";
import SectionAtmosphere from "@/components/ecosystem/SectionAtmosphere";
import VentureAdminModal from "@/components/admin/VentureAdminModal";
import { getStoredVentures, subscribeVenturesStore, syncWithCloud, VentureItem } from "@/lib/venturesStore";

export default function Footer() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [portals, setPortals] = useState<VentureItem[]>([]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Executive Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rateLimitNotice, setRateLimitNotice] = useState<string | null>(null);

  useEffect(() => {
    setPortals(getStoredVentures());
    syncWithCloud();
    return subscribeVenturesStore(() => {
      setPortals(getStoredVentures());
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Rate Limiting: Max 3 submissions per 10 minutes
    const now = Date.now();
    let timestamps: number[] = [];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lgc_contact_rate_limit");
      if (stored) {
        try {
          timestamps = JSON.parse(stored);
        } catch {
          timestamps = [];
        }
      }
    }

    // Filter to last 10 minutes (600,000 ms)
    timestamps = timestamps.filter((t) => now - t < 600000);

    if (timestamps.length >= 3) {
      const oldest = timestamps[0];
      const waitMins = Math.ceil((600000 - (now - oldest)) / 60000);
      setRateLimitNotice(
        `Rate limit active: Maximum 3 transmissions per 10 minutes. Please wait ${waitMins} minute${waitMins > 1 ? "s" : ""} before sending another inquiry.`
      );
      return;
    }

    setSubmitting(true);
    setRateLimitNotice(null);

    timestamps.push(now);
    if (typeof window !== "undefined") {
      localStorage.setItem("lgc_contact_rate_limit", JSON.stringify(timestamps));
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="relative w-full overflow-hidden bg-transparent">


      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5: CONTACT & EXECUTIVE GATEWAY (#contact)
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="relative w-full pt-28 pb-28 text-[#1A1A1A] scroll-mt-[90px]"
      >
        {/* Atmosphere: Optimized Single Canvas Atmosphere */}
        <SectionAtmosphere butterflyType="rose" butterflyCount={3} petalCount={34} className="z-[2]" />

        {/* Ambient Forest & Warm Gold Lighting (GPU-Accelerated) */}
        <div
          className="absolute top-0 right-[-10vw] w-[50vw] h-[550px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(68, 88, 56, 0.16) 0%, rgba(92, 114, 78, 0.08) 40%, rgba(92, 114, 78, 0.02) 65%, transparent 85%)",
          }}
        />

        <div className="relative z-10 max-w-[1540px] mx-auto px-[4vw] md:px-[5vw] lg:px-[72px]">
          {/* Section Header */}
          <div className="space-y-3 mb-14 text-left">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1.5px] bg-[#C9A84C]" />
              <span
                className="text-[11px] font-mono tracking-[0.28em] text-[#C9A84C] uppercase font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                005 / CONTACT // EXECUTIVE DISPATCH
              </span>
            </div>

            <h2
              className="text-[clamp(38px,4.5vw,68px)] font-serif font-light text-[#1A1A1A] leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Initiate <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#B89332] to-[#8C6D1F]">
                Institutional Connection.
              </span>
            </h2>

            <p className="text-[14px] leading-relaxed text-[#2C2C34] max-w-[580px] font-normal pt-1">
              Whether exploring strategic venture syndication, institutional partnerships, or executive advisory, our private office welcomes high-conviction dialogue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            {/* Left: Contact Form Card */}
            <div
              className="p-8 sm:p-10 rounded-[26px] border border-[#C9A84C]/45 relative overflow-hidden select-none"
              style={{
                background:
                  "linear-gradient(145deg, #180C14 0%, #280E1A 50%, #0F0E13 100%)",
                boxShadow:
                  "0 24px 60px rgba(0, 0, 0, 0.32), 0 0 45px rgba(201, 168, 76, 0.12)",
              }}
            >
              {/* Gold Top Hairline Rim */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

              {/* Japanese Certificates Corners */}
              <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C9A84C] pointer-events-none" />
              <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C9A84C] pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C9A84C] pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C9A84C] pointer-events-none" />

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3
                    className="text-2xl font-serif text-white font-medium"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Transmission Received
                  </h3>
                  <p className="text-[13px] text-[#D8D4CC] max-w-[380px] mx-auto leading-relaxed font-light">
                    Your dispatch has been registered in the LGC executive queue. Our principal team will respond within one business cycle.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-xl text-[11px] font-mono font-semibold text-[#DFC17B] border border-[#C9A84C]/50 hover:bg-[#C9A84C]/20 transition-all cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#DFC17B] font-semibold">
                        Full Name / Principal
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Dr. Arthur Vance"
                        className="w-full px-4 py-3 rounded-xl bg-[#10070D] border border-[#C9A84C]/35 text-white placeholder-white/30 text-[13px] font-light focus:outline-none focus:border-[#C9A84C] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#DFC17B] font-semibold">
                        Direct Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="principal@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#10070D] border border-[#C9A84C]/35 text-white placeholder-white/30 text-[13px] font-light focus:outline-none focus:border-[#C9A84C] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#DFC17B] font-semibold">
                      Subject / Venture Area
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#10070D] border border-[#C9A84C]/35 text-white text-[13px] font-light focus:outline-none focus:border-[#C9A84C] transition-colors"
                    >
                      <option value="General Executive Inquiry">General Executive Inquiry</option>
                      <option value="PEROIX (Web & Digital Presence)">PEROIX (Web & Digital Presence)</option>
                      <option value="VOIDEX (Frontier AI & NATSU)">VOIDEX (Frontier AI & NATSU)</option>
                      <option value="MEETRIX (Creator Matchmaking)">MEETRIX (Creator Matchmaking)</option>
                      <option value="FOODTRAF (Subscription Dining)">FOODTRAF (Subscription Dining)</option>
                      <option value="LASHKARI MOBILITY (Clean Urban Transit)">LASHKARI MOBILITY (Clean Urban Transit)</option>
                      <option value="QUANT AUTOMATION (Trading Systems)">QUANT AUTOMATION (Trading Systems)</option>
                      <option value="Institutional Capital / Investment">Institutional Capital / Investment</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#DFC17B] font-semibold">
                      Executive Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline your inquiry, proposal, or institutional background..."
                      className="w-full px-4 py-3 rounded-xl bg-[#10070D] border border-[#C9A84C]/35 text-white placeholder-white/30 text-[13px] font-light focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                    />
                  </div>

                  {rateLimitNotice && (
                    <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/15 text-amber-200 text-xs font-mono">
                      {rateLimitNotice}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#DFC17B] text-[#120A0E] text-[12px] font-mono font-bold tracking-widest uppercase flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(201,168,76,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <span>TRANSMITTING DISPATCH...</span>
                    ) : (
                      <>
                        <span>SEND TRANSMISSION</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* Alternate Institutional CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <a
                      href="mailto:lashkarigroupofcompanies@gmail.com?subject=LGC%20Executive%20Dossier%20Request"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#C9A84C]/35 bg-white/5 hover:bg-[#C9A84C]/15 text-[#DFC17B] text-[11px] font-mono tracking-wider text-center transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>REQUEST GROUP DOSSIER</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#ventures"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[11px] font-mono tracking-wider text-center transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>EXPLORE 6 VENTURES</span>
                      <span>→</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Institutional Credentials & Status */}
            <div className="space-y-6 select-none">
              {/* Physical/Virtual Headquarters Status Box */}
              <div className="p-7 rounded-2xl border border-[#C9A84C]/35 bg-[#180C14]/90 space-y-4">
                <div className="flex items-center space-x-2.5 text-[#C9A84C]">
                  <Building className="w-4 h-4 text-[#DFC17B]" />
                  <span className="text-[10.5px] font-mono tracking-widest uppercase font-semibold">
                    ENTERPRISE PRESENCE
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-[10px] font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SOVEREIGN NETWORK // DIGITAL-FIRST HQ</span>
                  </div>
                  <h4
                    className="text-xl font-serif text-white font-medium pt-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Flagship Physical Campus in Horizon
                  </h4>
                  <p className="text-[12.5px] text-[#D8D4CC] leading-relaxed font-light">
                    LGC currently operates across high-speed decentralized nodes connecting our six ventures. Groundbreaking for the permanent physical LGC Headquarters Campus is scheduled for 2026.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C9A84C]/25 flex flex-col space-y-2 text-[11px] font-mono text-[#A89886]">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Current Operations: Ahmedabad · Mumbai · Remote Cloud Nodes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Executive Email: lashkarigroupofcompanies@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Domain: lashkarigroup.online</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Connection Channels */}
              <div className="p-6 rounded-2xl border border-[#C9A84C]/25 bg-[#14080F]/70 flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] font-mono text-[#A89886] uppercase tracking-wider">
                    DIRECT OFFICE
                  </span>
                  <div className="text-white text-sm font-mono font-medium pt-0.5">
                    lashkarigroupofcompanies@gmail.com
                  </div>
                </div>
                <a
                  href="mailto:lashkarigroupofcompanies@gmail.com"
                  className="px-4 py-2 rounded-xl bg-[#4A121A]/80 border border-[#C9A84C]/50 text-[#DFC17B] text-[11px] font-mono font-semibold hover:bg-[#C9A84C] hover:text-[#180C14] transition-all inline-flex items-center space-x-1.5"
                >
                  <span>WRITE EMAIL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          GRAND FINALE: DEEP GREENISH SYLVA FOOTER
          ══════════════════════════════════════════════════════════════════════ */}
      <footer
        className="relative w-full text-[#ECE8E1] pt-16 pb-12 select-none border-t border-[#C9A84C]/35"
        style={{
          background:
            "linear-gradient(180deg, #0E1A11 0%, #08120B 100%)",
        }}
      >
        {/* BOTANICAL ACCENT: NEW SAKURA BRANCH EMERGING FROM FOOTER SEAM */}
        <div
          className="absolute -top-[135px] -left-[40px] pointer-events-none z-20 select-none overflow-visible opacity-95 hidden lg:block"
          style={{
            width: "clamp(380px, 35vw, 560px)",
          }}
        >
          <img
            src="/images/sakura-branch-intermediate.webp"
            alt="Lashkari Group Imperial Sakura Botanical Art Finale"
            className="w-full h-auto object-contain pointer-events-none"
            style={{
              transform: "rotate(-8deg) scaleY(-1)",
              transformOrigin: "left center",
              filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.25))",
            }}
          />
        </div>

        {/* Subtle Gold Hairline along Top of Footer */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        {/* Ambient Forest Glow in Background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(68, 88, 56, 0.25) 0%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-[1540px] mx-auto px-[4vw] md:px-[5vw] lg:px-[72px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-[#C9A84C]/20">
            {/* Col 1: LGC Identity */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <span
                  className="text-3xl font-serif tracking-[0.45em] text-[#DFC17B] font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  L G C
                </span>
                <span
                  className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#A3B899] mt-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  001 / EST. 2026
                </span>
              </div>

              <p className="text-[12.5px] leading-relaxed text-[#BAC7B5] font-light max-w-[280px]">
                Lashkari Group of Companies builds, funds, and operates autonomous ventures across medical digital presence, frontier intelligence, creator matchmaking, and urban mobility.
              </p>

              <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-[#C9A84C] bg-[#142618] px-3 py-1 rounded-full border border-[#C9A84C]/30">
                <Sparkles className="w-3 h-3 text-[#C9A84C]" />
                <span>SIX MINDS · ONE VISION</span>
              </div>
            </div>

            {/* Col 2: Institutional Navigation */}
            <div className="space-y-3">
              <span
                className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#C9A84C] font-semibold block"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                DIRECTORY
              </span>
              <ul className="space-y-2 text-[12.5px] font-light text-[#D5DDD2]">
                <li>
                  <a href="#" className="hover:text-[#C9A84C] transition-colors">01 // Home Genesis</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#C9A84C] transition-colors">02 // About Philosophy</a>
                </li>
                <li>
                  <a href="#ventures" className="hover:text-[#C9A84C] transition-colors">03 // Active Ventures</a>
                </li>
                <li>
                  <a href="#founders" className="hover:text-[#C9A84C] transition-colors">04 // Founding Leadership</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#C9A84C] transition-colors">05 // Executive Contact</a>
                </li>
              </ul>
            </div>

            {/* Col 3: The Venture Portals (Dynamic from Store) */}
            <div className="space-y-3">
              <span
                className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#C9A84C] font-semibold block"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                VENTURE PORTALS ({portals.length})
              </span>
              <ul className="space-y-2 text-[12px] font-mono text-[#BAC7B5]">
                {portals.slice(0, 8).map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white flex items-center space-x-1 transition-colors"
                    >
                      <span>
                        {item.num || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`)} · {item.name}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-[#C9A84C]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Executive Headquarters & Statutory */}
            <div className="space-y-3">
              <span
                className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#C9A84C] font-semibold block"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                GOVERNANCE & STATUTORY
              </span>
              <p className="text-[12px] text-[#A8BCA0] leading-relaxed font-light">
                Registered under the Lashkari sovereign enterprise charter. Built on zero third-party dependency, proprietary IP, and autonomous capital allocation.
              </p>
              
              {/* MSME Statutory Badge */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#0E1F14] to-[#08120B] border border-[#C9A84C]/40 space-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="tracking-wider text-[#DFC17B]">MSME CERTIFIED BUSINESS</span>
                </div>
                <div className="text-[11px] font-mono text-white tracking-widest font-bold">
                  UDYAM-GJ-01-0689750
                </div>
                <div className="text-[10px] text-[#8C9E87] leading-tight">
                  Ministry of MSME, Govt. of India
                </div>
              </div>

              <div className="pt-1 text-[11px] font-mono text-[#DFC17B]">
                CHAIRMAN & CEO OFFICE
              </div>
              <div className="text-[11px] font-mono text-[#BAC7B5]">
                lashkarigroupofcompanies@gmail.com
              </div>
            </div>
          </div>

          {/* ── MSME STATUTORY CERTIFICATION PLINTH (GOVT. OF INDIA) ── */}
          <div className="my-8 p-5 sm:p-6 rounded-2xl border border-[#C9A84C]/50 bg-gradient-to-r from-[#140610] via-[#0E1F14] to-[#140610] shadow-[0_12px_45px_rgba(0,0,0,0.6),0_0_24px_rgba(201,168,76,0.18)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1A3322] border border-[#C9A84C]/70 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                <ShieldCheck className="w-6 h-6 text-[#DFC17B]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#C9A84C] font-bold">
                    MSME REGISTERED ENTERPRISE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-semibold tracking-wider">
                    GOVT. OF INDIA VERIFIED
                  </span>
                </div>
                <h4
                  className="text-base sm:text-lg font-serif text-white font-medium tracking-wide mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Udyam Registration No. <span className="font-mono text-[#DFC17B] font-bold tracking-widest text-sm sm:text-base">UDYAM-GJ-01-0689750</span>
                </h4>
              </div>
            </div>

            <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-white/10 w-full md:w-auto">
              <p className="text-[12.5px] text-[#D5DDD2] font-light max-w-md leading-relaxed">
                Registered with the Ministry of Micro, Small & Medium Enterprises, Government of India.
              </p>
              <span className="text-[10px] font-mono text-[#8C9E87] tracking-[0.2em] block mt-1 uppercase">
                OFFICIALLY RECOGNIZED SOVEREIGN COMMERCIAL ENTERPRISE · GUJARAT, INDIA
              </span>
            </div>
          </div>

          {/* Bottom Copyright Bar with Clickable © Console Key */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8C9E87] space-y-3 sm:space-y-0">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="relative inline-flex items-center justify-center w-6 h-6 sm:w-5 sm:h-5 rounded-full border border-[#C9A84C]/70 text-[#DFC17B] hover:text-[#120A0E] hover:bg-[#C9A84C] hover:border-[#DFC17B] transition-all duration-200 mr-2.5 cursor-pointer shadow-[0_0_14px_rgba(201,168,76,0.4)] group align-middle before:absolute before:-inset-2.5 before:content-[''] touch-manipulation shrink-0"
                title="Open LGC Executive Console (Password: LGC@2026)"
                aria-label="Open Executive Console"
              >
                <span className="font-serif text-[14px] sm:text-[13px] group-hover:scale-110 transition-transform font-bold select-none pointer-events-none">
                  ©
                </span>
              </button>
              <span>2026 LASHKARI GROUP OF COMPANIES (LGC). ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[#DFC17B]">UDYAM-GJ-01-0689750</span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span>SOVEREIGN ENTERPRISE ARCHITECTURE</span>
              <span className="text-white/30">·</span>
              <span className="text-[#C9A84C]">EST. 2026</span>
            </div>
          </div>
        </div>

        {/* Secret Executive Venture Management Portal */}
        <VentureAdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </footer>
    </div>
  );
}
