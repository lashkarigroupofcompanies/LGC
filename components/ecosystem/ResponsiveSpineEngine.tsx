"use client";

import React, { useEffect, useState, useRef } from "react";

// Continuous, lightweight, hardware-accelerated botanical spine for downstream sections
const DOWNSTREAM_SPINE = [
  {
    id: "ventures-spine",
    top: "190vh",
    width: "clamp(340px, 32vw, 560px)",
    transform: "rotate(-10deg) scale(1.05)",
  },
  {
    id: "founders-spine",
    top: "370vh",
    width: "clamp(340px, 32vw, 560px)",
    transform: "rotate(8deg) scaleX(-1) scale(1.05)",
  },
  {
    id: "bridge-spine",
    top: "550vh",
    width: "clamp(340px, 32vw, 560px)",
    transform: "rotate(-6deg) scale(1.05)",
  },
  {
    id: "footer-spine",
    top: "710vh",
    width: "clamp(360px, 35vw, 620px)",
    transform: "rotate(12deg) scaleX(-1) scale(1.08)",
  },
];

export default function ResponsiveSpineEngine() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const isNarrow = window.innerWidth < 1024;
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isNarrow || isTouch);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Observe the single Genesis 3D branch: when scrolled past About, pause WebGL loop directly
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    const iframe = iframeRef.current;
    if (!el || !iframe) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNear = entry.isIntersecting;
        iframe.style.visibility = isNear ? "visible" : "hidden";
        try {
          iframe.contentWindow?.postMessage(
            isNear ? "resume" : "pause",
            "*"
          );
        } catch {}
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {/* MOBILE OPTIMIZED SPINE: Lightweight, buttery-smooth, hardware-accelerated botanical spine */}
      {isMobile ? (
        <div className="absolute top-0 right-0 w-[180px] h-full pointer-events-none opacity-80 select-none">
          <svg
            className="w-full h-full opacity-35"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M70 0 C40 150, 90 300, 60 450 C30 600, 85 750, 55 900 C40 950, 50 1000, 50 1000"
              stroke="url(#spineGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M60 450 C80 480, 88 520, 85 540"
              stroke="rgba(201,168,76,0.3)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M30 600 C15 620, 10 650, 12 670"
              stroke="rgba(201,168,76,0.3)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="spineGradient" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.6" />
                <stop offset="25%" stopColor="#445838" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#FF3366" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#C9A84C" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#445838" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ) : mounted ? (
        /* DESKTOP MODE:
           1. Genesis (Hero & About) carries the single interactive 3D WebGL branch
           2. Downstream sections carry pre-decoded, hardware-composited botanical branch elements
           This guarantees 0 iframes are ever mounted during scroll, eliminating all section transition hitching!
        */
        <>
          {/* Genesis 3D WebGL Centerpiece (Hero & About) */}
          <div
            ref={containerRef}
            className="absolute right-0 w-full pointer-events-none overflow-visible"
            style={{
              top: "0",
              height: "260vh",
              contain: "paint",
            }}
          >
            {/* GPU-composited soft fade overlay */}
            <div className="absolute bottom-0 right-0 w-full h-36 bg-gradient-to-t from-[#FAF6F8] via-[#FAF6F8]/70 to-transparent pointer-events-none z-10" />

            <iframe
              ref={iframeRef}
              src="/landing-pages/sylva-branch.html?v=clean"
              title="Sylva 3D Green Branch - Genesis (Hero & About)"
              loading="eager"
              onLoad={() => {
                try {
                  iframeRef.current?.contentWindow?.postMessage("resume", "*");
                } catch {}
              }}
              className="border-0 pointer-events-none transition-opacity duration-300"
              style={{
                position: "absolute",
                right: "-2vw",
                top: "-60vw",
                width: "240vh",
                height: "65vw",
                border: 0,
                background: "transparent",
                transformOrigin: "bottom right",
                transform: "rotate(-90deg) scale(1.35)",
                pointerEvents: "none",
                visibility: "visible",
                willChange: "transform",
              }}
            />
          </div>

          {/* Downstream Botanical Spine Links (Ventures, Founders, Bridge, Footer) */}
          {DOWNSTREAM_SPINE.map((item) => (
            <div
              key={item.id}
              className="absolute right-[-15px] pointer-events-none z-[2] select-none overflow-visible hidden lg:block"
              style={{
                top: item.top,
                width: item.width,
                transform: "translateZ(0)",
              }}
            >
              <img
                src="/images/sakura-branch-intermediate.webp"
                alt="Sylva Botanical Branch"
                className="w-full h-auto object-contain pointer-events-none opacity-85"
                loading="eager"
                decoding="async"
                style={{
                  transform: item.transform,
                  transformOrigin: "top right",
                  willChange: "transform",
                }}
              />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}
