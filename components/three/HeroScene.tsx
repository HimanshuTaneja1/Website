"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { hasLowCapability, hasWebGL2 } from "@/lib/utils";
import { HeroFallback } from "./HeroFallback";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export function HeroScene() {
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ok = hasWebGL2() && !hasLowCapability();
    setCanRender3D(ok);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0.02 }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      <HeroFallback />
      {canRender3D && visible ? <HeroCanvas /> : null}
    </div>
  );
}
