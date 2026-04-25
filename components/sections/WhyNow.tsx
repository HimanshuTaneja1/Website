"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Sticky-pinned kinetic section. The middle word rotates through three
 * verbs; only one word is ever visible at a time, regardless of scroll
 * direction. The closing line holds as the centerpiece.
 */

const WORDS = [
  { text: "talk about", tone: "#a4aab8" },
  { text: "prototype", tone: "#22d3ee" },
  { text: "wrap", tone: "#ff6ad5" },
] as const;

export function WhyNow() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const el = wrap.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));

    if (reduce) {
      gsap.set(words, { opacity: 0 });
      gsap.set(words[words.length - 1]!, { opacity: 1, y: 0, filter: "none" });
      return;
    }

    // start hidden
    gsap.set(words, { opacity: 0, yPercent: 60, filter: "blur(8px)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=220%",
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    const stageDuration = 1; // relative units inside the timeline
    words.forEach((w, i) => {
      const at = i * stageDuration;
      tl.to(
        w,
        {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: stageDuration * 0.35,
          ease: "power2.out",
        },
        at
      );
      if (i < words.length - 1) {
        tl.to(
          w,
          {
            opacity: 0,
            yPercent: -60,
            filter: "blur(8px)",
            duration: stageDuration * 0.35,
            ease: "power2.in",
          },
          at + stageDuration * 0.65
        );
      }
    });

    // reveal the closing line after the last verb locks in
    const outro = el.querySelector<HTMLElement>("[data-outro]");
    if (outro) {
      gsap.set(outro, { opacity: 0, y: 20 });
      tl.to(
        outro,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        (words.length - 1) * stageDuration + 0.35
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((s) => s.trigger === el)
        .forEach((s) => s.kill());
    };
  }, []);

  return (
    <section id="why-now" className="relative">
      <div ref={wrap} className="relative h-[100svh] overflow-hidden">
        <div className="wrap absolute inset-0 flex flex-col items-start justify-center">
          <Eyebrow>Why now</Eyebrow>

          <h2 className="mt-6 max-w-5xl font-display text-[clamp(36px,7vw,120px)] font-semibold leading-[0.95] tracking-[-0.045em]">
            <span className="block">Most teams still just</span>
            <span className="relative mt-2 block h-[1.05em] overflow-hidden">
              {WORDS.map((w, i) => (
                <span
                  key={w.text}
                  data-word
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    color: w.tone,
                    willChange: "transform, opacity, filter",
                  }}
                  aria-hidden={i !== WORDS.length - 1}
                >
                  {w.text}
                </span>
              ))}
              <span className="invisible" aria-hidden>
                prototype
              </span>
            </span>
            <span className="block">AI.</span>
          </h2>

          <p
            data-outro
            className="mt-10 max-w-2xl text-[clamp(18px,2vw,26px)] leading-[1.35] tracking-[-0.02em] text-[color:var(--ink)]"
          >
            You should be{" "}
            <span className="gradient-text font-semibold">compounding</span>{" "}
            it — shipping systems that get cheaper, smarter and more valuable
            every quarter.
          </p>
        </div>
      </div>
    </section>
  );
}
