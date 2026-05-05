import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import ProjectTabs from "@/components/ProjectTabs";
import { getMemberById, getProjectsByMember } from "@/lib/portfolioData";
import {
  minyoungCaseStudies,
  minyoungContact,
  minyoungEducation,
  minyoungExternalLinks,
  minyoungFuturePlan,
  minyoungGithubUrl,
  minyoungHeadline,
  minyoungImpactStats,
  minyoungLanguages,
  minyoungMotivation,
  minyoungPhoto,
  minyoungSkillCategories,
  minyoungStrengths,
  minyoungSummary,
  minyoungTraining,
  minyoungExperiences,
} from "@/lib/minyoungResume";

const member = getMemberById("minyoung");

export const metadata: Metadata = {
  title: "김민영 | HaeYoungLab Team Portfolio",
  description: `${minyoungHeadline} — 의료 데이터 연동, 시스템 최적화, 운영 효율화 경험.`,
};

export default function MinyoungKimPage() {
  const projects = getProjectsByMember("minyoung");

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6">
      {/* Profile Hero */}
      <section className="flex flex-col gap-6 sm:flex-row sm:gap-6 md:gap-8">
        <div className="flex shrink-0 flex-col items-start gap-3 sm:w-[160px] md:w-[180px] justify-between">
          <div className="w-28 sm:w-full">
            <ImageSlot
              src={minyoungPhoto}
              alt="김민영 프로필 사진"
              aspect="aspect-square"
              rounded="rounded-2xl"
              label="프로필 사진"
            />
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href={`mailto:${minyoungContact.email}`}
              className="rounded-md bg-emerald-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              이메일
            </a>
            <a
              href={minyoungGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-3 py-1.5 font-medium text-foreground hover:bg-muted"
            >
              GitHub
            </a>
            <a
              href={`tel:${minyoungContact.phoneTel}`}
              className="rounded-md border px-3 py-1.5 font-medium text-foreground hover:bg-muted"
            >
              {minyoungContact.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">
            HaeYoungLab · Team Member
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {member?.name ?? "김민영"}
          </h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground md:text-base">
            {member?.role}
          </p>
          <p className="mt-5 text-base font-semibold leading-relaxed md:text-lg">
            {minyoungHeadline}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
            {minyoungSummary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {minyoungImpactStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card px-3 py-3">
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

      {/* Skills */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">기술 스택</h2>
          <span className="text-xs text-muted-foreground">{minyoungLanguages}</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {minyoungSkillCategories.map((cat) => (
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

      {/* Project Tabs */}
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

      {/* Resume Timeline */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">경력 타임라인</h2>
        <div className="mt-4 space-y-3">
          {minyoungExperiences.map((exp) => (
            <article key={`${exp.title}-${exp.period}`} className="rounded-xl border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold">{exp.title}</h3>
                <span className="text-xs text-muted-foreground">{exp.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-emerald-500">{exp.role}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {exp.bullets.map((bullet) => (
                  <li key={bullet}>· {bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Self-introduction */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold md:text-2xl">자기소개서</h2>
        <div className="mt-4 rounded-xl border bg-card p-5">
          <h3 className="text-base font-semibold">{minyoungMotivation.title}</h3>
          <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
            {minyoungMotivation.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold">핵심 역량 및 업무 성과 사례</h3>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {minyoungCaseStudies.map((item) => (
            <article key={item.title} className="rounded-xl border bg-card p-4">
              <p className="text-xs font-semibold tracking-wide text-emerald-500">{item.title}</p>
              <h4 className="mt-1 text-base font-semibold">{item.topic}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{item.problem}</p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {item.approach.map((approach) => (
                  <li key={approach}>· {approach}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-foreground">성과: {item.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-lg font-semibold">직무 전문성 및 강점</h3>
          <div className="mt-3 space-y-4">
            {minyoungStrengths.map((strength) => (
              <div key={strength.title}>
                <p className="text-sm font-semibold text-emerald-500">{strength.title}</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {strength.bullets.map((bullet) => (
                    <li key={bullet}>· {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-lg font-semibold">입사 후 포부</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {minyoungFuturePlan.map((plan) => (
              <li key={plan}>· {plan}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Education + Links */}
      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">학력/교육</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {minyoungEducation.map((row) => (
              <li key={row.school}>
                · <span className="font-medium text-foreground">{row.school}</span>
                <span> — {row.detail}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {minyoungTraining.map((training) => (
              <li key={training}>· {training}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">외부 링크</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {minyoungExternalLinks.map((link) => (
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

      <div className="mt-10 flex items-center justify-between text-sm">
        <Link href="/" className="text-emerald-500 underline-offset-4 hover:underline">
          ← 홈으로 돌아가기
        </Link>
        <a
          href={`mailto:${minyoungContact.email}`}
          className="text-emerald-500 underline-offset-4 hover:underline"
        >
          {minyoungContact.email}
        </a>
      </div>
    </main>
  );
}
