import Link from "next/link";
import { ArrowLeft, Compass, Building, Users, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0F040C] text-[#FAF6F8] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Ambient Cherry & Gold Lighting */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[600px] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201, 168, 76, 0.25) 0%, rgba(255, 51, 102, 0.15) 50%, transparent 80%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(68, 88, 56, 0.25) 0%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top Brand Bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
        <Link href="/" className="flex flex-col group">
          <span
            className="font-heading font-semibold text-2xl text-white tracking-[0.4em] group-hover:text-[#DFC17B] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LGC
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            LASHKARI GROUP // 404
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#DFC17B] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>
      </header>

      {/* Central 404 Hero */}
      <div className="relative z-10 max-w-3xl my-auto py-12 space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/10 text-[#DFC17B] text-[10px] font-mono tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5 text-[#C9A84C]" />
          <span>DISPATCH ERROR 404 // ROUTE UNCHARTED</span>
        </div>

        <h1
          className="text-5xl sm:text-7xl font-serif font-light text-white leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Path You Seek <br />
          <span className="italic text-[#C9A84C]">Has Yet to Unfold.</span>
        </h1>

        <p className="text-sm sm:text-base text-white/70 max-w-xl font-light leading-relaxed">
          The requested coordinate does not exist within the active Lashkari Group ecosystem.
          Navigate back to our verified corporate chambers below:
        </p>

        {/* Quick Route Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Link
            href="/#ventures"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10 transition-all group"
          >
            <div className="flex items-center space-x-2 text-[#C9A84C] mb-2">
              <Building className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
                VENTURES
              </span>
            </div>
            <p className="text-xs text-white/60 group-hover:text-white/90 transition-colors">
              Explore our 6 active technology, health, and AI ventures.
            </p>
          </Link>

          <Link
            href="/#founders"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10 transition-all group"
          >
            <div className="flex items-center space-x-2 text-[#C9A84C] mb-2">
              <Users className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
                LEADERSHIP
              </span>
            </div>
            <p className="text-xs text-white/60 group-hover:text-white/90 transition-colors">
              Meet the founders, principals, and executive council.
            </p>
          </Link>

          <Link
            href="/#contact"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10 transition-all group"
          >
            <div className="flex items-center space-x-2 text-[#C9A84C] mb-2">
              <Mail className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
                CONTACT
              </span>
            </div>
            <p className="text-xs text-white/60 group-hover:text-white/90 transition-colors">
              Initiate institutional partnerships or venture transmissions.
            </p>
          </Link>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#DFC17B] text-[#120A0E] text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:scale-105 transition-all"
          >
            <span>RETURN TO LGC HEADQUARTERS</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Footer Colophon */}
      <footer className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40">
        <span>© 2026 LASHKARI GROUP OF COMPANIES. ALL RIGHTS RESERVED.</span>
        <span className="mt-2 sm:mt-0 tracking-widest text-[#DFC17B]">
          WHERE IDEAS BECOME INDUSTRIES
        </span>
      </footer>
    </main>
  );
}
