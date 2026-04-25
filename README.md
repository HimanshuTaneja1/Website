# Himanshu Taneja — AI Business Consultant

A cinematic, production-grade 3D portfolio and consulting website for an AI
Business Consultant. Built in a single pass with Next.js 15, React Three
Fiber, GSAP and Tailwind v4.

> Brand, copy and case studies can be edited centrally in `lib/site.ts` and
> `lib/work.ts`.

## Scripts

```bash
pnpm i
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # run built app
pnpm typecheck  # tsc strict check
pnpm lint       # next lint
```

## Environment

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-handle/30min
NEXT_PUBLIC_CONTACT_EMAIL=you@domain.com
RESEND_API_KEY=             # optional; when empty, forms log and succeed
```

Without `RESEND_API_KEY` the forms still succeed — the intake is logged to the
server console. Drop in a Resend key to start receiving emails in production.

## Editing content

- **Brand, services, FAQ, testimonials** — `lib/site.ts`
- **Case studies** — `lib/work.ts` (6 studies, edit the `workList` array)
- **Metadata** — `lib/seo.ts`

## Adding a case study

1. Add a new entry to `workList` in `lib/work.ts`. Every case study needs a
   `slug`, `title`, `stack`, `metrics`, `problem`, `approach`, `outcome`,
   `owned`, `architecture` (mermaid) and a `palette`.
2. Update `nextSlug` on the previous case study if you want it in the
   round-robin.
3. Routes are generated automatically at build time from `workList`.

## Deploying to Vercel

1. Push to GitHub.
2. Import into Vercel, set the three env vars above.
3. Build command: `pnpm build`. Output: `.next`. Node: 20+.

## Opinionated defaults

I had to make senior judgement calls where the brief was silent:

- **Fonts** — shipped with Inter + JetBrains Mono (next/font) and Space Grotesk
  as the display font. Clash Display requires a paid license, so I picked a
  free, near-identical display face; swap via `app/layout.tsx` if you have
  rights to Clash.
- **3D** — single `<Canvas>` on the hero with transmission + bloom +
  chromatic aberration + vignette. Low-capability devices and reduced-motion
  users get a CSS-only conic-gradient fallback automatically.
- **Case study images** — all generated at runtime from palette-driven
  `<WorkCover>` components. No stock photography, no placeholders.
- **Architecture diagrams** — rendered client-side with `mermaid` using a dark
  theme that matches the brand.
- **Calendly** — popup on every CTA, inline widget gated behind the intake
  form on `/book`. Respect user time: the form is one minute.
- **Forms** — `react-hook-form + zod`, server action that calls Resend if a
  key is present, otherwise logs server-side.
- **SEO** — dynamic OG via `@vercel/og` at `/api/og`, per-route metadata, JSON-LD
  Person and ProfessionalService, sitemap + robots + manifest at build.
- **Performance** — DPR 1→1.75, AdaptiveDpr/Events, lazy-loaded Canvas with
  `ssr:false`, route-level static generation for case studies, `next/font`
  for zero layout shift.
- **Accessibility** — visible focus rings, skip-to-content link, semantic
  landmarks, WCAG AA colour contrast, honours `prefers-reduced-motion`
  everywhere (Lenis off, 3D frozen, counters skip).

## License

MIT — see `LICENSE`.
