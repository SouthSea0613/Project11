import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import JsonLd from "@/components/JsonLd";
import TeamCompareImpact from "@/components/TeamCompareImpact";
import TeamCompareRadarSection from "@/components/TeamCompareRadarSection";
import TeamCompareStack from "@/components/TeamCompareStack";
import { breadcrumbLd } from "@/lib/jsonLd";
import {
  namhaeImpactMetrics,
  minyoungImpactMetrics,
} from "@/lib/impactData";
import { minyoungPhoto } from "@/lib/minyoungResume";
import { namhaePhoto } from "@/lib/namhaeResume";
import {
  getProjectsByMember,
  teamMembers,
} from "@/lib/portfolioData";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const PATH = "/team-compare";

export const metadata: Metadata = {
  title: `팀원 비교 — 김남해 vs 김민영 | ${SITE_NAME} Team Portfolio`,
  description:
    "김남해와 김민영의 능력치, 비즈니스 임팩트, 기술 스택을 한 화면에서 비교합니다. 공통 기술과 각자의 강점을 시각적으로 확인하세요.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "팀원 비교 — 김남해 vs 김민영",
    description: "두 멤버의 능력치·임팩트·스택을 한 번에 비교",
    url: PATH,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "팀원 비교 — 김남해 vs 김민영",
    description: "두 멤버의 능력치·임팩트·스택을 한 번에 비교",
  },
};

