import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";
import { portfolioProjects } from "@/lib/portfolioData";

export const runtime = "nodejs";
export const alt = "HaeYoungLab Team Portfolio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function HomeOpengraphImage() {
  return renderOgImage({
    kicker: "Team Portfolio",
    title: "리스크를 줄이고, 제품으로 증명하는 팀",
    subtitle:
      "HaeYoungLab — 김남해 · 김민영. B2B SaaS와 실험적 웹 제품으로 비즈니스 임팩트를 만듭니다.",
    footer: "김남해 · 김민영",
    accent: "emerald",
    stats: [
      { value: `${portfolioProjects.length}+`, label: "출시·운영 프로젝트" },
      { value: "−60%", label: "RAG 토큰 비용" },
      { value: "+30%", label: "쿼리 응답 성능" },
      { value: "1분", label: "신규 기능 배포" },
    ],
  });
}
