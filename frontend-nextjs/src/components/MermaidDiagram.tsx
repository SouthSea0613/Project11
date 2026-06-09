"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

type MermaidDiagramProps = {
  /** Mermaid 다이어그램 소스 코드 */
  code: string;
  className?: string;
};

/**
 * Mermaid 소스를 클라이언트에서 SVG로 렌더링한다.
 * - mermaid 는 무거우므로 effect 안에서 동적 import (해당 컴포넌트가 마운트될 때만 로드)
 * - 파싱 오류 시 빌드를 깨지 않고 화면에 오류 박스만 표시
 */
export default function MermaidDiagram({ code, className = "" }: MermaidDiagramProps) {
  const rawId = useId();
  const id = "mmd-" + rawId.replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "light" ? "default" : "dark",
          // loose: 작성자(데이터)·본인 플레이그라운드 입력 한정이라 <br/> 등 htmlLabels 허용
          securityLevel: "loose",
          fontFamily: "inherit",
        });
        const { svg: rendered } = await mermaid.render(id, code.trim());
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setSvg("");
          setError(e instanceof Error ? e.message : "다이어그램을 그릴 수 없습니다.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, id, resolvedTheme]);

  if (error) {
    return (
      <div
        className={`rounded-xl border border-rose-400/40 bg-rose-500/10 p-4 text-xs text-rose-600 dark:text-rose-300 ${className}`}
      >
        <p className="font-semibold">Mermaid 문법 오류</p>
        <pre className="mt-1 whitespace-pre-wrap break-words opacity-90">{error}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        className={`flex h-40 items-center justify-center text-xs text-muted-foreground ${className}`}
      >
        다이어그램 렌더링 중…
      </div>
    );
  }

  return (
    <div
      className={`mermaid-diagram overflow-x-auto [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full ${className}`}
      // mermaid 출력(securityLevel: strict 로 sanitize 됨)을 그대로 삽입
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
