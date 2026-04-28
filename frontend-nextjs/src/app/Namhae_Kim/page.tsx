import type { Metadata } from "next";
import Link from "next/link";
import { getProjectsByMember } from "@/lib/portfolioData";

export const metadata: Metadata = {
  title: "김남해 | Team Portfolio",
  description: "김남해의 역할, 주요 프로젝트, 핵심 역량을 소개합니다.",
};

export default function NamhaeKimPage() {
  const projects = getProjectsByMember("namhae");

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6">
      <p className="text-sm text-emerald-400">Team Member</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        김남해
      </h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
        Product/Frontend 중심으로 사용자 경험을 설계하고, 기획 의도를 실제 제품으로
        빠르게 구현합니다.
      </p>

      <section className="mt-10 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">핵심 역할</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>- 사용자 플로우 및 화면 구조 설계</li>
          <li>- Next.js 기반 프론트엔드 구현 및 품질 개선</li>
          <li>- 팀 내 제품 방향성과 우선순위 정렬</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">주요 작업</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>- PlanIT 공개 스크럼 페이지 UX 개선</li>
          <li>- 팀 포트폴리오 정보구조 1차 설계 및 구현</li>
          <li>- 네비게이션, 랜딩 섹션 컴포넌트 고도화</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">참여 프로젝트</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {projects.map((project) => (
            <li key={project.slug}>
              -{" "}
              <Link
                href={`/projects/${project.slug}`}
                className="text-emerald-500 underline-offset-4 hover:underline"
              >
                {project.title}
              </Link>
              <span className="text-muted-foreground"> ({project.period})</span>
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-emerald-500 underline-offset-4 hover:underline"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
