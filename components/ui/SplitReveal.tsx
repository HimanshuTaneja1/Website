"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SplitReveal({
  as: Tag = "h1",
  children,
  className,
  delay = 0,
  stagger = 0.05,
  trigger = false,
}: {
  as?: any;
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType(el, { types: "words,chars" });
    gsap.set(split.chars, { yPercent: 110, opacity: 0 });
    gsap.set(el, { opacity: 1 });

    const anim = () =>
      gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "cubic-bezier(0.22,1,0.36,1)",
        stagger,
        delay,
      });

    let st: ScrollTrigger | undefined;
    if (trigger) {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => anim(),
        once: true,
      });
    } else {
      anim();
    }

    return () => {
      st?.kill();
      split.revert();
    };
  }, [children, delay, stagger, trigger]);

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{ opacity: 0, display: "block", overflow: "hidden" }}
    >
      {children}
    </Tag>
  );
}
