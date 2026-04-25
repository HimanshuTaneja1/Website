import type { CaseStudy } from "@/lib/work";

type Props = {
  palette: { from: string; to: string };
  title: string;
  eyebrow: string;
  slug?: CaseStudy["slug"];
};

/**
 * Rich per-project cover. We render a base gradient + grain + an SVG
 * illustration matched to the case study's domain, so each tile on the
 * work grid reads at a glance. Pure SVG — zero runtime cost.
 */
export function WorkCover({ palette, title, eyebrow, slug }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(70% 60% at 80% 80%, rgba(0,0,0,0.45), transparent 60%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          mixBlendMode: "overlay",
        }}
      />

      {/* project-specific illustration */}
      <div className="absolute inset-0">{renderIllustration(slug)}</div>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,7,11,0.92), rgba(6,7,11,0.25) 50%, rgba(6,7,11,0) 75%)",
        }}
      />

      <div className="absolute bottom-5 left-5 right-5">
        <div className="mono text-white/75">{eyebrow}</div>
        <div className="mt-1 font-display text-[18px] font-semibold tracking-[-0.02em] text-white">
          {title}
        </div>
      </div>
    </div>
  );
}

function renderIllustration(slug?: CaseStudy["slug"]) {
  switch (slug) {
    case "realtime-video-saas":
      return <VideoIllustration />;
    case "ai-webinar-saas":
      return <WebinarIllustration />;
    case "ai-automation-saas":
      return <AutomationIllustration />;
    case "rag-knowledge-copilot":
      return <RagIllustration />;
    case "ops-agent-swarm":
      return <SwarmIllustration />;
    case "ai-sales-outbound":
      return <OutboundIllustration />;
    default:
      return null;
  }
}

// ------------------------ Illustrations ------------------------

function VideoIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
      {/* film strip */}
      <g opacity="0.85">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={40 + i * 82}
            y={60}
            width={78}
            height={130}
            rx={8}
            fill="rgba(0,0,0,0.38)"
            stroke="rgba(255,255,255,0.35)"
          />
        ))}
        {/* sprockets */}
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <rect x={38 + i * 33} y={48} width={10} height={6} rx={2} fill="rgba(0,0,0,0.35)" />
            <rect x={38 + i * 33} y={196} width={10} height={6} rx={2} fill="rgba(0,0,0,0.35)" />
          </g>
        ))}
        {/* play button on first frame */}
        <g transform="translate(80, 125)">
          <circle r="22" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.7)" />
          <polygon points="-6,-10 -6,10 10,0" fill="rgba(255,255,255,0.95)" />
        </g>
        {/* waveform inside other frames */}
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${158 + k * 82}, 125)`}>
            {Array.from({ length: 9 }).map((_, i) => {
              const h = 8 + Math.abs(Math.sin((i + k) * 1.1)) * 24;
              return (
                <rect
                  key={i}
                  x={-32 + i * 8}
                  y={-h / 2}
                  width="4"
                  height={h}
                  rx="1.5"
                  fill="rgba(255,255,255,0.85)"
                />
              );
            })}
          </g>
        ))}
      </g>
      {/* REC blinker */}
      <g transform="translate(340, 40)">
        <circle r="6" fill="#ff5d6e" />
        <text x="12" y="4" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.9)" letterSpacing="1.5">
          LIVE · 4K
        </text>
      </g>
    </svg>
  );
}

function WebinarIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
      {/* stage arc */}
      <g transform="translate(200, 140)">
        <path
          d="M -140 40 Q 0 -60 140 40"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        {/* speaker avatar (agent) */}
        <g>
          <circle r="30" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.7)" />
          <circle cy="-6" r="10" fill="rgba(255,255,255,0.9)" />
          <path d="M -16 18 Q 0 4 16 18 L 16 26 L -16 26 Z" fill="rgba(255,255,255,0.9)" />
          {/* headset */}
          <path d="M -16 -8 A 16 16 0 0 1 16 -8" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          <rect x="-20" y="-9" width="4" height="8" rx="2" fill="#7c5cff" />
          <rect x="16" y="-9" width="4" height="8" rx="2" fill="#7c5cff" />
        </g>
        {/* audience avatars */}
        {[-110, -75, -40, 40, 75, 110].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${32 + (i % 2 ? -4 : 4)})`} opacity="0.9">
            <circle r="12" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.55)" />
            <circle cy="-3" r="4" fill="rgba(255,255,255,0.85)" />
            <path d="M -6 7 Q 0 1 6 7 L 6 11 L -6 11 Z" fill="rgba(255,255,255,0.85)" />
          </g>
        ))}
        {/* voice waves */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M -38 -14 Q 0 ${-22 - i * 6} 38 -14`}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.5"
            opacity={0.7 - i * 0.18}
          />
        ))}
      </g>
      <text x="40" y="40" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">
        LIVE · 412 LISTENING
      </text>
    </svg>
  );
}

function AutomationIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
      {/* workflow graph */}
      <g stroke="rgba(255,255,255,0.6)" fill="none" strokeWidth="1.2">
        <path d="M 50 125 C 110 125, 110 70, 170 70" />
        <path d="M 50 125 C 110 125, 110 180, 170 180" />
        <path d="M 170 70 C 230 70, 230 125, 290 125" />
        <path d="M 170 180 C 230 180, 230 125, 290 125" />
        <path d="M 290 125 L 350 125" />
      </g>
      {/* nodes */}
      {[
        { x: 50, y: 125, label: "input" },
        { x: 170, y: 70, label: "plan" },
        { x: 170, y: 180, label: "tool" },
        { x: 290, y: 125, label: "critic" },
        { x: 350, y: 125, label: "ship" },
      ].map((n, i) => (
        <g key={i} transform={`translate(${n.x}, ${n.y})`}>
          <rect x="-26" y="-14" width="52" height="28" rx="8" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.7)" />
          <text textAnchor="middle" y="4" fontFamily="ui-monospace" fontSize="10" fill="white">
            {n.label}
          </text>
        </g>
      ))}
      {/* flowing particles */}
      <g>
        <circle r="3" fill="#fff">
          <animateMotion dur="4.5s" repeatCount="indefinite" path="M 50 125 C 110 125, 110 70, 170 70 C 230 70, 230 125, 290 125 L 350 125" />
        </circle>
        <circle r="3" fill="#fff" opacity="0.7">
          <animateMotion dur="4.5s" begin="1.5s" repeatCount="indefinite" path="M 50 125 C 110 125, 110 180, 170 180 C 230 180, 230 125, 290 125 L 350 125" />
        </circle>
      </g>
      <text x="40" y="40" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">
        AGENTIC · RETRY-SAFE
      </text>
    </svg>
  );
}

function RagIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
      {/* docs stack */}
      <g transform="translate(90, 75)">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${i * 6}, ${-i * 6})`} opacity={0.5 + i * 0.12}>
            <rect width="90" height="115" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.6)" />
            <rect x="10" y="14" width="70" height="2.5" rx="1" fill="rgba(255,255,255,0.85)" />
            <rect x="10" y="22" width="52" height="2.5" rx="1" fill="rgba(255,255,255,0.55)" />
            <rect x="10" y="30" width="60" height="2.5" rx="1" fill="rgba(255,255,255,0.55)" />
            <rect x="10" y="38" width="40" height="2.5" rx="1" fill="rgba(255,255,255,0.55)" />
            <rect x="10" y="78" width="70" height="2.5" rx="1" fill="rgba(255,255,255,0.55)" />
            <rect x="10" y="86" width="52" height="2.5" rx="1" fill="rgba(255,255,255,0.55)" />
          </g>
        ))}
      </g>
      {/* citation lines to the answer card */}
      <g stroke="rgba(255,255,255,0.55)" strokeDasharray="2 4" fill="none">
        <path d="M 200 130 Q 250 110 300 120" />
        <path d="M 200 120 Q 260 130 300 130" />
        <path d="M 200 140 Q 260 150 300 140" />
      </g>
      {/* answer card */}
      <g transform="translate(300, 95)">
        <rect width="78" height="70" rx="8" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.8)" />
        <rect x="10" y="12" width="56" height="3" rx="1.5" fill="#fff" />
        <rect x="10" y="22" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.65)" />
        <rect x="10" y="32" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.65)" />
        <rect x="10" y="42" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.65)" />
        {/* cite chips */}
        <rect x="10" y="52" width="12" height="8" rx="2" fill="#7c5cff" />
        <rect x="26" y="52" width="12" height="8" rx="2" fill="#22d3ee" />
        <rect x="42" y="52" width="12" height="8" rx="2" fill="#ff6ad5" />
      </g>
      <text x="40" y="40" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">
        RAG · 12,400 DOCS · &lt;800MS
      </text>
    </svg>
  );
}

