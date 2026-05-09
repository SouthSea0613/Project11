import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ProjectsIndex from "@/components/ProjectsIndex";
import { breadcrumbLd } from "@/lib/jsonLd";
import {
  portfolioProjects,
  teamMembers,
  type MemberId,
} from "@/lib/portfolioData";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const pageTitle = `Projects | ${SITE_NAME} Team Portfolio`;
const pageDesc = `${SITE_NAME} 팀이 진행한 ${portfolioProjects.length}개 프로젝트. 검색·멤버·기술 카테고리로 필터링해 살펴보세요.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: "/projects",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDesc,
  },
};

export default function ProjectsListPage() {
  const memberLabels = teamMembers.reduce<Record<MemberId, string>>(
    (acc, m) => {
      acc[m.id] = m.name;
      return acc;
    },
    {} as Record<MemberId, string>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-6">
      <JsonLd
        id="ld-projects"
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: pageTitle,
            description: pageDesc,
            url: `${SITE_URL}/projects`,
            inLanguage: "ko-KR",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: portfolioProjects.length,
              itemListElement: portfolioProjects.map((p, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: `${SITE_URL}/projects/${p.slug}`,
                name: p.title,
              })),
            },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />

      {/* 헤더 */}
      <header className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">
          {SITE_NAME} · Projects
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          전체 프로젝트
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          {portfolioProjects.length}개 프로젝트 — 제품 설계부터 운영까지, 멤버
          참여 단위로 정리했습니다. 검색·멤버·기술 카테고리로 좁혀 볼 수 있습니다.
        </p>
        <div className="mt-4 text-xs text-muted-foreground">
          <Link
            href="/"
            className="text-emerald-500 underline-offset-4 hover:underline"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </header>

      <ProjectsIndex
        projects={portfolioProjects}
        memberLabels={memberLabels}
      />
    </main>
  );
}
