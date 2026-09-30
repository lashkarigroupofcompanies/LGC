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

interface ButterflySprite {
  canvas: HTMLCanvasElement;
  originX: number;
  originY: number;
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
  spriteL: ButterflySprite;
  spriteR: ButterflySprite;
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

    // Capped at 1.0 DPR for lightweight, 60-120 FPS buttery smooth particles without fill-rate bottleneck
    const dpr = 1.0;
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

    // Helper to generate a pre-rendered high-res wing sprite
    const makeWingSprite = (size: number, c1: string, c2: string, glowCol: string, isRight: boolean) => {
      const sw = Math.ceil(size * 2.6) + 16;
      const sh = Math.ceil(size * 2.6) + 16;
      const wc = document.createElement("canvas");
      wc.width = sw;
      wc.height = sh;
      const wctx = wc.getContext("2d");
      if (!wctx) return { canvas: wc, originX: 0, originY: 0 };

      const originX = isRight ? 8 : sw - 8;
      const originY = 8 + size * 0.7;
      wctx.translate(originX, originY);
      if (isRight) wctx.scale(-1, 1);

      wctx.beginPath();
      wctx.moveTo(0, 0);
      wctx.bezierCurveTo(size * 1.5, -size * 1.4, size * 2.1, -size * 0.2, size * 1.8, size * 0.7);
      wctx.bezierCurveTo(size * 1.3, size * 1.3, size * 0.6, size * 1.4, 0, size * 0.5);
      wctx.closePath();

      const grad = wctx.createLinearGradient(0, -size, size * 2, size);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);
      wctx.fillStyle = grad;
      wctx.fill();
      wctx.strokeStyle = glowCol;
      wctx.lineWidth = 1;
      wctx.stroke();

      return { canvas: wc, originX, originY };
    };

    // Initialize distinct butterflies with pre-rendered wing textures for this section
    const butterflies: Butterfly[] = Array.from({ length: butterflyCount }).map((_, idx) => {
      let wing1 = "#1E88E5";
      let wing2 = "#64B5F6";
      let glow = "rgba(0, 229, 255, 0.45)";

      if (butterflyType === "gold") {
        wing1 = "#D97706";
        wing2 = "#FDE68A";
        glow = "rgba(251, 191, 36, 0.45)";
      } else if (butterflyType === "rose") {
        if (idx === 1) {
          wing1 = "#D97706";
          wing2 = "#FDE68A";
          glow = "rgba(251, 191, 36, 0.45)";
        } else if (idx === 2) {
          wing1 = "#9D174D";
          wing2 = "#FDA4AF";
          glow = "rgba(244, 63, 94, 0.50)";
        } else {
          wing1 = "#BE185D";
          wing2 = "#F472B6";
          glow = "rgba(244, 63, 94, 0.45)";
        }
      }

      const size = 11.5 + Math.random() * 2.5;
      const spriteL = makeWingSprite(size, wing1, wing2, glow, false);
      const spriteR = makeWingSprite(size, wing1, wing2, glow, true);

      return {
        id: `${butterflyType}-${idx}`,
        x: width * (0.35 + idx * 0.25),
        y: height * (0.3 + idx * 0.2),
        targetX: width * (0.4 + Math.random() * 0.35),
        targetY: height * (0.25 + Math.random() * 0.45),
        speed: 1.0 + Math.random() * 0.4,
        size,
        flapPhase: idx * 1.5,
        flapSpeed: 0.15 + Math.random() * 0.04,
        heading: 0,
        spriteL,
        spriteR,
      };
    });

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

      // 2. Render Section-Specific Fluttering Butterflies (Hardware Sprites — 0 GC Allocations)
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

        // Left Wing Sprite
        ctx.save();
        ctx.scale(flap, 1);
        ctx.drawImage(b.spriteL.canvas, -b.spriteL.originX, -b.spriteL.originY);
        ctx.restore();

        // Right Wing Sprite
        ctx.save();
        ctx.scale(-flap, 1);
        ctx.drawImage(b.spriteR.canvas, -b.spriteR.originX, -b.spriteR.originY);
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

    // Performance: Pause animation immediately when section is scrolled out of viewport
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
      { threshold: 0, rootMargin: "0px" }
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
      style={{
        pointerEvents: "none",
        contain: "strict",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  );
}
