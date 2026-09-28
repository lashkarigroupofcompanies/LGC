"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rot: number;
  rotSpeed: number;
  swingAmp: number;
  swingSpeed: number;
  swingOffset: number;
  opacity: number;
}

interface Butterfly {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  flapPhase: number;
  flapSpeed: number;
  heading: number;
}

interface SectionAtmosphereProps {
  butterflyType: "blue" | "gold" | "rose";
  butterflyCount?: number;
  petalCount?: number;
  className?: string;
}

export default function SectionAtmosphere({
  butterflyType,
  butterflyCount = 2,
  petalCount = 16,
  className = "",
}: SectionAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);
    let width = Math.max(canvas.parentElement?.offsetWidth || window.innerWidth || 300, 1);
    let height = Math.max(canvas.parentElement?.offsetHeight || window.innerHeight || 300, 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);

    // Initialize sakura blossom petals
    const petals: Petal[] = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4.5 + 3.5,
      speedY: Math.random() * 0.85 + 0.55,
      speedX: Math.random() * 0.35 - 0.17,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      swingAmp: Math.random() * 1.6 + 0.7,
      swingSpeed: Math.random() * 0.024 + 0.012,
      swingOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.35,
    }));

    // Initialize distinct butterflies for this section
    const butterflies: Butterfly[] = Array.from({ length: butterflyCount }).map((_, idx) => ({
      id: `${butterflyType}-${idx}`,
      x: width * (0.35 + idx * 0.25),
      y: height * (0.3 + idx * 0.2),
      targetX: width * (0.4 + Math.random() * 0.35),
      targetY: height * (0.25 + Math.random() * 0.45),
      speed: 1.0 + Math.random() * 0.4,
      size: 11.5 + Math.random() * 2.5,
      flapPhase: idx * 1.5,
      flapSpeed: 0.15 + Math.random() * 0.04,
      heading: 0,
    }));

    // Pre-render a master crisp sakura petal on an off-screen canvas to eliminate GC allocations
    const petalCanvas = document.createElement("canvas");
    petalCanvas.width = 32;
    petalCanvas.height = 32;
    const pCtx = petalCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createLinearGradient(16, 2, 16, 30);
      grad.addColorStop(0, "#FFDEE6");
      grad.addColorStop(0.65, "#F7A8B8");
      grad.addColorStop(1, "#E58296");
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.moveTo(16, 2);
      pCtx.bezierCurveTo(28, 4, 26, 24, 16, 30);
      pCtx.bezierCurveTo(6, 24, 4, 4, 16, 2);
      pCtx.closePath();
      pCtx.fill();
    }

    let animId: number;
    let time = 0;
    let isVisible = false;

    const render = () => {
      if (!isVisible) return;
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Render Falling Sakura Petals (GPU DrawImage Sprite — 0 GC allocations)
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swingSpeed * 60 + p.swingOffset) * p.swingAmp * 0.32 + p.speedX;
        p.rot += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(petalCanvas, -p.size, -p.size, p.size * 2, p.size * 2);
        ctx.restore();
      });

      // 2. Render Section-Specific Fluttering Butterflies
      butterflies.forEach((b) => {
        b.flapPhase += b.flapSpeed;
        const flap = Math.cos(b.flapPhase);

        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 28) {
          b.targetX = width * (0.2 + Math.random() * 0.65);
          b.targetY = height * (0.15 + Math.random() * 0.65);
          b.speed = 0.85 + Math.random() * 0.55;
          b.flapSpeed = 0.14 + Math.random() * 0.05;
        } else {
          const targetHeading = Math.atan2(dy, dx);
          let hDiff = targetHeading - b.heading;
          while (hDiff < -Math.PI) hDiff += Math.PI * 2;
          while (hDiff > Math.PI) hDiff -= Math.PI * 2;
          b.heading += hDiff * 0.04;

          b.x += Math.cos(b.heading) * b.speed;
          b.y += Math.sin(b.heading) * b.speed + Math.sin(time * 3) * 0.35;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.heading + Math.PI / 2);

        // Section-specific butterfly color palettes
        let wing1 = "#1E88E5";
        let wing2 = "#64B5F6";
        let glow = "rgba(0, 229, 255, 0.45)";

        if (butterflyType === "gold") {
          // Imperial Gold Swallowtail (About Section)
          wing1 = "#D97706";
          wing2 = "#FDE68A";
          glow = "rgba(251, 191, 36, 0.45)";
        } else if (butterflyType === "rose") {
          // Velvet Rose Swallowtails (Ventures Section) with delicate variety
          if (b.id.endsWith("-1")) {
            // Radiant Imperial Gold accent butterfly in Ventures
            wing1 = "#D97706";
            wing2 = "#FDE68A";
            glow = "rgba(251, 191, 36, 0.45)";
          } else if (b.id.endsWith("-2")) {
            // Royal Ruby Rose Swallowtail
            wing1 = "#9D174D";
            wing2 = "#FDA4AF";
            glow = "rgba(244, 63, 94, 0.50)";
          } else {
            // Deep Velvet Magenta Rose Swallowtail
            wing1 = "#BE185D";
            wing2 = "#F472B6";
            glow = "rgba(244, 63, 94, 0.45)";
          }
        }

        // Left Wing
        ctx.save();
        ctx.scale(flap, 1);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(b.size * 1.5, -b.size * 1.4, b.size * 2.1, -b.size * 0.2, b.size * 1.8, b.size * 0.7);
        ctx.bezierCurveTo(b.size * 1.3, b.size * 1.3, b.size * 0.6, b.size * 1.4, 0, b.size * 0.5);
        ctx.closePath();

        const gradL = ctx.createLinearGradient(0, -b.size, b.size * 2, b.size);
        gradL.addColorStop(0, wing1);
        gradL.addColorStop(1, wing2);
        ctx.fillStyle = gradL;
        ctx.fill();
        ctx.strokeStyle = glow;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Right Wing
        ctx.save();
        ctx.scale(-flap, 1);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-b.size * 1.5, -b.size * 1.4, -b.size * 2.1, -b.size * 0.2, -b.size * 1.8, b.size * 0.7);
        ctx.bezierCurveTo(-b.size * 1.3, b.size * 1.3, -b.size * 0.6, b.size * 1.4, 0, b.size * 0.5);
        ctx.closePath();

        const gradR = ctx.createLinearGradient(-b.size * 2, -b.size, 0, b.size);
        gradR.addColorStop(0, wing1);
        gradR.addColorStop(1, wing2);
        ctx.fillStyle = gradR;
        ctx.fill();
        ctx.strokeStyle = glow;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Delicate Body
        ctx.beginPath();
        ctx.ellipse(0, b.size * 0.1, 1.1, b.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#1A1A1A";
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!canvas || !ctx) return;
      width = Math.max(canvas.parentElement?.offsetWidth || window.innerWidth || 300, 1);
      height = Math.max(canvas.parentElement?.offsetHeight || window.innerHeight || 300, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Performance: Pause animation when section is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              animId = requestAnimationFrame(render);
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animId);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [butterflyType, butterflyCount, petalCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}
