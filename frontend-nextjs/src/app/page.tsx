import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import JsonLd from "@/components/JsonLd";
import TeamStackTreemap from "@/components/TeamStackTreemap";
import { organizationLd, websiteLd } from "@/lib/jsonLd";
import {
  haeyoungLabAbout,
  haeyoungLabPitch,
  portfolioProjects,
  teamContact,
  teamMembers,
} from "@/lib/portfolioData";
import { namhaePhoto } from "@/lib/namhaeResume";
import { minyoungPhoto } from "@/lib/minyoungResume";
import {
  STACK_CATEGORIES,
  STACK_DOT_CLASS,
  STACK_LABEL,
} from "@/lib/stackCategory";
import { classifyMetric } from "@/lib/metric";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Team Portfolio | HAEYOUNGLAB",
  description:
    "김남해, 김민영 팀의 프로젝트와 역할, 결과물을 한눈에 소개하는 팀 포트폴리오입니다.",
  alternates: { canonical: "/" },
  keywords: [
    "포트폴리오",
    "팀 포트폴리오",
    "김남해",
    "김민영",
    "HAEYOUNGLAB",
    "프로젝트",
  ],
  openGraph: {
    title: "Team Portfolio | HAEYOUNGLAB",
    description: "팀의 대표 프로젝트, 담당 역할, 결과물을 소개하는 포트폴리오 페이지",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Portfolio | HAEYOUNGLAB",
    description: "김남해, 김민영 팀의 프로젝트 포트폴리오",
  },
};

const FEATURED_SLUGS = ["planit", "rd-autonote", "avis-tron-paradise"];

const memberPhotoMap: Record<string, string> = {
  namhae: namhaePhoto,
  minyoung: minyoungPhoto,
};

const teamImpact = [
  { value: `${portfolioProjects.length}+`, label: "출시·운영 프로젝트", accent: "text-emerald-400" },
  { value: "−60%", label: "RAG 토큰 비용 절감", accent: "text-sky-400" },
  { value: "+30%", label: "쿼리 응답 성능 개선", accent: "text-violet-400" },
  { value: "1분", label: "신규 기능 배포 주기", accent: "text-amber-400" },
];

