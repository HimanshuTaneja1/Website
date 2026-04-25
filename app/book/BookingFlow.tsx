"use client";

import { useState } from "react";
import { IntakeForm } from "@/components/forms/IntakeForm";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";

export function BookingFlow() {
  const [prefill, setPrefill] = useState<{ name?: string; email?: string } | null>(
    null
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
      <IntakeForm onSuccess={(d) => setPrefill(d)} />

      <div className="relative">
        {!prefill && (
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="mono">Calendar · locked</div>
            <p className="mt-4 max-w-md text-[14px] leading-[1.65] text-[color:var(--ink-dim)]">
              Submit the intake on the left to unlock available slots. The form
              takes under a minute and helps me show up prepared.
            </p>
            <div className="mt-6 h-80 rounded-xl border border-dashed border-white/10 bg-black/20 shimmer" />
          </div>
        )}
        {prefill && <CalendlyInline prefill={prefill} />}
      </div>
    </div>
  );
}
