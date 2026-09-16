"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Stethoscope, Code2, Rocket, Brain, Layers, Award } from "lucide-react";
import SectionAtmosphere from "@/components/ecosystem/SectionAtmosphere";
import { cn } from "@/lib/utils";

// ── RECTANGULAR/SQUARE PORTRAIT AVATAR WITH LUXURY MONOGRAM FALLBACK ────────
function RectangularPortrait({
  src,
  name,
  className,
  aspect = "card",
  photoPosition,
  scale = 1,
}: {
  src: string;
  name: string;
  className?: string;
  aspect?: "card" | "keynote" | "square";
  photoPosition?: string;
  scale?: number;
}) {
  const [hasError, setHasError] = useState(false);
  // Smart initial: if name starts with "Dr. ", pick the actual name's first letter
  const cleanName = name.replace(/^Dr\.\s*/i, "").trim();
  const initial = cleanName.charAt(0).toUpperCase();

  const aspectClass =
    aspect === "card"
      ? "h-[175px] sm:h-[195px] w-full"
      : aspect === "keynote"
      ? "aspect-[3/3.6] w-full"
      : "aspect-square w-full";

  if (hasError) {
    return (
      <div
        className={cn(
          "w-full rounded-xl border border-[#FF3366]/60 bg-gradient-to-br from-[#4A0A24] via-[#2A0515] to-[#12020A] flex flex-col items-center justify-center relative overflow-hidden select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(30,4,16,0.7)]",
          aspectClass,
          className
        )}
      >
        {/* Subtle Radial Cherry Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(230,30,85,0.25),transparent_70%)] pointer-events-none" />

        {/* Gold Hairline Corner Brackets */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C9A84C] pointer-events-none" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#C9A84C] pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#C9A84C] pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C9A84C] pointer-events-none" />

        <span
          className="text-4xl sm:text-5xl font-serif font-light text-[#DFC17B] drop-shadow-[0_2px_14px_rgba(201,168,76,0.5)]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {initial}
        </span>
        <span
          className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#C9A84C] mt-2 font-semibold"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          PORTRAIT
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-[#FF3366]/50 p-0.5 bg-gradient-to-br from-[#FF3366]/35 via-[#3D081E] to-[#12020A] relative overflow-hidden select-none shadow-[0_12px_35px_rgba(25,3,14,0.6)] group",
        aspectClass,
        className
      )}
    >
      <div className="w-full h-full rounded-[10px] overflow-hidden relative">
        <img
          src={src}
          alt={name}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover rounded-[10px] transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            objectPosition: photoPosition || "center top",
            transform: scale && scale !== 1 ? `scale(${scale})` : undefined,
            transformOrigin: photoPosition || "center top",
          }}
        />
      </div>
      <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-[#12020A]/70 via-transparent to-transparent pointer-events-none" />

      {/* Gold Corner Hairlines */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#C9A84C]/90 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#C9A84C]/90 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#C9A84C]/90 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#C9A84C]/90 pointer-events-none" />
    </div>
  );
}

// ── 5 CO-FOUNDERS DATA SPEC ────────────────────────────────────────────────
const CO_FOUNDERS = [
  {
    id: "01",
    name: "Devashish Chandrana",
    title: "Co-Founder",
    role: "Investor & Financial Advisor",
    background: "MBBS Fellow",
    quote: "The financial brain who keeps our vision grounded in reality.",
    photo: "/images/founders/devashish.jpg",
    photoPosition: "center 82%",
    photoScale: 1.15,
    accent: "#E23E6E",
  },
  {
    id: "02",
    name: "Aneri Patel",
    title: "Co-Founder",
    role: "Marketing Head",
    background: "MBBS Fellow",
    quote: "The strategist who makes sure the right people find us.",
    photo: "/images/founders/aneri.jpg",
    photoPosition: "center 20%",
    photoScale: 1.0,
    accent: "#C9A84C",
  },
  {
    id: "03",
    name: "Payal Gamit",
    title: "Co-Founder",
    role: "Social Media Head",
    background: "MBBS Fellow",
    quote: "The voice that builds our presence across every platform.",
    photo: "/images/founders/payal.jpg",
    photoPosition: "center 20%",
    photoScale: 1.0,
    accent: "#FF2E70",
  },
  {
    id: "04",
    name: "Muskan Shriman",
    title: "Co-Founder",
    role: "Design & Creative Lead",
    background: "MBBS Fellow",
    quote: "The eye behind every pixel, every brand, every beautiful thing we ship.",
    photo: "/images/founders/muskan.jpg",
    photoPosition: "center 15%",
    photoScale: 1.0,
    accent: "#E85D88",
  },
  {
    id: "05",
    name: "Dr. Mitul Lashkari",
    title: "Co-Founder",
    role: "Operations & Management",
    background: "Senior Doctor",
    quote: "The operator who connects people, builds systems, and keeps everything running.",
    photo: "/images/founders/mitul.jpg",
    photoPosition: "center 25%",
    photoScale: 1.05,
    accent: "#C9A84C",
  },
];

