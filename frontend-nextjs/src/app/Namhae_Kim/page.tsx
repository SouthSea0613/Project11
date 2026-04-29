import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import ProjectTabs from "@/components/ProjectTabs";
import { getMemberById, getProjectsByMember } from "@/lib/portfolioData";
import {
  namhaeAcademicProjects,
  namhaeContact,
  namhaeEducation,
  namhaeExternalLinks,
  namhaeGithubUrl,
  namhaeHeadline,
  namhaeImpactStats,
  namhaeLanguages,
  namhaePhoto,
  namhaeSkillCategories,
  namhaeSummary,
} from "@/lib/namhaeResume";

const member = getMemberById("namhae");

export const metadata: Metadata = {
  title: "김남해 | HaeYoungLab Team Portfolio",
  description: `${namhaeHeadline} — PlanIT, R&D 오토노트, 보안 SIEM 등 풀스택 제품 경험.`,
};

export default function NamhaeKimPage() {
  const projects = getProjectsByMember("namhae");

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6">
      {/* ── Profile Hero ── */}
      <section className="flex flex-col gap-6 sm:flex-row sm:gap-6 md:gap-8">
        <div className="flex shrink-0 flex-col items-start gap-3 sm:w-[160px] md:w-[180px] justify-between">
          <div className="w-28 sm:w-full">
            <ImageSlot
              src={namhaePhoto}
              alt="김남해 프로필 사진"
              aspect="aspect-square"
              rounded="rounded-2xl"
              label="프로필 사진"
            />
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href={`mailto:${namhaeContact.email}`}
              className="rounded-md bg-emerald-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              이메일
            </a>
            <a
              href={namhaeGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-medium text-foreground hover:bg-muted"
              aria-label="GitHub 프로필"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.69-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </a>
            <a
              href={`tel:${namhaeContact.phoneTel}`}
              className="rounded-md border px-3 py-1.5 font-medium text-foreground hover:bg-muted"
            >
              {namhaeContact.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">
            HaeYoungLab · Team Member
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {member?.name ?? "김남해"}
          </h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground md:text-base">
            {member?.role}
          </p>
          <p className="mt-5 text-base font-semibold leading-relaxed md:text-lg">
            {namhaeHeadline}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
            {namhaeSummary}
          </p>

          {/* Impact Stats */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {namhaeImpactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border bg-card px-3 py-3"
              >
                <div className="text-xl font-bold tracking-tight text-emerald-500 md:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground md:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills (Categorized) ── */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">기술 스택</h2>
          <span className="text-xs text-muted-foreground">{namhaeLanguages}</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {namhaeSkillCategories.map((cat) => (
            <div key={cat.label} className="rounded-xl border bg-card p-4">
              <p className="text-xs font-semibold tracking-wider text-emerald-500 uppercase">
                {cat.label}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {cat.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Project Tabs ── */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">프로젝트</h2>
          <Link
            href="/"
            className="text-xs text-emerald-500 underline-offset-4 hover:underline"
          >
            전체 프로젝트 보기 →
          </Link>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          탭을 클릭하면 각 프로젝트의 문제·해결·결과와 작업 이미지를 볼 수 있습니다.
        </p>
        <div className="mt-4">
          <ProjectTabs projects={projects} />
        </div>
      </section>

      {/* ── Academic / Personal Projects ── */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">학술·개인 프로젝트</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {namhaeAcademicProjects.map((proj) => (
            <div
              key={proj.title}
              className="overflow-hidden rounded-xl border bg-card"
            >
              <ImageSlot
                src={undefined}
                alt={proj.title}
                aspect="aspect-[16/9]"
                rounded="rounded-none"
                label="이미지 추가 예정"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold">{proj.title}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground">{proj.tech}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {proj.bullets.map((b) => (
                    <li key={b}>· {b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education + Links ── */}
      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">학력</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {namhaeEducation.map((row) => (
              <li key={row.school}>
                · <span className="font-medium text-foreground">{row.school}</span>
                <span> — {row.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">외부 링크</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {namhaeExternalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Footer Nav ── */}
      <div className="mt-10 flex items-center justify-between text-sm">
        <Link href="/" className="text-emerald-500 underline-offset-4 hover:underline">
          ← 홈으로 돌아가기
        </Link>
        <a
          href={`mailto:${namhaeContact.email}`}
          className="text-emerald-500 underline-offset-4 hover:underline"
        >
          {namhaeContact.email}
        </a>
      </div>
    </main>
  );
}
