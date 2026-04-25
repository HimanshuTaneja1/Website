export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  role: string;
  duration: string;
  client: string;
  stack: string[];
  summary: string;
  problem: string[];
  approach: string[];
  outcome: string[];
  owned: string[];
  metrics: { label: string; value: string }[];
  nextSlug: string;
  architecture: string;
  palette: { from: string; to: string };
};

export const workList: CaseStudy[] = [
  {
    slug: "realtime-video-saas",
    title: "Loom-class Realtime Video SaaS + Desktop App",
    eyebrow: "Realtime · SaaS + Desktop",
    year: "2025",
    role: "Lead AI + Systems Engineer",
    duration: "14 weeks",
    client: "Confidential SaaS (seed → Series A)",
    stack: [
      "Next.js 15",
      "Electron",
      "AWS S3",
      "CloudFront",
      "Express",
      "Socket.io",
      "FFmpeg",
      "Postgres",
    ],
    palette: { from: "#7c5cff", to: "#22d3ee" },
    summary:
      "A Loom-style async video platform with a native desktop recorder, auto-summarisation, searchable transcripts and resumable chunked uploads.",
    problem: [
      "The founding team had a browser-only MVP that dropped recordings on shaky connections and could not handle multi-monitor capture.",
      "Transcription was a cron job. Summaries took 30 minutes. Revenue was gated by a painful onboarding.",
      "They needed a paid-tier product inside eight weeks to stay on plan for a Series A raise.",
    ],
    approach: [
      "Shipped an Electron desktop recorder with camera + system audio + multi-monitor, using native capture APIs and a resumable S3 multipart uploader over WebSocket.",
      "Introduced an FFmpeg stitching pipeline on a small GPU pool; chunks are transcribed as they land.",
      "Streaming summaries over Server-Sent Events using a two-stage LLM chain: speaker-labelled outline → exec-ready brief.",
      "Rebuilt the dashboard in Next.js 15 with shared-element transitions, presence and realtime collab comments via Socket.io.",
    ],
    outcome: [
      "38ms median ingestion latency, down from 6.2 seconds.",
      "Zero dropped uploads across 4.9M recorded minutes in the first quarter.",
      "72% MoM growth on paid seats after the desktop launch.",
      "Closed Series A three weeks ahead of plan.",
    ],
    owned: [
      "System design across web + desktop + backend",
      "LLM pipeline: transcription, outline, exec summary, eval harness",
      "Observability: OpenTelemetry traces, Grafana dashboards, cost per minute",
      "Hiring of two product engineers and the onboarding of AI QA",
    ],
    metrics: [
      { label: "Ingestion latency (median)", value: "38ms" },
      { label: "Minutes recorded, Q1", value: "4.9M" },
      { label: "MoM paid seat growth", value: "+72%" },
      { label: "Dropped uploads", value: "0" },
    ],
    nextSlug: "ai-webinar-saas",
    architecture: `flowchart LR
    A["Electron Desktop App<br/>multi-monitor capture"] -->|WebSocket chunks| B["Upload Service<br/>Express + S3 multipart"]
    A -->|metadata| C["Postgres<br/>sessions, comments"]
    B --> D["S3 + CloudFront<br/>chunked assets"]
    D --> E["FFmpeg Stitcher<br/>GPU pool"]
    E --> F["Transcription<br/>Whisper-class"]
    F --> G["LLM Chain<br/>outline → exec brief"]
    G --> H["Next.js Dashboard<br/>SSE stream + Socket.io"]
    C --> H`,
  },
  {
    slug: "ai-webinar-saas",
    title: "AI-Powered Webinar Platform with Voice Sales Agents",
    eyebrow: "Webinars · Voice AI",
    year: "2025",
    role: "Founding AI Engineer",
    duration: "11 weeks",
    client: "Confidential media SaaS",
    stack: ["Next.js 15", "Vapi", "Stream", "Clerk", "Neon", "Hostinger"],
    palette: { from: "#22d3ee", to: "#ff6ad5" },
    summary:
      "Live and evergreen webinar platform where AI voice agents qualify attendees in real time, book demos and hand warm leads to humans.",
    problem: [
      "The team ran 80 webinars per month but only 9% of attendees got a meaningful follow-up. SDRs were drowning.",
      "Vapi prototypes sounded robotic on tricky objections and leaked buyer signals that the CRM never saw.",
      "They needed a measurable lift in booked demos inside 60 days — without adding headcount.",
    ],
    approach: [
      "Rebuilt the webinar runtime on Stream with low-latency branching: the agent joins the call as a first-class participant.",
      "Designed a two-agent voice stack on Vapi: an empathetic qualifier and a booking specialist, with a supervised handover graph.",
      "Wrote an evals harness with 412 real-call transcripts; every deploy ships a regression report to Slack.",
      "Connected intents to the CRM so every buyer signal — price, timeline, tech stack — becomes a structured field, not a note.",
    ],
    outcome: [
      "31% lift in qualified leads vs. human SDRs in an A/B over 1,200+ webinars.",
      "Meeting-booked rate on attendees went from 9% to 21%.",
      "SDR team reallocated to closers, saving the equivalent of two headcount.",
      "p95 turn latency under 680ms on live calls.",
    ],
    owned: [
      "Voice agent architecture and prompt library",
      "Eval harness and release gates",
      "CRM integration and signal taxonomy",
      "Privacy review with the client DPO",
    ],
    metrics: [
      { label: "Qualified lead lift vs. human SDRs", value: "+31%" },
      { label: "Webinars run", value: "1,200+" },
      { label: "p95 turn latency", value: "680ms" },
      { label: "SDR headcount reallocated", value: "2" },
    ],
    nextSlug: "ai-automation-saas",
    architecture: `flowchart LR
    A["Attendee Browser<br/>Stream SDK"] --> B["Webinar Runtime<br/>Next.js 15"]
    B --> C["Vapi Voice Agents<br/>qualifier + booker"]
    C --> D["Supervisor Graph<br/>handover rules"]
    D --> E["Signal Extractor<br/>LLM structured output"]
    E --> F["CRM<br/>HubSpot / Salesforce"]
    B --> G["Neon Postgres<br/>sessions, turns"]
    G --> H["Evals Harness<br/>412 regressions"]`,
  },
  {
    slug: "ai-automation-saas",
    title: "Agentic Automation SaaS with Crypto Billing",
    eyebrow: "Agentic · Billing",
    year: "2024",
    role: "Technical Cofounder (contract)",
    duration: "16 weeks + retainer",
    client: "Bootstrapped ops-automation SaaS",
    stack: ["Next.js", "Neon", "Inngest", "Better Auth", "Cryptomus"],
    palette: { from: "#7c5cff", to: "#f59e0b" },
    summary:
      "An agentic workflow platform where ops teams describe a job in plain English and get a versioned, retry-safe automation — billed per successful run in fiat or crypto.",
    problem: [
      "The founders had a clever demo but no production story: no retries, no auth, no billing, no observability.",
      "Their target buyers — ops leads in crypto-native companies — wanted to pay in stablecoins and hated per-seat pricing.",
      "They needed a product that could survive the first angry customer, not a demo that could survive a tweet.",
    ],
    approach: [
      "Ported the core to Inngest for durable execution with step-level retries, idempotency keys and fan-out.",
      "Introduced a three-layer agent model: planner → executor → critic, with a tool registry scoped per workspace.",
      "Metered per successful run, with Better Auth + Cryptomus for stablecoin checkout and invoice PDFs.",
      "Built an admin console showing cost, tokens, wall time and failure taxonomy per workflow.",
    ],
    outcome: [
      "94% workflow success rate at the three-month mark.",
      "$410k ARR within seven months of launch, all self-serve.",
      "Mean-time-to-recovery under 45 seconds thanks to Inngest replay.",
      "First enterprise contract signed on the back of the observability console.",
    ],
    owned: [
      "Architecture, agent loop and tool registry",
      "Billing: metering, Stripe + Cryptomus, tax handling",
      "Auth and RBAC via Better Auth",
      "Admin observability and abuse controls",
    ],
    metrics: [
      { label: "Workflow success rate", value: "94%" },
      { label: "ARR (month 7)", value: "$410k" },
      { label: "MTTR on failure", value: "<45s" },
      { label: "Time to first paid customer", value: "11 days" },
    ],
    nextSlug: "rag-knowledge-copilot",
    architecture: `flowchart LR
    A["User Prompt"] --> B["Planner Agent<br/>JSON plan"]
    B --> C["Executor Agent<br/>tool registry"]
    C --> D["Inngest Steps<br/>retries, idempotent"]
    D --> E["Critic Agent<br/>verifies output"]
    E --> F["Neon Postgres<br/>runs, cost, tokens"]
    F --> G["Billing<br/>Stripe + Cryptomus"]
    F --> H["Admin Console"]`,
  },
  {
    slug: "rag-knowledge-copilot",
    title: "Enterprise RAG Copilot for a 12k-doc Knowledge Base",
    eyebrow: "RAG · Enterprise",
    year: "2024",
    role: "Principal Consultant",
    duration: "9 weeks",
    client: "Confidential FTSE-listed consultancy",
    stack: ["LangGraph", "Pinecone", "OpenAI", "Next.js", "tRPC"],
    palette: { from: "#22d3ee", to: "#7c5cff" },
    summary:
      "A copilot for 900 internal analysts that grounds answers in 12,000 policy, legal and commercial documents, with citations they can defend to clients.",
    problem: [
      "Analysts spent 40% of the week searching proprietary PDFs. Compliance refused to let any content leave the VPC.",
      "A previous vendor shipped a chatbot that hallucinated clause numbers — one lawsuit scare later, it was torn out.",
      "The ask was strict: grounded answers, citable page spans, zero data egress, under 1s p95.",
    ],
    approach: [
      "Ran a 10-day readiness sprint: document taxonomy, chunking strategy per doc type, eval set of 320 expert questions.",
      "Deployed Pinecone in the client VPC with hybrid search (BM25 + dense), page-span citations and strict answer-grounding rules.",
      "Built a LangGraph supervisor: router → retriever → verifier → answerer, with refusal when grounding confidence is low.",
      "Shipped a Next.js workspace with analyst-side tools: quoting, redlining, export to their brief templates.",
    ],
    outcome: [
      "3.1x analyst throughput on briefing tasks, measured by tracked time-to-first-draft.",
      "p95 answer latency under 800ms even on complex multi-doc questions.",
      "0 documented hallucinated citations in the first 8 weeks of rollout.",
      "Passed internal security and legal review on first submission.",
    ],
    owned: [
      "Retrieval architecture and eval harness",
      "LangGraph agent design and refusal logic",
      "Front-end analyst workflow with shadcn/ui",
      "Vendor and cost model for OpenAI + Pinecone",
    ],
    metrics: [
      { label: "Analyst throughput", value: "3.1×" },
      { label: "p95 answer latency", value: "780ms" },
      { label: "Hallucinated citations", value: "0" },
      { label: "Docs indexed", value: "12,400" },
    ],
    nextSlug: "ops-agent-swarm",
    architecture: `flowchart LR
    A["Analyst Question"] --> B["Router<br/>LangGraph"]
    B --> C["Hybrid Retrieval<br/>Pinecone + BM25"]
    C --> D["Verifier<br/>grounding checks"]
    D --> E{"Grounded?"}
    E -- "yes" --> F["Answerer<br/>OpenAI"]
    E -- "no" --> G["Refuse + suggest docs"]
    F --> H["Citations + Spans"]
    H --> I["Next.js Workspace"]`,
  },
  {
    slug: "ops-agent-swarm",
    title: "Multi-Agent Ops Swarm for E-commerce Back Office",
    eyebrow: "Multi-agent · Ops",
    year: "2024",
    role: "Fractional AI Lead",
    duration: "5 months",
    client: "Confidential DTC retailer (9-figure GMV)",
    stack: ["Temporal", "OpenAI", "Anthropic", "Postgres", "Redis"],
    palette: { from: "#f59e0b", to: "#7c5cff" },
    summary:
      "A coordinated swarm of specialised agents that triages refunds, chargebacks, delivery escalations and wholesale enquiries — with humans only on edge cases.",
    problem: [
      "A 40-person ops team was drowning in 14,000 tickets a week; CSAT was slipping and holiday season was six weeks away.",
      "Previous automations were rule-based spaghetti. Each new SKU added ten new edge cases.",
      "Leadership wanted measurable $ saved per month and a clear audit trail before trusting anything agentic.",
    ],
    approach: [
      "Mapped 40 workflows, collapsed them into 9 archetypes, and built a specialist agent per archetype on Temporal.",
      "Introduced a supervisor agent with hard budgets: tokens, tool calls and reversible actions per ticket.",
      "Every write action requires a second-model critic plus a reversible receipt stored in Postgres.",
      "Built a shadow-mode rollout — agents answered for 30 days with a human gate — then flipped thresholds one workflow at a time.",
    ],
    outcome: [
      "68% of tickets fully auto-resolved at steady state.",
      "$220k/yr in fully-loaded ops savings at current volume.",
      "CSAT up 7 points during Black Friday week, the first time in three years.",
      "Audit trail passed a Big Four controls review on first pass.",
    ],
    owned: [
      "Agent topology and Temporal workflows",
      "Reversible action pattern and critic model",
      "Shadow-mode rollout plan and success metrics",
      "Exec-facing reporting: $ saved, CSAT, escalation rate",
    ],
    metrics: [
      { label: "Auto-resolved tickets", value: "68%" },
      { label: "Annual ops savings", value: "$220k" },
      { label: "CSAT delta (BFCM)", value: "+7 pts" },
      { label: "Workflows automated", value: "9 / 9" },
    ],
    nextSlug: "ai-sales-outbound",
    architecture: `flowchart LR
    A["Ticket Inbox<br/>Zendesk"] --> B["Supervisor Agent<br/>budgets + routing"]
    B --> C["Refunds Specialist"]
    B --> D["Delivery Specialist"]
    B --> E["Wholesale Specialist"]
    C --> F["Critic<br/>second model"]
    D --> F
    E --> F
    F --> G["Reversible Action<br/>Postgres receipt"]
    G --> H["Audit Log"]
    F --> I["Human Escalation<br/>edge cases"]`,
  },
  {
    slug: "ai-sales-outbound",
    title: "AI Outbound Engine with Voice + Email Orchestration",
    eyebrow: "Sales · Voice + Email",
    year: "2025",
    role: "Lead AI Engineer",
    duration: "8 weeks",
    client: "Confidential B2B SaaS, Series A",
    stack: ["Vapi", "Inngest", "Resend", "Next.js", "Neon"],
    palette: { from: "#ff6ad5", to: "#22d3ee" },
    summary:
      "An outbound engine that orchestrates voice calls, email threads and LinkedIn touches across an ICP, with a single agent memory that learns what lands per segment.",
    problem: [
      "Outbound at the client was four disconnected tools and a shared spreadsheet. Reply rates had collapsed to under 1%.",
      "The team had bought into a Vapi dialer, a sequencer and a data provider, none of which talked to each other.",
      "Leadership wanted pipeline this quarter, not a twelve-month platform project.",
    ],
    approach: [
      "Built a single orchestration service on Inngest that owns the cadence state machine across voice, email and LinkedIn.",
      "Introduced a shared agent memory per prospect: what they said, what they opened, what they ignored — with per-segment priors.",
      "Rewrote the email generator to start from a proven pattern library plus the memory, not a cold prompt.",
      "Shipped a per-AE dashboard that shows pipeline attribution and lets reps override, not fight, the agent.",
    ],
    outcome: [
      "$1.2M pipeline generated in the first 90 days, at a 6.4% reply rate.",
      "Meeting-set rate 3.2x the previous quarter, holding ICP constant.",
      "Reduced per-meeting fully-loaded cost by 58%.",
      "AEs kept the engine after the engagement — real product-market fit inside the team.",
    ],
    owned: [
      "Orchestration design and Inngest functions",
      "Agent memory schema and retrieval",
      "Email pattern library and eval harness",
      "AE-facing dashboard and override UX",
    ],
    metrics: [
      { label: "Pipeline generated (90d)", value: "$1.2M" },
      { label: "Reply rate", value: "6.4%" },
      { label: "Meeting-set lift", value: "3.2×" },
      { label: "Cost per meeting", value: "-58%" },
    ],
    nextSlug: "realtime-video-saas",
    architecture: `flowchart LR
    A["ICP List<br/>data provider"] --> B["Orchestrator<br/>Inngest cadence"]
    B --> C["Voice Agent<br/>Vapi"]
    B --> D["Email Agent<br/>Resend + pattern lib"]
    B --> E["LinkedIn Touch<br/>operator-in-the-loop"]
    C --> F["Agent Memory<br/>Neon Postgres"]
    D --> F
    E --> F
    F --> G["AE Dashboard<br/>Next.js"]
    G --> H["Attribution Engine"]`,
  },
];

export const workBySlug = Object.fromEntries(workList.map((w) => [w.slug, w]));
