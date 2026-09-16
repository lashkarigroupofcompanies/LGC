"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SectionAtmosphere from "@/components/ecosystem/SectionAtmosphere";
import { getStoredStats, subscribeVenturesStore, INITIAL_STATS } from "@/lib/venturesStore";

const PHILOSOPHIES = [
  {
    number: "01",
    tag: "PURPOSE",
    title: "People First",
    body: "Every venture exists to solve a real gap in everyday life.",
  },
  {
    number: "02",
    tag: "CRAFT",
    title: "Build Different",
    body: "Premium quality, accessible to all.",
  },
  {
    number: "03",
    tag: "SCALE",
    title: "Think Empire",
    body: "Not one business, but an ecosystem.",
  },
];

export default function About() {
  const [statsData, setStatsData] = useState(INITIAL_STATS);

  useEffect(() => {
    setStatsData(getStoredStats());
    return subscribeVenturesStore(() => {
      setStatsData(getStoredStats());
    });
  }, []);

  const statsList = [
    { value: statsData.totalFounders || "06", label: "Founders" },
    { value: statsData.activeVentures || "05+", label: "Active Ventures" },
    { value: statsData.sharedVision || "01", label: "Shared Vision" },
    { value: statsData.established || "2026", label: "Established" },
  ];
  return (
    <section
      id="about"
      className="relative w-full text-[#111111] select-none bg-transparent scroll-mt-[80px]"
    >
      {/* 3D Green Branch lives in the shared parent canvas in page.tsx spanning Hero, About and Ventures */}

      {/* ABOUT ATMOSPHERE: IMPERIAL GOLD & VELVET ROSE BUTTERFLIES WITH MANY SAKURA PETALS */}
      <SectionAtmosphere butterflyType="gold" butterflyCount={3} petalCount={32} className="z-[3]" />
      <SectionAtmosphere butterflyType="rose" butterflyCount={2} petalCount={18} className="z-[3]" />

      {/* ── ATMOSPHERIC WASHES: SAKURA BLUSH & FOREST GREEN AURA ── */}
      <div
        className="absolute top-0 left-[-5vw] w-[50vw] h-[550px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 25% 30%, rgba(247, 214, 222, 0.4) 0%, rgba(253, 236, 240, 0.15) 55%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[2%] right-[-5vw] w-[50vw] h-[650px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 35%, rgba(68, 88, 56, 0.16) 0%, rgba(92, 114, 78, 0.06) 55%, transparent 80%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle Japanese Rice Paper Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201, 168, 76, 0.12) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Creative Editorial Left Margin UI Rail */}
      <div className="absolute left-[20px] top-[24%] -translate-y-1/2 z-10 hidden 2xl:flex flex-col items-center gap-4 pointer-events-none opacity-45 select-none">
        <div className="w-[1px] h-[40px] bg-gradient-to-b from-transparent via-[#581822] to-transparent" />
        <span
          className="[writing-mode:vertical-rl] rotate-180 font-accent text-[8px] tracking-[0.45em] uppercase text-[#581822]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          GENESIS · ACT I // PHILOSOPHY
        </span>
        <div className="w-[1px] h-[40px] bg-gradient-to-b from-transparent via-[#581822] to-transparent" />
      </div>

      {/* ── MAIN CONTENT CONTAINER — ALIGNED WITH HERO (pl-[4vw] md:pl-[5vw] lg:pl-[72px]) ── */}
      <div className="relative z-10 max-w-[1540px] pl-[4vw] md:pl-[5vw] lg:pl-[72px] pr-[4vw] md:pr-[5vw] pt-[60px] md:pt-[84px] pb-[100px] md:pb-[140px]">
        {/* ========================================================= */}
        {/* ACT I: GENESIS STATEMENT & NARRATIVE                        */}
        {/* ========================================================= */}
        <div className="pt-[10px] pb-[50px] grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10 items-start">
          <div>
            <h2
              className="font-heading italic font-normal text-[clamp(44px,5.8vw,80px)] leading-[1.01] text-[#4A121A] tracking-[-0.02em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Born From a Vision <br />
              <span
                className="font-semibold text-[#C9A84C]"
                style={{
                  textShadow:
                    "0 2px 24px rgba(201, 168, 76, 0.32), 0 0 45px rgba(201, 168, 76, 0.18)",
                }}
              >
                to Build.
              </span>
            </h2>

            <div className="w-[74px] h-[2px] bg-gradient-to-r from-[#581822] to-[#C9A84C] my-[24px] origin-left" />

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <span
                className="font-accent text-[10px] uppercase tracking-[0.35em] text-[#581822] font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                SIX MINDS · ONE VISION
              </span>
            </div>
          </div>

          {/* Narrative Body in Royal Maroon & Deep Charcoal - shifted left and given subtle glow so all text is 100% visible */}
          <div className="flex flex-col justify-center h-full pt-1 relative z-20 lg:-translate-x-16 max-w-[475px]">
            <p
              className="font-heading italic text-[clamp(22px,2.3vw,29px)] leading-[1.5] text-[#111111] font-normal"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                textShadow:
                  "0 1px 14px rgba(255, 255, 255, 0.95), 0 0 24px rgba(255, 255, 255, 0.85)",
              }}
            >
              "In 2026, a collective of{" "}
              <span className="font-semibold text-[#581822] underline decoration-[#C9A84C] decoration-[1.5px] underline-offset-4">
                six young minds
              </span>{" "}
              came together with one singular belief: that real everyday problems
              deserve real, enduring solutions. United by relentless ambition and
              diverse passions, LGC was born not merely as a company, but as a{" "}
              <span
                className="font-bold text-[#C9A84C] relative inline-block"
                style={{
                  textShadow:
                    "0 1px 18px rgba(201, 168, 76, 0.42), 0 0 12px rgba(255, 255, 255, 0.9)",
                }}
              >
                movement
              </span>
              ."
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-[1px] flex-grow bg-gradient-to-r from-[rgba(88,24,34,0.3)] via-[rgba(201,168,76,0.3)] to-transparent" />
              <span
                className="font-accent text-[9px] uppercase tracking-[0.3em] text-[#581822] opacity-80"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow: "0 0 12px rgba(255, 255, 255, 0.9)",
                }}
              >
                LGC PHILOSOPHY
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT II: THE 3 CORE PHILOSOPHY CARDS — BLACK + MAROON       */}
        {/* Deep luxury obsidian + velvet maroon plinths, NO Roman numerals */}
        {/* ========================================================= */}
        <div className="py-[30px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
              <span
                className="font-accent text-[11px] uppercase tracking-[0.32em] text-[#581822] font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                CORE PHILOSOPHY
              </span>
            </div>

            <span
              className="text-[12px] italic font-heading text-[#581822] opacity-75"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Three Guiding Tenets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PHILOSOPHIES.map((point) => (
              <div
                key={point.number}
                className="group relative rounded-[22px] p-8 md:p-10 transition-all duration-450 hover:shadow-2xl hover:-translate-y-2 overflow-hidden border border-[rgba(201,168,76,0.32)]"
                style={{
                  background:
                    "linear-gradient(150deg, #18080C 0%, #240B13 45%, #0F0407 100%)",
                  boxShadow:
                    "0 22px 50px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(88, 24, 34, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                }}
              >
                {/* Specular Radiant Top Rim */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8B1E32] via-[#C9A84C] to-[#8B1E32] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner Bracket */}
                <div className="absolute top-3 right-3 font-accent text-[10px] text-[#C9A84C] opacity-40 group-hover:opacity-100 transition-opacity">
                  +
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="font-accent text-[11px] font-semibold tracking-[0.28em] text-[#C9A84C]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {point.number}
                    </span>
                    <span className="text-[11px] text-[rgba(201,168,76,0.5)]">/</span>
                    <span
                      className="font-accent text-[9px] uppercase tracking-[0.24em] text-[#F4A7B5]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {point.tag}
                    </span>
                  </div>

                  <h3
                    className="font-heading italic font-semibold text-[32px] md:text-[34px] text-[#FFFFFF] leading-tight mb-4 group-hover:text-[#C9A84C] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {point.title}
                  </h3>

                  <p
                    className="text-[15px] md:text-[16px] leading-[1.68] text-[rgba(255,255,255,0.85)] font-light"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT III: THE 4 MONOLITHIC STATS — BLACK + MAROON RIBBON   */}
        {/* ========================================================= */}
        <div
          className="mt-[36px] py-[44px] px-[32px] md:px-[56px] rounded-[24px] border border-[rgba(201,168,76,0.35)] relative overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, #140508 0%, #260A12 50%, #140508 100%)",
            boxShadow:
              "0 24px 55px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(88, 24, 34, 0.45), inset 0 1px 0 rgba(201, 168, 76, 0.25)",
          }}
        >
          {/* Radiant Hairline Highlights */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B1E32] to-transparent opacity-40" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(201,168,76,0.22)]">
            {statsList.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col justify-center items-center lg:items-start text-center lg:text-left",
                  i !== 0 && "pt-6 lg:pt-0 lg:pl-10"
                )}
              >
                <div
                  className="font-heading font-normal italic text-[clamp(48px,5.2vw,72px)] leading-none text-[#C9A84C] tracking-tight mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    textShadow:
                      "0 2px 20px rgba(201, 168, 76, 0.4), 0 0 35px rgba(201, 168, 76, 0.2)",
                  }}
                >
                  {stat.value}
                </div>
                <span
                  className="font-accent text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F4A7B5]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
