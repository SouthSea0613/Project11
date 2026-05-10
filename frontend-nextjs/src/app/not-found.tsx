import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import {
  portfolioProjects,
  teamMembers,
  type MemberId,
} from "@/lib/portfolioData";
import { namhaePhoto } from "@/lib/namhaeResume";
import { minyoungPhoto } from "@/lib/minyoungResume";
import { SITE_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `페이지를 찾을 수 없어요 (404) | ${SITE_NAME} Team Portfolio`,
  description:
    "요청하신 페이지가 이동되었거나 존재하지 않습니다. 홈, 프로젝트 목록, 멤버 페이지로 이동해 보세요.",
  robots: { index: false, follow: false },
};

const memberPhotoMap: Record<MemberId, string> = {
  namhae: namhaePhoto,
  minyoung: minyoungPhoto,
};

const FEATURED_SLUGS = ["planit", "rd-autonote", "avis-tron-paradise"];

export default function NotFound() {
  const featured = FEATURED_SLUGS.map((slug) =>
    portfolioProjects.find((p) => p.slug === slug)
  ).filter((p): p is (typeof portfolioProjects)[number] => !!p);

  return (
    <main className="relative">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#040916]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(16,185,129,0.18), transparent 50%), radial-gradient(circle at 90% 100%, rgba(56,189,248,0.16), transparent 55%)",
        }}
      />

      <section className="mx-auto max-w-5xl px-4 pt-32 pb-16 sm:px-6 md:px-8">
        <div className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
          <span className="inline-flex items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px]">
            404
          </span>
          Not Found
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
          이 페이지는 사라졌거나
          <br />
          아직 존재하지 않아요.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
          요청하신 주소가 변경되었거나, 프로젝트가 통합·정리되었을 수 있습니다.
          아래에서 가장 자주 찾는 곳으로 빠르게 이동할 수 있어요.
        </p>

        {/* 빠른 액션 */}
        <div className="mt-7 flex flex-wrap gap-2 text-sm">
          <Link
            href="/"
            className="rounded-md bg-emerald-500 px-3.5 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            홈으로 가기
          </Link>
          <Link
            href="/projects"
            className="rounded-md border border-white/15 bg-white/5 px-3.5 py-2 font-medium text-white transition hover:bg-white/10"
          >
            전체 프로젝트 보기
          </Link>
          <Link
            href="/Namhae_Kim"
            className="rounded-md border border-white/15 bg-white/5 px-3.5 py-2 font-medium text-white transition hover:bg-white/10"
          >
            김남해 프로필
          </Link>
          <Link
            href="/Minyoung_Kim"
            className="rounded-md border border-white/15 bg-white/5 px-3.5 py-2 font-medium text-white transition hover:bg-white/10"
          >
            김민영 프로필
          </Link>
          <Link
            href="/team-compare"
            className="rounded-md border border-violet-400/40 bg-violet-400/10 px-3.5 py-2 font-medium text-violet-200 transition hover:bg-violet-400/20"
          >
            팀원 비교
          </Link>
        </div>
      </section>

      {/* 추천 프로젝트 */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 md:px-8">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-emerald-400">
          이런 프로젝트는 어떠세요?
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-slate-950/50 transition hover:border-emerald-400/50"
            >
              <ImageSlot
                src={project.heroImage ?? project.thumbnail}
                alt={project.title}
                aspect="aspect-[16/9]"
                rounded="rounded-none"
                label="이미지 추가 예정"
                className="!border-0"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="p-4">
                <p className="text-[10px] text-slate-400">{project.period}</p>
                <h3 className="mt-1 text-sm font-semibold text-white group-hover:text-emerald-300">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[12px] leading-6 text-slate-300">
                  {project.summary}
                </p>
                {project.metrics[0] && (
                  <span className="mt-3 inline-block rounded-md border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-200">
                    {project.metrics[0]}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 멤버 카드 */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 md:px-8">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-emerald-400">
          Team
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {teamMembers.map((m) => (
            <Link
              key={m.id}
              href={m.profilePath}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-emerald-400/50"
            >
              <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 group-hover:ring-emerald-400/50">
                <ImageSlot
                  src={memberPhotoMap[m.id]}
                  alt={`${m.name} 프로필`}
                  aspect="aspect-square"
                  rounded="rounded-full"
                  label=""
                  className="!border-0"
                  sizes="56px"
                />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-white group-hover:text-emerald-300">
                  {m.name}
                </h3>
                <p className="truncate text-[11px] text-slate-400">{m.role}</p>
                <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-300">
                  {m.intro}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
