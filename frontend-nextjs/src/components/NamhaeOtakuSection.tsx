import { Fragment } from "react";
import { namhaeOtaku } from "@/lib/namhaeOtaku";

/**
 * 텍스트 내 **...** 구간을 보라톤 하이라이트로 렌더링.
 * 데이터 레이어에서는 단순 문자열로 두고, 표시 시에만 강조를 적용합니다.
 */
function Emphasized({ text, tone = "violet" }: { text: string; tone?: "violet" | "emerald" }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const cls =
    tone === "emerald"
      ? "rounded bg-emerald-500/15 px-1 font-semibold text-emerald-700 dark:text-emerald-200"
      : "rounded bg-violet-500/15 px-1 font-semibold text-violet-700 dark:text-violet-200";
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <mark key={i} className={cls}>
            {p.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

type Props = {
  /** 섹션 제목 (페이지 컨텍스트에 맞춰 조절). 비우면 헤더 영역 자체를 숨김 */
  heading?: string;
  /** 헤딩 위 키커 텍스트 */
  kicker?: string;
  /** 헤딩 아래 보조 설명 */
  subtitle?: string;
  /** 외부 여백 조절을 위한 className */
  className?: string;
};

/**
 * 김남해 서브컬쳐 '덕력' 어필 섹션 (FFXIV·고전 문학).
 * 김남해 프로필 취향 탭과 래빗홀 제출 페이지(비공개 URL)에서 동일 데이터를 공유합니다.
 */
export default function NamhaeOtakuSection({
  heading = "취향 · 몰입의 깊이",
  kicker,
  subtitle,
  className = "",
}: Props) {
  const showHeader = heading || kicker || subtitle;
  return (
    <section className={className}>
      {showHeader ? (
        <div className="flex items-baseline justify-between gap-3">
          <div>
            {kicker ? (
              <p className="text-[11px] font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-300">
                {kicker}
              </p>
            ) : null}
            {heading ? (
              <h2 className="mt-0.5 text-lg font-semibold">{heading}</h2>
            ) : null}
            {subtitle ? (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        className={`${
          showHeader ? "mt-5" : ""
        } overflow-hidden rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/10 via-background to-background`}
      >
        {/* 레벨 헤더 */}
        <div className="flex flex-wrap items-baseline gap-3 border-b border-violet-400/20 bg-violet-500/10 px-5 py-4">
          <span className="rounded-md border border-violet-400/50 bg-violet-500/20 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-violet-700 dark:text-violet-300">
            {namhaeOtaku.level}
          </span>
          <span className="text-base font-semibold text-foreground">
            {namhaeOtaku.type}
          </span>
          <span className="ml-auto text-[10px] font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-300">
            몰입 레벨 · 깊이
          </span>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-foreground">
            <Emphasized text={namhaeOtaku.intro} />
          </p>

          <ol className="mt-6 space-y-5">
            {namhaeOtaku.pillars.map((p, i) => (
              <li key={p.title} className="rounded-xl border bg-card p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-violet-400/40 bg-violet-500/10 text-lg">
                    {p.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-300">
                      Pillar {i + 1}
                    </p>
                    <h3 className="mt-0.5 text-base font-semibold leading-snug text-foreground">
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* 캐릭터 메타 */}
                {p.meta && p.meta.length > 0 ? (
                  <dl className="mt-4 grid gap-2 rounded-lg border bg-muted/30 p-3 text-xs sm:grid-cols-2">
                    {p.meta.map((m) => (
                      <div key={m.label} className="flex gap-2">
                        <dt className="shrink-0 font-semibold tracking-wide text-muted-foreground">
                          {m.label}
                        </dt>
                        <dd className="min-w-0 font-medium text-foreground">
                          <Emphasized text={m.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase text-muted-foreground">
                      집착의 깊이
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-foreground">
                      <Emphasized text={p.depth} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase text-muted-foreground">
                      사유
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-muted-foreground">
                      <Emphasized text={p.reason} />
                    </dd>
                  </div>

                  {p.lists
                    ? p.lists.map((list) => (
                        <div key={list.label}>
                          <dt className="text-[11px] font-semibold uppercase text-muted-foreground">
                            {list.label}
                          </dt>
                          <dd className="mt-2 flex flex-wrap gap-1.5">
                            {list.items.map((it) => (
                              <span
                                key={it}
                                className="inline-flex rounded-md border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-700 dark:text-violet-300"
                              >
                                {it}
                              </span>
                            ))}
                          </dd>
                        </div>
                      ))
                    : null}
                </dl>

                {/* 역할 풀사이클 (공대장 책임 등) */}
                {p.roleBlock ? (
                  <div className="mt-5 rounded-xl border border-violet-400/30 bg-violet-500/5 p-4">
                    <p className="text-sm font-semibold text-foreground">
                      {p.roleBlock.title}
                    </p>
                    {p.roleBlock.subtitle ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {p.roleBlock.subtitle}
                      </p>
                    ) : null}
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {p.roleBlock.items.map((it) => (
                        <li
                          key={it.label}
                          className="flex items-start gap-2.5 rounded-lg border bg-card px-3 py-2"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-violet-400/30 bg-violet-500/10 text-sm"
                          >
                            {it.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold tracking-wide text-violet-700 dark:text-violet-300">
                              {it.label}
                            </p>
                            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                              <Emphasized text={it.text} />
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {p.roleBlock.bridge ? (
                      <p className="mt-3 rounded-md border border-emerald-400/40 bg-emerald-500/5 px-3 py-2 text-xs leading-relaxed text-foreground">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                          개발 업무 매핑 →
                        </span>{" "}
                        <Emphasized text={p.roleBlock.bridge} tone="emerald" />
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* 외부 증빙 링크 */}
                {p.links && p.links.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                      증빙 링크
                    </p>
                    <ul className="space-y-1.5">
                      {p.links.map((l) => (
                        <li key={l.href} className="text-sm leading-snug">
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-violet-600 underline-offset-4 hover:underline dark:text-violet-300"
                          >
                            {l.label}
                            <span aria-hidden="true" className="text-[10px] opacity-70">↗</span>
                          </a>
                          {l.note ? (
                            <span className="ml-2 text-xs text-muted-foreground">
                              — {l.note}
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <p className="mt-6 rounded-lg border border-violet-400/30 bg-violet-500/5 px-4 py-3 text-sm leading-relaxed text-foreground">
            <Emphasized text={namhaeOtaku.closing} />
          </p>
        </div>
      </div>
    </section>
  );
}
