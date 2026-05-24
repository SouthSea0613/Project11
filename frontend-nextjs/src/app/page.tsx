import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import JsonLd from "@/components/JsonLd";
import TeamStackTreemap from "@/components/TeamStackTreemap";
import { personLd, websiteLd } from "@/lib/jsonLd";
import {
  getMemberById,
  haeyoungLabAbout,
  haeyoungLabPitch,
  portfolioProjects,
  teamContact,
} from "@/lib/portfolioData";
import {
  minyoungContact,
  minyoungGithubUrl,
  minyoungHeadline,
  minyoungImpactStats,
  minyoungPhoto,
  minyoungSkillCategories,
  minyoungSummary,
} from "@/lib/minyoungResume";
import {
  STACK_CATEGORIES,
  STACK_DOT_CLASS,
  STACK_LABEL,
} from "@/lib/stackCategory";
import { classifyMetric } from "@/lib/metric";
import {
  PORTFOLIO_OWNER_NAME,
  PORTFOLIO_SITE_TITLE,
  SITE_URL,
} from "@/lib/siteConfig";

const minyoungMember = getMemberById("minyoung");
const minyoungSkills = Array.from(
  new Set(minyoungSkillCategories.flatMap((c) => c.items))
);

export const metadata: Metadata = {
  title: PORTFOLIO_SITE_TITLE,
  description: minyoungSummary,
  alternates: { canonical: "/" },
  keywords: [
    "김민영",
    "포트폴리오",
    "백엔드",
    "풀스택",
    ".NET",
    "MS-SQL",
    "의료 IT",
  ],
  openGraph: {
    title: PORTFOLIO_SITE_TITLE,
    description: minyoungHeadline,
    url: SITE_URL,
    siteName: PORTFOLIO_OWNER_NAME,
    locale: "ko_KR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: PORTFOLIO_SITE_TITLE,
    description: minyoungHeadline,
  },
};

const FEATURED_SLUGS = ["planit", "kakao-carechat-integration", "team-portfolio-platform"];

const heroImpactStats = minyoungImpactStats.map((stat, i) => ({
  ...stat,
  accent: ["text-sky-400", "text-emerald-400", "text-violet-400", "text-amber-400"][i],
}));

const stackLegend = STACK_CATEGORIES.map((key) => ({
  color: STACK_DOT_CLASS[key],
  label: STACK_LABEL[key],
}));

