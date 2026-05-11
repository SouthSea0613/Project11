import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PrintButton from "@/components/PrintButton";
import { ImageSlot } from "@/components/ImageSlot";
import { breadcrumbLd } from "@/lib/jsonLd";
import {
  rabbitholeAiCaseStudies,
  rabbitholeChatLinks,
  rabbitholeFigures,
  rabbitholeMeta,
  rabbitholeProductContext,
} from "@/lib/rabbitholeSubmission";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const title = "김남해 — 래빗홀컴퍼니 제출용 · AI 도구 활용 사례";
const description =
  "서류 전형 보완: AI(챗봇·코딩 에이전트)를 활용해 문제를 해결한 경험 및 대화·산출물 제출 안내.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE_URL}${rabbitholeMeta.pagePath}`,
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

      <header className="border-b border-border pb-8">
        <p className="text-[11px] font-semibold tracking-widest text-amber-600 uppercase">
          For Rabbithole Company
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          AI 도구 활용 사례 · 대화 로그 제출
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          지원자 <span className="font-semibold text-foreground">{rabbitholeMeta.applicantName}</span>
          {" · "}
          이메일 제출:{" "}
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
          래빗홀컴퍼니 서류 전형 안내에 따라,{" "}
          <strong>ChatGPT·Claude 등 AI로 문제를 해결한 경험</strong>과{" "}
          <strong>대화 로그 또는 산출물</strong>을 제출합니다. 본 페이지는 요약·URL 공유용이며,
          상세 로그는 아래 링크·첨부 또는 별도 메일 본문으로 함께 전달드립니다.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          공유 URL:{" "}
          <span className="font-mono text-foreground">{fullUrl}</span>
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">1. 사용한 AI 환경</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Cursor</strong> IDE — Claude / GPT 계열 모델을 사용한
            에이전트·채팅으로 코드 탐색, 패치 적용, 빌드 로그 해석, 타입 오류 수정을 병행했습니다.
          </li>
          <li>
            별도의 ChatGPT·Claude 웹 세션에서 아이디어 정리·문서 초안을 낸 경우, 해당{" "}
            <strong className="text-foreground">공유 링크</strong>를 아래 섹션에 추가합니다.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">2. 제품·보안 맥락 (JWT / 클라우드 / AI API)</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {rabbitholeProductContext.map((line) => (
            <li key={line} className="rounded-lg border bg-card px-4 py-3">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          상세 스택·역할은{" "}
          <Link href="/Namhae_Kim" className="text-emerald-600 underline-offset-4 hover:underline">
            김남해 프로필
          </Link>
          {" · "}
          <Link href="/projects" className="text-emerald-600 underline-offset-4 hover:underline">
            프로젝트 목록
          </Link>
          을 참고해 주세요.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">3. AI 협업으로 해결한 문제 (요약)</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          아래는 본 포트폴리오 웹앱(Next.js) 구축·운영 과정에서 에이전트와 함께 처리한 대표 사례입니다.
          세부 프롬프트·응답은 대화 로그 링크 또는 캡처로 제출합니다.
        </p>
        <ol className="mt-6 space-y-6">
          {rabbitholeAiCaseStudies.map((c, i) => (
            <li
              key={c.title}
              className="rounded-xl border bg-card p-5"
            >
              <p className="text-[10px] font-semibold tracking-widest text-emerald-600 uppercase">
                Case {i + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold text-foreground">{c.title}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-muted-foreground">
                    도구·맥락
                  </dt>
                  <dd className="mt-0.5 text-muted-foreground">{c.toolContext}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-muted-foreground">
                    문제
                  </dt>
                  <dd className="mt-0.5 text-muted-foreground">{c.problem}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-muted-foreground">
                    접근
                  </dt>
                  <dd className="mt-0.5 text-muted-foreground">{c.approach}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-muted-foreground">
                    결과
                  </dt>
                  <dd className="mt-0.5 font-medium text-foreground">{c.outcome}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">4. 대화 로그 · 산출물 링크</h2>
        {rabbitholeChatLinks.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
            <p>
              아직 공개 링크가 없습니다.{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                src/lib/rabbitholeSubmission.ts
              </code>
              의 <code className="rounded bg-muted px-1.5 py-0.5 text-xs">rabbitholeChatLinks</code> 배열에
              ChatGPT·Claude 공유 URL을 추가하거나, PDF/Notion 링크를 넣어 주세요.
            </p>
            <p className="mt-3">
              동시에{" "}
              <a
                href={`mailto:${rabbitholeMeta.submitToEmail}?subject=${encodeURIComponent("[김남해] AI 대화 로그 제출")}`}
                className="font-medium text-emerald-600 underline-offset-4 hover:underline"
              >
                메일로 첨부
              </a>
              해 주시면 됩니다.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {rabbitholeChatLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-emerald-600 underline-offset-4 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">5. 보충 이미지</h2>
        {rabbitholeFigures.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            캡처를{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">public/rabbithole/</code> 등에 두고{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">rabbitholeFigures</code>에 등록하면
            이 영역에 갤러리로 표시됩니다.
          </p>
        ) : (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2">
            {rabbitholeFigures.map((fig) => (
              <li key={fig.src} className="overflow-hidden rounded-xl border bg-card">
                <ImageSlot
                  src={fig.src}
                  alt={fig.caption}
                  aspect="aspect-video"
                  rounded="rounded-none"
                  label={fig.caption}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <p className="border-t px-3 py-2 text-xs text-muted-foreground">{fig.caption}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-14 border-t pt-8 text-center text-xs text-muted-foreground">
        본 페이지는 채용 서류 보완용으로 제작되었습니다. ({SITE_NAME})
      </footer>
    </main>
  );
}
