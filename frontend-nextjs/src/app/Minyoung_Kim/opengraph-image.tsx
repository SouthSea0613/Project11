import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import { minyoungHeadline, minyoungImpactStats } from "@/lib/minyoungResume";
import { PORTFOLIO_OWNER_NAME, PORTFOLIO_ROLE } from "@/lib/siteConfig";

export const runtime = "nodejs";
export const alt = `${PORTFOLIO_OWNER_NAME} · Portfolio`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function MinyoungOpengraphImage() {
  return renderOgImage({
    kicker: PORTFOLIO_ROLE,
    title: PORTFOLIO_OWNER_NAME,
    subtitle: minyoungHeadline,
    footer: "카카오 케어챗 · 혈당 인터페이스 · PlanIT",
    accent: "sky",
    stats: minyoungImpactStats.map((s) => ({ value: s.value, label: s.label })),
  });
}
