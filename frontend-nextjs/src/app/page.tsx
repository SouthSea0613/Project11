import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import JsonLd from "@/components/JsonLd";
import TeamStackTreemap from "@/components/TeamStackTreemap";
import { organizationLd, websiteLd } from "@/lib/jsonLd";
import {
  getMemberById,
  getProjectBySlug,
  haeyoungLabAbout,
  haeyoungLabPitch,
  haeyoungLabStats,
  getPublicProjects,
  teamContact,
} from "@/lib/portfolioData";
import {
  namhaeContact,
  namhaeGithubUrl,
  namhaeSkillCategories,
} from "@/lib/namhaeResume";
import {
  STACK_CATEGORIES,
  STACK_DOT_CLASS,
  STACK_LABEL,
} from "@/lib/stackCategory";
import { classifyMetric } from "@/lib/metric";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const namhaeMember = getMemberById("namhae");
const namhaeSkills = Array.from(
  new Set(namhaeSkillCategories.flatMap((c) => c.items))
);

const HOME_TITLE = `${SITE_NAME} — 개발 포트폴리오`;
const HOME_DESC =
  "PlanIT · R&D 오토노트 · AWS 인프라까지, 기획·개발·배포·운영을 끝까지 책임지는 HaeYoungLab의 작업 모음입니다.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESC,
  alternates: { canonical: "/" },
  keywords: ["HaeYoungLab", "해영랩", "포트폴리오", "백엔드", "풀스택", "AWS", "RAG"],
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESC,
  },
};

const SIGNATURE_SLUG = "aws-infra-modernization";

const publicProjects = getPublicProjects();
const signature = getProjectBySlug(SIGNATURE_SLUG);

const stackLegend = STACK_CATEGORIES.map((key) => ({
  color: STACK_DOT_CLASS[key],
  label: STACK_LABEL[key],
}));

/** 숫자형 메트릭 강조 칩 + 정성형 칩 */
function MetricChips({ metrics, max }: { metrics: string[]; max: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {metrics.slice(0, max).map((metric) => {
        const m = classifyMetric(metric);
        if (m.kind === "numeric") {
          return (
            <span
              key={metric}
              className="inline-flex items-baseline gap-1 rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300"
            >
              <span>{m.number}</span>
              <span className="font-medium opacity-80">{m.rest}</span>
            </span>
          );
        }
        return (
          <span
            key={metric}
            className="rounded-md border border-dashed bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {m.raw}
          </span>
        );
      })}
    </div>
  );
}

