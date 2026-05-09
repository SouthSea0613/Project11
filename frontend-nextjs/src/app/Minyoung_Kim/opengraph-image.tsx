import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import {
  minyoungHeadline,
  minyoungImpactStats,
} from "@/lib/minyoungResume";

export const runtime = "nodejs";
export const alt = "김민영 — HaeYoungLab Team Portfolio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function MinyoungOpengraphImage() {
  return renderOgImage({
    kicker: "Team Member · 김민영",
    title: "김민영",
    subtitle: minyoungHeadline,
    footer: "카카오 케어챗 · 혈당 인터페이스 · PlanIT 게이미피케이션",
    accent: "sky",
    stats: minyoungImpactStats.map((s) => ({ value: s.value, label: s.label })),
  });
}