function SwarmIllustration() {
  const nodes = Array.from({ length: 20 }).map((_, i) => {
    const a = (i / 20) * Math.PI * 2;
    const r = 55 + ((i * 13) % 30);
    return { x: 200 + Math.cos(a) * r, y: 125 + Math.sin(a) * r * 0.65 };
  });
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
      {/* connecting lines to center */}
      {nodes.map((n, i) => (
        <line
          key={i}
          x1="200"
          y1="125"
          x2={n.x}
          y2={n.y}
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.8"
        />
      ))}
      {/* nodes */}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={3 + (i % 3)}
          fill="rgba(255,255,255,0.85)"
        >
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur={`${2 + (i % 4)}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.07).toFixed(2)}s`}
          />
        </circle>
      ))}
      {/* central supervisor */}
      <g transform="translate(200, 125)">
        <circle r="24" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" />
        <circle r="12" fill="rgba(255,255,255,0.95)" />
        <text textAnchor="middle" y="3" fontFamily="ui-monospace" fontSize="9" fontWeight="700" fill="#0b0d13">
          SUP
        </text>
      </g>
      <text x="40" y="40" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">
        MULTI-AGENT · 68% AUTO-RESOLVED
      </text>
    </svg>
  );
}

function OutboundIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
      {/* phone */}
      <g transform="translate(70, 65)">
        <rect width="90" height="130" rx="12" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.7)" />
        <rect x="10" y="10" width="70" height="18" rx="5" fill="rgba(255,255,255,0.1)" />
        {/* voice bars */}
        <g transform="translate(45, 70)">
          {Array.from({ length: 9 }).map((_, i) => {
            const h = 6 + Math.abs(Math.sin(i * 0.9)) * 26;
            return <rect key={i} x={-32 + i * 8} y={-h / 2} width="4" height={h} rx="1.5" fill="rgba(255,255,255,0.85)" />;
          })}
        </g>
        {/* call controls */}
        <circle cx="30" cy="110" r="8" fill="#ff5d6e" />
        <circle cx="60" cy="110" r="8" fill="rgba(255,255,255,0.85)" />
      </g>
      {/* signal arcs from phone */}
      <g transform="translate(160, 130)" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5">
        <path d="M 0 -20 A 20 20 0 0 1 0 20" />
        <path d="M 0 -32 A 32 32 0 0 1 0 32" opacity="0.7" />
        <path d="M 0 -44 A 44 44 0 0 1 0 44" opacity="0.5" />
      </g>
      {/* email envelopes */}
      {[
        { x: 230, y: 70 },
        { x: 280, y: 130 },
        { x: 230, y: 180 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x}, ${p.y})`}>
          <rect width="60" height="40" rx="5" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.7)" />
          <path d="M 0 0 L 30 24 L 60 0" fill="none" stroke="rgba(255,255,255,0.75)" />
        </g>
      ))}
      {/* pipeline bar */}
      <g transform="translate(70, 210)">
        <rect width="260" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
        <rect width="180" height="8" rx="4" fill="rgba(255,255,255,0.9)" />
      </g>
      <text x="40" y="40" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">
        VOICE · EMAIL · $1.2M PIPELINE
      </text>
    </svg>
  );
}
