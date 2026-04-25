"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { submitIntake } from "@/app/actions/intake";

const schema = z.object({
  name: z.string().min(2, "Your name, please"),
  email: z.string().email("A valid email"),
  company: z.string().min(1, "Company name"),
  role: z.string().min(1, "Your role"),
  revenue: z.string(),
  goal: z.string().min(10, "A sentence or two on the goal"),
  timeline: z.string(),
  budget: z.string(),
});

type FormData = z.infer<typeof schema>;

export function IntakeForm({
  onSuccess,
}: {
  onSuccess: (d: { name: string; email: string }) => void;
}) {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors, isSubmitting } = formState;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setError(null);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    const res = await submitIntake(parsed.data);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong");
      return;
    }
    setSubmitted(true);
    onSuccess({ name: data.name, email: data.email });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm">
        <CheckCircle2 className="mb-2 text-[color:var(--success)]" />
        <div className="font-display text-lg">Intake received.</div>
        <p className="mt-1 text-[color:var(--ink-dim)]">
          The calendar below is pre-loaded. Pick a slot that works and
          I&apos;ll confirm within the hour.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            className="input"
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            className="input"
            placeholder="ada@company.com"
            type="email"
            autoComplete="email"
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input {...register("company")} className="input" placeholder="Acme Inc." />
        </Field>
        <Field label="Role" error={errors.role?.message}>
          <input
            {...register("role")}
            className="input"
            placeholder="Head of Product"
          />
        </Field>
        <Field label="Revenue band">
          <select {...register("revenue")} className="input" defaultValue="5-20">
            <option value="<1">&lt; $1M ARR</option>
            <option value="1-5">$1M – $5M</option>
            <option value="5-20">$5M – $20M</option>
            <option value="20-100">$20M – $100M</option>
            <option value="100+">$100M+</option>
          </select>
        </Field>
        <Field label="Timeline">
          <select {...register("timeline")} className="input" defaultValue="next-quarter">
            <option value="now">Starting now</option>
            <option value="next-quarter">Next quarter</option>
            <option value="this-year">This year</option>
            <option value="exploring">Exploring</option>
          </select>
        </Field>
        <Field label="Budget band">
          <select {...register("budget")} className="input" defaultValue="45-120">
            <option value="12-25">£12k – £25k (sprint)</option>
            <option value="45-120">£45k – £120k (build)</option>
            <option value="9k-mo">£9k / mo (fractional)</option>
            <option value="tbd">Not sure yet</option>
          </select>
        </Field>
      </div>
      <Field label="Primary goal" error={errors.goal?.message}>
        <textarea
          {...register("goal")}
          rows={4}
          className="input resize-none"
          placeholder="e.g. reduce analyst time on briefings by 50% in 90 days"
        />
      </Field>

      {error && (
        <p className="text-sm text-[color:var(--accent)]">{error}</p>
      )}

      <div className="flex items-center justify-between pt-2">
        <span className="text-[12px] text-[color:var(--ink-dim)]">
          One-minute form. No data sold or shared.
        </span>
        <GlowButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : null}
          {isSubmitting ? "Submitting" : "Unlock calendar"}
        </GlowButton>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.02);
          padding: 0 12px;
          color: var(--ink);
          font-size: 14px;
          transition: border-color 200ms, background 200ms;
        }
        textarea.input {
          height: auto;
          padding: 12px;
        }
        .input:focus {
          outline: none;
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.04);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <div className="mono mb-1.5 text-[10px]">{label}</div>
      {children}
      {error && (
        <div className="mt-1 text-[11px] text-[color:var(--accent)]">{error}</div>
      )}
    </label>
  );
}
