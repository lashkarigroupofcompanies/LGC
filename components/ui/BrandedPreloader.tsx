"use client";

import React, { useEffect, useState, useRef } from "react";

interface BrandedPreloaderProps {
  onComplete?: () => void;
}

const CRITICAL_ASSETS = [
  "/images/sakura-branch.webp",
  "/images/sakura-branch-intermediate.webp",
  "/images/founders/paras.webp",
];

export default function BrandedPreloader({ onComplete }: BrandedPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // Lock scroll immediately on mount
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const startTime = performance.now();
    const minDisplayMs = 1250;
    const maxTimeoutMs = 8000;

    let targetProgress = 10;
    let currentDisplayProgress = 0;
    let animFrameId: number;

    // Track real assets
    const totalItems = CRITICAL_ASSETS.length + 1; // assets + fonts
    let loadedItems = 0;

    const onItemLoaded = () => {
      loadedItems++;
      targetProgress = Math.min(
        95,
        Math.round((loadedItems / totalItems) * 90) + 10
      );
    };

    // 1. Fonts readiness
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready
        .then(() => onItemLoaded())
        .catch(() => onItemLoaded());
    } else {
      onItemLoaded();
    }

    // 2. Critical images preloading
    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = onItemLoaded;
      img.onerror = onItemLoaded;
    });

    // 3. Document ready check
    if (typeof document !== "undefined") {
      if (document.readyState === "complete") {
        targetProgress = Math.max(targetProgress, 85);
      } else {
        window.addEventListener(
          "load",
          () => {
            targetProgress = Math.max(targetProgress, 95);
          },
          { once: true }
        );
      }
    }

    // Smooth progress counter loop
    const updateProgress = () => {
      const elapsed = performance.now() - startTime;

      if (elapsed >= maxTimeoutMs) {
        targetProgress = 100;
      }

      if (targetProgress >= 90 && elapsed >= minDisplayMs) {
        targetProgress = 100;
      }

      if (currentDisplayProgress < targetProgress) {
        // Smooth exponential increment
        const step = Math.max(1, (targetProgress - currentDisplayProgress) * 0.12);
        currentDisplayProgress = Math.min(
          targetProgress,
          currentDisplayProgress + step
        );
        setProgress(Math.round(currentDisplayProgress));
      }

      if (currentDisplayProgress >= 100 && elapsed >= minDisplayMs) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          // Trigger smooth curtain exit
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              // Unlock scroll
              document.body.style.overflow = "";
              document.documentElement.style.overflow = "";
              setIsRemoved(true);
              if (onComplete) {
                onComplete();
              }
            }, 750); // matches transition duration
          }, 200);
        }
        return;
      }

      animFrameId = requestAnimationFrame(updateProgress);
    };

    animFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrameId);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      id="lgc-preloader"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0D0308] select-none transition-transform duration-700 ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        pointerEvents: isExiting ? "none" : "auto",
        willChange: "transform",
        transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
      }}
    >
      {/* Background Ambient Atmospheric Warmth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle 600px at 50% 50%, rgba(201, 168, 76, 0.12) 0%, rgba(255, 51, 102, 0.05) 45%, transparent 75%)",
        }}
      />

      {/* Decorative Gold Certificate Corner Hairlines */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#C9A84C]/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[#C9A84C]/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[#C9A84C]/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#C9A84C]/40 pointer-events-none" />

      {/* Content Center */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Top Tagline */}
        <div className="flex items-center space-x-2.5 mb-6 opacity-80">
          <span className="w-6 h-[1px] bg-[#C9A84C]" />
          <span
            className="text-[9.5px] uppercase tracking-[0.45em] text-[#C9A84C] font-semibold"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            001 / SOVEREIGN HOLDING ECOSYSTEM
          </span>
          <span className="w-6 h-[1px] bg-[#C9A84C]" />
        </div>

        {/* Master Monogram LGC with Refined Gold Shimmer Reveal */}
        <div className="relative overflow-hidden py-1 mb-2">
          <h1
            className="text-[clamp(68px,11vw,120px)] font-serif font-light text-transparent bg-clip-text leading-none tracking-[0.32em] ml-[0.32em]"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              backgroundImage:
                "linear-gradient(135deg, #FFF5E1 0%, #DFC17B 35%, #C9A84C 60%, #8C6D1F 100%)",
              textShadow: "0 0 35px rgba(201, 168, 76, 0.35)",
            }}
          >
            LGC
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-[clamp(11px,1.4vw,14px)] font-serif italic text-[#E5D7C0] tracking-[0.18em] mb-8 font-light"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Lashkari Group of Companies
        </p>

        {/* Precision Progress Indicator */}
        <div className="w-[200px] sm:w-[240px] flex flex-col items-center">
          {/* Hairline Progress Track */}
          <div className="w-full h-[1.5px] bg-[#C9A84C]/20 rounded-full overflow-hidden relative mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#C9A84C] via-[#DFC17B] to-[#FF3366] transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Numbers & Live Status */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#C9A84C]/80">
            <span className="tracking-widest uppercase text-[8.5px] text-[#A6957B]">
              {progress < 40
                ? "INITIALIZING SYSTEM"
                : progress < 85
                ? "LOADING VENTURE ASSETS"
                : "READY // ENTERING"}
            </span>
            <span className="tabular-nums font-semibold tracking-wider">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <span
          className="text-[8px] uppercase tracking-[0.38em] text-[#C9A84C]/40 font-mono"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          EST. 2026 // WHERE IDEAS BECOME INDUSTRIES
        </span>
      </div>
    </div>
  );
}
