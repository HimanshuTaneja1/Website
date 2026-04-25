import Link from "next/link";
import { site, nav } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/5 py-12">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mono">{site.role}</div>
            <h3 className="mt-2 max-w-sm font-display text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Let’s compound your next quarter.
            </h3>
            <p className="mt-3 max-w-md text-sm text-[color:var(--ink-dim)]">
              Based in {site.location}. Taking Q3 engagements with a maximum of
              three new clients.
            </p>
          </div>
          <div>
            <div className="mono mb-3">Sitemap</div>
            <ul className="space-y-2 text-sm text-[color:var(--ink-dim)]">
              <li>
                <Link className="hover:text-white" href="/">
                  Home
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link className="hover:text-white" href={n.href}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="hover:text-white" href="/book">
                  Book a call
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="mono mb-3">Elsewhere</div>
            <ul className="space-y-2 text-sm text-[color:var(--ink-dim)]">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    className="hover:text-white"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono mb-3">Dispatch</div>
            <p className="text-sm text-[color:var(--ink-dim)]">
              One short note a month. Field reports from production AI, no
              motivation.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-[color:var(--ink-dim)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]" />
            Book a call
          </a>
        </div>
      </div>
    </footer>
  );
}
