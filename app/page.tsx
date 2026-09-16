import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Ventures from "@/components/sections/Ventures";
import Founders from "@/components/sections/Founders";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAF6F8] text-[#1A1A1A] overflow-x-hidden">
      {/* ── UNIFIED CONTINUOUS 3D LIVING GREEN SYLVA TREE SPINE ── */}
      {/* Spans continuously across all 5 sections from Hero (0) all the way down into the Footer plinth.
          5 seamlessly overlapping segments that connect like a single living ancient Japanese bough,
          with zero gaps, zero horizontal cuts, and zero stops. */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
        {/* Subtle Ambient Atmosphere: delicate sakura blush pink warmth with soft touches of living botanical green */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: [
              // Gentle Sakura Blush Washes ("liitle pinkis")
              "radial-gradient(ellipse 75% 45% at 25% 6%, rgba(255, 220, 230, 0.40) 0%, rgba(255, 235, 242, 0.15) 50%, transparent 80%)",
              "radial-gradient(ellipse 80% 50% at 75% 18%, rgba(255, 225, 235, 0.32) 0%, rgba(255, 240, 245, 0.10) 50%, transparent 80%)",
              "radial-gradient(ellipse 70% 45% at 30% 32%, rgba(255, 218, 228, 0.35) 0%, rgba(255, 235, 242, 0.12) 50%, transparent 80%)",
              "radial-gradient(ellipse 75% 50% at 65% 48%, rgba(255, 222, 232, 0.32) 0%, rgba(255, 238, 244, 0.10) 50%, transparent 80%)",
              "radial-gradient(ellipse 80% 50% at 20% 64%, rgba(255, 215, 226, 0.36) 0%, rgba(255, 235, 242, 0.12) 50%, transparent 80%)",
              "radial-gradient(ellipse 75% 45% at 70% 78%, rgba(255, 220, 230, 0.34) 0%, rgba(255, 238, 244, 0.10) 50%, transparent 80%)",
              "radial-gradient(ellipse 80% 50% at 30% 92%, rgba(255, 222, 232, 0.32) 0%, rgba(255, 240, 245, 0.10) 50%, transparent 80%)",
              // Very Little Botanical Green Whispers ("very little green" following the tree path)
              "radial-gradient(ellipse 65% 40% at 88% 10%, rgba(68, 88, 56, 0.16) 0%, rgba(92, 114, 78, 0.06) 50%, transparent 75%)",
              "radial-gradient(ellipse 60% 35% at 88% 28%, rgba(68, 88, 56, 0.14) 0%, rgba(92, 114, 78, 0.05) 50%, transparent 75%)",
              "radial-gradient(ellipse 60% 35% at 88% 44%, rgba(68, 88, 56, 0.15) 0%, rgba(92, 114, 78, 0.06) 50%, transparent 75%)",
              "radial-gradient(ellipse 60% 35% at 88% 62%, rgba(68, 88, 56, 0.13) 0%, rgba(92, 114, 78, 0.05) 50%, transparent 75%)",
              "radial-gradient(ellipse 60% 35% at 88% 76%, rgba(68, 88, 56, 0.14) 0%, rgba(92, 114, 78, 0.05) 50%, transparent 75%)",
              "radial-gradient(ellipse 65% 40% at 88% 90%, rgba(68, 88, 56, 0.18) 0%, rgba(92, 114, 78, 0.06) 50%, transparent 75%)",
              // Subtle Imperial Gold Accent
              "radial-gradient(ellipse 55% 40% at 15% 24%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
              "radial-gradient(ellipse 55% 40% at 80% 68%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)"
            ].join(", "),
          }}
        />

        {/* ── SEGMENT 1: HERO & ABOUT (0 to 230vh) ── */}
        <div className="absolute top-0 right-0 w-full h-[230vh] pointer-events-none overflow-visible">
          <iframe
            src="/landing-pages/sylva-branch.html?v=clean"
            title="Sylva 3D Green Branch - Genesis (Hero & About)"
            className="border-0 pointer-events-none"
            style={{
              position: "absolute",
              right: "-2vw",
              top: "-70vw",
              width: "230vh",
              height: "70vw",
              border: 0,
              background: "transparent",
              transformOrigin: "bottom right",
              transform: "rotate(-90deg) scale(1.35)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── SEGMENT 2: VENTURES (215vh to 380vh) — Seamlessly connects from About ── */}
        <div className="absolute top-[215vh] right-0 w-full h-[170vh] pointer-events-none overflow-visible">
          <iframe
            src="/landing-pages/sylva-branch.html?v=clean"
            title="Sylva 3D Green Branch - Ventures Spine"
            className="border-0 pointer-events-none"
            style={{
              position: "absolute",
              right: "-2vw",
              top: "-60vw",
              width: "165vh",
              height: "65vw",
              border: 0,
              background: "transparent",
              transformOrigin: "bottom right",
              transform: "rotate(-90deg) scale(1.3)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── SEGMENT 3: FOUNDERS KEYNOTE (365vh to 530vh) — Seamlessly connects from Ventures ── */}
        <div className="absolute top-[365vh] right-0 w-full h-[170vh] pointer-events-none overflow-visible">
          <iframe
            src="/landing-pages/sylva-branch.html?v=clean"
            title="Sylva 3D Green Branch - Founders Keynote Spine"
            className="border-0 pointer-events-none"
            style={{
              position: "absolute",
              right: "-2vw",
              top: "-60vw",
              width: "165vh",
              height: "65vw",
              border: 0,
              background: "transparent",
              transformOrigin: "bottom right",
              transform: "rotate(-90deg) scale(1.3)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── SEGMENT 4: FOUNDERS CO-FOUNDER DECK & TRANSITION (515vh to 700vh) — Bridges into Contact ── */}
        <div className="absolute top-[515vh] right-0 w-full h-[185vh] pointer-events-none overflow-visible">
          <iframe
            src="/landing-pages/sylva-branch.html?v=clean"
            title="Sylva 3D Green Branch - Founders to Contact Bridge"
            className="border-0 pointer-events-none"
            style={{
              position: "absolute",
              right: "-2vw",
              top: "-60vw",
              width: "185vh",
              height: "65vw",
              border: 0,
              background: "transparent",
              transformOrigin: "bottom right",
              transform: "rotate(-90deg) scale(1.3)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── SEGMENT 5: CONTACT & FULL FOOTER PLINTH (760vh to footer bottom) — Unbroken connection right into footer ── */}
        <div className="absolute top-[760vh] right-0 w-full h-[260vh] pointer-events-none overflow-visible">
          <iframe
            src="/landing-pages/sylva-branch.html?v=clean"
            title="Sylva 3D Green Branch - Contact & Footer Finale"
            className="border-0 pointer-events-none"
            style={{
              position: "absolute",
              right: "-2vw",
              top: "-55vw",
              width: "250vh",
              height: "70vw",
              border: 0,
              background: "transparent",
              transformOrigin: "bottom right",
              transform: "rotate(-90deg) scale(1.35)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ── ORGANIC SAKURA BRANCH IN-BETWEEN SECTIONS (Hero to About) ── */}
      <div
        className="absolute top-[92vh] right-[-25px] pointer-events-none z-[2] select-none overflow-visible"
        style={{
          width: "clamp(360px, 35vw, 600px)",
        }}
      >
        <img
          src="/images/sakura-branch-intermediate.webp"
          alt="Sakura Branch Inter-Section"
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
