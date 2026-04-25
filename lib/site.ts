export const FULL_NAME = "Himanshu Taneja";
export const SHORT_NAME = "Himanshu";

export const site = {
  name: FULL_NAME,
  shortName: SHORT_NAME,
  role: "AI Business Consultant",
  location: "London, UK",
  tagline: "AI that compounds revenue.",
  subTagline:
    "I help operators turn GPT-class models into systems that ship ROI in 90 days.",
  url: "https://himanshutaneja.com",
  description:
    "Fractional AI leadership and done-with-you builds for operators who want revenue, not research. Agentic systems, RAG pipelines and LLM architecture delivered in 90 days.",
  author: FULL_NAME,
  keywords: [
    "AI consultant",
    "AI systems architect",
    "RAG pipeline",
    "LangGraph",
    "LLM",
    "agentic systems",
    "Next.js",
    "Vapi",
    "fractional AI lead",
  ],
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "officialhimanshutaneja@gmail.com",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/officialhimanshutaneja/30min",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/himanshutaneja/",
    },
    { label: "GitHub", href: "https://github.com/himanshutaneja" },
    { label: "X", href: "https://x.com/himanshutaneja" },
    {
      label: "Email",
      href: "mailto:officialhimanshutaneja@gmail.com",
    },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  {
    id: "sprint",
    badge: "01",
    title: "AI Strategy Sprint",
    duration: "2 weeks · outcome-priced",
    priceNote: "Quoted after a free consult",
    description:
      "Two weeks of interviews, data review and architecture calls. You leave with a ranked opportunity map, a ROI model per bet, and a 90-day plan your team can run the Monday after.",
    bullets: [
      "Full stack audit and data readiness review",
      "Opportunity map ranked by ROI and technical risk",
      "90-day build plan with owners and go/no-go gates",
      "Executive-ready deck and live briefing",
    ],
  },
  {
    id: "build",
    badge: "02",
    title: "Agentic Systems Build",
    duration: "6–12 weeks · milestone-priced",
    priceNote: "Scope-priced after a free consult",
    description:
      "I ship a production agent or AI feature end-to-end — evals, guardrails, observability and the ops handoff. Your team owns the repo, the runbooks and the roadmap when I leave.",
    bullets: [
      "Production RAG, tools, memory and eval harness",
      "Cost and latency budgets hit before launch",
      "CI/CD, observability and on-call runbooks",
      "Team handover with internal docs and walkthroughs",
    ],
  },
  {
    id: "fractional",
    badge: "03",
    title: "Fractional AI Lead",
    duration: "monthly retainer",
    priceNote: "Retainer sized to your team",
    description:
      "Embedded with your team as head of AI. I own roadmap, hiring and vendor calls so your execs stop guessing. 30-day cancel, no lock-in.",
    bullets: [
      "Roadmap ownership and weekly execution reviews",
      "Vendor and model selection (OpenAI, Anthropic, open weights)",
      "Hiring bar-raising and technical interviews",
      "Quarterly board readouts with metrics that matter",
    ],
  },
] as const;

export const stackLogos = [
  "Next.js",
  "AWS",
  "Vercel",
  "Neon",
  "Inngest",
  "Clerk",
  "Vapi",
  "OpenAI",
  "Anthropic",
  "LangGraph",
  "Pinecone",
  "Stripe",
  "Cryptomus",
  "Electron",
  "Socket.io",
  "Stream",
  "Better Auth",
  "Hostinger",
  "CloudFront",
] as const;

export const process_ = [
  {
    n: "01",
    title: "Discover",
    body:
      "Two weeks of interviews, data pulls and workflow mapping. We leave with a ranked opportunity map, not a wish list.",
  },
  {
    n: "02",
    title: "Design",
    body:
      "I spec the system the way a senior engineer would: contracts, evals, guardrails, cost and latency budgets, runbooks.",
  },
  {
    n: "03",
    title: "Build",
    body:
      "Small weekly releases behind flags. Every change ships with tests, traces and an eval gate. No demo-ware.",
  },
  {
    n: "04",
    title: "Deploy",
    body:
      "We cut over behind a shadow window and measure the real thing — $ saved, cycle time down, CSAT up.",
  },
  {
    n: "05",
    title: "Compound",
    body:
      "We layer the next bet on top. The goal is a system that gets cheaper and smarter per quarter, not a one-off win.",
  },
] as const;

export const faqs = [
  {
    q: "How do you price engagements?",
    a: "I don't publish fixed fees because no two engagements are priced the same. Scope, timeline, data maturity and on-call risk all move the number. Every engagement starts with a free 30-minute consult; you get a firm, outcome-priced quote inside 48 hours, with no obligation to continue.",
  },
  {
    q: "What does a typical timeline look like?",
    a: "Strategy engagements run two weeks, kickoff on a Monday, readout two Fridays later. Builds ship an internal alpha in 3–4 weeks and hit production in 6–12. Fractional engagements are three months minimum because roadmap work needs time to compound.",
  },
  {
    q: "Who owns the IP and the code?",
    a: "You do. I ship into your repositories from day one, use your cloud accounts, and leave behind architecture docs and runbooks. I keep a generalised, redacted playbook of patterns — never your code, models or data.",
  },
  {
    q: "How do you handle data privacy and compliance?",
    a: "We default to your VPC, your keys and your retention policy. I have shipped under SOC 2, GDPR and HIPAA-adjacent constraints and can work with your DPO to build DPIAs. Nothing leaves your tenant without a written sign-off.",
  },
  {
    q: "What does onboarding look like?",
    a: "Week 1 I sit in your standups, read the last quarter of incident reports, and talk to three customers. By Friday you have a one-page diagnosis and the bets I will take. No 60-page deck, no theatre.",
  },
  {
    q: "What if it's not working?",
    a: "Strategy engagements have a milestone check at the halfway mark; if the direction isn't landing, you can walk away and only pay for work delivered. Builds are milestone-priced so you never pre-pay a milestone you haven't accepted. Fractional retainers are 30-day cancel.",
  },
  {
    q: "Will you work exclusively with us?",
    a: "I run at most two fractional engagements and one active build at a time. For strategy work, I commit to no competing clients during the engagement window. Broader exclusivity is negotiable and priced separately.",
  },
  {
    q: "Where are you based and who do you work with?",
    a: "London, UK. Most clients are in UK, EU and US Eastern time zones. I travel for kickoffs and quarterly readouts. Remote-first on Linear, Slack, Loom and GitHub.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Himanshu replaced eight months of prototypes with one system that paid for itself in the first quarter. He ships like a staff engineer and presents like a partner.",
    name: "CTO, Series B SaaS",
    meta: "6-week build · $410k ARR attributed",
  },
  {
    quote:
      "The consult gave us a scalpel. We killed two pet projects, doubled the headcount on the one that mattered, and shipped it 40 days later.",
    name: "VP Product, enterprise media",
    meta: "Strategy engagement · Q2 2025",
  },
  {
    quote:
      "He held our team to a bar we could not hold ourselves to. The evals he left behind are still our release gate.",
    name: "Head of Engineering, fintech",
    meta: "Fractional AI Lead · 6 months",
  },
] as const;

export const proof = [
  { n: "18", label: "production AI systems shipped" },
  { n: "£4.2M", label: "documented revenue + savings" },
  { n: "<800ms", label: "p95 latency on agent endpoints" },
  { n: "94%", label: "workflow success rate at handoff" },
] as const;
