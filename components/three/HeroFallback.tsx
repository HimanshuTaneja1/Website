export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full spin-slow blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, #7c5cff, #22d3ee, #ff6ad5, #7c5cff)",
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 40% at 50% 60%, rgba(0,0,0,0) 0%, rgba(6,7,11,0.8) 80%, #06070b 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 breathe rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.75), rgba(124,92,255,0.5) 30%, rgba(34,211,238,0.25) 55%, rgba(6,7,11,0) 70%)",
          filter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}
