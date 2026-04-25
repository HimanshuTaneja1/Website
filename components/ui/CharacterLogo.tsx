"use client";

/**
 * Brand monogram mark. A clean gradient "H" with a rotating conic halo
 * and a soft purple glow — lightweight, animated, on-brand.
 */
export function CharacterLogo({ size = 34 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="character-logo relative inline-flex shrink-0 items-center justify-center rounded-[11px]"
      style={{ width: size, height: size }}
    >
      <span
        className="character-logo-ring absolute inset-0 rounded-[11px]"
        style={{
          background:
            "conic-gradient(from 0deg, #7c5cff, #22d3ee, #ff6ad5, #7c5cff)",
        }}
      />
      <span
        className="character-logo-glow absolute rounded-[14px]"
        style={{
          inset: -5,
          background:
            "radial-gradient(circle, rgba(124,92,255,0.55), rgba(34,211,238,0) 60%)",
          filter: "blur(6px)",
        }}
      />
      <span
        className="relative flex items-center justify-center rounded-[9px] bg-[#0b0d13]"
        style={{ width: size - 3, height: size - 3 }}
      >
        <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]">
          <defs>
            <linearGradient id="logoH" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#ff6ad5" />
            </linearGradient>
          </defs>
          <path
            d="M 4 3 L 4 21 M 20 3 L 20 21 M 4 12 L 20 12"
            fill="none"
            stroke="url(#logoH)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className="absolute right-0 top-0 h-[7px] w-[7px] rounded-full border border-[#0b0d13] bg-emerald-400"
        style={{ boxShadow: "0 0 6px rgba(52,211,153,0.9)" }}
      />
    </span>
  );
}
