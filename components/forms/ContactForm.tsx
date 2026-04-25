"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { submitContact } from "@/app/actions/intake";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormData>();
  const [done, setDone] = useState(false);

  const onSubmit = async (data: FormData) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) return;
    const res = await submitContact(parsed.data);
    if (res.ok) {
      setDone(true);
      reset();
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm">
        <CheckCircle2 className="mb-2 text-[color:var(--success)]" />
        <div className="font-display text-lg">Message received.</div>
        <p className="mt-1 text-[color:var(--ink-dim)]">
          I reply within one UK business day. If it&apos;s urgent, the Calendly
          link is faster.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          {...register("name")}
          placeholder="Your name"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.02] px-3 text-sm text-white placeholder:text-[color:var(--ink-dim)] focus:border-[color:var(--accent)] focus:outline-none"
          autoComplete="name"
        />
        <input
          {...register("email")}
          placeholder="you@company.com"
          type="email"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.02] px-3 text-sm text-white placeholder:text-[color:var(--ink-dim)] focus:border-[color:var(--accent)] focus:outline-none"
          autoComplete="email"
        />
      </div>
      <textarea
        {...register("message")}
        placeholder="What are you trying to ship, and by when?"
        rows={5}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white placeholder:text-[color:var(--ink-dim)] focus:border-[color:var(--accent)] focus:outline-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[color:var(--ink-dim)]">
          No newsletter autosub, no sales drip.
        </span>
        <GlowButton type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          Send
        </GlowButton>
      </div>
    </form>
  );
}
