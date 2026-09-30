"use client";

import React, { useEffect, useState, useRef } from "react";

interface SpineSegment {
  id: string;
  top: string;
  height: string;
  width: string;
  title: string;
  scale: string;
  mask?: string;
  staggerMs?: number;
}

// Generously overlapping segment coordinates with soft feathered edge masks
const DESKTOP_SEGMENTS: SpineSegment[] = [
  {
    id: "genesis",
    top: "0",
    height: "260vh",
    width: "240vh",
    title: "Sylva 3D Green Branch - Genesis (Hero & About)",
    scale: "scale(1.35)",
    mask: "linear-gradient(to bottom, black 0%, black 92%, transparent 100%)",
    staggerMs: 0,
  },
  {
    id: "ventures",
    top: "195vh",
    height: "230vh",
    width: "205vh",
    title: "Sylva 3D Green Branch - Ventures Spine",
    scale: "scale(1.32)",
    mask: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
    staggerMs: 300,
  },
  {
    id: "founders",
    top: "375vh",
    height: "230vh",
    width: "205vh",
    title: "Sylva 3D Green Branch - Founders Keynote Spine",
    scale: "scale(1.32)",
    mask: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
    staggerMs: 600,
  },
  {
    id: "bridge",
    top: "555vh",
    height: "230vh",
    width: "210vh",
    title: "Sylva 3D Green Branch - Founders to Contact Bridge",
    scale: "scale(1.32)",
    mask: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
    staggerMs: 900,
  },
  {
    id: "footer",
    top: "715vh",
    height: "290vh",
    width: "255vh",
    title: "Sylva 3D Green Branch - Contact & Footer Finale",
    scale: "scale(1.35)",
    mask: "linear-gradient(to bottom, transparent 0%, black 8%, black 100%)",
    staggerMs: 1200,
  },
];

// Small connecting portions of the Sylva botanical branch connecting upper and lower branches
const SYLVA_CONNECTORS = [
  {
    id: "connector-genesis-ventures",
    top: "190vh",
    transform: "rotate(-10deg) scale(0.95)",
  },
  {
    id: "connector-ventures-founders",
    top: "370vh",
    transform: "rotate(8deg) scaleX(-1) scale(0.95)",
  },
  {
    id: "connector-founders-bridge",
    top: "550vh",
    transform: "rotate(-6deg) scale(0.95)",
  },
  {
    id: "connector-bridge-footer",
    top: "710vh",
    transform: "rotate(12deg) scaleX(-1) scale(0.95)",
  },
];

function DesktopSegmentItem({ segment }: { segment: SpineSegment }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Latching mount state: once loaded, it remains mounted to avoid re-fetching
  const [hasLoaded, setHasLoaded] = useState(segment.id === "genesis");
  const [isNearViewport, setIsNearViewport] = useState(segment.id === "genesis");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Tight 150px lookahead margin:
    // Only the segment currently in view (or about to enter within 150px) is active.
    // When scrolled past, it immediately pauses WebGL and hides, freeing 100% GPU bandwidth.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);
        }
      },
      { rootMargin: "150px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasLoaded]);

  // Pause WebGL rendering loop when offscreen to free 100% GPU
  useEffect(() => {
    try {
      iframeRef.current?.contentWindow?.postMessage(
        isNearViewport ? "resume" : "pause",
        "*"
      );
    } catch {}
  }, [isNearViewport]);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 w-full pointer-events-none overflow-visible"
      style={{
        top: segment.top,
        height: segment.height,
        contain: "paint",
      }}
    >
      {/* GPU-composited feathered edge overlays (zero CPU mask re-rasterization penalty) */}
      {segment.id !== "genesis" && (
        <div className="absolute top-0 right-0 w-full h-36 bg-gradient-to-b from-[#FAF6F8] via-[#FAF6F8]/70 to-transparent pointer-events-none z-10" />
      )}
      {segment.id !== "footer" && (
        <div className="absolute bottom-0 right-0 w-full h-36 bg-gradient-to-t from-[#FAF6F8] via-[#FAF6F8]/70 to-transparent pointer-events-none z-10" />
      )}

      {hasLoaded ? (
        <iframe
          ref={iframeRef}
          src="/landing-pages/sylva-branch.html?v=clean"
          title={segment.title}
          loading={segment.id === "genesis" ? "eager" : "lazy"}
          onLoad={() => {
            try {
              iframeRef.current?.contentWindow?.postMessage(
                isNearViewport ? "resume" : "pause",
                "*"
              );
            } catch {}
          }}
          className="border-0 pointer-events-none transition-opacity duration-300"
          style={{
            position: "absolute",
            right: "-2vw",
            top: "-60vw",
            width: segment.width,
            height: "65vw",
            border: 0,
            background: "transparent",
            transformOrigin: "bottom right",
            transform: `rotate(-90deg) ${segment.scale}`,
            pointerEvents: "none",
            visibility: isNearViewport ? "visible" : "hidden",
            willChange: "transform",
          }}
        />
      ) : (
        // Persistent sizing placeholder before progressive hydration
        <div className="w-full h-full pointer-events-none opacity-0" />
      )}
    </div>
  );
}

