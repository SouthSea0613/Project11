import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NamhaeOtakuSection from "@/components/NamhaeOtakuSection";
import PrintButton from "@/components/PrintButton";
import ZoomableImage from "@/components/ImageLightbox";
import { breadcrumbLd } from "@/lib/jsonLd";
import {
  rabbitholeCases,
  rabbitholeMeta,
  rabbitholeProductContext,
} from "@/lib/rabbitholeSubmission";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const title = "김남해 — 래빗홀컴퍼니 제출용 · AI 도구 활용 사례";
const description =
  "서류 전형 보완: ChatGPT·Claude·Cursor를 활용해 PlanIT, 비트코인 시뮬레이터, 팀 포트폴리오에서 문제를 해결한 사례 모음.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}${rabbitholeMeta.pagePath}`,
  },
  openGraph: {
    title,
    description,
    url: rabbitholeMeta.pagePath,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "article",
  },
};

export default function RabbitholeSubmissionPage() {
  const fullUrl = `${SITE_URL.replace(/\/$/, "")}${rabbitholeMeta.pagePath}`;

  return (
    <main className="mx-auto max-w-3xl px-4 pt-28 pb-24 sm:px-6">
      <JsonLd
        id="ld-rabbithole-breadcrumb"
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "김남해", path: "/Namhae_Kim" },
            { name: "래빗홀 제출용", path: rabbitholeMeta.pagePath },
          ]),
        ]}
      />

      {/* ── Header ── */}
      <header className="border-b border-border pb-8">
        <p className="text-[11px] font-semibold tracking-widest text-amber-600 uppercase">
          For Rabbithole Company
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          AI 도구 활용 사례 · 대화 로그 제출
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          지원자{" "}
          <span className="font-semibold text-foreground">
            {rabbitholeMeta.applicantName}
          </span>
          {" · 이메일 제출: "}
          <a
            href={`mailto:${rabbitholeMeta.submitToEmail}`}
            className="font-medium text-emerald-600 underline-offset-4 hover:underline"
          >
            {rabbitholeMeta.submitToEmail}
          </a>
        </p>
        <div className="print-hide mt-4 flex flex-wrap items-center gap-2">
          <PrintButton documentTitle="김남해_Rabbithole_AI사례" />
          <Link
            href="/Namhae_Kim"
            className="rounded-md border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            ← 프로필로
          </Link>
        </div>
        <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm leading-relaxed text-foreground">
          래빗홀컴퍼니 서류 안내에 따라{" "}
          <strong>ChatGPT·Claude 등 AI로 문제를 해결한 경험</strong>과{" "}
          <strong>대화 로그·산출물</strong>을 제출합니다. 아래 사례들은 모두 본
          포트폴리오의 실제 프로젝트와 연결되어 있으며, 각 카드 하단의 링크에서
          최종 결과물을 확인할 수 있습니다.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          공유 URL:{" "}
          <span className="font-mono text-foreground">{fullUrl}</span>
        </p>
      </header>

      {/* ── 1. 사용한 AI 환경 ── */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">1. 사용한 AI 환경</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">ChatGPT · Claude</strong> —
            장문의 기획안·사양을 그대로 전달해 시스템 구조·우선순위·리스크를
            정리받는 용도. 본문 캡처(요청·응답)는 아래 케이스에 첨부.
          </li>
          <li>
            <strong className="text-foreground">Cursor IDE (Claude / GPT
            에이전트)</strong> — 실제 코드 베이스에서 탐색·패치·빌드 로그 해석을
            수행한 운영 도구.
          </li>
        </ul>
      </section>

      {/* ── 2. 제품·보안 맥락 ── */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">
          2. 제품·보안 맥락 (JWT / 클라우드 / AI API / Firebase)
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {rabbitholeProductContext.map((line) => (
            <li key={line} className="rounded-lg border bg-card px-4 py-3">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          상세 스택·역할은{" "}
          <Link
            href="/Namhae_Kim"
            className="text-emerald-600 underline-offset-4 hover:underline"
          >
            김남해 프로필
          </Link>
          {" · "}
          <Link
            href="/projects"
            className="text-emerald-600 underline-offset-4 hover:underline"
          >
            프로젝트 목록
          </Link>
          참고.
        </p>
      </section>

      {/* ── 3. 프로젝트별 AI 협업 사례 ── */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">
          3. AI 협업 사례 (프로젝트 연결)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          각 카드는 <strong className="text-foreground">직접 작성한 요청</strong>
          {" → "}
          <strong className="text-foreground">AI 응답 요약</strong>
          {" → "}
          <strong className="text-foreground">실제 제품 반영</strong>
          {" "}흐름으로 정리되어 있습니다. 캡처는 원본 대화의 핵심 화면입니다.
        </p>

        <ol className="mt-6 space-y-10">
          {rabbitholeCases.map((c, i) => (
            <li
              key={c.id}
              id={c.id}
              className="overflow-hidden rounded-2xl border bg-card"
            >
              {/* 카드 헤더 */}
              <div className="flex items-start justify-between gap-3 border-b bg-muted/30 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest text-emerald-600 uppercase">
                    Case {i + 1} · {c.kind}
                  </p>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    도구·맥락: {c.tool}
                  </p>
                </div>
                {c.linkedProject ? (
                  <Link
                    href={c.linkedProject.href}
                    className="shrink-0 rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 transition hover:bg-emerald-500/20"
                  >
                    {c.linkedProject.label}
                  </Link>
                ) : null}
              </div>

              {/* 본문 */}
              <div className="space-y-5 p-5">
                {/* 프롬프트 */}
                <div>
                  <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                    내가 작성한 요청
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    {c.prompt}
                  </p>
                </div>

                {/* 응답 bullet */}
                <div>
                  <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                    AI 응답 — 핵심
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                    {c.responseBullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-emerald-500"
                      >
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 결과 */}
                <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/5 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase text-emerald-700 dark:text-emerald-400">
                    실제 제품 반영
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    {c.outcome}
                  </p>
                </div>

                {/* 캡처 — 클릭 시 라이트박스 확대 (← → 로 케이스 내 이동) */}
                {c.figures.length > 0 ? (
                  <div>
                    <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                      대화 캡처{" "}
                      <span className="ml-1 text-[10px] font-normal normal-case text-muted-foreground/70">
                        (클릭하면 크게 보기)
                      </span>
                    </p>
                    <ul
                      className={`mt-2 grid gap-4 ${
                        c.figures.length > 1 ? "sm:grid-cols-2" : ""
                      }`}
                    >
                      {c.figures.map((fig) => (
                        <li
                          key={fig.src}
                          className="overflow-hidden rounded-lg border bg-background"
                        >
                          <ZoomableImage
                            src={fig.src}
                            alt={fig.caption}
                            aspect="aspect-[4/3]"
                            rounded="rounded-none"
                            label={fig.caption}
                            caption={fig.caption}
                            group={c.figures.map((f) => ({
                              src: f.src,
                              alt: f.caption,
                              caption: f.caption,
                            }))}
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                          <p className="border-t px-3 py-2 text-[11px] leading-snug text-muted-foreground">
                            {fig.caption}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* 원본 대화 링크 */}
                {c.chatLinks && c.chatLinks.length > 0 ? (
                  <div>
                    <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                      원본 대화
                    </p>
                    <ul className="mt-1 space-y-1 text-sm">
                      {c.chatLinks.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 underline-offset-4 hover:underline"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 4. 덕력 / 서브컬쳐 어필 ── */}
      <NamhaeOtakuSection
        className="mt-14"
        heading="4. 덕력 · 서브컬쳐 어필"
        subtitle="채용 공고의 작성 Tip(서브컬쳐 덕력 어필) 대응 영역입니다."
      />

      <footer className="mt-14 border-t pt-8 text-center text-xs text-muted-foreground">
        본 페이지는 채용 서류 보완용으로 제작되었습니다. ({SITE_NAME})
      </footer>
    </main>
  );
}
