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
  colorType: "blue" | "gold" | "rose";
  flapPhase: number;
  flapSpeed: number;
  heading: number;
  restTimer: number;
}

export default function GlobalLivingEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 28 delicate sakura blossom petals
    const petals: Petal[] = Array.from({ length: 28 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 5 + 4,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: Math.random() * 0.4 - 0.2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      swingAmp: Math.random() * 1.8 + 0.8,
      swingSpeed: Math.random() * 0.025 + 0.012,
      swingOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.45 + 0.4,
    }));

    // 3 radiant swallowtail butterflies: Electric Morpho, Imperial Gold, Velvet Rose
    const butterflies: Butterfly[] = [
      {
        id: "morpho-blue",
        x: width * 0.45,
        y: height * 0.35,
        targetX: width * 0.52,
        targetY: height * 0.38,
        speed: 1.2,
        size: 10,
        colorType: "blue",
        flapPhase: 0,
        flapSpeed: 0.16,
        heading: 0,
        restTimer: 0,
      },
      {
        id: "imperial-gold",
        x: width * 0.58,
        y: height * 0.42,
        targetX: width * 0.62,
        targetY: height * 0.45,
        speed: 1.0,
        size: 9.5,
        colorType: "gold",
        flapPhase: 1.5,
        flapSpeed: 0.14,
        heading: 0,
        restTimer: 0,
      },
      {
        id: "velvet-rose",
        x: width * 0.52,
        y: height * 0.28,
        targetX: width * 0.48,
        targetY: height * 0.32,
        speed: 1.1,
        size: 8.5,
        colorType: "rose",
        flapPhase: 3.0,
        flapSpeed: 0.18,
        heading: 0,
        restTimer: 0,
      },
    ];

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // ── 1. RENDER SAKURA PETALS ──
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swingSpeed * 60 + p.swingOffset) * p.swingAmp * 0.35 + p.speedX;
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

        // Organic petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.8, p.size * 0.7, p.size * 0.9, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.9, -p.size * 0.85, -p.size * 0.8, 0, -p.size);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, "#FFDEE6");
        grad.addColorStop(0.65, "#F7A8B8");
        grad.addColorStop(1, "#E58296");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      // ── 2. RENDER FLUTTERING BUTTERFLIES ──
      butterflies.forEach((b) => {
        b.flapPhase += b.flapSpeed;
        const flap = Math.cos(b.flapPhase);

        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 25) {
          b.targetX = width * (0.35 + Math.random() * 0.35);
          b.targetY = height * (0.2 + Math.random() * 0.55);
          b.speed = 0.8 + Math.random() * 0.7;
          b.flapSpeed = 0.13 + Math.random() * 0.07;
        } else {
          const targetHeading = Math.atan2(dy, dx);
          let hDiff = targetHeading - b.heading;
          while (hDiff < -Math.PI) hDiff += Math.PI * 2;
          while (hDiff > Math.PI) hDiff -= Math.PI * 2;
          b.heading += hDiff * 0.04;

          b.x += Math.cos(b.heading) * b.speed;
          b.y += Math.sin(b.heading) * b.speed + Math.sin(time * 3) * 0.4;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.heading + Math.PI / 2);

        let wing1 = "#1E88E5";
        let wing2 = "#64B5F6";
        let glow = "rgba(0, 229, 255, 0.45)";

        if (b.colorType === "gold") {
          wing1 = "#D97706";
          wing2 = "#FDE68A";
          glow = "rgba(251, 191, 36, 0.45)";
        } else if (b.colorType === "rose") {
          wing1 = "#BE185D";
          wing2 = "#F472B6";
          glow = "rgba(244, 63, 94, 0.45)";
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
        ctx.shadowColor = glow;
        ctx.shadowBlur = 7;
        ctx.fill();
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
        ctx.shadowColor = glow;
        ctx.shadowBlur = 7;
        ctx.fill();
        ctx.restore();

        // Delicate Body
        ctx.beginPath();
        ctx.ellipse(0, b.size * 0.1, 1.1, b.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#1A1A1A";
        ctx.shadowColor = "transparent";
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[25]"
      style={{ pointerEvents: "none" }}
    />
  );
}
