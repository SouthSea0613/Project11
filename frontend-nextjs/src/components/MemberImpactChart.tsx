"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ImpactMetric } from "@/lib/impactData";

type MemberImpactChartProps = {
  metrics: ImpactMetric[];
  /** 멤버 페이지 컬러 톤 */
  accent?: "emerald" | "sky";
};

const ACCENT_COLOR: Record<
  NonNullable<MemberImpactChartProps["accent"]>,
  { bar: string; soft: string }
> = {
  emerald: { bar: "#10b981", soft: "rgba(16,185,129,0.12)" },
  sky: { bar: "#0ea5e9", soft: "rgba(14,165,233,0.12)" },
};

type ChartDatum = ImpactMetric & {
  /** YAxis category에 그대로 노출되는 짧은 라벨 */
  shortLabel: string;
  /** 막대 우측에 표기될 +/- 값 */
  display: string;
};

export default function MemberImpactChart({
  metrics,
  accent = "emerald",
}: MemberImpactChartProps) {
  if (metrics.length === 0) return null;

  const data: ChartDatum[] = metrics.map((m) => ({
    ...m,
    shortLabel: m.label,
    display: `${m.direction === "down" ? "−" : "+"}${m.value}${m.unit}`,
  }));

  const palette = ACCENT_COLOR[accent];
  const height = Math.max(180, data.length * 64);

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 8, right: 64, bottom: 8, left: 8 }}
        >
          <XAxis type="number" hide domain={[0, "dataMax"]} />
          <YAxis
            type="category"
            dataKey="shortLabel"
            width={170}
            tick={{ fontSize: 11, fill: "currentColor" }}
            tickLine={false}
            axisLine={false}
            stroke="rgba(148,163,184,0.6)"
          />
          <Tooltip
            cursor={{ fill: palette.soft }}
            contentStyle={{
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(148,163,184,0.3)",
              borderRadius: 8,
              color: "#e5e7eb",
              fontSize: 12,
            }}
            formatter={(_v, _n, item) => {
              const p = (item as { payload: ChartDatum }).payload;
              return [p.display, p.project] as [string, string];
            }}
            labelFormatter={(label) => String(label)}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
            {data.map((_entry, idx) => (
              <Cell key={idx} fill={palette.bar} />
            ))}
            <LabelList
              dataKey="display"
              position="right"
              style={{
                fill: "currentColor",
                fontSize: 11,
                fontWeight: 700,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
