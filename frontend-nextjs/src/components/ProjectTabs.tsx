"use client";

import { useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";
import type { PortfolioProject } from "@/lib/portfolioData";

type ProjectTabsProps = {
  projects: PortfolioProject[];
};

export default function ProjectTabs({ projects }: ProjectTabsProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0];

  if (!active) return null;

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      {/* 탭 네비 (가로 스크롤 가능) */}
      <div className="border-b bg-muted/30">
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
        <ImageSlot
          src={active.heroImage}
          alt={`${active.title} 메인 이미지`}
          aspect="aspect-[21/9]"
          label="히어로 이미지 추가 예정"
        />

        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{active.title}</h3>
          <span className="text-sm text-muted-foreground">{active.period}</span>
          {active.role && (
            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-500">
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
                className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-500"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* 문제 / 해결 / 결과 3분할 */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border bg-background/40 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
              Problem
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{active.problem}</p>
          </div>
          <div className="rounded-xl border bg-background/40 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
              Solution
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {active.solution.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-background/40 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
              Outcome
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {active.outcome.map((o) => (
                <li key={o}>· {o}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 갤러리 */}
        <div className="mt-6">
          <p className="text-sm font-semibold">스크린샷 / 작업 결과</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {(active.gallery ?? ["", "", ""]).slice(0, 3).map((src, idx) => (
              <ImageSlot
                key={idx}
                src={src || undefined}
                alt={`${active.title} 이미지 ${idx + 1}`}
                aspect="aspect-[4/3]"
                label={`이미지 ${idx + 1} 자리`}
              />
            ))}
          </div>
        </div>

        {/* 링크 */}
        {(active.links.demo || active.links.github) && (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            {active.links.demo && (
              <a
                href={active.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-emerald-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-emerald-400"
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
