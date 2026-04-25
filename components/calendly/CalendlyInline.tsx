"use client";

import { InlineWidget } from "react-calendly";
import { site } from "@/lib/site";

export function CalendlyInline({
  prefill,
}: {
  prefill?: { name?: string; email?: string };
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--bg-elev)]">
      <InlineWidget
        url={site.calendlyUrl}
        styles={{ height: "720px" }}
        prefill={prefill}
        pageSettings={{
          backgroundColor: "0b0d13",
          primaryColor: "7c5cff",
          textColor: "e7e9ee",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
        }}
      />
    </div>
  );
}
