import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/ogImage";

export const runtime = "nodejs";
export const alt = "김남해 — 래빗홀컴퍼니 제출용 AI 사례";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function RabbitholeOpengraphImage() {
  return renderOgImage({
    kicker: "Rabbithole",
    title: "AI 도구 활용 사례",
    subtitle: "김남해 — 서류 보완 제출",
    footer: "대화 로그 · 산출물",
    accent: "amber",
    stats: [
      { value: "4", label: "협업 사례 요약" },
    ],
  });
}
