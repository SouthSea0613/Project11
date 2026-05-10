"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";
import type { PortfolioProject, MemberId } from "@/lib/portfolioData";
import {
  STACK_CATEGORIES,
  STACK_LABEL,
  classifyTech,
  type StackCategory,
} from "@/lib/stackCategory";

type ProjectsIndexProps = {
  projects: PortfolioProject[];
  memberLabels: Record<MemberId, string>;
};

type SortKey = "recent" | "title";
type MemberFilter = "all" | MemberId;

const PERIOD_REGEX = /^(\d{4})\.(\d{2})/;

function periodStart(period: string): number {
  const m = PERIOD_REGEX.exec(period);
  if (!m) return 0;
  const yyyy = Number(m[1]);
  const mm = Number(m[2]);
  return yyyy * 12 + mm;
}

export default function ProjectsIndex({
  projects,
  memberLabels,
}: ProjectsIndexProps) {
  const [query, setQuery] = useState("");
  const [memberFilter, setMemberFilter] = useState<MemberFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<StackCategory | "all">(
    "all"
  );
  const [sort, setSort] = useState<SortKey>("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      // 멤버 필터
      if (memberFilter !== "all" && !p.members.includes(memberFilter)) {
        return false;
      }
      // 카테고리 필터 — stack 중 하나라도 해당 카테고리이면 통과
      if (categoryFilter !== "all") {
        const hasCategory = p.stack.some(
          (s) => classifyTech(s) === categoryFilter
        );
        if (!hasCategory) return false;
      }
      // 검색 — title / summary / stack / role
      if (q) {
        const haystack = [
          p.title,
          p.summary,
          p.role ?? "",
          ...p.stack,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    return list.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      // recent — period start 기준 내림차순
      return periodStart(b.period) - periodStart(a.period);
    });
  }, [projects, query, memberFilter, categoryFilter, sort]);

  const total = projects.length;
  const visible = filtered.length;

  return (
    <div>
      {/* 컨트롤 바 */}
      <section className="rounded-2xl border bg-card p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          {/* 검색 */}
          <label className="relative">
            <span className="sr-only">프로젝트 검색</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색 — 제목·요약·기술 스택·역할"
              className="w-full rounded-lg border bg-background/60 px-3.5 py-2 text-sm placeholder:text-muted-foreground focus:border-emerald-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-muted"
                aria-label="검색 지우기"
              >
                ✕
              </button>
            )}
          </label>

          {/* 멤버 */}
          <select
            value={memberFilter}
            onChange={(e) => setMemberFilter(e.target.value as MemberFilter)}
            className="rounded-lg border bg-background/60 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
            aria-label="멤버 필터"
          >
            <option value="all">전체 멤버</option>
            {(Object.keys(memberLabels) as MemberId[]).map((id) => (
              <option key={id} value={id}>
                {memberLabels[id]}
              </option>
            ))}
          </select>

          {/* 카테고리 */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as StackCategory | "all")
            }
            className="rounded-lg border bg-background/60 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
            aria-label="기술 카테고리 필터"
          >
            <option value="all">전체 카테고리</option>
            {STACK_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {STACK_LABEL[c]}
              </option>
            ))}
          </select>

          {/* 정렬 */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border bg-background/60 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
            aria-label="정렬 기준"
          >
            <option value="recent">최신순</option>
            <option value="title">이름순</option>
          </select>
        </div>

        {/* 결과 카운트 + 초기화 */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            전체 <span className="font-semibold text-foreground">{total}</span>
            개 중{" "}
            <span className="font-semibold text-emerald-500">{visible}</span>
            개 표시
          </span>
          {(query ||
            memberFilter !== "all" ||
            categoryFilter !== "all" ||
            sort !== "recent") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setMemberFilter("all");
                setCategoryFilter("all");
                setSort("recent");
              }}
              className="rounded px-2 py-1 text-[11px] hover:bg-muted hover:text-foreground"
            >
              필터 초기화
            </button>
          )}
        </div>
      </section>

      {/* 그리드 */}
      {visible === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed bg-muted/20 p-10 text-center text-sm text-muted-foreground">
          조건에 맞는 프로젝트가 없습니다. 필터를 조정해 보세요.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition hover:border-emerald-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ImageSlot
                src={p.heroImage ?? p.thumbnail}
                alt={p.title}
                aspect="aspect-[16/9]"
                rounded="rounded-none"
                label="이미지 추가 예정"
                className="!border-0 transition group-hover:opacity-95"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                  <span>{p.period}</span>
                  <span className="flex items-center gap-1">
                    {p.members.map((id) => (
                      <span
                        key={id}
                        className="rounded-full border border-border bg-muted/40 px-1.5 py-0.5 text-[10px]"
                      >
                        {memberLabels[id]}
                      </span>
                    ))}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug group-hover:text-emerald-400">
                  {p.title}
                </h3>
                {p.role && (
                  <p className="text-[11px] text-muted-foreground">{p.role}</p>
                )}
                <p className="line-clamp-3 text-[13px] leading-6 text-muted-foreground">
                  {p.summary}
                </p>
                <div className="mt-auto flex flex-wrap gap-1 pt-2">
                  {p.stack.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-background/40 px-1.5 py-0.5 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 5 && (
                    <span className="rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      +{p.stack.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
