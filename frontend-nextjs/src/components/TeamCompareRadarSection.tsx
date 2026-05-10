"use client";

import dynamic from "next/dynamic";

const TeamCompareRadar = dynamic(
  () => import("@/components/TeamCompareRadar"),
  { ssr: false }
);

export default function TeamCompareRadarSection() {
  return <TeamCompareRadar />;
}
