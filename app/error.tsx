"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Client error reporting / tracking
    console.error("LGC Application Exception:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0E030B] text-white flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Background Warning Glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-lg space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center shadow-lg">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C9A84C]">
            {"// RECOVERY PROTOCOL ENGAGED"}
          </span>
          <h1
            className="text-4xl font-serif text-white font-normal"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Experience Interrupted
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            A visual or runtime anomaly occurred during rendering. Our fault tolerance layer has
            preserved session integrity.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#DFC17B] text-[#120A0E] text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center space-x-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REINITIALIZE SCENE</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-mono tracking-widest uppercase transition-all"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
