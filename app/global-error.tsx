"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("LGC Global Critical Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0C0209] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md space-y-6">
          <div className="text-4xl text-[#C9A84C]">✦</div>
          <h1 className="text-3xl font-serif text-white">Lashkari Group of Companies</h1>
          <p className="text-sm text-white/60">
            A critical system interrupt occurred. Click below to reload the sovereign experience.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-[#C9A84C] text-[#0C0209] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#DFC17B] transition-colors cursor-pointer"
          >
            RECOVER SESSION
          </button>
        </div>
      </body>
    </html>
  );
}