export default function ResponsiveSpineEngine() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      // Mobile check: screen width < 1024px or coarse touch devices
      const isNarrow = window.innerWidth < 1024;
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isNarrow || isTouch);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {/* Subtle Ambient Atmosphere: delicate sakura blush pink warmth with soft touches of living botanical green */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: [
            "radial-gradient(ellipse 75% 45% at 25% 6%, rgba(255, 220, 230, 0.40) 0%, rgba(255, 235, 242, 0.15) 50%, transparent 80%)",
            "radial-gradient(ellipse 80% 50% at 75% 18%, rgba(255, 225, 235, 0.32) 0%, rgba(255, 240, 245, 0.10) 50%, transparent 80%)",
            "radial-gradient(ellipse 70% 45% at 30% 32%, rgba(255, 218, 228, 0.35) 0%, rgba(255, 235, 242, 0.12) 50%, transparent 80%)",
            "radial-gradient(ellipse 75% 50% at 65% 48%, rgba(255, 222, 232, 0.32) 0%, rgba(255, 238, 244, 0.10) 50%, transparent 80%)",
            "radial-gradient(ellipse 80% 50% at 20% 64%, rgba(255, 215, 226, 0.36) 0%, rgba(255, 235, 242, 0.12) 50%, transparent 80%)",
            "radial-gradient(ellipse 75% 45% at 70% 78%, rgba(255, 220, 230, 0.34) 0%, rgba(255, 238, 244, 0.10) 50%, transparent 80%)",
            "radial-gradient(ellipse 80% 50% at 30% 92%, rgba(255, 222, 232, 0.32) 0%, rgba(255, 240, 245, 0.10) 50%, transparent 80%)",
            "radial-gradient(ellipse 65% 40% at 88% 10%, rgba(68, 88, 56, 0.16) 0%, rgba(92, 114, 78, 0.06) 50%, transparent 75%)",
            "radial-gradient(ellipse 60% 35% at 88% 28%, rgba(68, 88, 56, 0.14) 0%, rgba(92, 114, 78, 0.05) 50%, transparent 75%)",
            "radial-gradient(ellipse 60% 35% at 88% 44%, rgba(68, 88, 56, 0.15) 0%, rgba(92, 114, 78, 0.06) 50%, transparent 75%)",
            "radial-gradient(ellipse 60% 35% at 88% 62%, rgba(68, 88, 56, 0.13) 0%, rgba(92, 114, 78, 0.05) 50%, transparent 75%)",
            "radial-gradient(ellipse 60% 35% at 88% 76%, rgba(68, 88, 56, 0.14) 0%, rgba(92, 114, 78, 0.05) 50%, transparent 75%)",
            "radial-gradient(ellipse 65% 40% at 88% 90%, rgba(68, 88, 56, 0.18) 0%, rgba(92, 114, 78, 0.06) 50%, transparent 75%)",
            "radial-gradient(ellipse 55% 40% at 15% 24%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
            "radial-gradient(ellipse 55% 40% at 80% 68%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* MOBILE OPTIMIZED SPINE: Lightweight, buttery-smooth, hardware-accelerated botanical spine */}
      {isMobile ? (
        <div className="absolute top-0 right-0 w-[180px] h-full pointer-events-none opacity-80 select-none">
          {/* Subtle Organic Vertical Botanical SVG Spine running down the page */}
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
        // DESKTOP MODE: Overlapping Three.js segments with persistent latching and botanical branch connectors
        <>
          {DESKTOP_SEGMENTS.map((segment) => (
            <DesktopSegmentItem key={segment.id} segment={segment} />
          ))}

          {/* Small connecting portions of the Sylva branch bridging upper and lower branches */}
          {SYLVA_CONNECTORS.map((connector) => (
            <div
              key={connector.id}
              className="absolute right-[-15px] pointer-events-none z-[3] select-none overflow-visible hidden lg:block"
              style={{
                top: connector.top,
                width: "clamp(260px, 24vw, 440px)",
              }}
            >
              <img
                src="/images/sakura-branch-intermediate.webp"
                alt="Sylva Botanical Branch Connecting Link"
                className="w-full h-auto object-contain pointer-events-none opacity-85"
                loading="lazy"
                decoding="async"
                style={{
                  transform: connector.transform,
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
