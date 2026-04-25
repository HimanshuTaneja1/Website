import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, Clock, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";
import { GlowButton } from "@/components/ui/GlowButton";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Send a message, email me directly, or book a 30-minute strategy call. I reply within one UK business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="pt-[12vh] pb-14">
      <div className="wrap">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Easiest ways to reach me. <span className="text-[color:var(--ink-dim)]">Pick whichever fits your week.</span>
            </>
          }
        />
        <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <ContactForm />
          </div>

          <aside className="space-y-4">
            <Link
              href={`mailto:${site.email}?subject=AI%20Consulting%20Inquiry`}
              className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
              data-cursor="hover"
            >
              <div className="mono flex items-center gap-2">
                <Mail size={12} /> Direct email
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-display text-[18px]">{site.email}</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5" />
              </div>
            </Link>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mono flex items-center gap-2">
                <Clock size={12} /> Response time
              </div>
              <div className="mt-3 font-display text-[18px]">
                One UK business day
              </div>
              <p className="mt-2 text-[13px] text-[color:var(--ink-dim)]">
                Faster for existing clients. For urgent calls the Calendly link
                is the shortest path.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mono flex items-center gap-2">
                <MapPin size={12} /> Based in
              </div>
              <div className="mt-3 font-display text-[18px]">
                {site.location}
              </div>
              <p className="mt-2 text-[13px] text-[color:var(--ink-dim)]">
                Clients in UK, EU and US Eastern. Travel for kickoffs and
                quarterly readouts.
              </p>
            </div>

            <CalendlyPopup>
              <GlowButton className="w-full" size="lg">
                Book a 30-min strategy call
                <ArrowUpRight size={14} />
              </GlowButton>
            </CalendlyPopup>
          </aside>
        </div>
      </div>
    </section>
  );
}
