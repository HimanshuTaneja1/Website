import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasLowCapability(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as any;
  const mem = nav.deviceMemory as number | undefined;
  const cc = nav.hardwareConcurrency as number | undefined;
  if (mem && mem < 4) return true;
  if (cc && cc < 4) return true;
  return false;
}

export function hasWebGL2(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

export function formatInTz(date = new Date()): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    }).format(date);
  } catch {
    return date.toISOString().slice(11, 16);
  }
}
