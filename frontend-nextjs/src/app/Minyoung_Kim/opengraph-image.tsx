import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import { minyoungHeadline, minyoungImpactStats } from "@/lib/minyoungResume";

export const runtime = "nodejs";
export const alt = "김민영 · Portfolio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function MinyoungOpengraphImage() {
  return renderOgImage({
    kicker: "Backend · Full-stack Engineer",
    title: "김민영",
    subtitle: minyoungHeadline,
    footer: "카카오 케어챗 · 혈당 인터페이스 · PlanIT",
    accent: "sky",
    stats: minyoungImpactStats.map((s) => ({ value: s.value, label: s.label })),
  });
}
