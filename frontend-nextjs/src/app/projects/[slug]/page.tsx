import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageSlot } from "@/components/ImageSlot";
import JsonLd from "@/components/JsonLd";
import ProjectGallery from "@/components/ProjectGallery";
import { breadcrumbLd, projectLd } from "@/lib/jsonLd";
import {
  getProjectBySlug,
  normalizeGallery,
  portfolioProjects,
  teamMembers,
} from "@/lib/portfolioData";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
} from "@/lib/siteConfig";
import {
  STACK_BADGE_CLASS,
  STACK_CATEGORIES,
  STACK_LABEL,
  classifyTech,
} from "@/lib/stackCategory";
import { classifyMetrics, pickHeadlineMetric } from "@/lib/metric";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  const path = `/projects/${slug}`;
  const title = `${project.title} | ${SITE_NAME} Team Portfolio`;

  return {
    title,
    description: project.summary,
    keywords: [...project.stack, project.title, "HaeYoungLab", "포트폴리오"],
    alternates: { canonical: path },
    openGraph: {
      title,
      description: project.summary,
      url: path,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectMembers = teamMembers.filter((m) => project.members.includes(m.id));
  const stackByCategory = STACK_CATEGORIES.map((key) => ({
    key,
    label: STACK_LABEL[key],
    items: project.stack.filter((s) => classifyTech(s) === key),
  }));

  const ldImagePath =
    project.heroImage ?? project.thumbnail ?? DEFAULT_OG_IMAGE_PATH;

  const headline = pickHeadlineMetric(project.metrics);
  const parsedMetrics = classifyMetrics(project.metrics);

  // 이전/다음 프로젝트 (portfolioProjects 순서 기준)
  const currentIdx = portfolioProjects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIdx > 0 ? portfolioProjects[currentIdx - 1] : null;
  const nextProject =
    currentIdx >= 0 && currentIdx < portfolioProjects.length - 1
      ? portfolioProjects[currentIdx + 1]
      : null;

  return (
    <main className="mx-auto max-w-5xl px-4 pt-24 pb-24 sm:px-6">
      <JsonLd
        id={`ld-project-${project.slug}`}
        data={[
          projectLd({
            project,
            authors: projectMembers,
            imagePath: ldImagePath,
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <div className="aspect-[21/9] w-full bg-slate-900">
          <ImageSlot
            src={project.heroImage}
            alt={project.title}
            aspect="aspect-[21/9]"
            rounded="rounded-none"
            label="히어로 이미지 추가 예정"
            className="!border-0"
            sizes="(min-width: 1280px) 1024px, (min-width: 640px) 90vw, 100vw"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* 좌하단 — 타이틀/메타 */}
        <div className="absolute inset-x-0 bottom-0 grid gap-4 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-emerald-300">
              Project Detail
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-200/90 md:text-base">
              {project.summary}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] text-slate-200">
                {project.period}
              </span>
              {project.role && (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-[11px] text-emerald-200">
                  {project.role}
                </span>
              )}
              {projectMembers.map((member) => (
                <Link
                  key={member.id}
                  href={member.profilePath}
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition ${
                    member.id === "namhae"
                      ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100 hover:bg-emerald-400/25"
                      : "border-sky-400/40 bg-sky-400/15 text-sky-100 hover:bg-sky-400/25"
                  }`}
                >
                  {member.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 우하단 — 헤드라인 메트릭 (가장 큰 결과 숫자) */}
          {headline && (
            <div className="md:max-w-[260px]">
              <div className="rounded-2xl border border-emerald-400/40 bg-slate-950/80 p-4 backdrop-blur">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-emerald-300">
                  Headline Result
                </p>
                {headline.kind === "numeric" && headline.number ? (
                  <>
                    <div className="mt-1 text-4xl font-bold leading-none tracking-tight text-emerald-300 md:text-5xl">
                      {headline.number}
                    </div>
                    {headline.rest && (
                      <p className="mt-2 line-clamp-2 text-xs leading-snug text-slate-200">
                        {headline.rest}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-sm font-semibold leading-snug text-emerald-200">
                    {headline.rest}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Project Facts (요약은 hero에 있으므로 본문은 메타+메트릭만) ── */}
      <section className="mt-6 grid gap-4 md:grid-cols-5">
        {/* 좌: 기본 메타 */}
        <dl className="grid grid-cols-2 gap-3 rounded-xl border bg-card p-5 md:col-span-2 md:grid-cols-1">
          <div>
            <dt className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
              기간
            </dt>
            <dd className="mt-1 text-sm font-medium">{project.period}</dd>
          </div>
          {project.role && (
            <div>
              <dt className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                역할
              </dt>
              <dd className="mt-1 text-sm font-medium">{project.role}</dd>
            </div>
          )}
          {projectMembers.length > 0 && (
            <div className="col-span-2 md:col-span-1">
              <dt className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                참여 멤버
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {projectMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={member.profilePath}
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition ${
                      member.id === "namhae"
                        ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        : "border-sky-400/40 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        member.id === "namhae" ? "bg-emerald-400" : "bg-sky-400"
                      }`}
                    />
                    {member.name}
                  </Link>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {/* 우: 결과 메트릭 — 숫자형 / 정성형 위계 분리 */}
        <div className="md:col-span-3">
          <h2 className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            결과 지표
          </h2>
          {parsedMetrics.length === 0 ? (
            <p className="mt-2 text-xs italic text-muted-foreground">
              결과 메트릭이 등록되지 않았습니다.
            </p>
          ) : (
            <ul className="mt-2 grid gap-2">
              {parsedMetrics.map((m) =>
                m.kind === "numeric" ? (
                  <li
                    key={m.raw}
                    className="flex items-baseline gap-3 rounded-xl border border-emerald-400/40 bg-emerald-500/5 px-4 py-3"
                  >
                    <span className="text-2xl font-bold tabular-nums leading-none text-emerald-500 md:text-3xl">
                      {m.number}
                    </span>
                    <span className="text-sm leading-snug text-foreground">
                      {m.rest || m.raw}
                    </span>
                  </li>
                ) : (
                  <li
                    key={m.raw}
                    className="rounded-lg border border-dashed bg-muted/20 px-3 py-2 text-xs text-muted-foreground"
                  >
                    {m.raw}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </section>

      {/* ── Problem → Solution → Outcome 흐름 카드 ── */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          Problem → Solution → Outcome
        </h2>
        <div className="relative mt-3 grid gap-3 md:grid-cols-3">
          {/* Problem */}
          <article className="relative rounded-2xl border border-rose-400/40 bg-rose-500/10 p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300">
                ⚠
              </span>
              <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-200">
                Problem
              </h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-foreground/90">
              {project.problem}
            </p>
            <span
              aria-hidden
              className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-rose-500/70 md:block"
            >
              →
            </span>
          </article>

          {/* Solution */}
          <article className="relative rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                ⚙
              </span>
              <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-200">
                Solution
              </h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground/90">
              {project.solution.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <span
              aria-hidden
              className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-emerald-500/70 md:block"
            >
              →
            </span>
          </article>

          {/* Outcome */}
          <article className="rounded-2xl border border-sky-400/40 bg-sky-500/10 p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-300">
                ✦
              </span>
              <h3 className="text-sm font-semibold text-sky-700 dark:text-sky-200">
                Outcome
              </h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground/90">
              {project.outcome.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* ── Tech Stack (categorized) ── */}
      <section className="mt-8 rounded-2xl border bg-card p-5">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          기술 스택
        </h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {stackByCategory
            .filter((cat) => cat.items.length > 0)
            .map((cat) => (
              <div key={cat.key} className="rounded-xl border bg-background/40 p-3">
                <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                  {cat.label}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${STACK_BADGE_CLASS[cat.key]}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              Gallery
            </h2>
            <span className="text-[11px] text-muted-foreground">
              이미지를 클릭하면 크게 볼 수 있습니다
            </span>
          </div>
          <ProjectGallery
            images={normalizeGallery(project.gallery)}
            title={project.title}
          />
        </section>
      )}

      {/* ── Links ── */}
      {(project.links.demo || project.links.github) && (
        <section className="mt-8 flex flex-wrap items-center gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              데모 열기 →
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              GitHub →
            </a>
          )}
        </section>
      )}

      {/* ── 이전/다음 프로젝트 ── */}
      {(prevProject || nextProject) && (
        <nav
          aria-label="다른 프로젝트로 이동"
          className="mt-12 grid gap-3 md:grid-cols-2"
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex h-full flex-col rounded-2xl border bg-card p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/60"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                ← 이전 프로젝트
              </span>
              <span className="mt-2 text-base font-semibold group-hover:text-emerald-500">
                {prevProject.title}
              </span>
              <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {prevProject.summary}
              </span>
              <span className="mt-2 text-[11px] text-muted-foreground">
                {prevProject.period}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="hidden md:block" />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex h-full flex-col rounded-2xl border bg-card p-4 text-right transition hover:-translate-y-0.5 hover:border-emerald-400/60"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                다음 프로젝트 →
              </span>
              <span className="mt-2 text-base font-semibold group-hover:text-emerald-500">
                {nextProject.title}
              </span>
              <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {nextProject.summary}
              </span>
              <span className="mt-2 text-[11px] text-muted-foreground">
                {nextProject.period}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="hidden md:block" />
          )}
        </nav>
      )}

      {/* ── Back ── */}
      <div className="mt-8 flex items-center justify-between text-sm">
        <Link
          href="/"
          className="text-emerald-500 underline-offset-4 hover:underline"
        >
          ← 홈으로 돌아가기
        </Link>
        <Link
          href="/projects"
          className="text-emerald-500 underline-offset-4 hover:underline"
        >
          모든 프로젝트 보기 →
        </Link>
      </div>
    </main>
  );
}
