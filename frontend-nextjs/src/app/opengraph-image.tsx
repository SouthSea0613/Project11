import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import { haeyoungLabStats } from "@/lib/portfolioData";
import { SITE_NAME } from "@/lib/siteConfig";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} · Portfolio`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function HomeOpengraphImage() {
  return renderOgImage({
    kicker: "Software Engineering Lab",
    title: SITE_NAME,
    subtitle: "PlanIT · R&D 오토노트 · AWS 인프라",
    footer: SITE_NAME,
    accent: "emerald",
    stats: haeyoungLabStats.map((s) => ({
      value: s.value,
      label: s.label,
    })),
  });
}
