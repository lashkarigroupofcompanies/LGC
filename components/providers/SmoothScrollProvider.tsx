"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  stopScroll: () => void;
  startScroll: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize Lenis with ultra-fluid physical momentum & GSAP lockstep
    const lenis = new Lenis({
      lerp: 0.088,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.02,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const stopScroll = () => {
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  };

  const startScroll = () => {
    lenisRef.current?.start();
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    ScrollTrigger.refresh();
  };

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: Record<string, unknown>
  ) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        stopScroll,
        startScroll,
        scrollTo,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
