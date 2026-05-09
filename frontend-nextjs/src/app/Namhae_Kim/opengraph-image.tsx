import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import {
  namhaeHeadline,
  namhaeImpactStats,
} from "@/lib/namhaeResume";

export const runtime = "nodejs";
export const alt = "김남해 — HaeYoungLab Team Portfolio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function NamhaeOpengraphImage() {
  return renderOgImage({
    kicker: "Team Member · 김남해",
    title: "김남해",
    subtitle: namhaeHeadline,
    footer: "PlanIT · R&D 오토노트 · avis-tron 4.0",
    accent: "emerald",
    stats: namhaeImpactStats.map((s) => ({ value: s.value, label: s.label })),
  });
}
