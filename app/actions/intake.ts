"use server";

import { z } from "zod";

const intakeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  role: z.string().min(1),
  revenue: z.string(),
  goal: z.string().min(10),
  timeline: z.string(),
  budget: z.string(),
});

type Result = { ok: true } | { ok: false; error?: string };

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
}): Promise<Result> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[intake] RESEND_API_KEY not set — logging only");
    console.info({ subject: payload.subject });
    return { ok: true };
  }
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "website@himanshutaneja.com",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });
    if (!r.ok) return { ok: false, error: `Email provider returned ${r.status}` };
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Email failed" };
  }
}

export async function submitIntake(input: unknown): Promise<Result> {
  const parsed = intakeSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input" };
  const d = parsed.data;
  const html = `
    <h2>New intake</h2>
    <p><b>${d.name}</b> · ${d.email}</p>
    <p>${d.role} @ ${d.company}</p>
    <p>Revenue: ${d.revenue} · Timeline: ${d.timeline} · Budget: ${d.budget}</p>
    <p><b>Goal:</b><br/>${d.goal}</p>
  `;
  return sendEmail({
    to: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@himanshutaneja.com",
    subject: `Intake — ${d.name} (${d.company})`,
    html,
  });
}

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContact(input: unknown): Promise<Result> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input" };
  const d = parsed.data;
  const html = `
    <h2>Contact form</h2>
    <p><b>${d.name}</b> · ${d.email}</p>
    <p>${d.message}</p>
  `;
  return sendEmail({
    to: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@himanshutaneja.com",
    subject: `Contact — ${d.name}`,
    html,
  });
}

const newsletterSchema = z.object({ email: z.string().email() });

export async function submitNewsletter(input: unknown): Promise<Result> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid email" };
  return sendEmail({
    to: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@himanshutaneja.com",
    subject: "Newsletter subscription",
    html: `<p>New subscriber: ${parsed.data.email}</p>`,
  });
}
