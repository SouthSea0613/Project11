/**
 * 공용 OG 이미지(1200x630) 디자인.
 * 각 라우트의 `opengraph-image.tsx`에서 호출합니다.
 * `next/og`의 ImageResponse는 inline style만 지원하므로 Tailwind 사용 불가.
 */

import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

const ACCENTS = {
  emerald: { fg: "#34d399", glow: "rgba(52,211,153,0.30)" },
  sky: { fg: "#38bdf8", glow: "rgba(56,189,248,0.30)" },
  violet: { fg: "#a78bfa", glow: "rgba(167,139,250,0.30)" },
  amber: { fg: "#fbbf24", glow: "rgba(251,191,36,0.30)" },
} as const;

export type OgAccent = keyof typeof ACCENTS;

export type OgStat = { value: string; label: string };

export type OgPayload = {
  /** 우상단의 작은 키커 텍스트 (예: "TEAM PORTFOLIO") */
  kicker: string;
  /** 메인 타이틀 (한 줄, 한국어 OK) */
  title: string;
  /** 보조 헤드라인 */
  subtitle?: string;
  /** 우측 하단의 부가 라인 (예: "김남해 · 김민영") */
  footer?: string;
  /** 좌측 통계 카드 0~4개 */
  stats?: OgStat[];
  /** 강조 색 톤 */
  accent?: OgAccent;
  /** 우상단 사이트명 */
  brand?: string;
};

/**
 * OG 이미지 React 트리. 1200x630 / dark 그라데이션 / 좌측 통계 + 우측 텍스트.
 */
function OgImageTree({
  kicker,
  title,
  subtitle,
  footer,
  stats = [],
  accent = "emerald",
  brand = "HaeYoungLab",
}: OgPayload) {
  const a = ACCENTS[accent];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background:
          "linear-gradient(135deg, #040916 0%, #0b1532 50%, #0a1d3a 100%)",
        color: "#e2e8f0",
        fontFamily: '"Pretendard", "Inter", system-ui, sans-serif',
        padding: 64,
      }}
    >
      {/* 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 600,
          height: 600,
          borderRadius: 9999,
          background: `radial-gradient(circle at center, ${a.glow}, transparent 70%)`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 520,
          height: 520,
          borderRadius: 9999,
          background:
            "radial-gradient(circle at center, rgba(56,189,248,0.18), transparent 70%)",
          display: "flex",
        }}
      />

      {/* 상단 — 키커 + 브랜드 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 6,
            color: a.fg,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: a.fg,
              boxShadow: `0 0 28px ${a.fg}`,
              display: "flex",
            }}
          />
          {kicker}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            letterSpacing: 1,
            fontWeight: 600,
            display: "flex",
          }}
        >
          {brand}
        </div>
      </div>

      {/* 본문 — 타이틀 + 서브타이틀 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 84,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: -2,
            color: "#f8fafc",
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 1080,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#cbd5e1",
              fontWeight: 500,
              maxWidth: 1080,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {subtitle}
          </div>
        ) : null}

        {stats.length > 0 ? (
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            {stats.slice(0, 4).map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "16px 20px",
                  borderRadius: 16,
                  border: "1px solid rgba(148,163,184,0.25)",
                  background: "rgba(15,23,42,0.55)",
                  minWidth: 200,
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: a.fg,
                    letterSpacing: -1,
                    display: "flex",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: "#94a3b8",
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* 하단 — 푸터 라인 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          fontSize: 24,
          color: "#94a3b8",
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex" }}>
          {footer ?? "team.haeyounglab.com"}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: a.fg,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 36,
              height: 2,
              background: a.fg,
              display: "flex",
            }}
          />
          haeyounglab.com
        </div>
      </div>
    </div>
  );
}

/**
 * Pretendard 한글 폰트(otf) 로드.
 * `@vercel/og`(satori)는 ttf/otf만 지원합니다.
 * jsDelivr CDN의 라이선스 OK 한글 폰트 — `Failed to download dynamic font`
 * 경고를 없애고 한글 글리프가 정상 렌더되도록 합니다.
 */
const FONT_URL =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf";
const FONT_URL_REGULAR =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Medium.otf";

let cached: { bold: ArrayBuffer; medium: ArrayBuffer } | null = null;

async function loadFonts() {
  if (cached) return cached;
  try {
    const [bold, medium] = await Promise.all([
      fetch(FONT_URL).then((r) => (r.ok ? r.arrayBuffer() : null)),
      fetch(FONT_URL_REGULAR).then((r) => (r.ok ? r.arrayBuffer() : null)),
    ]);
    if (!bold || !medium) return null;
    cached = { bold, medium };
    return cached;
  } catch {
    return null;
  }
}

export async function renderOgImage(payload: OgPayload) {
  const fonts = await loadFonts();
  return new ImageResponse(<OgImageTree {...payload} />, {
    ...OG_SIZE,
    fonts: fonts
      ? [
          {
            name: "Pretendard",
            data: fonts.medium,
            weight: 500,
            style: "normal",
          },
          {
            name: "Pretendard",
            data: fonts.bold,
            weight: 700,
            style: "normal",
          },
        ]
      : undefined,
  });
}
