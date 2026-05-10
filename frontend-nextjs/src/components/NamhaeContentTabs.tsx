"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ImageSlot } from "@/components/ImageSlot";
import HighlightImageGrid from "@/components/HighlightImageGrid";
import ProjectTabs from "@/components/ProjectTabs";

const NamhaeAbilityRadar = dynamic(
  () => import("@/components/NamhaeAbilityRadar"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[280px] w-full items-center justify-center text-xs text-muted-foreground">
        능력치 차트 불러오는 중…
      </div>
    ),
  }
);
const MemberImpactChart = dynamic(
  () => import("@/components/MemberImpactChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[200px] w-full items-center justify-center text-xs text-muted-foreground">
        임팩트 차트 불러오는 중…
      </div>
    ),
  }
);
import type { PortfolioProject } from "@/lib/portfolioData";
import { normalizeGallery } from "@/lib/portfolioData";
import { classifyMetric } from "@/lib/metric";
import { categoryLabelToDot } from "@/lib/stackCategory";
import {
  namhaeEducation,
  namhaeExperiences,
  namhaeFuturePlan,
  namhaeMotivation,
  namhaeSkillCategories,
  namhaeStrengths,
} from "@/lib/namhaeResume";
import { namhaeImpactMetrics } from "@/lib/impactData";

type NamhaeContentTabsProps = {
  projects: PortfolioProject[];
};

type PrimaryTab = "overview" | "detail";
type DetailTab = "intro" | "career" | "projects" | "education";

const motivationHighlights = [
  { icon: "🎯", title: "비즈니스 → 기술", desc: "현장 문제를 코드로 치환" },
  { icon: "⚙️", title: "0 → 1 실행력", desc: "기획·개발·배포 풀사이클 주도" },
  { icon: "🤝", title: "성장 협업", desc: "코드리뷰·표준 환경 지향" },
];

