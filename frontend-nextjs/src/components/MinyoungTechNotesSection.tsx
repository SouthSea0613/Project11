"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import {
  minyoungTechNotes,
  minyoungTechNotesMeta,
  type MinyoungTechNote,
  type TechNoteCategory,
} from "@/lib/minyoungTechNotes";

const CATEGORY_STYLE: Record<
  TechNoteCategory,
  { border: string; bg: string; text: string }
> = {
  "코드 리뷰": {
    border: "border-sky-400/40",
    bg: "bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-300",
  },
  설계: {
    border: "border-violet-400/40",
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-300",
  },
  운영: {
    border: "border-amber-400/40",
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
  },
  성능: {
    border: "border-emerald-400/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-300",
  },
  정합성: {
    border: "border-rose-400/40",
    bg: "bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-300",
  },
  배포: {
    border: "border-cyan-400/40",
    bg: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-300",
  },
  기타: {
    border: "border-border",
    bg: "bg-muted/40",
    text: "text-muted-foreground",
  },
};

function Emphasized({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <mark
            key={i}
            className="rounded bg-sky-500/15 px-1 font-semibold text-sky-700 dark:text-sky-200"
          >
            {p.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

function NoteArticle({ note }: { note: MinyoungTechNote }) {
  const cat = CATEGORY_STYLE[note.category];
  return (
    <article className="rounded-2xl border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-lg font-bold tracking-tight text-sky-500">
              Day {note.day}
            </span>
            {note.date ? (
              <time className="text-xs text-muted-foreground">{note.date}</time>
            ) : null}
            <span
              className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cat.border} ${cat.bg} ${cat.text}`}
            >
              {note.category}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold leading-snug text-foreground md:text-lg">
            {note.title}
          </h3>
        </div>
        {note.projectSlug ? (
          <Link
            href={`/projects/${note.projectSlug}`}
            className="shrink-0 rounded-md border border-sky-400/40 bg-sky-500/10 px-2.5 py-1 text-[11px] font-medium text-sky-600 transition hover:bg-sky-500/20 dark:text-sky-300"
          >
            관련 프로젝트 →
          </Link>
        ) : null}
      </div>

      {note.tags && note.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1">
          {note.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
        <div className="rounded-lg border bg-muted/20 p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            맥락
          </dt>
          <dd className="mt-1.5 leading-relaxed text-foreground">
            {note.context}
          </dd>
        </div>
        <div className="rounded-lg border bg-muted/20 p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            관찰
          </dt>
          <dd className="mt-1.5 leading-relaxed text-muted-foreground">
            <Emphasized text={note.observation} />
          </dd>
        </div>
        <div className="rounded-lg border border-sky-400/30 bg-sky-500/5 p-4 md:col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-300">
            판단 · 조치
          </dt>
          <dd className="mt-1.5 leading-relaxed text-foreground">
            <Emphasized text={note.action} />
          </dd>
        </div>
      </dl>

      <p className="mt-4 rounded-lg border border-dashed border-sky-400/40 bg-sky-500/5 px-4 py-3 text-sm leading-relaxed">
        <span className="font-semibold text-sky-600 dark:text-sky-300">
          Takeaway →
        </span>{" "}
        <Emphasized text={note.takeaway} />
      </p>
    </article>
  );
}

type Props = {
  className?: string;
};

/**
 * 기술 기록 — Day N 실무 노트 UI.
 */
export default function MinyoungTechNotesSection({ className = "" }: Props) {
  const sorted = useMemo(
    () => [...minyoungTechNotes].sort((a, b) => a.day - b.day),
    []
  );
  const [activeDay, setActiveDay] = useState(sorted[0]?.day ?? 1);

  const activeNote = sorted.find((n) => n.day === activeDay) ?? sorted[0];

  if (sorted.length === 0) {
    return (
      <section className={className}>
        <header>
          <p className="text-[11px] font-semibold tracking-widest text-sky-500 uppercase">
            {minyoungTechNotesMeta.kicker}
          </p>
          <h2 className="mt-1 text-lg font-semibold">{minyoungTechNotesMeta.heading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {minyoungTechNotesMeta.subtitle}
          </p>
        </header>
        <div className="mt-6 rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">아직 기록이 없습니다</p>
          <p className="mt-2 text-xs">
            <code className="rounded bg-muted px-1.5 py-0.5">src/lib/minyoungTechNotes.ts</code>
            의 <code className="rounded bg-muted px-1.5 py-0.5">minyoungTechNotes</code> 배열에
            Day 1 항목을 추가하세요.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <header>
        <p className="text-[11px] font-semibold tracking-widest text-sky-500 uppercase">
          {minyoungTechNotesMeta.kicker}
        </p>
        <h2 className="mt-1 text-lg font-semibold">{minyoungTechNotesMeta.heading}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {minyoungTechNotesMeta.subtitle}
        </p>
      </header>

      {/* Day 선택 — 프로젝트 하위 탭과 같은 2단 느낌 */}
      <div className="print-hide mt-5 flex flex-wrap gap-2">
        {sorted.map((n) => (
          <button
            key={n.day}
            type="button"
            onClick={() => setActiveDay(n.day)}
            aria-current={activeDay === n.day ? "page" : undefined}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              activeDay === n.day
                ? "bg-sky-500 text-slate-950"
                : "border text-muted-foreground hover:border-sky-400/50 hover:text-sky-500"
            }`}
          >
            Day {n.day}
          </button>
        ))}
      </div>

      {/* 인쇄 시 전체 엔트리 */}
      <div className="print-all-notes mt-5 space-y-8">
        <div className="print-hide">
          {activeNote ? <NoteArticle note={activeNote} /> : null}
        </div>
        {sorted.map((n) => (
          <div key={n.day} className="hidden print:block">
            <NoteArticle note={n} />
          </div>
        ))}
      </div>
    </section>
  );
}
