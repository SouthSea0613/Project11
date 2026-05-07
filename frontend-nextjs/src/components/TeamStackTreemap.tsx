"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";
import { portfolioProjects } from "@/lib/portfolioData";
import { STACK_COLOR_HEX, classifyTech } from "@/lib/stackCategory";

function buildData() {
  const counts = new Map<string, number>();
  portfolioProjects.forEach((project) => {
    project.stack.forEach((tech) => {
      const norm = tech.trim();
      counts.set(norm, (counts.get(norm) ?? 0) + 1);
    });
  });
  return Array.from(counts.entries())
    .map(([name, value]) => ({
      name,
      size: value,
      fill: STACK_COLOR_HEX[classifyTech(name)],
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 22);
}

type TreemapNodeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  fill?: string;
  size?: number;
};

function TreemapNode(props: TreemapNodeProps) {
  const { x = 0, y = 0, width = 0, height = 0, name = "", fill = "#10b981" } = props;
  const showText = width > 50 && height > 22;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        ry={6}
        fill={fill}
        fillOpacity={0.65}
        stroke="rgba(2, 6, 23, 0.6)"
        strokeWidth={2}
      />
      {showText && (
        <text
          x={x + 8}
          y={y + 18}
          fill="#f8fafc"
          fontSize={11}
          fontWeight={600}
        >
          {name}
        </text>
      )}
    </g>
  );
}

export default function TeamStackTreemap() {
  const data = buildData();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-[260px] w-full items-center justify-center text-xs text-slate-400">
        기술 맵을 불러오는 중…
      </div>
    );
  }

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="#0f172a"
          fill="#10b981"
          aspectRatio={1.4}
          content={<TreemapNode />}
        >
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              borderRadius: 8,
              fontSize: 12,
              color: "#f8fafc",
            }}
            formatter={(value) =>
              [`${value} 프로젝트에 사용`, "사용 빈도"] as [string, string]
            }
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
