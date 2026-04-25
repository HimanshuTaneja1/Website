"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { submitNewsletter } from "@/app/actions/intake";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    const res = await submitNewsletter({ email });
    setLoading(false);
    if (res.ok) setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 text-[13px] text-[color:var(--ink-dim)]">
        <CheckCircle2 size={14} className="text-[color:var(--success)]" />
        You&apos;re on the list.
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 pl-3"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="h-9 w-full bg-transparent text-[13px] text-white placeholder:text-[color:var(--ink-dim)] focus:outline-none"
        required
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
        disabled={loading}
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <ArrowRight size={14} />
        )}
      </button>
    </form>
  );
}
