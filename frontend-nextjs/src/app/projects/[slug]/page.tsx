import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  portfolioProjects,
  teamMembers,
} from "@/lib/portfolioData";

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
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Team Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const memberNames = teamMembers
    .filter((member) => project.members.includes(member.id))
    .map((member) => member.name);

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6">
      <div className="relative mb-8 h-56 w-full overflow-hidden rounded-2xl border">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <p className="text-sm text-emerald-400">Project Detail</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {project.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{project.period}</p>
      <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
        {project.summary}
      </p>

      <section className="mt-8 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">문제 정의</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.problem}</p>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">해결 방법</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {project.solution.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">결과</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {project.outcome.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">핵심 지표/성과</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {project.metrics.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">참여 멤버 / 기술 스택</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          참여 멤버: {memberNames.join(", ")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          기술 스택: {project.stack.join(", ")}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-500 underline-offset-4 hover:underline"
            >
              데모 보기
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-500 underline-offset-4 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </section>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="text-sm text-emerald-500 underline-offset-4 hover:underline"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
