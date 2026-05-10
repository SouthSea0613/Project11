"use client";

import { useMemo } from "react";
import {
  STACK_BADGE_CLASS,
  STACK_CATEGORIES,
  STACK_LABEL,
  classifyTech,
  type StackCategory,
} from "@/lib/stackCategory";

type Group = {
  key: StackCategory;
  label: string;
  shared: string[];
  namhaeOnly: string[];
  minyoungOnly: string[];
};

type TeamCompareStackProps = {
  namhaeStack: string[];
  minyoungStack: string[];
};

/**
 * 두 멤버 스킬을 카테고리별로 묶고, "공통 / 김남해 고유 / 김민영 고유"로 분리해 보여줍니다.
 * 벤다이어그램 같은 효과를 텍스트 기반 3열 그리드로 표현.
 */
export default function TeamCompareStack({
  namhaeStack,
  minyoungStack,
}: TeamCompareStackProps) {
  const groups = useMemo<Group[]>(() => {
    const namhaeSet = new Set(namhaeStack.map((s) => s.toLowerCase()));
    const minyoungSet = new Set(minyoungStack.map((s) => s.toLowerCase()));

    const all = Array.from(
      new Set([...namhaeStack, ...minyoungStack])
    );

    const buckets: Record<StackCategory, Group> = STACK_CATEGORIES.reduce(
      (acc, key) => {
        acc[key] = {
          key,
          label: STACK_LABEL[key],
          shared: [],
          namhaeOnly: [],
          minyoungOnly: [],
        };
        return acc;
      },
      {} as Record<StackCategory, Group>
    );

    for (const tech of all) {
      const cat = classifyTech(tech);
      const lower = tech.toLowerCase();
      const inN = namhaeSet.has(lower);
      const inM = minyoungSet.has(lower);
      if (inN && inM) buckets[cat].shared.push(tech);
      else if (inN) buckets[cat].namhaeOnly.push(tech);
      else if (inM) buckets[cat].minyoungOnly.push(tech);
    }

    for (const k of STACK_CATEGORIES) {
      buckets[k].shared.sort();
      buckets[k].namhaeOnly.sort();
      buckets[k].minyoungOnly.sort();
    }

    return STACK_CATEGORIES.map((k) => buckets[k]).filter(
      (g) => g.shared.length + g.namhaeOnly.length + g.minyoungOnly.length > 0
    );
  }, [namhaeStack, minyoungStack]);

  const totals = useMemo(() => {
    let shared = 0;
    let namhae = 0;
    let minyoung = 0;
    for (const g of groups) {
      shared += g.shared.length;
      namhae += g.namhaeOnly.length;
      minyoung += g.minyoungOnly.length;
    }
    return { shared, namhae, minyoung };
  }, [groups]);

  return (
    <div className="space-y-4">
      {/* 합계 요약 */}
      <div className="grid grid-cols-3 gap-2">
        <SummaryCard
          label="공통"
          value={totals.shared}
          className="border-violet-400/40 bg-violet-400/10 text-violet-200"
        />
        <SummaryCard
          label="김남해 고유"
          value={totals.namhae}
          className="border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
        />
        <SummaryCard
          label="김민영 고유"
          value={totals.minyoung}
          className="border-sky-400/40 bg-sky-400/10 text-sky-200"
        />
      </div>

      {/* 카테고리별 비교 */}
      <div className="space-y-3">
        {groups.map((g) => (
          <article
            key={g.key}
            className="rounded-xl border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{g.label}</h3>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="rounded-sm border border-violet-400/40 bg-violet-400/10 px-1.5 py-0.5 text-violet-300">
                  공통 {g.shared.length}
                </span>
                <span className="rounded-sm border border-emerald-400/40 bg-emerald-400/10 px-1.5 py-0.5 text-emerald-300">
                  남해 {g.namhaeOnly.length}
                </span>
                <span className="rounded-sm border border-sky-400/40 bg-sky-400/10 px-1.5 py-0.5 text-sky-300">
                  민영 {g.minyoungOnly.length}
                </span>
              </div>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <Column
                title="공통"
                accent="violet"
                items={g.shared}
                catClass={STACK_BADGE_CLASS[g.key]}
              />
              <Column
                title="김남해 고유"
                accent="emerald"
                items={g.namhaeOnly}
                catClass={STACK_BADGE_CLASS[g.key]}
              />
              <Column
                title="김민영 고유"
                accent="sky"
                items={g.minyoungOnly}
                catClass={STACK_BADGE_CLASS[g.key]}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div className={`rounded-xl border px-3 py-3 ${className}`}>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="mt-0.5 text-[11px] font-semibold tracking-wider uppercase opacity-80">
        {label}
      </div>
    </div>
  );
}

function Column({
  title,
  accent,
  items,
  catClass,
}: {
  title: string;
  accent: "violet" | "emerald" | "sky";
  items: string[];
  catClass: string;
}) {
  const HEAD = {
    violet: "text-violet-300 border-violet-400/30",
    emerald: "text-emerald-300 border-emerald-400/30",
    sky: "text-sky-300 border-sky-400/30",
  }[accent];

  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <div className={`flex items-center justify-between border-b pb-1.5 ${HEAD}`}>
        <span className="text-[11px] font-semibold tracking-wider uppercase">
          {title}
        </span>
        <span className="text-[10px] tabular-nums opacity-80">
          {items.length}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {items.length === 0 ? (
          <span className="text-[11px] italic text-muted-foreground">
            — 없음
          </span>
        ) : (
          items.map((it) => (
            <span
              key={it}
              className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${catClass}`}
            >
              {it}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
