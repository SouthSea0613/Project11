"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const MermaidDiagram = dynamic(() => import("@/components/MermaidDiagram"), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center text-xs text-muted-foreground">
      렌더러 불러오는 중…
    </div>
  ),
});

const DEFAULT_SAMPLE = `flowchart TB
  client([Client]) --> alb[Load Balancer]
  alb --> app[App Server]
  app --> db[(Database)]`;

type MermaidPlaygroundProps = {
  /** 에디터 초기값. 없으면 기본 샘플. */
  initialCode?: string;
};

/**
 * Mermaid 를 직접 입력하고 즉시 미리볼 수 있는 에디터.
 * 아키텍처를 mermaid 로 생성·수정·확인하는 흐름을 그대로 보여준다.
 */
export default function MermaidPlayground({ initialCode }: MermaidPlaygroundProps) {
  const [code, setCode] = useState(initialCode ?? DEFAULT_SAMPLE);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard 권한 없으면 무시 */
    }
  };

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="min-w-0">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            Mermaid 입력
          </label>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-500 transition hover:bg-emerald-500/20"
          >
            {copied ? "복사됨 ✓" : "코드 복사"}
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="mt-1 h-72 w-full resize-y rounded-xl border bg-background/60 p-3 font-mono text-xs leading-relaxed text-foreground outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        />
      </div>
      <div className="min-w-0">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
          미리보기
        </span>
        <div className="mt-1 rounded-xl border bg-card p-3">
          <MermaidDiagram code={code} />
        </div>
      </div>
    </div>
  );
}
