"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionAtmosphere from "@/components/ecosystem/SectionAtmosphere";
import {
  VentureItem,
  getStoredVentures,
  subscribeVenturesStore,
  syncWithCloud,
  INITIAL_VENTURES,
} from "@/lib/venturesStore";

export type { VentureItem };
export const VENTURES = INITIAL_VENTURES;

export default function Ventures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [venturesList, setVenturesList] = useState<VentureItem[]>(INITIAL_VENTURES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setVenturesList(getStoredVentures());
    syncWithCloud();
    return subscribeVenturesStore(() => {
      setVenturesList(getStoredVentures());
    });
  }, []);

  const totalCount = venturesList.length || 1;

  // Auto-advance cards right-to-left every 3.0 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCount);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, totalCount]);

  // Keep activeIndex within bounds if list length shrinks
  useEffect(() => {
    if (activeIndex >= totalCount) {
      setActiveIndex(0);
    }
  }, [totalCount, activeIndex]);

  // Manual next/prev navigation
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCount) % totalCount);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3500);
  }, [totalCount]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCount);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3500);
  }, [totalCount]);

  // Pointer drag/swipe gestures for mouse and touch
  const dragStartX = useRef<number | null>(null);
  const dragDistance = useRef<number>(0);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPaused(true);
    dragStartX.current = e.clientX;
    dragDistance.current = 0;
    isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    dragDistance.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDistance.current < -40) {
      // Swiped left -> advance right to left
      handleNext();
    } else if (dragDistance.current > 40) {
      // Swiped right -> go prev
      handlePrev();
    }
    dragStartX.current = null;
    dragDistance.current = 0;
    setTimeout(() => setIsPaused(false), 3000);
  };

  // 3-Card Carousel Position: Middle active, Left and Right faded (Hardware-accelerated GPU Composited)
  const getCardPositionStyle = (index: number) => {
    const diff = (index - activeIndex + totalCount) % totalCount;

    // Center Active Card
    if (diff === 0) {
      return {
        transform: "translate3d(0px, 0, 0) scale(1)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
      };
    }

    // Right Card (Next in queue — Faded on right)
    if (diff === 1) {
      return {
        transform: "translate3d(280px, 0, 0) scale(0.86)",
        opacity: 0.45,
        zIndex: 10,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
      };
    }

    // Left Card (Previous — Faded on left)
    if (diff === totalCount - 1) {
      return {
        transform: "translate3d(-280px, 0, 0) scale(0.86)",
        opacity: 0.45,
        zIndex: 10,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
      };
    }

    // Other cards (Hidden off-stage)
    const isAhead = diff < totalCount / 2;
    return {
      transform: `translate3d(${isAhead ? 460 : -460}px, 0, 0) scale(0.7)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none" as const,
      visibility: "hidden" as const,
    };
  };

  return (
    <section
      id="ventures"
      ref={sectionRef}
      className="relative w-full bg-transparent text-[#1A1A1A] overflow-hidden scroll-mt-[60px]"
    >
      {/* ── VENTURES ATMOSPHERE: OPTIMIZED SINGLE ATMOSPHERE CANVAS ── */}
      <SectionAtmosphere butterflyType="rose" butterflyCount={3} petalCount={34} className="z-[3]" />

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP 3-CARD CAROUSEL STAGE (>= 1024px)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative hidden lg:flex min-h-screen w-full items-center justify-between px-[4vw] md:px-[5vw] lg:px-[72px] py-16 z-10 overflow-hidden">
        {/* Ambient forest green & warm amber glow for Ventures depth */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 85% 50%, rgba(68, 88, 56, 0.24) 0%, rgba(92, 114, 78, 0.10) 50%, transparent 80%), radial-gradient(ellipse 60% 40% at 20% 35%, rgba(201, 168, 76, 0.08) 0%, transparent 75%)",
          }}
        />

        {/* ── 3RD SECTION SAKURA BRANCH ACCENT (Top-Left Framing) ── */}
        <div
          className="absolute top-[-10px] left-[-20px] pointer-events-none z-[2] select-none overflow-visible opacity-85 hidden lg:block"
          style={{
            width: "clamp(300px, 28vw, 460px)",
          }}
        >
          <img
            src="/images/sakura-branch-intermediate.webp"
            alt="Ventures Sakura Branch Accent"
            className="w-full h-auto object-contain pointer-events-none"
            loading="eager"
            decoding="async"
            style={{
              transform: "rotate(12deg) translateZ(0)",
              transformOrigin: "top left",
              willChange: "transform",
            }}
          />
        </div>

        {/* Left Column: Fixed Institutional Manifesto & Japanese Telemetry Plinth (PROTECTED z-30) */}
        <div className="w-[38%] max-w-[430px] flex flex-col justify-center space-y-6 select-none relative z-30 pointer-events-auto">
          {/* Section Header Tag */}
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1.5px] bg-[#C9A84C]" />
            <span
              className="text-[11px] font-mono tracking-[0.28em] text-[#C9A84C] uppercase font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              003 / OUR VENTURES
            </span>
          </div>

          {/* Main Display Headline */}
          <div className="space-y-1.5">
            <h2
              className="text-[clamp(36px,3.8vw,56px)] font-serif font-light tracking-[-0.03em] leading-[1.08] text-[#1A1A1A]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                textShadow: "0 1px 16px rgba(255, 255, 255, 0.95)",
              }}
            >
              Six Ventures. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#B89332] to-[#8C6D1F]">
                One Vision.
              </span>
            </h2>
            <p className="text-[13.5px] leading-relaxed text-[#2C2C34] font-normal max-w-[390px] pt-1">
              LGC incubates and scales autonomous enterprises across medical
              digital systems, frontier AI models, creator matchmaking, and urban
              clean mobility.
            </p>
          </div>

          {/* Telemetry Card — Japanese Black Urushi & Deep Maroon Plinth */}
          <div
            className="p-6 rounded-2xl border border-[#C9A84C]/50 shadow-[0_20px_50px_rgba(20,8,12,0.18)] relative overflow-hidden bg-[#180C14]"
            style={{
              background:
                "linear-gradient(145deg, #180C14 0%, #280E1A 50%, #0F0E13 100%)",
            }}
          >
            {/* Gold Corner Trim (Japanese Certificate Style) */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C9A84C] pointer-events-none" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C9A84C] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C9A84C] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C9A84C] pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span
                  className="text-[10px] font-mono tracking-widest text-[#DFC17B] uppercase bg-[#4A121A]/90 px-2.5 py-0.5 rounded border border-[#C9A84C]/40 font-semibold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  FOCUS {(venturesList[activeIndex] || venturesList[0] || INITIAL_VENTURES[0]).num}
                </span>
                <span className="text-[11.5px] text-[#D8D0C0] font-mono">
                  {(venturesList[activeIndex] || venturesList[0] || INITIAL_VENTURES[0]).tag}
                </span>
              </div>
              <span
                className="text-2xl font-serif text-[#C9A84C]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {(venturesList[activeIndex] || venturesList[0] || INITIAL_VENTURES[0]).kanjiNum}
              </span>
            </div>

            <h3
              className="text-xl font-serif text-white tracking-wide font-normal mb-1.5 flex items-center justify-between"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span>{(venturesList[activeIndex] || venturesList[0] || INITIAL_VENTURES[0]).name}</span>
              <span className="text-[11px] font-mono font-semibold text-[#DFC17B]">
                {(venturesList[activeIndex] || venturesList[0] || INITIAL_VENTURES[0]).status}
              </span>
            </h3>

            <p className="text-[12.5px] leading-relaxed text-[#D8D4CC]">
              {(venturesList[activeIndex] || venturesList[0] || INITIAL_VENTURES[0]).description}
            </p>

            <div className="mt-4 pt-3 border-t border-[#C9A84C]/25 flex items-center justify-between text-[11px] font-mono text-[#A8A096]">
              <span className="tracking-wide">
                {isPaused ? "PAUSED // SWIPE OR CLICK" : "AUTOPLAYING RIGHT TO LEFT"}
              </span>
              <span className="text-[#C9A84C] font-semibold">
                0{activeIndex + 1} / {totalCount < 10 ? `0${totalCount}` : totalCount}
              </span>
            </div>
          </div>

          {/* Stepper Navigation: Left/Right Arrows & Dots */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2.5">
              {venturesList.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Jump to ${item.name}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 3500);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "w-8 bg-gradient-to-r from-[#C9A84C] to-[#DFC17B]"
                      : "w-2 bg-[#4A121A]/50 hover:bg-[#C9A84C]/60"
                  }`}
                />
              ))}
            </div>

            {/* Quick manual slide arrows */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous card"
                className="w-8 h-8 rounded-lg bg-[#180C14]/80 border border-[#C9A84C]/40 text-[#DFC17B] flex items-center justify-center hover:bg-[#C9A84C] hover:text-[#180C14] transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next card"
                className="w-8 h-8 rounded-lg bg-[#180C14]/80 border border-[#C9A84C]/40 text-[#DFC17B] flex items-center justify-center hover:bg-[#C9A84C] hover:text-[#180C14] transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 3-Card Stage with Middle Card and Faded Sides */}
        <div
          className="w-[58%] h-[560px] flex items-center justify-center relative z-20 pointer-events-auto cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Card Carousel Frame */}
          <div className="relative w-[350px] h-[500px] flex items-center justify-center">
            {venturesList.map((venture, index) => {
              const isSelected = index === activeIndex;
              const posStyle = getCardPositionStyle(index);

              return (
                <div
                  key={venture.id}
                  onClick={() => {
                    if (!isSelected) {
                      setActiveIndex(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 3500);
                    }
                  }}
                  className="absolute left-0 top-0 select-none cursor-pointer"
                  style={{
                    width: "350px",
                    height: "490px",
                    transform: posStyle.transform,
                    opacity: posStyle.opacity,
                    zIndex: posStyle.zIndex,
                    pointerEvents: posStyle.pointerEvents,
                    visibility: posStyle.visibility,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                    transition:
                      "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* GPU-composited shadow overlays (Zero repaint on slide) */}
                  <div
                    className="absolute inset-0 rounded-[22px] pointer-events-none transition-opacity duration-700 ease-out"
                    style={{
                      opacity: isSelected ? 1 : 0,
                      boxShadow: "0 24px 60px rgba(24, 12, 20, 0.65), 0 0 35px rgba(201, 168, 76, 0.35)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-[22px] pointer-events-none transition-opacity duration-700 ease-out"
                    style={{
                      opacity: !isSelected ? 0.45 : 0,
                      boxShadow: "0 14px 35px rgba(0, 0, 0, 0.35)",
                    }}
                  />

                  {/* Japanese 3D Paper Plinth Card in Solid Black & Maroon */}
                  <div
                    className={`relative w-full h-full rounded-[22px] overflow-hidden flex flex-col justify-between transition-colors duration-300 ${
                      isSelected
                        ? "ring-1.5 ring-[#C9A84C]"
                        : "ring-1 ring-[#C9A84C]/35 hover:ring-[#C9A84C]/60"
                    }`}
                    style={{
                      background:
                        "linear-gradient(150deg, #180C14 0%, #280E1A 45%, #100F15 100%)",
                    }}
                  >
                    {/* Top Gold Foil Accent Rim */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

                    {/* Traditional Japanese Red Hanko Seal Stamp */}
                    <div className="absolute top-4 right-4 z-10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-lg bg-[#4A121A] border-2 border-[#C9A84C]/70 shadow-[0_0_12px_rgba(201,168,76,0.25)] flex items-center justify-center">
                        <span
                          className="text-xs font-serif font-bold text-[#DFC17B]"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {venture.kanjiTag}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 pb-2">
                      {/* Status & Sector Header */}
                      <div className="flex items-center space-x-2.5 mb-3">
                        <span
                          className="text-[11px] font-mono tracking-widest text-[#DFC17B] font-bold uppercase"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {`${venture.num} // ${venture.tag}`}
                        </span>
                        {venture.isComplete ? (
                          <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {venture.status === "INTERNAL STEALTH" ? "STEALTH" : "IN DEV"}
                          </span>
                        )}
                      </div>

                      {/* Venture Project Visual Snapshot */}
                      <div className="relative w-full h-[190px] rounded-xl overflow-hidden mb-4 bg-black/60 border border-[#C9A84C]/35">
                        <img
                          src={venture.image}
                          alt={`${venture.name} — ${venture.tag} Venture by Lashkari Group`}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#180C14] via-transparent to-transparent opacity-85" />
                        <div className="absolute bottom-2 left-2.5">
                          <span className="text-[9.5px] font-mono text-[#DFC17B] tracking-wider uppercase bg-black/80 px-2 py-0.5 rounded border border-[#C9A84C]/40">
                            {venture.subdomain}
                          </span>
                        </div>
                      </div>

                      {/* Title & Elevator Pitch */}
                      <h3
                        className="text-2xl font-serif tracking-wide text-white font-medium mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {venture.name}
                      </h3>
                      <p className="text-[12.5px] leading-relaxed text-[#D8D4CC] line-clamp-2">
                        {venture.short}
                      </p>
                    </div>

                    {/* Features Micro-Chips */}
                    <div className="px-5 py-1.5 flex flex-wrap gap-1.5">
                      {venture.features.slice(0, 3).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[10px] font-mono text-[#DFC17B] bg-[#4A121A]/50 border border-[#C9A84C]/30 px-2 py-0.5 rounded-md"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer: Subdomain Action Button */}
                    <div className="p-5 pt-3 border-t border-[#C9A84C]/25 bg-[#0F080D] flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-[#A89886] uppercase tracking-wider">
                          PORTAL ACCESS
                        </span>
                        <span className="text-[11px] font-mono text-white/90 font-medium truncate max-w-[150px]">
                          {venture.subdomain}
                        </span>
                      </div>

                      <a
                        href={venture.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-[11px] font-mono font-semibold tracking-wider transition-all duration-300 ${
                          venture.isComplete
                            ? "bg-gradient-to-r from-[#C9A84C] to-[#DFC17B] text-[#120A0E] shadow-[0_0_18px_rgba(201,168,76,0.4)] hover:scale-105"
                            : "bg-[#4A121A]/80 hover:bg-[#C9A84C]/20 text-[#DFC17B] border border-[#C9A84C]/50"
                        }`}
                      >
                        <span>
                          {venture.isComplete ? "VISIT SITE" : "PREVIEW"}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE & TABLET: HORIZONTAL CARD RAIL (< 1024px)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden w-full px-5 py-14 sm:px-8 relative z-10">
        <div className="space-y-2.5 mb-8 text-left">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[1.5px] bg-[#C9A84C]" />
            <span
              className="text-[11px] font-mono tracking-[0.25em] text-[#C9A84C] uppercase font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              003 / OUR VENTURES
            </span>
          </div>
          <h2
            className="text-[32px] sm:text-[40px] font-serif font-light text-[#1A1A1A] leading-[1.12]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Six Ventures. <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#8C6D1F]">
              One Vision.
            </span>
          </h2>
          <p className="text-[13px] leading-relaxed text-[#2C2C34] pt-1">
            LGC creates, builds, and scales autonomous ventures across medical
            digital presence, frontier AI models, creator matchmaking, and urban
            mobility.
          </p>
        </div>

        {/* Scrollable Horizontal Rail */}
        <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:-mx-8 sm:px-8">
          {venturesList.map((venture) => (
            <div
              key={venture.id}
              className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center rounded-[20px] overflow-hidden flex flex-col justify-between border border-[#C9A84C]/45 shadow-[0_16px_40px_rgba(74,18,26,0.35)] relative"
              style={{
                background:
                  "linear-gradient(150deg, #180C14 0%, #280E1A 50%, #100F15 100%)",
              }}
            >
              <div className="p-5 pb-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono text-[#DFC17B] font-bold tracking-wider uppercase">
                    {`${venture.num} // ${venture.tag}`}
                  </span>
                  {venture.isComplete ? (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {venture.status === "INTERNAL STEALTH" ? "STEALTH" : "IN DEV"}
                    </span>
                  )}
                </div>

                <div className="relative w-full h-[135px] rounded-xl overflow-hidden mb-3 bg-black/60 border border-[#C9A84C]/35">
                  <img
                    src={venture.image}
                    alt={`${venture.name} — ${venture.tag} Venture by Lashkari Group`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#DFC17B] bg-black/80 px-2 py-0.5 rounded border border-[#C9A84C]/40">
                    {venture.subdomain}
                  </div>
                </div>

                <h3
                  className="text-xl font-serif text-white font-medium mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {venture.name}
                </h3>
                <p className="text-[12px] leading-relaxed text-[#D8D4CC] line-clamp-2">
                  {venture.short}
                </p>
              </div>

              <div className="px-5 py-1.5 flex flex-wrap gap-1">
                {venture.features.slice(0, 3).map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[9.5px] font-mono text-[#DFC17B] bg-[#4A121A]/40 border border-[#C9A84C]/30 px-2 py-0.5 rounded"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              <div className="p-5 pt-3 border-t border-[#C9A84C]/25 bg-[#0D070B] flex items-center justify-between">
                <span className="text-[10.5px] font-mono text-white/90 font-medium truncate max-w-[140px]">
                  {venture.subdomain}
                </span>

                <a
                  href={venture.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10.5px] font-mono font-semibold ${
                    venture.isComplete
                      ? "bg-[#C9A84C] text-[#120A0E]"
                      : "bg-[#4A121A]/80 text-[#DFC17B] border border-[#C9A84C]/50"
                  }`}
                >
                  <span>{venture.isComplete ? "VISIT SITE" : "PREVIEW"}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-[11px] font-mono text-[#8C6D1F] pt-2">
          ← SWIPE TO VIEW ALL VENTURES →
        </div>
      </div>
    </section>
  );
}