export default function NamhaeContentTabs({ projects }: NamhaeContentTabsProps) {
  const [primaryTab, setPrimaryTab] = useState<PrimaryTab>("overview");
  const [detailTab, setDetailTab] = useState<DetailTab>("intro");
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    const before = () => setIsPrintMode(true);
    const after = () => setIsPrintMode(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  const topProjects = useMemo(() => {
    const featuredOrder = ["planit", "rd-autonote", "avis-tron-paradise"];
    const map = new Map(projects.map((p) => [p.slug, p]));
    return featuredOrder
      .map((slug) => map.get(slug))
      .filter((p): p is PortfolioProject => !!p);
  }, [projects]);

  const showOverview = isPrintMode || primaryTab === "overview";
  const showDetail = isPrintMode || primaryTab === "detail";
  const isShown = (id: DetailTab) => isPrintMode || detailTab === id;

  return (
    <section className="mt-10">
      <div className="print-hide flex gap-2 border-b pb-2">
        <button
          type="button"
          onClick={() => setPrimaryTab("overview")}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
            primaryTab === "overview"
              ? "bg-emerald-500 text-slate-950"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          한눈에 보기
        </button>
        <button
          type="button"
          onClick={() => setPrimaryTab("detail")}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
            primaryTab === "detail"
              ? "bg-emerald-500 text-slate-950"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          상세 보기
        </button>
      </div>

      {showOverview && (
        <div className="mt-5 grid gap-4">
          {/* 1단: 능력치 레이더 + 비즈니스 임팩트 */}
          <div className="grid gap-4 md:grid-cols-5">
            <section className="rounded-xl border bg-card p-5 md:col-span-2">
              <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold">핵심 역량</h2>
                <span className="text-[11px] text-muted-foreground">자기보고</span>
              </div>
              <NamhaeAbilityRadar />
              <p className="mt-2 text-[10px] leading-snug text-muted-foreground">
                ※ 자기보고 기반 상대 척도 · 객관 수치는{" "}
                <span className="font-medium text-foreground">비즈니스 임팩트</span>
                {" "}그래프 참고
              </p>
            </section>

            <section className="rounded-xl border bg-card p-5 md:col-span-3">
              <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold">비즈니스 임팩트</h2>
                <span className="text-[11px] text-muted-foreground">
                  실제 적용 후 측정·체감 수치
                </span>
              </div>
              <div className="mt-3">
                <MemberImpactChart metrics={namhaeImpactMetrics} accent="emerald" />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                − 비용·시간 절감 / + 성능·처리량 증가
              </p>
            </section>
          </div>

          {/* 2단: 기술 맵 (horizontal ribbon) */}
          <section className="rounded-xl border bg-card p-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold">기술 맵</h2>
              <span className="text-[11px] text-muted-foreground">
                카테고리별 핵심 스택
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {namhaeSkillCategories.map((cat) => (
                <div key={cat.label} className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 shrink-0 rounded-full ${categoryLabelToDot(cat.label)}`}
                  />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                    {cat.label}
                  </span>
                  <span className="flex flex-wrap gap-1">
                    {cat.items.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                    {cat.items.length > 6 && (
                      <span className="text-[11px] text-muted-foreground">
                        +{cat.items.length - 6}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3단: 대표 프로젝트 */}
          <section className="rounded-xl border bg-card p-5">
            <h2 className="text-base font-semibold">대표 프로젝트</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {topProjects.map((project) => {
                const galleryThumbs = normalizeGallery(project.gallery)
                  .filter((g) => g.src !== project.heroImage)
                  .slice(0, 3);
                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group overflow-hidden rounded-lg border bg-background/40 transition hover:border-emerald-400/60"
                  >
                    <ImageSlot
                      src={project.heroImage}
                      alt={project.title}
                      aspect="aspect-[16/9]"
                      rounded="rounded-none"
                      label="이미지 추가 예정"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    {galleryThumbs.length > 0 && (
                      <div className="grid grid-cols-3 gap-px bg-border/40">
                        {galleryThumbs.map((thumb, idx) => (
                          <ImageSlot
                            key={thumb.src}
                            src={thumb.src}
                            alt={thumb.caption ?? `${project.title} 미리보기 ${idx + 1}`}
                            aspect="aspect-[4/3]"
                            rounded="rounded-none"
                            label=""
                            className="!border-0"
                            sizes="(min-width: 1024px) 110px, (min-width: 640px) 16vw, 33vw"
                          />
                        ))}
                      </div>
                    )}
                    <div className="p-3">
                      <p className="text-[11px] text-muted-foreground">{project.period}</p>
                      <h3 className="mt-1 text-sm font-semibold group-hover:text-emerald-400">
                        {project.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.metrics.slice(0, 3).map((metric) => {
                          const m = classifyMetric(metric);
                          if (m.kind === "numeric") {
                            return (
                              <span
                                key={metric}
                                className="inline-flex items-baseline gap-1 rounded-md border border-emerald-400/40 bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-500"
                              >
                                <span>{m.number}</span>
                                <span className="font-medium opacity-90">
                                  {m.rest}
                                </span>
                              </span>
                            );
                          }
                          return (
                            <span
                              key={metric}
                              className="rounded-md border border-dashed border-border bg-muted/30 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {m.raw}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 4단: 사업 · 설계 자료 */}
          <section className="rounded-xl border bg-card p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-base font-semibold">사업 · 설계 자료</h2>
              <span className="text-[11px] text-muted-foreground">
                이미지를 클릭하면 크게 볼 수 있습니다
              </span>
            </div>
            <HighlightImageGrid
              accent="emerald"
              items={[
                {
                  src: "/projects/rd-autonote/rd-autonote-business-01.png",
                  caption: "R&D 오토노트 — 사업 비전 1",
                  href: "/projects/rd-autonote",
                },
                {
                  src: "/projects/rd-autonote/rd-autonote-business-02.png",
                  caption: "R&D 오토노트 — 사업 비전 2",
                  href: "/projects/rd-autonote",
                },
                {
                  src: "/projects/rd-autonote/rd-autonote-business-03.png",
                  caption: "R&D 오토노트 — 사업 비전 3",
                  href: "/projects/rd-autonote",
                },
                {
                  src: "/projects/avis-tron-paradise/avis-tron-dashboard-02.png",
                  caption: "avis-tron 4.0 — 통합 대시보드",
                  href: "/projects/avis-tron-paradise",
                },
                {
                  src: "/projects/avis-tron-paradise/avis-tron-dashboard-03.png",
                  caption: "avis-tron 4.0 — 보안 지표 화면",
                  href: "/projects/avis-tron-paradise",
                },
                {
                  src: "/projects/planit/planit-scrumbot-03.png",
                  caption: "PlanIT — ChatOps 스크럼봇",
                  href: "/projects/planit",
                },
              ]}
            />
          </section>
        </div>
      )}

      {showDetail && (
        <div className={`mt-5 ${isPrintMode ? "print-break-before" : ""}`}>
          <div className="print-hide mb-4 flex flex-wrap gap-2">
            {[
              { id: "intro", label: "자기소개서" },
              { id: "career", label: "실제 경력" },
              { id: "projects", label: "프로젝트" },
              { id: "education", label: "학력 / 기타" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDetailTab(tab.id as DetailTab)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                  detailTab === tab.id
                    ? "bg-foreground text-background"
                    : "border text-muted-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isShown("intro") && (
            <div className="space-y-4">
              <section className="grid gap-3 md:grid-cols-3">
                {motivationHighlights.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border bg-card p-4 text-center"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </article>
                ))}
              </section>

              <section className="rounded-xl border bg-card p-5">
                <h3 className="text-sm font-semibold">{namhaeMotivation.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {namhaeMotivation.paragraphs[0]}
                </p>
              </section>

              <section className="grid gap-3 md:grid-cols-3">
                {namhaeStrengths.map((strength) => (
                  <article key={strength.title} className="rounded-xl border bg-card p-4">
                    <p className="text-sm font-semibold text-emerald-500">
                      {strength.title}
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {strength.bullets.slice(0, 2).map((bullet) => (
                        <li key={bullet}>· {bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>

              <section className="rounded-xl border bg-card p-5">
                <h3 className="text-sm font-semibold">입사 후 포부</h3>
                <ul className="mt-2 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
                  {namhaeFuturePlan.map((plan, idx) => (
                    <li key={plan} className="rounded-md border bg-background/40 p-3">
                      <span className="text-[11px] font-semibold text-emerald-500">
                        #{idx + 1}
                      </span>
                      <p className="mt-1 text-xs leading-6">{plan}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {isShown("career") && (
            <ol className="relative ml-3 space-y-3 border-l border-border pl-5">
              {namhaeExperiences.map((exp) => (
                <li
                  key={`${exp.title}-${exp.period}`}
                  className="relative rounded-xl border bg-card p-4"
                >
                  <span className="absolute -left-[27px] top-5 inline-block h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold">{exp.title}</h3>
                    <span className="text-[11px] text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-xs text-emerald-500">{exp.role}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {exp.tech.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                    {exp.bullets.slice(0, 2).map((bullet) => (
                      <li key={bullet}>· {bullet}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}

          {isShown("projects") && (
            <div className={isPrintMode ? "mt-6" : undefined}>
              <ProjectTabs projects={projects} accent="emerald" />
            </div>
          )}

          {isShown("education") && (
            <div className="grid gap-3 md:grid-cols-2">
              <section className="rounded-xl border bg-card p-5">
                <h3 className="text-sm font-semibold">학력</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {namhaeEducation.map((row) => (
                    <li key={row.school}>
                      · <span className="font-medium text-foreground">{row.school}</span>
                      <span className="text-xs"> — {row.detail}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-xl border bg-card p-5">
                <h3 className="text-sm font-semibold">자격 / 어학</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs">
                    TOEIC 680
                  </span>
                  <span className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs">
                    영어 비즈니스
                  </span>
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
