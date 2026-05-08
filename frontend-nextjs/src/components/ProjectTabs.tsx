"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectGallery from "@/components/ProjectGallery";
import { ImageLightbox, type LightboxItem } from "@/components/ImageLightbox";
import { ImageSlot } from "@/components/ImageSlot";
import type { PortfolioProject } from "@/lib/portfolioData";
import { normalizeGallery } from "@/lib/portfolioData";

type ProjectTabsProps = {
  projects: PortfolioProject[];
  /** 강조 컬러 — 멤버 페이지별 톤 */
  accent?: "emerald" | "sky";
};

const ACCENT: Record<
  NonNullable<ProjectTabsProps["accent"]>,
  {
    chipBorder: string;
    chipBg: string;
    chipText: string;
    metricBorder: string;
    metricBg: string;
    metricText: string;
    head: string;
    btn: string;
    btnHover: string;
  }
> = {
  emerald: {
    chipBorder: "border-emerald-400/40",
    chipBg: "bg-emerald-400/10",
    chipText: "text-emerald-500",
    metricBorder: "border-emerald-400/30",
    metricBg: "bg-emerald-400/10",
    metricText: "text-emerald-500",
    head: "text-emerald-500",
    btn: "bg-emerald-500",
    btnHover: "hover:bg-emerald-400",
  },
  sky: {
    chipBorder: "border-sky-400/40",
    chipBg: "bg-sky-400/10",
    chipText: "text-sky-500",
    metricBorder: "border-sky-400/30",
    metricBg: "bg-sky-400/10",
    metricText: "text-sky-500",
    head: "text-sky-500",
    btn: "bg-sky-500",
    btnHover: "hover:bg-sky-400",
  },
};

export default function ProjectTabs({
  projects,
  accent = "emerald",
}: ProjectTabsProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0];
  const [heroOpen, setHeroOpen] = useState(false);

  if (!active) return null;
  const palette = ACCENT[accent];

  const galleryItems = normalizeGallery(active.gallery);
  const heroLightboxItems: LightboxItem[] = active.heroImage
    ? [
        {
          src: active.heroImage,
          alt: `${active.title} 메인 이미지`,
          caption: `${active.title} — 메인 이미지`,
        },
      ]
    : [];

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      {/* 탭 네비 (가로 스크롤 가능) */}
      <div className="border-b bg-muted/30 print-hide">
        <div className="flex gap-1 overflow-x-auto px-2 py-2">
          {projects.map((p) => {
            const isActive = p.slug === active.slug;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActiveSlug(p.slug)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                aria-pressed={isActive}
              >
                {p.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="p-5 md:p-6">
        {/* 히어로 — 클릭 시 라이트박스 */}
        {active.heroImage ? (
          <button
            type="button"
            onClick={() => setHeroOpen(true)}
            className="group block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={`${active.title} 메인 이미지 크게 보기`}
          >
            <div className="relative">
              <ImageSlot
                src={active.heroImage}
                alt={`${active.title} 메인 이미지`}
                aspect="aspect-[21/9]"
                label="히어로 이미지 추가 예정"
                className="transition group-hover:opacity-95"
              />
              <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                확대 ⤢
              </span>
            </div>
          </button>
        ) : (
          <ImageSlot
            src={undefined}
            alt={`${active.title} 메인 이미지`}
            aspect="aspect-[21/9]"
            label="히어로 이미지 추가 예정"
          />
        )}
        <ImageLightbox
          items={heroLightboxItems}
          initialIndex={0}
          open={heroOpen && heroLightboxItems.length > 0}
          onClose={() => setHeroOpen(false)}
        />

        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
            {active.title}
          </h3>
          <span className="text-sm text-muted-foreground">{active.period}</span>
          {active.role && (
            <span
              className={`rounded-full border ${palette.chipBorder} ${palette.chipBg} px-2.5 py-0.5 text-[11px] font-medium ${palette.chipText}`}
            >
              {active.role}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
          {active.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {active.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 핵심 지표 (badges) */}
        {active.metrics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {active.metrics.map((m) => (
              <span
                key={m}
                className={`rounded-md border ${palette.metricBorder} ${palette.metricBg} px-2.5 py-1 text-xs font-medium ${palette.metricText}`}
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* 문제 / 해결 / 결과 3분할 */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border bg-background/40 p-4">
            <p
              className={`text-[11px] font-semibold uppercase tracking-wider ${palette.head}`}
            >
              Problem
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {active.problem}
            </p>
          </div>
          <div className="rounded-xl border bg-background/40 p-4">
            <p
              className={`text-[11px] font-semibold uppercase tracking-wider ${palette.head}`}
            >
              Solution
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {active.solution.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-background/40 p-4">
            <p
              className={`text-[11px] font-semibold uppercase tracking-wider ${palette.head}`}
            >
              Outcome
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {active.outcome.map((o) => (
                <li key={o}>· {o}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 갤러리 — 전체 이미지 + 라이트박스 */}
        {galleryItems.length > 0 ? (
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold">스크린샷 / 작업 결과</p>
              <span className="text-[11px] text-muted-foreground">
                이미지를 클릭하면 크게 볼 수 있습니다 · 총 {galleryItems.length}장
              </span>
            </div>
            <ProjectGallery images={galleryItems} title={active.title} />
            <div className="mt-3 text-right">
              <Link
                href={`/projects/${active.slug}`}
                className={`text-[11px] font-medium ${palette.chipText} hover:underline`}
              >
                프로젝트 상세 페이지 열기 →
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed bg-muted/20 p-6 text-center text-xs text-muted-foreground">
            이 프로젝트의 스크린샷이 아직 등록되지 않았습니다.
          </div>
        )}

        {/* 링크 */}
        {(active.links.demo || active.links.github) && (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            {active.links.demo && (
              <a
                href={active.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-md ${palette.btn} ${palette.btnHover} px-3 py-1.5 font-semibold text-slate-950`}
              >
                데모 보기
              </a>
            )}
            {active.links.github && (
              <a
                href={active.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-3 py-1.5 font-medium text-foreground hover:bg-muted"
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
