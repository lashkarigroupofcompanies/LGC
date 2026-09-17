import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Ventures from "@/components/sections/Ventures";
import Founders from "@/components/sections/Founders";
import Footer from "@/components/sections/Footer";
import ResponsiveSpineEngine from "@/components/ecosystem/ResponsiveSpineEngine";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAF6F8] text-[#1A1A1A] overflow-x-hidden">
      {/* ── INTELLIGENT RESPONSIVE SPINE ENGINE ── */}
      {/* 60-120 FPS mobile-optimized botanical spine on mobile/touch,
          viewport-culled 3D WebGL segments on desktop with zero memory leaks */}
      <ResponsiveSpineEngine />

      {/* ── ORGANIC SAKURA BRANCH IN-BETWEEN SECTIONS (Hero to About) ── */}
      <div
        className="absolute top-[92vh] right-[-25px] pointer-events-none z-[2] select-none overflow-visible"
        style={{
          width: "clamp(360px, 35vw, 600px)",
        }}
      >
        <img
          src="/images/sakura-branch-intermediate.webp"
          alt="Lashkari Group Sakura Botanical Art Inter-Section Transition"
          className="w-full h-auto object-contain pointer-events-none opacity-90"
          style={{
            transform: "rotate(-8deg) scaleX(-1)",
            transformOrigin: "top right",
            filter: "drop-shadow(0 16px 36px rgba(0, 0, 0, 0.08))",
          }}
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
        <Ventures />
        <Founders />
        <Footer />
      </div>
    </main>
  );
}
