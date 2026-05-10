"use client";

import type { ImpactMetric } from "@/lib/impactData";

type TeamCompareImpactProps = {
  namhae: ImpactMetric[];
  minyoung: ImpactMetric[];
};

/**
 * 두 멤버의 임팩트 메트릭을 좌·우 컬럼으로 나란히 비교.
 * 차트 라이브러리 없이 가벼운 progress 막대로 표현해 print에서도 잘 보입니다.
 */
export default function TeamCompareImpact({
  namhae,
  minyoung,
}: TeamCompareImpactProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ImpactColumn
        title="김남해"
        metrics={namhae}
        accent="emerald"
      />
      <ImpactColumn
        title="김민영"
        metrics={minyoung}
        accent="sky"
      />
    </div>
  );
}

function ImpactColumn({
  title,
  metrics,
  accent,
}: {
  title: string;
  metrics: ImpactMetric[];
  accent: "emerald" | "sky";
}) {
  const ACCENT = {
    emerald: {
      head: "text-emerald-400",
      border: "border-emerald-400/30",
      bg: "bg-emerald-400/5",
      bar: "bg-emerald-400",
      track: "bg-emerald-400/15",
      tag: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    },
    sky: {
      head: "text-sky-400",
      border: "border-sky-400/30",
      bg: "bg-sky-400/5",
      bar: "bg-sky-400",
      track: "bg-sky-400/15",
      tag: "border-sky-400/40 bg-sky-400/10 text-sky-200",
    },
  }[accent];

  return (
    <div
      className={`rounded-2xl border ${ACCENT.border} ${ACCENT.bg} p-4`}
    >
      <h3 className={`text-sm font-semibold ${ACCENT.head}`}>{title}</h3>
      <div className="mt-3 space-y-3">
        {metrics.map((m) => {
          const pct = Math.min(100, Math.max(0, m.value));
          return (
            <div key={`${m.project}-${m.label}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-xs font-medium text-foreground">
                  {m.label}
                </span>
                <span className="shrink-0 text-xs font-bold tabular-nums text-foreground">
                  {m.direction === "down" ? "-" : "+"}
                  {m.value}
                  {m.unit}
                </span>
              </div>
              <div className={`mt-1 h-2 w-full overflow-hidden rounded-full ${ACCENT.track}`}>
                <div
                  className={`h-full rounded-full ${ACCENT.bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                <span
                  className={`mr-1 inline-block rounded-sm border px-1 py-0.5 text-[9px] font-semibold ${ACCENT.tag}`}
                >
                  {m.project}
                </span>
                {m.direction === "down" ? "절감" : "개선"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
