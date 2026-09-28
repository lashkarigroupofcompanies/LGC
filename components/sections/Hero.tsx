"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionAtmosphere from "@/components/ecosystem/SectionAtmosphere";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DockItemState {
  el: HTMLElement;
  w: number;
  h: number;
  v: number;
  vel: number;
  target: number;
}

interface SpecItemState {
  el: HTMLElement;
  reach: number;
  ang: number;
  tAng: number;
  br: number;
  tBr: number;
  focused: boolean;
}

export default function Hero({ isReady = true }: { isReady?: boolean }) {
  const [activeSection, setActiveSection] = useState("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["about", "ventures", "founders", "contact"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const currentId = visible[visible.length - 1].target.id;
          const sectionMap: Record<string, string> = {
            about: "ABOUT",
            ventures: "VENTURES",
            founders: "FOUNDERS",
            contact: "CONTACT",
          };
          setActiveSection(sectionMap[currentId] || "HOME");
        } else if (typeof window !== "undefined" && window.scrollY < window.innerHeight * 0.4) {
          setActiveSection("HOME");
        }
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: [0, 0.2, 0.5] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLeftRef = useRef<HTMLDivElement>(null);
  const navDockRef = useRef<HTMLElement>(null);
  const navRightRef = useRef<HTMLAnchorElement>(null);

  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const line5Ref = useRef<HTMLSpanElement>(null);
  const line6Ref = useRef<HTMLSpanElement>(null);

  const buttonsRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Sylva Navbar Interactive Dock and Specular Rim Physics (Optimized with cached geometry)
  useEffect(() => {
    const dockEl = navDockRef.current;
    if (!dockEl) return;

    let animId: number;
    let lastT = performance.now();

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

    interface CachedDockItem extends DockItemState {
      cx: number;
    }

    const items: CachedDockItem[] = Array.from(
      dockEl.querySelectorAll<HTMLElement>("[data-dock]")
    ).map((el) => ({
      el,
      w: 0,
      h: 0,
      v: 0,
      vel: 0,
      target: 0,
      cx: 0,
    }));

    const specElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spec]")
    );
    const specItems: SpecItemState[] = specElements.map((el) => ({
      el,
      reach: el.classList.contains("dock") ? 320 : 160,
      ang: 2.4,
      tAng: 2.4,
      br: 0,
      tBr: 0,
      focused: false,
    }));

    let aimX = 0;
    let aimY = 0;
    let aimSeen = false;
    let aimMoved = false;
    let isHoverOn = false;
    let isLive = false;
    let isDirty = true;

    let dockRect = { left: 0, right: 0, top: 0, bottom: 0 };

    const measureDock = () => {
      isHoverOn =
        window.matchMedia("(hover:hover) and (pointer:fine)").matches;
      if (!isHoverOn) return;

      const r = dockEl.getBoundingClientRect();
      dockRect = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };

      items.forEach((st) => {
        st.el.style.transform = "";
        st.el.dataset.near = "false";
        st.v = 0;
        st.vel = 0;
        st.target = 0;
      });

      items.forEach((st) => {
        const ir = st.el.getBoundingClientRect();
        st.w = ir.width;
        st.h = ir.height;
        st.cx = ir.left + ir.width * 0.5;
      });

      isLive = false;
      isDirty = true;
      aimMoved = aimSeen;
    };

    measureDock();

    const handlePointerMove = (e: MouseEvent) => {
      aimX = e.clientX;
      aimY = e.clientY;
      aimSeen = true;
      aimMoved = true;
    };

    const handlePointerLeave = () => {
      aimSeen = false;
      aimMoved = true;
      isLive = false;
      isDirty = true;
      items.forEach((st) => {
        st.target = 0;
        st.el.dataset.near = "false";
      });
      specItems.forEach((st) => {
        st.tBr = 0;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("resize", measureDock);

    const loop = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      if (isHoverOn && dockEl) {
        if (aimSeen && aimMoved) {
          if (
            aimX > dockRect.left - 48 &&
            aimX < dockRect.right + 48 &&
            aimY > dockRect.top - 44 &&
            aimY < dockRect.bottom + 104
          ) {
            items.forEach((st) => {
              const prox = clamp01(1 - Math.abs(aimX - st.cx) / 140);
              st.target = prox * prox * (3 - 2 * prox);
              st.el.dataset.near = st.target > 0.08 ? "true" : "false";
            });
            isLive = true;
            isDirty = true;
          } else if (isLive) {
            isLive = false;
            isDirty = true;
            items.forEach((st) => {
              st.target = 0;
              st.el.dataset.near = "false";
            });
          }
        }

        if (isDirty) {
          let moving = false;
          items.forEach((st) => {
            // Slower, graceful spring physics for luxurious, relaxed cursor interaction
            st.vel += (st.target - st.v) * 75 * dt;
            st.vel *= Math.exp(-12 * dt);
            st.v += st.vel * dt;

            if (
              Math.abs(st.target - st.v) < 0.001 &&
              Math.abs(st.vel) < 0.003
            ) {
              st.v = st.target;
              st.vel = 0;
            } else {
              moving = true;
            }

            const v = Math.min(Math.max(st.v, 0), 1.08);
            const isMark = st.el.classList.contains("dock-mark");
            const scaleX = 1 + (isMark ? 0.22 : 0.14) * v;
            const scaleY = 1 + (isMark ? 0.22 : 0.16) * v;

            st.el.style.transform = `translate3d(0, ${(v * 3.5).toFixed(2)}px, 0) scale3d(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}, 1)`;
          });
          if (!moving) isDirty = false;
        }

        // Specular highlight rim tracking with dampened calculation
        if (aimSeen && aimMoved) {
          specItems.forEach((st) => {
            const dx = Math.max(dockRect.left - aimX, 0, aimX - dockRect.right);
            const dy = Math.max(dockRect.top - aimY, 0, aimY - dockRect.bottom);
            const d = Math.sqrt(dx * dx + dy * dy);

            const cx = (dockRect.left + dockRect.right) * 0.5;
            const cy = (dockRect.top + dockRect.bottom) * 0.5;

            st.tAng = Math.atan2(cy - aimY, aimX - cx);
            const raw = clamp01(1 - d / st.reach);
            st.tBr = Math.max(raw * raw * (3 - 2 * raw), st.focused ? 0.9 : 0);
          });
        }

        specItems.forEach((st) => {
          const diff =
            ((st.tAng - st.ang + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
          // Softened, calm ambient light follow
          st.ang += diff * (1 - Math.exp(-dt * 5));
          st.br += (st.tBr - st.br) * (1 - Math.exp(-dt * 5));
          if (Math.abs(diff) < 0.001 && Math.abs(st.tBr - st.br) < 0.002) {
            st.ang = st.tAng;
            st.br = st.tBr;
          }
          st.el.style.setProperty("--spec-angle", `${st.ang.toFixed(4)}rad`);
          st.el.style.setProperty(
            "--spec-bright",
            (clamp01(st.br) * 0.92).toFixed(3)
          );
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", measureDock);
    };
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!isReady) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (navLeftRef.current) {
        tl.fromTo(
          navLeftRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.1
        );
      }

      if (navDockRef.current) {
        tl.fromTo(
          navDockRef.current,
          { opacity: 0, y: -12, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          0.2
        );
      }

      if (navRightRef.current) {
        tl.fromTo(
          navRightRef.current,
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5 },
          0.3
        );
      }

      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { y: "105%" },
          { y: "0%", duration: 0.75, ease: "power4.out" },
          0.4
        );
      }

      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { y: "105%" },
          { y: "0%", duration: 0.75, ease: "power4.out" },
          0.58
        );
      }

      if (line3Ref.current) {
        tl.fromTo(
          line3Ref.current,
          { y: "105%" },
          { y: "0%", duration: 0.75, ease: "power4.out" },
          0.76
        );
      }

      if (ruleRef.current) {
        tl.fromTo(
          ruleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.55, ease: "power2.out" },
          0.95
        );
      }

      if (line4Ref.current) {
        tl.fromTo(
          line4Ref.current,
          { y: "105%" },
          { y: "0%", duration: 0.6, ease: "power3.out" },
          1.02
        );
      }

      if (line5Ref.current) {
        tl.fromTo(
          line5Ref.current,
          { y: "105%" },
          { y: "0%", duration: 0.6, ease: "power3.out" },
          1.14
        );
      }

      if (line6Ref.current) {
        tl.fromTo(
          line6Ref.current,
          { y: "105%" },
          { y: "0%", duration: 0.6, ease: "power3.out" },
          1.26
        );
      }

      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55 },
          1.4
        );
      }

      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.9, ease: "power2.out" },
          0.3
        );
      }

      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.6 },
          1.7
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen bg-transparent text-[#1A1A1A] select-none"
    >
      {/* ── ATMOSPHERE: OPTIMIZED SINGLE CANVAS ATMOSPHERE ── */}
      <SectionAtmosphere butterflyType="blue" butterflyCount={3} petalCount={36} className="z-[3]" />

      {/* NAVBAR — fixed top, z-index 100 */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full px-[4vw] md:px-[5vw] lg:px-[72px] py-[22px] flex items-center justify-between pointer-events-auto bg-transparent">
        {/* Left Block */}
        <div ref={navLeftRef} className="flex flex-col">
          <span
            className="m-0 font-heading font-semibold text-[22px] leading-none text-[#1A1A1A] tracking-[0.5em]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LGC
          </span>
          <span
            className="mt-[5px] m-0 font-accent text-[9px] uppercase tracking-[0.4em] text-[#C9A84C]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            001 / EST. 2026
          </span>
        </div>

        {/* Center Sylva Dock Nav — ALL sections in Golden aesthetic matching HOME */}
        <nav
          ref={navDockRef}
          className="hidden md:flex sylva-dock"
          data-spec
          aria-label="Primary"
        >
          {[
            { label: "HOME", href: "#" },
            { label: "ABOUT", href: "#about" },
            { label: "VENTURES", href: "#ventures" },
            { label: "FOUNDERS", href: "#founders" },
            { label: "CONTACT", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-dock
              data-spec
              className={cn(
                "sylva-dock-item",
                activeSection === item.label && "is-active"
              )}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Action Block + Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          <a
            ref={navRightRef}
            href="#contact"
            data-spec
            className="hidden sm:flex sylva-dock-item !border-[rgba(201,168,76,0.3)] !bg-[rgba(34,40,31,0.88)] !text-[#C9A84C] hover:!text-[#FFFFFF] hover:!border-[rgba(255,255,255,0.4)] shadow-md group"
            style={{ height: "42px", padding: "0 18px", borderRadius: "12px" }}
          >
            <span className="text-[11px] font-medium tracking-[0.2em]">
              GET IN TOUCH
            </span>
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </a>

          {/* Mobile Hamburger Toggle Button (>= 48px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl border border-[#C9A84C]/40 bg-[rgba(34,40,31,0.9)] text-[#C9A84C] hover:text-white transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Luxury Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[95] md:hidden bg-[#12050E]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#C9A84C]">
              {"// ARCHITECTURE OF VENTURES"}
            </span>
            {[
              { label: "HOME", href: "#", subtitle: "Genesis & Living Horizon" },
              { label: "ABOUT", href: "#about", subtitle: "Sovereign Holding Philosophy" },
              { label: "VENTURES", href: "#ventures", subtitle: "Active Portfolio Companies" },
              { label: "FOUNDERS", href: "#founders", subtitle: "Keynote & Executive Council" },
              { label: "CONTACT", href: "#contact", subtitle: "Institutional Transmissions" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex flex-col py-2 border-b border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-2xl font-serif tracking-wider transition-colors",
                      activeSection === item.label ? "text-[#C9A84C] italic font-semibold" : "text-white/85 group-hover:text-[#C9A84C]"
                    )}
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs font-mono text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/40 mt-0.5 tracking-wider">
                  {item.subtitle}
                </span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#C9A84C]/25 flex flex-col space-y-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#DFC17B] text-[#120A0E] text-center text-[11px] font-mono font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            >
              INITIATE TRANSMISSION →
            </a>
            <p className="text-[10px] font-mono text-center text-white/40 tracking-wider">
              EST. 2026 // LASHKARI GROUP OF COMPANIES
            </p>
          </div>
        </div>
      )}

      {/* Real Ready-Made Sakura Branch anchored to the TOP-LEFT corner — Grand Scale */}
      <div
        className="absolute top-0 left-0 pointer-events-none z-0 select-none overflow-visible"
        style={{
          width: "clamp(420px, 44vw, 720px)",
          top: "-25px",
          left: "-25px",
        }}
      >
        <img
          src="/images/sakura-branch.webp"
          alt="Lashkari Group Sakura Botanical Art"
          className="w-full h-auto object-contain pointer-events-none opacity-95"
          decoding="async"
          loading="eager"
          style={{
            transform: "scaleY(-1) rotate(-3deg)",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        />
      </div>

      {/* Creative Editorial Left Margin UI Rail */}
      <div className="absolute left-[20px] top-[48%] -translate-y-1/2 z-10 hidden 2xl:flex flex-col items-center gap-4 pointer-events-none opacity-45 select-none">
        <div className="w-[1px] h-[40px] bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
        <span
          className="[writing-mode:vertical-rl] rotate-180 font-accent text-[8px] tracking-[0.45em] uppercase text-[#8C7638]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          2026 // LASHKARI ECOSYSTEM
        </span>
        <div className="w-[1px] h-[40px] bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
      </div>

      {/* CONTENT CONTAINER — SHIFTED TOWARDS LEFT ALIGNED WITH NAVBAR (pl-[4vw] md:pl-[5vw] lg:pl-[72px]) */}
      <div className="relative w-full h-full z-20 pointer-events-auto max-w-[1540px] pl-[4vw] md:pl-[5vw] lg:pl-[72px] pr-[4vw] md:pr-[5vw] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        {/* LEFT COLUMN — TYPOGRAPHY */}
        <div className="relative min-h-[100dvh] bg-transparent flex flex-col justify-center pt-[50px] md:pt-[70px] pointer-events-auto">
          <div className="relative z-10 select-none">
            <h1 className="m-0 p-0">
              <span className="sr-only">
                Lashkari Group of Companies — Ventures Without Limits
              </span>

              <div className="overflow-hidden block leading-[0.88] pr-6" aria-hidden="true">
                <span
                  ref={line1Ref}
                  className="block font-heading font-extrabold italic text-[clamp(44px,5.8vw,100px)] text-[#C9A84C] tracking-[-0.02em] leading-[0.88]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow:
                    "0 2px 18px rgba(255, 255, 255, 0.95), 0 0 32px rgba(255, 255, 255, 0.85), 0 1px 3px rgba(201, 168, 76, 0.3)",
                }}
              >
                VENTURES
              </span>
            </div>

            <div className="overflow-hidden block leading-[0.88] pr-6" aria-hidden="true">
              <span
                ref={line2Ref}
                className="block font-heading font-extrabold italic text-[clamp(44px,5.8vw,100px)] text-[#C9A84C] tracking-[-0.02em] leading-[0.88]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow:
                    "0 2px 18px rgba(255, 255, 255, 0.95), 0 0 32px rgba(255, 255, 255, 0.85), 0 1px 3px rgba(201, 168, 76, 0.3)",
                }}
              >
                WITHOUT
              </span>
            </div>

            <div className="overflow-hidden block leading-[0.88] pr-6" aria-hidden="true">
              <span
                ref={line3Ref}
                className="block font-heading font-extrabold italic text-[clamp(44px,5.8vw,100px)] text-[#C9A84C] tracking-[-0.02em] leading-[0.88]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow:
                    "0 2px 18px rgba(255, 255, 255, 0.95), 0 0 32px rgba(255, 255, 255, 0.85), 0 1px 3px rgba(201, 168, 76, 0.35)",
                }}
              >
                LIMITS.
              </span>
            </div>
          </h1>

            <div
              ref={ruleRef}
              className="w-[64px] h-[1px] bg-[#C9A84C] my-[14px] md:my-[18px] origin-left scale-x-0"
            />

            <div className="overflow-hidden block leading-[0.92] mt-[4px]">
              <span
                ref={line4Ref}
                className="block font-heading font-normal italic text-[clamp(22px,2.4vw,40px)] text-[rgba(26,26,26,0.65)] tracking-[-0.01em] leading-[0.92]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow: "0 1px 12px rgba(255, 255, 255, 0.9)",
                }}
              >
                WHERE IDEAS
              </span>
            </div>

            <div className="overflow-hidden block leading-[0.92]">
              <span
                ref={line5Ref}
                className="block font-heading font-normal italic text-[clamp(22px,2.4vw,40px)] text-[rgba(26,26,26,0.65)] tracking-[-0.01em] leading-[0.92]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow: "0 1px 12px rgba(255, 255, 255, 0.9)",
                }}
              >
                BECOME
              </span>
            </div>

            <div className="overflow-hidden block leading-[0.92]">
              <span
                ref={line6Ref}
                className="block font-heading font-normal italic text-[clamp(22px,2.4vw,40px)] text-[rgba(26,26,26,0.65)] tracking-[-0.01em] leading-[0.92]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow: "0 1px 12px rgba(255, 255, 255, 0.9)",
                }}
              >
                INDUSTRIES.
              </span>
            </div>
          </div>

          <div
            ref={buttonsRef}
            className="mt-[26px] md:mt-[32px] flex items-center gap-[20px] relative z-10"
          >
            <a
              href="#ventures"
              className={cn(
                "inline-block font-accent text-[10px] font-medium uppercase tracking-[0.22em] px-[26px] py-[13px] cursor-pointer",
                "border border-[rgba(201,168,76,0.4)] bg-[rgba(255,255,255,0.85)] backdrop-blur-sm text-[#1A1A1A] no-underline shadow-sm",
                "transition-all duration-400 ease-out hover:border-[#C9A84C] hover:text-[#C9A84C] hover:shadow-md"
              )}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              EXPLORE VENTURES
            </a>

            <a
              href="#about"
              className={cn(
                "inline-block font-accent text-[10px] font-medium uppercase tracking-[0.22em] py-[13px] cursor-pointer",
                "border-none bg-transparent text-[rgba(26,26,26,0.6)] no-underline",
                "transition-all duration-350 ease-out hover:text-[#C9A84C]"
              )}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              OUR STORY →
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — Dedicated open space for 3D green branch */}
        <div className="relative h-screen bg-transparent pointer-events-none hidden lg:block" />
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-[28px] left-0 right-0 z-[30] px-[6vw] flex justify-between items-end pointer-events-none">
        <div />

        <div
          ref={scrollRef}
          onClick={() => {
            const next = document.getElementById("about");
            if (next) next.scrollIntoView({ behavior: "smooth" });
          }}
          className="pointer-events-auto flex flex-col items-center gap-[8px] cursor-pointer group"
        >
          <div className="relative w-[1px] h-[36px] bg-[#C9A84C] opacity-50 overflow-hidden">
            <div className="w-full h-full bg-[#C9A84C] animate-scroll-pulse" />
          </div>
          <span
            className="uppercase text-[8px] font-normal tracking-[0.45em] text-[rgba(201,168,76,0.5)] group-hover:text-[#C9A84C] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}
