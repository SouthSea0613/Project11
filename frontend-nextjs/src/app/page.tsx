import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ProductValueSection from "@/components/ProductValueSection";
import LiveLabDashboardSection from "@/components/LiveLabDashboardSection";
import LandingBottomSections from "@/components/LandingBottomSections";

export const metadata: Metadata = {
  title: "해영랩(HAEYOUNGLAB) | R&D 오토노트 · 연구비 추징 방어 솔루션",
  description:
    "협업 로그 기반 PMR 자동화, RFC3161 시점확인, 관리자 검토까지 — 4단계 파이프라인으로 R&D 세무 추징 리스크를 원천 차단합니다.",
  keywords: [
    "해영랩", "HAEYOUNGLAB", "R&D 세액공제", "연구비 추징", "PMR 자동화",
    "RFC3161", "연구노트", "협업툴 연동", "Slack", "Notion", "세무 소명",
    "연구개발비", "기업부설연구소",
  ],
  openGraph: {
    title: "해영랩(HAEYOUNGLAB) | R&D 오토노트 · 연구비 추징 방어",
    description:
      "협업 로그 기반 PMR 자동화로 R&D 세무 추징을 방어합니다. Slack·Notion 등 협업툴과 연동해 실시간 증빙 문서를 자동 생성합니다.",
    url: "https://www.haeyounglab.com",
    siteName: "haeyounglab",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "해영랩" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "해영랩(HAEYOUNGLAB) | R&D 오토노트",
    description: "협업 로그 기반 PMR 자동화로 R&D 세무 추징을 방어합니다.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="relative">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#040916]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      {/* ── 소개 (첫 화면) ── */}
      <HeroSection />
      {/* ── 핵심 가치 ── */}
      <ProductValueSection />
      {/* ── 라이브 대시보드 ── */}
      <LiveLabDashboardSection />
      {/* ── 아카이브 · 문의 · 푸터 ── */}
      <LandingBottomSections />
    </main>
  );
}