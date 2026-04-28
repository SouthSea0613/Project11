import type { Metadata } from "next";
import Link from "next/link";
import { getProjectsByMember } from "@/lib/portfolioData";

export const metadata: Metadata = {
  title: "김민영 | Team Portfolio",
  description: "김민영의 역할, 주요 프로젝트, 핵심 역량을 소개합니다.",
};

export default function MinyoungKimPage() {
  const projects = getProjectsByMember("minyoung");

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6">
      <p className="text-sm text-emerald-400">Team Member</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        김민영
      </h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
        Backend/Infra 중심으로 데이터 흐름과 서비스 안정성을 설계하고, 운영 가능한
        시스템으로 완성합니다.
      </p>

      <section className="mt-10 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">핵심 역할</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>- API 설계 및 서버 구조 최적화</li>
          <li>- 배포 파이프라인 및 운영 안정성 개선</li>
          <li>- 데이터 처리 및 백오피스 흐름 설계</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">주요 작업</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>- 팀 서비스 인프라 관측/모니터링 체계 구축</li>
          <li>- 프로젝트별 백엔드 공통 모듈 관리</li>
          <li>- 운영 이슈 대응 및 성능 개선 자동화</li>
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