const heroHeadlineStats = teamImpact.slice(0, 2);

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
        id="ld-organization"
        data={[organizationLd(), websiteLd()]}
      />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#040916]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      {/* ── Hero (통합) ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pt-32 pb-12 sm:px-6 md:px-8 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
          {/* 좌: 가치제안 */}
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400 md:text-sm">
              {haeyoungLabPitch.tagline}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
              {haeyoungLabPitch.heroTitle}
            </h1>
            <p className="mt-3 text-xl font-semibold text-slate-200 md:text-2xl">
              {haeyoungLabPitch.heroSubtitle}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              {haeyoungLabPitch.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {teamMembers.map((member) => (
                <Link
                  key={member.id}
                  href={member.profilePath}
                  className={`group inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-medium text-white transition ${
                    member.id === "namhae"
                      ? "border-emerald-400/30 bg-emerald-500/10 hover:border-emerald-400/70 hover:bg-emerald-500/20"
                      : "border-sky-400/30 bg-sky-500/10 hover:border-sky-400/70 hover:bg-sky-500/20"
                  }`}
                >
                  <span
                    className={`block h-8 w-8 overflow-hidden rounded-full ring-2 ${
                      member.id === "namhae"
                        ? "ring-emerald-400/40"
                        : "ring-sky-400/40"
                    }`}
                  >
                    <ImageSlot
                      src={memberPhotoMap[member.id]}
                      alt={`${member.name} 프로필`}
                      aspect="aspect-square"
                      rounded="rounded-full"
                      label=""
                      className="!border-0"
                      sizes="32px"
                    />
                  </span>
                  {member.name} 프로필
                </Link>
              ))}
            </div>
          </div>

          {/* 우: 거대 숫자 2개 (한눈 핵심 KPI) */}
          <div className="grid grid-cols-2 gap-3">
            {heroHeadlineStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur"
              >
                <div
                  className={`text-4xl font-bold tracking-tight md:text-5xl ${stat.accent}`}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] font-semibold leading-snug tracking-wide text-slate-300 md:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 보조 KPI 2개 — 한 줄 strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {teamImpact.slice(2).map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 backdrop-blur md:col-span-2"
            >
              <div
                className={`text-xl font-bold tracking-tight md:text-2xl ${stat.accent}`}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] leading-snug text-slate-300 md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
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
                팀이 다루는 기술
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

      {/* ── Team Members ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              Members
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
              팀 구성
            </h2>
          </div>
          <Link
            href="/team-compare"
            className="rounded-md border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
          >
            두 멤버 비교 보기 →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="flex gap-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-5"
            >
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <ImageSlot
                  src={memberPhotoMap[member.id]}
                  alt={`${member.name} 프로필`}
                  aspect="aspect-square"
                  rounded="rounded-2xl"
                  label="프로필"
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="mt-0.5 text-xs text-emerald-300">{member.role}</p>
                <ul className="mt-3 space-y-1 text-xs text-slate-300">
                  {member.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                      <span className="line-clamp-2">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={member.profilePath}
                  className="mt-4 inline-block rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  상세 프로필 →
                </Link>
              </div>
            </article>
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

      {/* ── 다음 행선지 (3-CTA) ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 md:px-8 lg:px-6">
        <div className="grid gap-3 md:grid-cols-3">
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
              스택 / 멤버 / 키워드로 좁혀 보기
            </p>
            <span className="mt-3 inline-block text-xs text-emerald-400">
              열기 →
            </span>
          </Link>
          <Link
            href="/team-compare"
            className="group rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5 transition hover:-translate-y-0.5 hover:border-violet-400/70"
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-violet-300">
              Compare
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-violet-200">
              팀원 비교 — 능력치 · 임팩트 · 스택
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              김남해 · 김민영을 한 화면에서 비교
            </p>
            <span className="mt-3 inline-block text-xs text-violet-300">
              열기 →
            </span>
          </Link>
          <div className="grid grid-cols-2 gap-3">
            {teamMembers.map((member) => (
              <Link
                key={member.id}
                href={member.profilePath}
                className={`group flex flex-col justify-between rounded-2xl border bg-slate-950/60 p-4 transition hover:-translate-y-0.5 ${
                  member.id === "namhae"
                    ? "border-emerald-400/30 hover:border-emerald-400/70"
                    : "border-sky-400/30 hover:border-sky-400/70"
                }`}
              >
                <div>
                  <p
                    className={`text-[10px] font-semibold tracking-widest uppercase ${
                      member.id === "namhae"
                        ? "text-emerald-400"
                        : "text-sky-400"
                    }`}
                  >
                    Profile
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-400">
                    {member.role}
                  </p>
                </div>
                <span
                  className={`mt-3 text-[11px] ${
                    member.id === "namhae"
                      ? "text-emerald-400"
                      : "text-sky-400"
                  }`}
                >
                  열기 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="mx-auto max-w-screen-2xl px-4 pb-24 sm:px-6 md:px-8 lg:px-6"
      >
        <div className="grid gap-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 md:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase text-emerald-200">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              Open for work
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              함께 만들 프로젝트를 찾고 있나요?
            </h2>
            <p className="mt-3 text-sm text-slate-200 md:text-base">
              기획부터 개발, 출시 후 개선까지 팀 단위로 빠르게 실행합니다.
              아래 채널로 편하게 연락 주세요 —{" "}
              <span className="font-semibold text-emerald-200">
                {teamContact.responseSla}
              </span>
              .
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
                      ? "rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
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
            <li className="text-[10px] font-semibold tracking-widest uppercase text-emerald-200">
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