export default function Home() {
  const featured = FEATURED_SLUGS.map((slug) =>
    portfolioProjects.find((p) => p.slug === slug)
  ).filter((p): p is (typeof portfolioProjects)[number] => !!p);

  const others = portfolioProjects.filter(
    (p) => !FEATURED_SLUGS.includes(p.slug)
  );

  return (
    <main className="relative">
      <JsonLd
        id="ld-home"
        data={[
          personLd({
            member: minyoungMember,
            fallbackName: PORTFOLIO_OWNER_NAME,
            path: "/",
            imagePath: minyoungPhoto,
            description: `${minyoungHeadline} — ${minyoungSummary}`,
            email: minyoungContact.email,
            sameAs: [minyoungGithubUrl],
            jobTitle: "Backend / Full-stack Engineer",
            knowsAbout: minyoungSkills,
          }),
          websiteLd(),
        ]}
      />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#040916]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pt-32 pb-12 sm:px-6 md:px-8 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,340px)] lg:items-start">
          <div className="mx-auto w-full max-w-[240px] lg:mx-0">
            <div className="overflow-hidden rounded-2xl ring-2 ring-sky-400/40 ring-offset-2 ring-offset-[#040916]">
              <ImageSlot
                src={minyoungPhoto}
                alt={`${PORTFOLIO_OWNER_NAME} 프로필`}
                aspect="aspect-[4/5]"
                rounded="rounded-2xl"
                label="프로필"
                sizes="240px"
                priority
              />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-sky-400 md:text-sm">
              {haeyoungLabPitch.tagline}
            </p>
            <h1 className="mt-2 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
              {haeyoungLabPitch.heroTitle}
            </h1>
            <p className="mt-3 text-lg font-semibold leading-snug text-slate-200 md:text-xl">
              {haeyoungLabPitch.heroSubtitle}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              {haeyoungLabPitch.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <Link
                href="/Minyoung_Kim"
                className="rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                경력·기술 상세 보기
              </Link>
              <Link
                href="/projects"
                className="rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-400/50 hover:bg-white/10"
              >
                프로젝트 {portfolioProjects.length}개
              </Link>
              <a
                href={`mailto:${minyoungContact.email}`}
                className="rounded-md border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20"
              >
                이메일
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-500">
                제품
              </span>
              <a
                href="https://planit.haeyounglab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 font-medium text-sky-300 transition hover:border-sky-400/60"
              >
                PlanIT
                <span aria-hidden="true" className="text-[10px] opacity-80">
                  ↗
                </span>
              </a>
              <a
                href={minyoungGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-medium text-slate-300 transition hover:text-white"
              >
                GitHub
                <span aria-hidden="true" className="text-[10px] opacity-70">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {heroImpactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur md:p-5"
              >
                <div
                  className={`text-3xl font-bold tracking-tight md:text-4xl ${stat.accent}`}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-[10px] font-semibold leading-snug tracking-wide text-slate-300 md:text-[11px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              Featured Work
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
              대표 프로젝트
            </h2>
          </div>
          <Link
            href="#all-projects"
            className="text-xs text-emerald-400 underline-offset-4 hover:underline md:text-sm"
          >
            전체 보기 ↓
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {featured.map((project, idx) => {
            const isHero = idx === 0;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 ${
                  isHero ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className="relative">
                  <ImageSlot
                    src={project.heroImage}
                    alt={project.title}
                    aspect={isHero ? "aspect-[16/9]" : "aspect-[16/9]"}
                    rounded="rounded-none"
                    label="이미지 추가 예정"
                    sizes={
                      isHero
                        ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    priority={isHero}
                  />
                  {isHero && (
                    <span className="absolute left-3 top-3 rounded-full border border-emerald-400/40 bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-emerald-300 backdrop-blur">
                      ★ Flagship
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                      {project.period}
                    </span>
                    {project.role && (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
                        {project.role}
                      </span>
                    )}
                  </div>
                  <h3
                    className={`mt-3 font-semibold text-white group-hover:text-emerald-300 ${
                      isHero ? "text-2xl md:text-3xl" : "text-lg"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mt-2 text-slate-300 ${
                      isHero
                        ? "line-clamp-3 text-sm md:text-base"
                        : "line-clamp-2 text-sm"
                    }`}
                  >
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.metrics
                      .slice(0, isHero ? 4 : 3)
                      .map((metric) => {
                        const m = classifyMetric(metric);
                        if (m.kind === "numeric") {
                          return (
                            <span
                              key={metric}
                              className="inline-flex items-baseline gap-1 rounded-md border border-emerald-400/40 bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-200"
                            >
                              <span className="text-emerald-300">{m.number}</span>
                              <span className="font-medium opacity-90">{m.rest}</span>
                            </span>
                          );
                        }
                        return (
                          <span
                            key={metric}
                            className="rounded-md border border-dashed border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
                          >
                            {m.raw}
                          </span>
                        );
                      })}
                  </div>
                  <div className="mt-auto pt-4 text-xs text-emerald-400">
                    상세 보기 →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Tech Stack Treemap ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6">
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                Team Tech Map
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white md:text-2xl">
                주요 기술 스택
              </h2>
            </div>
            <ul className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
              {stackLegend.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-1.5">
                  <span className={`inline-block h-2 w-2 rounded-full ${item.color}`} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            전체 프로젝트의 사용 빈도가 높은 기술일수록 큰 블록으로 표시됩니다.
          </p>
          <div className="mt-4">
            <TeamStackTreemap />
          </div>
        </div>
      </section>

      {/* ── Strengths ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-sky-400 uppercase">
              Strengths
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
              핵심 역량
            </h2>
          </div>
          <Link
            href="/Minyoung_Kim"
            className="text-xs text-sky-400 underline-offset-4 hover:underline md:text-sm"
          >
            경력·기술 기록 보기 →
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {minyoungMember?.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-200"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-sky-400 align-middle" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {minyoungSkills.slice(0, 14).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-sky-400/25 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* ── More Projects ── */}
      <section
        id="all-projects"
        className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              All Projects
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
              더 많은 작업
            </h2>
          </div>
          <Link
            href="/projects"
            className="rounded-md border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
          >
            전체 프로젝트 검색·필터 →
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {others.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-slate-950/50 transition hover:border-emerald-400/40"
            >
              <ImageSlot
                src={project.heroImage}
                alt={project.title}
                aspect="aspect-[16/9]"
                rounded="rounded-none"
                label="이미지 추가 예정"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="p-3">
                <p className="text-[10px] text-slate-400">{project.period}</p>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white group-hover:text-emerald-300">
                  {project.title}
                </h3>
                {project.metrics[0] && (
                  <span className="mt-2 inline-block rounded-md border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-200">
                    {project.metrics[0]}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── About / Story ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6">
        <div className="grid gap-8 rounded-2xl border border-white/10 bg-slate-950/60 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
              {haeyoungLabAbout.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {haeyoungLabAbout.heading}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300 md:text-base">
              {haeyoungLabAbout.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-3 self-center sm:grid-cols-3 lg:grid-cols-1">
            {haeyoungLabAbout.pillars.map((pillar) => (
              <li
                key={pillar.title}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-4"
              >
                <div className="text-2xl leading-none">{pillar.icon}</div>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs leading-6 text-slate-400">
                  {pillar.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 다음 행선지 (2-CTA) ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 md:px-8 lg:px-6">
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/projects"
            className="group rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/60"
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-emerald-400">
              Browse
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-emerald-300">
              전체 프로젝트 검색·필터
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              스택 / 키워드로 좁혀 보기
            </p>
            <span className="mt-3 inline-block text-xs text-emerald-400">
              열기 →
            </span>
          </Link>
          <Link
            href="/Minyoung_Kim"
            className="group flex flex-col justify-between rounded-2xl border border-sky-400/30 bg-slate-950/60 p-5 transition hover:-translate-y-0.5 hover:border-sky-400/70"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-sky-400">
                Profile
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-sky-300">
                김민영 상세 프로필
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                경력·기술·프로젝트·기술 기록
              </p>
            </div>
            <span className="mt-3 text-xs text-sky-400">열기 →</span>
          </Link>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="mx-auto max-w-screen-2xl px-4 pb-24 sm:px-6 md:px-8 lg:px-6"
      >
        <div className="grid gap-6 rounded-2xl border border-sky-400/30 bg-sky-500/10 p-6 md:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/30 bg-sky-300/10 px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase text-sky-200">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300" />
              Open for work
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              함께 일할 기회를 찾고 있습니다
            </h2>
            <p className="mt-3 text-sm text-slate-200 md:text-base">
              백엔드·풀스택 개발, 의료·운영 데이터 연동, B2B SaaS 아키텍처 관련
              협업·채용 문의를 환영합니다. 아래로 연락 주시면{" "}
              <span className="font-semibold text-sky-200">
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
                  rel={
                    c.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={
                    c.primary
                      ? "rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                      : "rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                  }
                >
                  {c.label}
                  {c.primary ? ` · ${teamContact.email}` : " →"}
                </a>
              ))}
            </div>
          </div>
          <ul className="grid gap-2 self-center">
            <li className="text-[10px] font-semibold tracking-widest uppercase text-sky-200">
              자주 받는 문의
            </li>
            {teamContact.inquiryTypes.map((q) => (
              <li
                key={q}
                className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-200 md:text-sm"
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
