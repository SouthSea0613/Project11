import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  haeyoungLabPitch,
  portfolioProjects,
  teamMembers,
} from "@/lib/portfolioData";

export const metadata: Metadata = {
  title: "Team Portfolio | HAEYOUNGLAB",
  description:
    "김남해, 김민영 팀의 프로젝트와 역할, 결과물을 한눈에 소개하는 팀 포트폴리오입니다.",
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
    description:
      "팀의 대표 프로젝트, 담당 역할, 결과물을 소개하는 포트폴리오 페이지",
    url: "https://www.haeyounglab.com",
    siteName: "haeyounglab",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "해영랩" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Portfolio | HAEYOUNGLAB",
    description: "김남해, 김민영 팀의 프로젝트 포트폴리오",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="relative">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#040916]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <section className="mx-auto max-w-screen-2xl px-4 pt-32 pb-20 sm:px-6 md:px-8 lg:px-6">
        <p className="text-sm text-emerald-400">{haeyoungLabPitch.tagline}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
          {haeyoungLabPitch.heroTitle}
          <br />
          <span className="text-2xl font-semibold text-slate-200 md:text-3xl">
            {haeyoungLabPitch.heroSubtitle}
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          {haeyoungLabPitch.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              href={member.profilePath}
              className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              {member.name} 프로필
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          대표 프로젝트
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/50"
            >
              <div className="relative h-36 w-full">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-xs text-slate-300">{project.period}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-200">{project.summary}</p>
                <p className="mt-3 text-xs text-slate-300">
                  기술 스택: {project.stack.join(", ")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-200"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-emerald-400 underline-offset-4 hover:underline"
                  >
                    상세 보기
                  </Link>
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-200 underline-offset-4 hover:underline"
                    >
                      데모
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-200 underline-offset-4 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 md:px-8 lg:px-6">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">팀 구성</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="rounded-xl border border-white/10 bg-slate-950/50 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-xs text-emerald-300">{member.role}</p>
              <p className="mt-2 text-sm text-slate-200">{member.intro}</p>
              <Link
                href={member.profilePath}
                className="mt-4 inline-block text-sm text-emerald-400 underline-offset-4 hover:underline"
              >
                상세 프로필 보기
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-24 sm:px-6 md:px-8 lg:px-6">
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            함께 만들 프로젝트를 찾고 있나요?
          </h2>
          <p className="mt-3 text-sm text-slate-200 md:text-base">
            기획부터 개발, 출시 후 개선까지 팀 단위로 빠르게 실행합니다. 협업 문의는
            아래 메일로 연락주세요.
          </p>
          <a
            href="mailto:contact@haeyounglab.com"
            className="mt-6 inline-block rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            contact@haeyounglab.com
          </a>
        </div>
      </section>
    </main>
  );
}