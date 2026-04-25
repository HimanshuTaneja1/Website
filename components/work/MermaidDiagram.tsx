"use client";

import { useEffect, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod = await import("mermaid");
        const mermaid = mod.default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            background: "#0b0d13",
            primaryColor: "#10131b",
            primaryTextColor: "#e7e9ee",
            primaryBorderColor: "#7c5cff",
            lineColor: "#a4aab8",
            secondaryColor: "#0b0d13",
            tertiaryColor: "#0b0d13",
            fontFamily: "ui-sans-serif, system-ui",
            fontSize: "13px",
          },
          securityLevel: "loose",
        });
        const id = `m-${Math.random().toString(36).slice(2, 8)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        console.error("mermaid failed", e);
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="overflow-auto rounded-lg bg-black/40 p-4 text-[12px] leading-relaxed text-[color:var(--ink-dim)]">
        {chart}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex h-56 items-center justify-center text-[13px] text-[color:var(--ink-dim)]">
        Rendering architecture diagram…
      </div>
    );
  }

  return (
    <div
      className="mermaid-container [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
