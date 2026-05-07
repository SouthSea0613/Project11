"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { label: "데이터 무결성", score: 95 },
  { label: "쿼리·성능 최적화", score: 90 },
  { label: "의료 도메인", score: 88 },
  { label: "운영 효율화", score: 85 },
  { label: "풀스택 실행", score: 80 },
];

export default function MinyoungAbilityRadar() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 12, right: 24, bottom: 12, left: 24 }}>
          <PolarGrid stroke="rgba(148, 163, 184, 0.3)" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: "rgb(148, 163, 184)", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="능력치"
            dataKey="score"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="#0ea5e9"
            fillOpacity={0.35}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: 8,
              fontSize: 12,
              color: "#f8fafc",
            }}
            itemStyle={{ color: "#0ea5e9" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