export default function Founders() {
  // ── THREEUI-STYLE 3D HORIZONTAL-ONLY CARD WAVE ENGINE ───────────────────
  const [phase, setPhase] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const targetPhaseRef = useRef(0);
  const currentPhaseRef = useRef(0);
  const tiltTargetRef = useRef({ x: 0, y: 0 });
  const tiltCurrentRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPhaseRef = useRef(0);

  const count = CO_FOUNDERS.length;

  const wrappedDelta = useCallback((index: number, currentPhase: number) => {
    let delta = index - currentPhase;
    while (delta > count / 2) delta -= count;
    while (delta < -count / 2) delta += count;
    return delta;
  }, [count]);

  // Smooth continuous animation loop without vertical scroll interception
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(32, now - lastTime);
      lastTime = now;

      // Slow elegant auto-drift when not actively dragging or hovering
      if (!isHovered && !isDraggingRef.current) {
        targetPhaseRef.current += (dt / 1000) * 0.22; // very slow, luxurious drift
      }

      // Smooth easing toward target phase
      const ease = 1 - Math.pow(0.001, dt / 1000);
      currentPhaseRef.current += (targetPhaseRef.current - currentPhaseRef.current) * ease;
      setPhase(currentPhaseRef.current);

      // Smooth 3D tilt interpolation
      tiltCurrentRef.current.x += (tiltTargetRef.current.x - tiltCurrentRef.current.x) * ease * 0.8;
      tiltCurrentRef.current.y += (tiltTargetRef.current.y - tiltCurrentRef.current.y) * ease * 0.8;
      setTilt({ x: tiltCurrentRef.current.x, y: tiltCurrentRef.current.y });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered]);

  // Horizontal Pointer Drag & 3D Tilt Tracking (Zero vertical scroll-trapping)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPhaseRef.current = targetPhaseRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
      tiltTargetRef.current = { x: nx, y: ny };
    }

    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    // Map pixels to card phase
    targetPhaseRef.current = dragStartPhaseRef.current - dx / 240;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Step buttons
  const stepPrev = () => {
    targetPhaseRef.current = Math.round(targetPhaseRef.current) - 1;
  };

  const stepNext = () => {
    targetPhaseRef.current = Math.round(targetPhaseRef.current) + 1;
  };

  const activeIndex = (((Math.round(phase) % count) + count) % count);

  return (
    <section
      id="founders"
      className="relative w-full bg-transparent text-[#1A1A1A] overflow-hidden scroll-mt-[90px] pt-24 pb-24"
    >
      {/* ── ATMOSPHERE: VELVET ROSE & AMBER GOLD BUTTERFLIES WITH MANY SAKURA PETALS ── */}
      <SectionAtmosphere butterflyType="rose" butterflyCount={3} petalCount={34} className="z-[2]" />
      <SectionAtmosphere butterflyType="gold" butterflyCount={2} petalCount={20} className="z-[2]" />



      {/* ── FOUNDERS SAKURA BRANCH ACCENT (Top-Right Framing) ── */}
      <div
        className="absolute top-[-20px] right-[-20px] pointer-events-none z-[2] select-none overflow-visible opacity-90 hidden lg:block"
        style={{
          width: "clamp(300px, 28vw, 440px)",
        }}
      >
        <img
          src="/images/sakura-branch-intermediate.webp"
          alt="Founders Sakura Branch Accent"
          className="w-full h-auto object-contain pointer-events-none"
          style={{
            transform: "rotate(-12deg) scaleX(-1)",
            transformOrigin: "top right",
            filter: "drop-shadow(0 14px 32px rgba(80, 10, 30, 0.15))",
          }}
        />
      </div>

      {/* Ambient Deep Cherry Glow following the Sylva path */}
      <div
        className="absolute top-[8%] left-[-8vw] w-[55vw] h-[650px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(178, 28, 70, 0.25) 0%, rgba(100, 14, 45, 0.10) 55%, transparent 80%)",
          filter: "blur(75px)",
        }}
      />
      <div
        className="absolute top-[50%] right-[-8vw] w-[60vw] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(220, 20, 75, 0.20) 0%, rgba(68, 88, 56, 0.08) 50%, transparent 80%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-[1540px] mx-auto px-[4vw] md:px-[5vw] lg:px-[72px]">
        {/* ══════════════════════════════════════════════════════════════════
            SECTION HEADER: 004 / THE FOUNDERS
            ══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-3 mb-16 text-left">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1.5px] bg-[#C9A84C]" />
            <span
              className="text-[11px] font-mono tracking-[0.28em] text-[#C9A84C] uppercase font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              004 / THE FOUNDERS
            </span>
          </div>

          <h2
            className="text-[clamp(40px,4.8vw,72px)] font-serif font-light text-[#1A1A1A] leading-[1.02] tracking-[-0.02em]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Built by{" "}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#DFC17B] to-[#C9A84C]">
              Builders.
            </span>
          </h2>

          <p className="text-[14px] leading-relaxed text-[#2C2C34] max-w-[620px] font-normal pt-1">
            LGC was engineered by medical minds, algorithmic architects, and relentless operators building sovereign enterprises at scale.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CEO — MAIN FEATURED (FIRST PERSON KEYNOTE SUITE)
            PARAS · Founder & Chief Executive Officer
            ══════════════════════════════════════════════════════════════════ */}
        <div
          className="mb-24 p-8 sm:p-10 md:p-14 rounded-[32px] border border-[#FF3366]/50 relative overflow-hidden select-none"
          style={{
            background:
              "linear-gradient(145deg, #240516 0%, #3B0A25 45%, #18030E 100%)",
            boxShadow:
              "0 26px 70px rgba(26, 4, 16, 0.7), 0 0 55px rgba(220, 20, 75, 0.25), 0 0 40px rgba(201, 168, 76, 0.18), inset 0 1px 0 rgba(255, 215, 0, 0.4)",
          }}
        >
          {/* Top Cherry Red & Gold Foil Accent Rim */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3366] to-transparent" />

          {/* Luxury Certificate Corner Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#C9A84C] pointer-events-none" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#C9A84C] pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#C9A84C] pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#C9A84C] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-12 lg:gap-16 items-center">
            {/* Left Column: Full First-Person Narrative & Pillars */}
            <div className="space-y-6">
              {/* Executive Header Badge */}
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#FF3366]/60 bg-[#540F2D]/90 text-[#DFC17B] text-[10.5px] font-mono tracking-widest uppercase font-semibold shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>FOUNDER & CHIEF EXECUTIVE OFFICER</span>
                </span>
                <span className="text-xl font-serif text-[#C9A84C]">創始者</span>
              </div>

              {/* Tagline */}
              <div>
                <h3
                  className="text-[clamp(28px,3.4vw,46px)] font-serif font-light text-white leading-[1.14] tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  “Doctor by training. <br />
                  Coder by passion. <br />
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D80] via-[#DFC17B] to-[#C9A84C]">
                    Builder by choice.”
                  </span>
                </h3>
              </div>

              {/* Complete First-Person Bio */}
              <div className="space-y-3.5 text-[14px] leading-relaxed text-[#EAD5DE] font-light max-w-[640px]">
                <p>
                  I am 21. I study medicine and I build companies — not one after the other, but at the same time, every single day.
                </p>
                <p>
                  I started with a simple idea — doctors deserve better websites. That became <strong className="text-[#DFC17B] font-semibold">Peroix</strong>. Then I wanted to build my own AI. That became <strong className="text-[#DFC17B] font-semibold">Voidex</strong>. Then I saw creators getting ignored by brands. That became <strong className="text-[#DFC17B] font-semibold">Meetrix</strong>.
                </p>
                <p>
                  Every problem I saw became a venture. Every venture became part of something bigger — LGC.
                </p>
                <p className="font-serif italic text-[17px] text-[#DFC17B] pt-1 leading-snug">
                  “I don’t wait until I am ready. I build until I am.”
                </p>
              </div>

              {/* What I Do Execution Grid */}
              <div className="pt-2">
                <span
                  className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#C9A84C] font-semibold block mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  WHAT I DO // DIRECT EXECUTION
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { icon: Stethoscope, text: "Build premium digital products for medical professionals" },
                    { icon: Brain, text: "Research and train custom AI language models" },
                    { icon: Rocket, text: "Architect novel AGI systems" },
                    { icon: Layers, text: "Run multiple ventures simultaneously" },
                    { icon: Code2, text: "Code, design, ship — everything myself" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-3.5 rounded-xl border border-[#FF3366]/30 bg-[#2E071D]/80 flex items-start space-x-3",
                        idx === 4 && "sm:col-span-2"
                      )}
                    >
                      <item.icon className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <span className="text-[12px] text-[#E0D0D7] leading-snug font-light">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Philosophy Plinth */}
              <div className="p-4 sm:p-5 rounded-2xl border border-[#FF3366]/40 bg-[#350A22]/90 shadow-inner">
                <span
                  className="text-[9.5px] font-mono text-[#C9A84C] uppercase tracking-widest font-semibold block mb-1.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  PHILOSOPHY
                </span>
                <p
                  className="text-[14px] font-serif italic text-white leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  “I don’t see myself as just a doctor or just a coder. I see problems — and I build the solution, whatever form that takes.”
                </p>
              </div>
            </div>

            {/* Right Column: Prominent Rectangular Executive Portrait Suite */}
            <div className="flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border border-[#FF3366]/40 bg-[#1D0412]/95 text-center relative overflow-hidden shadow-[0_22px_55px_rgba(22,2,14,0.8)]">
              {/* Rectangular Portrait Photo Frame (Aspect 3:3.8) */}
              <div className="w-[200px] sm:w-[230px] mb-6 relative group">
                <RectangularPortrait
                  src="/images/founders/paras.jpg"
                  name="Paras Lashkari"
                  aspect="keynote"
                  className="shadow-[0_0_35px_rgba(230,25,80,0.45),0_0_45px_rgba(201,168,76,0.3)]"
                />
                <div className="absolute -bottom-2.5 -right-2.5 w-8 h-8 rounded-full bg-[#520C2A] border-2 border-[#C9A84C] flex items-center justify-center text-[#DFC17B] shadow-lg">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <span
                className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                EXECUTIVE OFFICE // EST. 2026
              </span>

              <h4
                className="text-3xl font-serif text-white font-medium mb-1 tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                PARAS
              </h4>

              <p className="text-[12.5px] font-mono text-[#DFC17B] mb-5 font-medium">
                Founder & Chief Executive Officer
              </p>

              <div className="w-full pt-4 border-t border-[#FF3366]/30 grid grid-cols-3 gap-2 text-[10px] font-mono text-[#C9BAC2]">
                <div>
                  <div className="text-white text-[15px] font-bold">21</div>
                  <div>AGE</div>
                </div>
                <div className="border-x border-[#FF3366]/30">
                  <div className="text-white text-[15px] font-bold">06</div>
                  <div>VENTURES</div>
                </div>
                <div>
                  <div className="text-white text-[15px] font-bold">MBBS</div>
                  <div>SCHOLAR</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CO-FOUNDERS — 3D HORIZONTAL CARD WAVE (EXACTLY 5 CARDS)
            Dimensional perspective wave with rectangular photos, cherry red glow,
            and 100% natural vertical page scroll.
            ══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-5 h-[1px] bg-[#C9A84C]" />
                <span
                  className="text-[10px] font-mono tracking-[0.25em] text-[#C9A84C] uppercase font-semibold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  THE FOUNDING PARTNERS
                </span>
              </div>
              <h3
                className="text-[clamp(28px,3.2vw,44px)] font-serif font-light text-[#1A1A1A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The Founding Collective
              </h3>
            </div>

            {/* Manual Step Controls (Cherry & Gold) */}
            <div className="flex items-center space-x-3">
              <button
                onClick={stepPrev}
                className="w-10 h-10 rounded-full border border-[#FF3366]/50 bg-[#2A0516] hover:bg-[#FF3366] hover:border-[#FF3366] text-[#DFC17B] hover:text-white flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(200,20,70,0.3)] cursor-pointer"
                aria-label="Previous Co-Founder"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={stepNext}
                className="w-10 h-10 rounded-full border border-[#FF3366]/50 bg-[#2A0516] hover:bg-[#FF3366] hover:border-[#FF3366] text-[#DFC17B] hover:text-white flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(200,20,70,0.3)] cursor-pointer"
                aria-label="Next Co-Founder"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Wave Stage (Dimensional horizontal wave container with zero scrollbars) */}
          <div
            ref={stageRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              isDraggingRef.current = false;
              tiltTargetRef.current = { x: 0, y: 0 };
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full h-[670px] md:h-[730px] rounded-[30px] overflow-hidden border border-[#FF3366]/45 select-none cursor-grab active:cursor-grabbing"
            style={{
              perspective: "1250px",
              background:
                "radial-gradient(ellipse 85% 65% at 50% 50%, rgba(90, 10, 42, 0.92) 0%, rgba(38, 5, 20, 0.98) 60%, #0D0107 100%)",
              boxShadow:
                "0 26px 70px rgba(18, 2, 10, 0.75), 0 0 60px rgba(220, 20, 75, 0.25), inset 0 0 80px rgba(255, 30, 95, 0.15)",
              touchAction: "pan-y", // Critical: Free vertical page scrolling without trapping
            }}
          >
            {/* Top/Bottom Cherry Red & Gold Hairlines */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF3366] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent z-10 pointer-events-none" />

            {/* Dynamic Specular Cherry Aura following mouse */}
            <div
              className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle 350px at ${50 + tilt.x * 25}% ${45 + tilt.y * 20}%, rgba(255, 40, 100, 0.22), transparent 75%)`,
              }}
            />

            {/* 3D Deck Container */}
            <div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {CO_FOUNDERS.map((founder, idx) => {
                const delta = wrappedDelta(idx, phase);
                const distance = Math.abs(delta);
                const focus = Math.exp(-Math.pow(distance, 2) * 1.05);
                const side = Math.max(0, 1 - distance / 4);

                // Pure Horizontal 3D Wave Math matching ThreeUI wave aesthetics
                const horizontalSpacing = typeof window !== "undefined" && window.innerWidth < 640 ? 150 : 210;
                const x = delta * horizontalSpacing;
                const y = -Math.pow(distance, 1.4) * 6 + Math.sin(delta * 0.8) * 4;
                const z = focus * 135 - distance * 90;
                const scale = 0.68 + side * 0.12 + focus * 0.35;
                const rotateY = tilt.x * focus * 6 - delta * 11;
                const rotateX = -tilt.y * focus * 4;
                const rotateZ = delta * 1.8;
                const opacity = Math.max(0.18, side * 0.82 + focus * 0.18);

                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={founder.id}
                    onClick={() => {
                      targetPhaseRef.current = Math.round(targetPhaseRef.current) + delta;
                    }}
                    className={cn(
                      "absolute top-1/2 left-1/2 w-[250px] sm:w-[280px] h-[450px] sm:h-[480px] rounded-[24px] p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden",
                      isCurrent
                        ? "border-[#FF3366] shadow-[0_25px_65px_rgba(20,2,12,0.9),0_0_45px_rgba(230,25,80,0.6),0_0_20px_rgba(201,168,76,0.4),inset_0_1px_1px_rgba(255,200,220,0.3)]"
                        : "border-[#FF3366]/35 shadow-[0_14px_35px_rgba(10,1,6,0.7),0_0_15px_rgba(200,20,65,0.12)] hover:border-[#FF3366]/60"
                    )}
                    style={{
                      transform: `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
                      opacity: opacity.toFixed(3),
                      zIndex: Math.round(1000 - distance * 100),
                      background: isCurrent
                        ? "linear-gradient(155deg, #4F0A29 0%, #30061A 50%, #16020C 100%)"
                        : "linear-gradient(155deg, #32061A 0%, #1E0310 55%, #0D0107 100%)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Top Cherry Red & Gold Accent Rim */}
                    <div
                      className={cn(
                        "absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF3366] to-transparent",
                        isCurrent ? "opacity-100" : "opacity-45"
                      )}
                    />

                    {/* Specular Card Highlight */}
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

                    <div>
                      {/* Badge Row */}
                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <span className="text-[10px] font-mono tracking-widest text-[#DFC17B] font-semibold">
                          CARD {founder.id}
                        </span>
                        <span className="text-[9.5px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-[#FF3366]/50 bg-[#540F2D]/85 text-[#DFC17B]">
                          {founder.background}
                        </span>
                      </div>

                      {/* Rectangular Photo Frame */}
                      <div className="mb-2 relative z-10">
                        <RectangularPortrait
                          src={founder.photo}
                          name={founder.name}
                          aspect="card"
                          photoPosition={founder.photoPosition}
                          scale={founder.photoScale}
                          className={isCurrent ? "shadow-[0_0_20px_rgba(230,25,80,0.35)]" : "shadow-md"}
                        />
                      </div>

                      {/* Founder Name & Titles */}
                      <h4
                        className="text-[18px] sm:text-[20px] font-serif text-white font-medium mb-0.5 leading-snug tracking-wide"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {founder.name}
                      </h4>

                      <div className="space-y-0.5 mb-1">
                        <div className="text-[9.5px] font-mono tracking-wider uppercase text-[#FF4D80] font-semibold">
                          {founder.title}
                        </div>
                        <div className="text-[11px] font-mono text-[#DFC17B] font-medium">
                          {founder.role}
                        </div>
                      </div>
                    </div>

                    {/* Quote Plinth — guaranteed fully contained inside card, crisp and 100% readable */}
                    <div className="mt-auto pt-2 relative z-10">
                      <div className="p-2.5 rounded-xl bg-[#14020C]/90 border border-[#FF3366]/30 shadow-inner">
                        <p
                          className="text-[12px] sm:text-[12.5px] font-serif italic text-white leading-snug tracking-wide line-clamp-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            textShadow: "0 1px 8px rgba(0, 0, 0, 0.8)",
                          }}
                        >
                          “{founder.quote}”
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage Footer Instructions (No Ugly Scrollbars) */}
            <div className="absolute bottom-3.5 left-0 right-0 z-30 flex justify-center items-center pointer-events-none">
              <span
                className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#DFC17B]/85 bg-[#1C020E]/90 px-4 py-1.5 rounded-full border border-[#FF3366]/40 backdrop-blur-sm shadow-md"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                SWIPE OR DRAG HORIZONTALLY TO EXPLORE
              </span>
            </div>
          </div>

          {/* Stepper Dots Indicator (Cherry Red & Gold) */}
          <div className="flex items-center justify-center space-x-2 pt-2">
            {CO_FOUNDERS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  targetPhaseRef.current = Math.round(targetPhaseRef.current) + wrappedDelta(i, phase);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  i === activeIndex
                    ? "w-8 bg-gradient-to-r from-[#FF3366] to-[#C9A84C] shadow-[0_0_10px_rgba(255,51,102,0.6)]"
                    : "w-2 bg-[#FF3366]/35 hover:bg-[#FF3366]/70"
                )}
                aria-label={`Go to founder ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PART 3: CLOSING STATEMENT & THE LGC CORE THESIS
            "Six people. One mission. Zero compromises."
            ══════════════════════════════════════════════════════════════════ */}
        <div className="mt-24 pt-14 pb-4 border-t border-[rgba(201,168,76,0.3)] text-center space-y-5">
          {/* Main User Closing Line */}
          <div className="space-y-2">
            <span
              className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#C9A84C] font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              THE SOVEREIGN PACT
            </span>

            <h3
              className="text-[clamp(34px,4vw,58px)] font-serif font-light text-[#1A1A1A] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Six people. One mission. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#B89332] to-[#8C6D1F]">
                Zero compromises.
              </span>
            </h3>
          </div>

          {/* Re-Anchored LGC Core Thesis Quote */}
          <div className="pt-4 max-w-[780px] mx-auto space-y-2">
            <p
              className="text-[15px] font-serif italic text-[#3A3A42] leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              “Every venture solves a problem. Every problem is an opportunity. Every opportunity becomes an industry.”
            </p>
            <p
              className="text-[9.5px] font-mono tracking-[0.3em] text-[#8C7638] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              LASHKARI GROUP OF COMPANIES — VENTURES WITHOUT LIMITS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
