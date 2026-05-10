import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import { getProjectsByMember } from "@/lib/portfolioData";

export const runtime = "nodejs";
export const alt = "팀원 비교 — 김남해 vs 김민영 | HaeYoungLab";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function TeamCompareOpengraphImage() {
  const namhaeProjects = getProjectsByMember("namhae");
  const minyoungProjects = getProjectsByMember("minyoung");
  const shared = namhaeProjects.filter((np) =>
    minyoungProjects.some((mp) => mp.slug === np.slug)
  ).length;

  return renderOgImage({
    kicker: "Team Compare",
    title: "김남해 vs 김민영",
    subtitle: "능력치 · 임팩트 · 기술 스택 비교",
    footer: "HaeYoungLab Team Portfolio",
    accent: "violet",
    stats: [
      { value: String(namhaeProjects.length), label: "남해 프로젝트" },
      { value: String(minyoungProjects.length), label: "민영 프로젝트" },
      { value: String(shared), label: "공동 프로젝트" },
    ],
  });
}
