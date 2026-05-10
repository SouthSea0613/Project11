import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import MinyoungContentTabs from "@/components/MinyoungContentTabs";
import PrintButton from "@/components/PrintButton";
import ProfilePhotoViewer from "@/components/ProfilePhotoViewer";
import { breadcrumbLd, personLd } from "@/lib/jsonLd";
import { getMemberById, getProjectsByMember } from "@/lib/portfolioData";
import {
  minyoungContact,
  minyoungExternalLinks,
  minyoungGithubUrl,
  minyoungHeadline,
  minyoungImpactStats,
  minyoungPhoto,
  minyoungSkillCategories,
  minyoungSummary,
} from "@/lib/minyoungResume";
import { SITE_NAME } from "@/lib/siteConfig";

const member = getMemberById("minyoung");

const pageTitle = "김민영 | HaeYoungLab Team Portfolio";
const pageDesc = `${minyoungHeadline} — 의료 데이터 연동, 시스템 최적화, 운영 효율화 경험.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  keywords: [
    "김민영",
    "HaeYoungLab",
    "의료 IT",
    "MS-SQL",
    ".NET",
    "포트폴리오",
  ],
  alternates: { canonical: "/Minyoung_Kim" },
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: "/Minyoung_Kim",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDesc,
  },
};

export default function MinyoungKimPage() {
  const projects = getProjectsByMember("minyoung");
  const allKnownTech = Array.from(
    new Set(minyoungSkillCategories.flatMap((c) => c.items))
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6">
      <JsonLd
        id="ld-minyoung"
        data={[
          personLd({
            member,
            fallbackName: "김민영",
            path: "/Minyoung_Kim",
            imagePath: minyoungPhoto,
            description: `${minyoungHeadline} — ${minyoungSummary}`,
            email: minyoungContact.email,
            sameAs: [minyoungGithubUrl],
            jobTitle: "Backend / Full-stack Engineer",
            knowsAbout: allKnownTech,
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "김민영", path: "/Minyoung_Kim" },
          ]),
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        {/* ── Sticky Left Profile ── */}
        <aside className="lg:sticky lg:top-24 lg:self-start print:static">
          <div className="flex gap-4 sm:flex-col sm:gap-3">
            <div className="w-28 shrink-0 sm:w-full">
              <ProfilePhotoViewer
                src={minyoungPhoto}
                alt="김민영 프로필 사진"
              />
            </div>
            <div className="min-w-0 flex-1 sm:flex-none">
              <p className="text-[11px] font-semibold tracking-widest text-sky-500 uppercase">
                Team Member
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                {member?.name ?? "김민영"}
              </h1>
              <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                {member?.role}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <a
              href={`mailto:${minyoungContact.email}`}
              className="rounded-md bg-sky-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-sky-400"
            >
              이메일
            </a>
            <PrintButton documentTitle="김민영_HaeYoungLab_Portfolio" />
            <a
              href={minyoungGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="print-hide inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-medium text-foreground hover:bg-muted"
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
              href={`tel:${minyoungContact.phoneTel}`}
              className="rounded-md border px-3 py-1.5 font-medium text-foreground hover:bg-muted"
            >
              {minyoungContact.phoneDisplay}
            </a>
          </div>

          <div className="print-hide mt-4 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/Namhae_Kim"
              className="inline-flex items-center gap-1 rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-500 transition hover:bg-emerald-500/20"
            >
              김남해 →
            </Link>
            <Link
              href="/team-compare"
              className="inline-flex items-center gap-1 rounded-md border border-violet-400/40 bg-violet-500/10 px-2.5 py-1 font-medium text-violet-500 transition hover:bg-violet-500/20"
            >
              비교 보기
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase">
            HaeYoungLab · Team Member
          </p>
          <h2 className="sr-only">{member?.name ?? "김민영"} 포트폴리오</h2>
          <p className="mt-3 text-2xl font-bold leading-snug tracking-tight md:text-3xl">
            {minyoungHeadline}
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            {minyoungSummary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {minyoungImpactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border bg-card px-3 py-3"
              >
                <div className="text-xl font-bold tracking-tight text-sky-500 md:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground md:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <MinyoungContentTabs projects={projects} />

          <section className="print-hide mt-10 rounded-xl border bg-card p-5">
            <h2 className="text-lg font-semibold">외부 링크</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {minyoungExternalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="print-hide mt-10 flex items-center justify-between text-sm">
            <Link href="/" className="text-sky-500 underline-offset-4 hover:underline">
              ← 홈으로 돌아가기
            </Link>
            <a
              href={`mailto:${minyoungContact.email}`}
              className="text-sky-500 underline-offset-4 hover:underline"
            >
              {minyoungContact.email}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