export default function TeamComparePage() {
  const namhae = teamMembers.find((m) => m.id === "namhae")!;
  const minyoung = teamMembers.find((m) => m.id === "minyoung")!;

  const namhaeProjects = getProjectsByMember("namhae");
  const minyoungProjects = getProjectsByMember("minyoung");

  // 두 멤버 스킬 비교는 portfolioProjects 의 stack 합산 + 멤버 핵심 skills 까지 통합.
  const namhaeStack = Array.from(
    new Set([
      ...namhae.skills,
      ...namhaeProjects.flatMap((p) => p.stack),
    ])
  );
  const minyoungStack = Array.from(
    new Set([
      ...minyoung.skills,
      ...minyoungProjects.flatMap((p) => p.stack),
    ])
  );

  const sharedProjects = namhaeProjects.filter((np) =>
    minyoungProjects.some((mp) => mp.slug === np.slug)
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-6">
      <JsonLd
        id="ld-team-compare"
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "팀원 비교 — 김남해 vs 김민영",
            url: `${SITE_URL}${PATH}`,
            description:
              "두 팀원의 능력치, 임팩트, 기술 스택을 한 화면에서 비교하는 페이지",
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "팀원 비교", path: PATH },
          ]),
        ]}
      />

      {/* ── Header ── */}
      <header className="rounded-2xl border bg-card p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-violet-500">
            Team Compare
          </p>
          {/* 컬러 가이드 — 어느 색이 누구인지 즉시 인지 */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-emerald-500">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              김남해
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-500/10 px-2 py-0.5 text-sky-500">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
              김민영
            </span>
          </div>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
          <span className="text-emerald-500">김남해</span>{" "}
          <span className="text-muted-foreground">vs</span>{" "}
          <span className="text-sky-500">김민영</span>
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          두 멤버가 어떤 능력치를 보유하고, 어떤 비즈니스 임팩트를 만들었으며,
          기술 스택이 얼마나 겹치는지 한 화면에서 비교합니다.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <MemberCard
            name={namhae.name}
            role={namhae.role}
            highlights={namhae.highlights}
            photoSrc={namhaePhoto}
            href={namhae.profilePath}
            accent="emerald"
            projectCount={namhaeProjects.length}
          />
          <MemberCard
            name={minyoung.name}
            role={minyoung.role}
            highlights={minyoung.highlights}
            photoSrc={minyoungPhoto}
            href={minyoung.profilePath}
            accent="sky"
            projectCount={minyoungProjects.length}
          />
        </div>
      </header>

      {/* ── 능력치 라디어 ── */}
      <section className="mt-8 rounded-2xl border bg-card p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              Ability Radar
            </h2>
            <p className="mt-1 text-base font-semibold">
              공통 6축으로 본 두 멤버의 능력치 분포
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              김남해
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              김민영
            </span>
          </div>
        </div>
        <div className="mt-3">
          <TeamCompareRadarSection />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          ※ 능력치 점수는 자기보고 기반 상대 척도이며, 실제 프로젝트 결과는
          하단 Impact / Stack 비교를 함께 참고해 주세요.
        </p>
      </section>

      {/* ── 임팩트 비교 ── */}
      <section className="mt-6 rounded-2xl border bg-card p-5 md:p-6">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          Business Impact
        </h2>
        <p className="mt-1 text-base font-semibold">
          비즈니스 임팩트 — 멤버별 대표 결과
        </p>
        <div className="mt-4">
          <TeamCompareImpact
            namhae={namhaeImpactMetrics}
            minyoung={minyoungImpactMetrics}
          />
        </div>
      </section>

      {/* ── 스택 비교 ── */}
      <section className="mt-6 rounded-2xl border bg-card p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              Tech Stack Overlap
            </h2>
            <p className="mt-1 text-base font-semibold">
              공통 / 각자의 고유 기술 — 카테고리별 분리
            </p>
          </div>
          <Link
            href="/projects"
            className="text-[11px] font-medium text-emerald-500 underline-offset-4 hover:underline"
          >
            전체 프로젝트 보기 →
          </Link>
        </div>
        <div className="mt-4">
          <TeamCompareStack
            namhaeStack={namhaeStack}
            minyoungStack={minyoungStack}
          />
        </div>
      </section>

      {/* ── 함께 진행한 프로젝트 ── */}
      {sharedProjects.length > 0 && (
        <section className="mt-6 rounded-2xl border bg-card p-5 md:p-6">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
            Shared Projects
          </h2>
          <p className="mt-1 text-base font-semibold">
            함께 진행한 프로젝트 ({sharedProjects.length})
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sharedProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group overflow-hidden rounded-xl border bg-background/40 transition hover:border-violet-400/60"
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
                <div className="p-3">
                  <p className="text-[11px] text-muted-foreground">{p.period}</p>
                  <h3 className="mt-0.5 text-sm font-semibold group-hover:text-violet-400">
                    {p.title}
                  </h3>
                  {p.metrics[0] && (
                    <span className="mt-2 inline-block rounded-md border border-violet-400/30 bg-violet-400/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-300">
                      {p.metrics[0]}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── 풋터 ── */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link
          href="/"
          className="text-emerald-500 underline-offset-4 hover:underline"
        >
          ← 홈으로
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={namhae.profilePath}
            className="text-emerald-500 underline-offset-4 hover:underline"
          >
            김남해 프로필 →
          </Link>
          <Link
            href={minyoung.profilePath}
            className="text-sky-500 underline-offset-4 hover:underline"
          >
            김민영 프로필 →
          </Link>
        </div>
      </div>
    </main>
  );
}

function MemberCard({
  name,
  role,
  highlights,
  photoSrc,
  href,
  accent,
  projectCount,
}: {
  name: string;
  role: string;
  highlights: string[];
  photoSrc: string;
  href: string;
  accent: "emerald" | "sky";
  projectCount: number;
}) {
  const ACCENT = {
    emerald: {
      border: "border-emerald-400/40",
      hover: "hover:border-emerald-400/70",
      pill: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
      dot: "bg-emerald-400",
    },
    sky: {
      border: "border-sky-400/40",
      hover: "hover:border-sky-400/70",
      pill: "bg-sky-400/10 text-sky-300 border-sky-400/30",
      dot: "bg-sky-400",
    },
  }[accent];

  return (
    <Link
      href={href}
      className={`group flex gap-4 rounded-xl border bg-background/30 p-4 transition ${ACCENT.border} ${ACCENT.hover}`}
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-border">
        <ImageSlot
          src={photoSrc}
          alt={`${name} 프로필`}
          aspect="aspect-square"
          rounded="rounded-xl"
          label="프로필"
          sizes="80px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold">{name}</h3>
          <span
            className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${ACCENT.pill}`}
          >
            프로젝트 {projectCount}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{role}</p>
        <ul className="mt-2 space-y-0.5 text-[11px] text-muted-foreground">
          {highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex gap-1.5">
              <span
                className={`mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full ${ACCENT.dot}`}
              />
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
