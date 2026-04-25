"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Hero visual — portrait + brief "About me" card.
 *
 * The portrait faces right, so the whole composition lives on the left half
 * of the hero and naturally leads the eye into the heading + CTAs on the
 * right. Beneath the portrait sits a compact "about me" card (max 3 lines)
 * so the page introduces the human, not just the work.
 *
 * Pure CSS + SVG around a single next/image. Zero WebGL.
 */
export function HeroVisual() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const loop = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={host}
      className="hero-visual relative mx-auto w-full max-w-[500px]"
      style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-10"
        style={{
          background:
            "radial-gradient(55% 55% at 40% 35%, rgba(255,70,90,0.22), transparent 70%), radial-gradient(55% 55% at 80% 80%, rgba(124,92,255,0.18), transparent 70%)",
          filter: "blur(14px)",
        }}
      />

      {/* PORTRAIT FRAME */}
      <div
        className="relative"
        style={{
          transform:
            "translate3d(calc(var(--px) * 6px), calc(var(--py) * 4px), 0)",
          transition: "transform 80ms linear",
        }}
      >
        <PortraitFrame />
      </div>

      {/* ABOUT-ME CARD — sits directly below */}
      <div
        className="relative mt-5"
        style={{
          transform:
            "translate3d(calc(var(--px) * -3px), calc(var(--py) * -2px), 0)",
          transition: "transform 80ms linear",
        }}
      >
        <AboutCard />
      </div>

      {/* corner crosshairs */}
      {(
        [
          ["-top-3 -left-3", "0"],
          ["-top-3 -right-3", "90deg"],
        ] as const
      ).map(([pos, rot]) => (
        <div
          key={pos}
          aria-hidden
          className={`absolute ${pos} h-4 w-4`}
          style={{ transform: `rotate(${rot})` }}
        >
          <div className="absolute left-0 top-0 h-px w-3 bg-white/35" />
          <div className="absolute left-0 top-0 h-3 w-px bg-white/35" />
        </div>
      ))}
    </div>
  );
}

// ----------------------------- Subcomponents -----------------------------

function PortraitFrame() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[22px] border border-white/14 bg-[#0b0d13] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95),0_0_60px_-12px_rgba(255,70,90,0.4)]">
      {/* the portrait */}
      <Image
        src="/portrait.png"
        alt="Illustrated portrait of Himanshu Taneja"
        width={900}
        height={900}
        priority
        sizes="(max-width: 768px) 80vw, 500px"
        className="h-full w-full object-cover"
      />

      {/* vignette / top bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(255,70,90,0.28), transparent 50%), linear-gradient(to top, rgba(11,13,19,0.65) 0%, transparent 40%)",
        }}
      />

      {/* scanline subtle overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* name plate bottom-left */}
      <div className="absolute inset-x-3 bottom-3">
        <div className="rounded-lg border border-white/15 bg-[#0b0d13]/65 px-3 py-2 backdrop-blur-md">
          <div className="mono text-[9px] tracking-[0.22em] text-white/60">
            HIMANSHU TANEJA
          </div>
          <div className="text-[12px] font-semibold tracking-tight text-white">
            AI Business Consultant · London
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b0d13]/75 p-4 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
      {/* accent rail */}
      <div
        aria-hidden
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, #7c5cff 0%, #ff4b67 50%, #34d399 100%)",
          boxShadow: "0 0 12px rgba(255,75,103,0.5)",
        }}
      />
      <div className="pl-3">
        <div className="mono text-[9.5px] tracking-[0.22em] text-white/55">
          ABOUT ME
        </div>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-[color:var(--ink)] text-pretty">
          Fractional AI lead and independent builder. I partner with operators
          to turn LLM and agent systems into measurable revenue — no research
          decks, just production code that ships inside a quarter.
        </p>
      </div>
    </div>
  );
}
