"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * 두 멤버를 공통 6축에 매핑한 라디어 오버레이.
 * 라벨 축이 일치해야 비교가 의미 있어 새로 정의했습니다.
 */
const data = [
  { axis: "백엔드 / 아키텍처", namhae: 92, minyoung: 82 },
  { axis: "프론트엔드 UI", namhae: 78, minyoung: 86 },
  { axis: "AI / 데이터", namhae: 90, minyoung: 60 },
  { axis: "DB / 쿼리 최적화", namhae: 80, minyoung: 92 },
  { axis: "운영 / 자동화", namhae: 92, minyoung: 82 },
  { axis: "도메인 적응력", namhae: 82, minyoung: 90 },
];

export default function TeamCompareRadar() {
  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          margin={{ top: 16, right: 32, bottom: 8, left: 32 }}
        >
          <PolarGrid stroke="rgba(148, 163, 184, 0.3)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "rgb(148, 163, 184)", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="김남해"
            dataKey="namhae"
            stroke="#10b981"
            strokeWidth={2}
            fill="#10b981"
            fillOpacity={0.3}
          />
          <Radar
            name="김민영"
            dataKey="minyoung"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="#0ea5e9"
            fillOpacity={0.3}
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
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