export default function Home() {
  const cards = publicProjects.filter((p) => p.slug !== SIGNATURE_SLUG);

  return (
    <main className="mx-auto max-w-screen-2xl px-4 pt-28 pb-24 sm:px-6 md:px-8 lg:px-6">
      <JsonLd id="ld-home" data={[websiteLd(), organizationLd()]} />

      {/* ── Hero ── */}
      <section className="pt-4">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-500 md:text-sm">
          {haeyoungLabPitch.tagline}
        </p>
        <h1 className="mt-2 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
          {haeyoungLabPitch.heroTitle}
        </h1>
        <p className="mt-3 max-w-3xl text-lg font-semibold leading-snug text-foreground/80 md:text-2xl">
          {haeyoungLabPitch.heroSubtitle}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {haeyoungLabPitch.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <Link
            href="/Namhae_Kim"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            엔지니어 프로필 보기
          </Link>
          <Link
            href="/projects"
            className="rounded-md border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-emerald-400/50"
          >
            프로젝트 {publicProjects.length}개
          </Link>
          <a
            href={`mailto:${namhaeContact.email}`}
            className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-300"
          >
            이메일
          </a>
          <a
            href="https://planit.haeyounglab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            PlanIT <span aria-hidden className="text-[10px] opacity-70">↗</span>
          </a>
          <a
            href={namhaeGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            GitHub <span aria-hidden className="text-[10px] opacity-70">↗</span>
          </a>
        </div>

        {/* 핵심 지표 */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {haeyoungLabStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-4 md:p-5">
              <div className="text-3xl font-bold tracking-tight text-emerald-500 md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] font-medium leading-snug text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Signature Case (AWS) ── */}
      {signature && (
        <section className="mt-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500">
            Signature Case
          </p>
          <Link
            href={`/projects/${signature.slug}`}
            className="group mt-3 grid overflow-hidden rounded-2xl border bg-card transition hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
          >
            <div className="flex flex-col p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
                  ★ Flagship
                </span>
                <span className="rounded-full border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                  {signature.role}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 md:text-3xl">
                {signature.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                {signature.summary}
              </p>
              <div className="mt-4">
                <MetricChips metrics={signature.metrics} max={4} />
              </div>
              <span className="mt-6 inline-block text-sm font-medium text-emerald-500">
                케이스 자세히 보기 →
              </span>
            </div>
            <div className="relative min-h-[220px] border-t lg:border-l lg:border-t-0">
              <ImageSlot
                src={signature.heroImage}
                alt={signature.title}
                aspect="aspect-[16/10]"
                rounded="rounded-none"
                label="아키텍처 다이어그램"
                className="h-full !border-0"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
          </Link>
        </section>
      )}

      {/* ── 대표 프로젝트 (지표 우선 카드) ── */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500">
              Work
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground md:text-3xl">
              대표 프로젝트
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs text-emerald-500 underline-offset-4 hover:underline md:text-sm"
          >
            전체 검색·필터 →
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                  {project.period}
                </span>
                {project.role && (
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-300">
                    {project.role}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-3">
                <MetricChips metrics={project.metrics} max={3} />
              </div>
              <span className="mt-auto pt-4 text-xs text-emerald-500">상세 보기 →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 기술 스택 ── */}
      <section className="mt-16">
        <div className="rounded-2xl border bg-card p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500">
                Tech Map
              </p>
              <h2 className="mt-1 text-xl font-semibold text-foreground md:text-2xl">
                주요 기술 스택
              </h2>
            </div>
            <ul className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
              {stackLegend.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-1.5">
                  <span className={`inline-block h-2 w-2 rounded-full ${item.color}`} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            전체 프로젝트에서 사용 빈도가 높은 기술일수록 큰 블록으로 표시됩니다.
          </p>
          <div className="mt-4">
            <TeamStackTreemap />
          </div>
        </div>
      </section>

      {/* ── 핵심 역량 ── */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500">
              Strengths
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground md:text-3xl">
              핵심 역량
            </h2>
          </div>
          <Link
            href="/Namhae_Kim"
            className="text-xs text-emerald-500 underline-offset-4 hover:underline md:text-sm"
          >
            엔지니어 상세 →
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {namhaeMember?.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-2xl border bg-card p-4 text-sm leading-6 text-foreground/90"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {namhaeSkills.slice(0, 14).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section className="mt-16">
        <div className="grid gap-8 rounded-2xl border bg-card p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500">
              {haeyoungLabAbout.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {haeyoungLabAbout.heading}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground md:text-base">
              {haeyoungLabAbout.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-3 self-center sm:grid-cols-3 lg:grid-cols-1">
            {haeyoungLabAbout.pillars.map((pillar) => (
              <li key={pillar.title} className="rounded-xl border bg-background/40 p-4">
                <div className="text-2xl leading-none">{pillar.icon}</div>
                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  {pillar.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mt-16">
        <div className="grid gap-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-6 md:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Open for work
            </span>
            <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
              함께 일할 기회를 찾고 있습니다
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              백엔드·풀스택 개발, AI·RAG 파이프라인, B2B SaaS 아키텍처 관련 협업·채용
              문의를 환영합니다. 아래로 연락 주시면{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                {teamContact.responseSla}
              </span>
              에 답변드립니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {teamContact.channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={
                    c.primary
                      ? "rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                      : "rounded-md border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-emerald-400/50"
                  }
                >
                  {c.label}
                  {c.primary ? ` · ${teamContact.email}` : " →"}
                </a>
              ))}
            </div>
          </div>
          <ul className="grid gap-2 self-center">
            <li className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
              자주 받는 문의
            </li>
            {teamContact.inquiryTypes.map((q) => (
              <li
                key={q}
                className="rounded-lg border bg-card px-3 py-2 text-xs text-muted-foreground md:text-sm"
              >
                · {q}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
