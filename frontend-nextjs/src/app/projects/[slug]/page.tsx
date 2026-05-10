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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-emerald-300">
            Project Detail
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-4xl">
            {project.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] text-slate-200">
              {project.period}
            </span>
            {project.role && (
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-[11px] text-emerald-200">
                {project.role}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Summary + Metrics ── */}
      <section className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-xl border bg-card p-5 md:col-span-3">
          <h2 className="text-sm font-semibold text-emerald-500">한 줄 요약</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
            {project.summary}
          </p>
          {projectMembers.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                참여 멤버
              </span>
              {projectMembers.map((member) => (
                <Link
                  key={member.id}
                  href={member.profilePath}
                  className="inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2.5 py-0.5 text-xs hover:border-emerald-400/50 hover:text-emerald-500"
                >
                  {member.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="grid gap-2 md:col-span-2 md:grid-cols-1">
          {project.metrics.slice(0, 3).map((metric, idx) => (
            <div
              key={metric}
              className="rounded-xl border bg-card px-4 py-3"
            >
              <span className="text-[10px] font-semibold tracking-wider text-emerald-500">
                METRIC #{idx + 1}
              </span>
              <p className="mt-1 text-sm font-medium leading-snug">{metric}</p>
            </div>
          ))}
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

      {/* ── Back ── */}
      <div className="mt-10 flex items-center justify-between text-sm">
        <Link
          href="/"
          className="text-emerald-500 underline-offset-4 hover:underline"
        >
          ← 홈으로 돌아가기
        </Link>
        <Link
          href="/#all-projects"
          className="text-emerald-500 underline-offset-4 hover:underline"
        >
          모든 프로젝트 보기 →
        </Link>
      </div>
    </main>
  );
}
