/**
 * 래빗홀컴퍼니 서류 보완용 페이지 데이터.
 * - 대화 로그: ChatGPT/Claude 공유 링크 또는 Notion/PDF 링크를 아래 배열에 추가하세요.
 * - 캡처: public 폴더에 이미지 넣고 `rabbitholeFigures`에 경로를 추가하세요.
 */

export const rabbitholeMeta = {
  applicantName: "김남해",
  submitToEmail: "ceo@rabbitholecompany.com",
  /** 공개 페이지 경로 (이메일 본문에 붙여넣기용) */
  pagePath: "/Namhae_Kim/rabbithole",
} as const;

/** AI 대화·산출물 공유 링크 (없으면 빈 배열 — 페이지에 안내 문구만 표시) */
export const rabbitholeChatLinks: { label: string; href: string }[] = [
  // 예: { label: "Cursor / Claude — Next 빌드·OG 폰트 이슈", href: "https://..." },
];

/** 보충 스크린샷 (public 기준 경로) */
export const rabbitholeFigures: { src: string; caption: string }[] = [
  // 예: { src: "/rabbithole/chat-export-01.png", caption: "대화 일부 캡처" },
];

/**
 * AI 도구로 실제로 해결한 문제 사례 (포트폴리오 사이트·제품 개발 과정).
 * 채용 공고의 ChatGPT/Claude 로그 제출 요건에 대응하는 서술용.
 */
export const rabbitholeAiCaseStudies: {
  title: string;
  toolContext: string;
  problem: string;
  approach: string;
  outcome: string;
}[] = [
  {
    title: "Next.js 프로덕션 빌드·모듈 해석 오류",
    toolContext: "Cursor IDE (Claude / GPT 기반 에이전트) — 의존성·빌드 로그 분석",
    problem:
      "`next` 바이너리 MODULE_NOT_FOUND, pnpm 환경에서 설치가 중단되는 경우가 있어 로컬·CI 재현이 어려웠습니다.",
    approach:
      "에이전트와 함께 `pnpm install` 플래그(CI 비대화형), lockfile, `node_modules` 상태를 단계적으로 점검하고, 재설치·스크립트 정리 순으로 좁혔습니다.",
    outcome:
      "클린 설치 후 `next build`가 안정적으로 통과하도록 맞추고, 이후 동일 환경에서 재발하지 않도록 패키지 스크립트를 고정했습니다.",
  },
  {
    title: "React 하이드레이션 불일치 (Navbar 등)",
    toolContext: "Cursor — 클라이언트 전용 렌더링 패턴 제안·적용",
    problem:
      "멤버 링크·테마 등에서 서버 HTML과 클라이언트 초기 렌더가 달라 하이드레이션 경고가 발생했습니다.",
    approach:
      "`mounted` 상태로 첫 페인트 이후에만 분기 표시하거나, `next/dynamic` + `ssr: false`로 차트·클라이 전용 위젯을 격리하는 방식을 적용했습니다.",
    outcome:
      "경고 제거 및 프로덕션에서 안정적인 초기 렌더링을 확보했습니다.",
  },
  {
    title: "동적 OG 이미지 한글·폰트 (ImageResponse)",
    toolContext: "Cursor — `@vercel/og`/satori 제약 조사",
    problem:
      "OG 이미지 생성 시 동적 폰트 다운로드 실패·글리프 fallback 경고가 있었고, woff2는 런타임에서 지원되지 않아 빌드가 깨졌습니다.",
    approach:
      "Pretendard otf를 CDN에서 로드해 `ImageResponse`의 `fonts` 옵션에 주입하고, async `renderOgImage`로 통일했습니다. 통계 칩의 특수문자는 폰트 커버리지에 맞게 숫자 라벨로 조정했습니다.",
    outcome:
      "프리렌더 단계 OG 라우트가 통과하고, 한글 타이틀이 일관되게 렌더됩니다.",
  },
  {
    title: "메타데이터·SEO·Lighthouse",
    toolContext: "Cursor — Next App Router metadata 규칙 정리",
    problem:
      "수동 `<head>` 사용으로 메타 설명 누락 등 Lighthouse SEO 점수가 낮게 나오는 상황이 있었습니다.",
    approach:
      "App Router `metadata` API로 이전하고, `next/script`로 외부 스크립트를 배치했습니다. 프로덕션 빌드 기준으로 Lighthouse를 재측정했습니다.",
    outcome:
      "SEO 항목을 정상화하고, 공유·검색에 필요한 메타를 일관되게 노출했습니다.",
  },
];

/** 제품 코드베이스 맥락 (공고에서 언급한 스택과의 연결) */
export const rabbitholeProductContext: string[] = [
  "팀 포트폴리오에 기재한 프로젝트 중 avis-tron4.0 등에서 Spring·JWT 기반 인증, XSS/CSRF를 고려한 토큰 저장 전략, Gemini API 연동 등을 다루었습니다.",
  "레거시·내부 도메인 프로젝트에서는 AWS S3 등 인프라 연동 경험이 있습니다. (이력서·프로젝트 상세 페이지 참고)",
];
