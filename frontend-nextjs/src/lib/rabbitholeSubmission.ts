/**
 * 래빗홀컴퍼니 서류 보완용 페이지 데이터.
 *
 * 구조: 각 케이스는 "어떤 프로젝트의 어떤 문제를 AI와 함께 풀었는가" 단위.
 * - prompt: 직접 작성한 프롬프트(요약 또는 캡처 캡션)
 * - response: AI가 돌려준 핵심 결과(요약)
 * - figures: 대화·산출물 캡처 (public 기준 경로)
 * - linkedProject: 포트폴리오 사이트 내 연결 URL
 * - chatLinks: 원본 대화의 공개 공유 링크가 있다면 추가
 */

export type RabbitholeFigure = {
  src: string;
  caption: string;
};

export type RabbitholeCase = {
  id: string;
  /** 사례 제목 — "프로젝트 — 무엇을 풀었나" */
  title: string;
  /** 카드 우측 상단 태그 (예: 기획 · 구조 설계 · 디버깅) */
  kind: string;
  /** 사용 도구·맥락 */
  tool: string;
  /** 직접 작성한 프롬프트/요청 요약 */
  prompt: string;
  /** AI가 돌려준 결과 — 핵심 bullet */
  responseBullets: string[];
  /** 결과를 실제 제품에 어떻게 반영했는가 */
  outcome: string;
  /** 본 페이지에 임베드할 캡처 (없으면 빈 배열) */
  figures: RabbitholeFigure[];
  /** 포트폴리오 사이트 내 연결 페이지 */
  linkedProject?: {
    label: string;
    href: string;
  };
  /** 원본 대화 공유 링크 (있을 때만 표시) */
  chatLinks?: { label: string; href: string }[];
};

export const rabbitholeMeta = {
  applicantName: "김남해",
  submitToEmail: "ceo@rabbitholecompany.com",
  pagePath: "/Namhae_Kim/rabbithole",
} as const;

export const rabbitholeCases: RabbitholeCase[] = [
  {
    id: "planit-scrum-spec",
    title: "PlanIT — 스크럼 11가지 규칙을 제품 로드맵으로 전환",
    kind: "기획 · 시스템 설계",
    tool: "ChatGPT 대화 — 기획 초안 검증·구조화",
    prompt:
      "PlanIT 스크럼 SaaS의 11가지 운영 규칙(데일리·위클리·먼슬리 / 시작·종료 스크럼 / 사용자별 스케줄러 / 멀티 채널 연동 / 무료·유료 경계 / RGB 잔디 알고리즘 등)을 한 번에 정리해 전달하고, 개발 우선순위·핵심 로직 설계를 받았습니다.",
    responseBullets: [
      "데이터 계층 구조 — 데일리 → 위클리 → 먼슬리로 이어지는 시작/종료 스크럼 매트릭스 + RGB 잔디 알고리즘(To-do/Done/Next 비율로 색 조합) 제안",
      "사용자 맞춤 스케줄러는 일괄 Cron이 아니라 유저별 timezone·start/end_time으로 Redis + BullMQ 메시지 큐에 예약하는 구조 권고",
      "멀티 채널(웹·카톡·슬랙·디스코드)은 '채널 어댑터' 패턴으로 분리하고 백엔드 코어는 단일 NestJS 스키마로 통일",
      "수익 모델: 개인=Free(잔디·미니룸·소셜), 팀/기업=Paid(팀 잔디 대시보드·AI 요약 보고서·간트·OKR 연동)",
      "개발 우선순위 4단계 — ① 데이터 모델링(User/Scrum/Team) ② 메신저 봇·알림 엔진 ③ 잔디·시각화 ④ 게이미피케이션(포인트·미니룸)",
      "엔드 스크럼의 '내일 할 일'은 다음 날 시작 스크럼의 '오늘 할 일'로 자동 프리셋 → 유저 입력 공수 감소의 핵심 연결고리",
    ],
    outcome:
      "이 응답을 PlanIT 백엔드 스키마(데일리/위클리/먼슬리 Scrum 테이블), Slack·Discord 어댑터 분리, 잔디 시각화의 RGB 속성, 유료 플랜의 팀 대시보드/AI 리포트 항목으로 직접 반영했습니다.",
    figures: [
      {
        src: "/rabbithole/planit-rules-04.png",
        caption:
          "직접 작성한 PlanIT 11가지 운영 규칙(데일리/위클리/먼슬리, 사용자별 스케줄, 멀티 채널, 잔디 RGB, 무료·유료 경계 등).",
      },
    ],
    linkedProject: {
      label: "PlanIT 프로젝트 상세 →",
      href: "/projects/planit",
    },
  },
  {
    id: "bitcoin-sim-codebase",
    title: "비트코인 시뮬레이터 — 자연어 기획을 Unity 코드 구조로 분해",
    kind: "코드 구조 설계 · Unity",
    tool: "ChatGPT / Claude — 긴 자연어 기획 → 스크립트 트리·시스템 분리",
    prompt:
      "세로 모바일 UI·총 자산/입출금/대출·상환/강화 메뉴·코인 리스트·변동 그래프·틱(60초) 기반 가격 변동·코인 폐지·미리 큐잉된 가격 시퀀스·게임 오버 조건(대출 미상환 + 월세/식비 등 고정 지출) 등 전체 게임 사양을 한 번에 전달했습니다.",
    responseBullets: [
      "Scripts/ 루트를 Constants · GameBootstrapper · Data · Systems · UI 5개 레이어로 분리",
      "Data: CoinData/CoinPool/PlayerData/BankData/LivingCostData/UpgradeData — 게임 상태와 정적 설정 분리",
      "Systems: GameManager · CoinMarket · BankSystem · LivingCostSystem · UpgradeSystem — 틱·시장·은행·생활비·강화 로직 모듈화",
      "UI: UIManager · MainHUDPanel · CoinListPanel · CoinDetailPanel · LineGraph · DepositWithdrawPanel · LoanPanel · UpgradePanel · GameOverPanel · NotificationBanner",
      "가격 시퀀스를 5~10틱 미리 Queue에 적재 → '미리 아는 시스템' 같은 강화 능력에 재사용 가능",
    ],
    outcome:
      "제안된 폴더 구조를 그대로 채택해 비트코인 시뮬레이터 Unity 프로젝트의 Scripts/ 트리를 구성했고, 시장·은행·생활비·강화 시스템이 독립적으로 테스트 가능한 형태로 정리되었습니다.",
    figures: [
      {
        src: "/rabbithole/planit-spec-01.png",
        caption:
          "직접 작성한 게임 사양 — UI 레이아웃, 자산/입출금/대출/강화 흐름, 틱 기반 변동·폐지, 게임 오버 조건까지 일괄 전달.",
      },
      {
        src: "/rabbithole/bitcoin-structure-02.png",
        caption:
          "AI가 회신한 스크립트 구조 — Data/Systems/UI 레이어 분리. 그대로 프로젝트에 적용.",
      },
    ],
    linkedProject: {
      label: "비트코인 시뮬레이터 상세 →",
      href: "/detail/game/bitcoin-simulator",
    },
    chatLinks: [
      {
        label: "Claude 대화 원본 — Unity 비트코인 시뮬레이터 구조 설계",
        href: "https://claude.ai/share/38d96db4-4af9-4adf-9c22-ea8ab9db025f",
      },
    ],
  },
  {
    id: "unity-codedriven-refactor",
    title: "Unity 프로젝트 — code-driven 100% 구성을 Hierarchy로 분리",
    kind: "리팩터링 분석",
    tool: "ChatGPT / Claude — 협업 친화적 구조로 재배치할 후보 선정",
    prompt:
      "기존 Unity 프로젝트가 전부 code-driven으로 구성되어 있어 UI/UX·디자인 수정이 어려운 문제를 공유하고, 'code-driven에서 분리해 Hierarchy로 옮기면 좋을 항목' 리스트업을 요청했습니다.",
    responseBullets: [
      "UI/UX 협업 비용이 큰 영역(레이아웃 프리팹·텍스트·이미지·앵커)을 우선 Hierarchy로 분리",
      "데이터 변경 빈도가 높지만 로직과 결합도가 낮은 객체(코인 카드, 패널 위젯)부터 단계적 추출",
      "code-driven으로 남길 영역(틱·시장 계산·세이브 매니저 등)과 Hierarchy로 옮길 영역의 경계 정의",
    ],
    outcome:
      "이후 리팩터링에서 UI 프리팹/Inspector 노출 항목을 분리하는 기준점으로 사용했습니다.",
    figures: [
      {
        src: "/rabbithole/unity-codedriven-03.png",
        caption:
          "직접 작성한 리팩터링 요청 — 100% code-driven의 문제와, Hierarchy로 옮길 후보 리스트업 요구.",
      },
    ],
    linkedProject: {
      label: "비트코인 시뮬레이터 상세 →",
      href: "/detail/game/bitcoin-simulator",
    },
    chatLinks: [
      {
        label: "Claude 대화 원본 — 동일 Unity 프로젝트 (이어진 대화)",
        href: "https://claude.ai/share/38d96db4-4af9-4adf-9c22-ea8ab9db025f",
      },
    ],
  },
  {
    id: "portfolio-build-ops",
    title: "팀 포트폴리오 — Next.js 빌드·OG 폰트·SEO 안정화",
    kind: "Web · 운영",
    tool: "Cursor (Claude / GPT 에이전트) — 코드 탐색·패치·빌드 로그 분석",
    prompt:
      "Next.js 15(App Router) 기반 팀 포트폴리오에서 발생한 ① 모듈 해석/설치 이슈, ② 하이드레이션 불일치(Navbar·차트), ③ 동적 OG 이미지의 한글 폰트 다운로드 실패, ④ Lighthouse SEO 점수 저하 등을 단계적으로 해결.",
    responseBullets: [
      "OG 이미지: Pretendard otf를 CDN에서 로드해 ImageResponse의 fonts 옵션에 주입, 한글 글리프 정상 렌더",
      "하이드레이션: Navbar는 mounted 분기, 차트는 next/dynamic + ssr:false로 격리",
      "SEO: 수동 <head> 제거 → App Router metadata API + next/script로 일원화 → 프로덕션 Lighthouse SEO 정상화",
      "메트릭 데이터 모델: numeric/qualitative 분류 유틸 도입으로 카드 위계 통일",
    ],
    outcome:
      "프로덕션 빌드 안정화(49+ 페이지 정적 생성), Lighthouse SEO/접근성 점수 개선, OG 이미지 한글 폰트 경고 제거.",
    figures: [],
    linkedProject: {
      label: "팀 포트폴리오 보기 →",
      href: "/",
    },
  },
];

/** 채용 공고에서 언급한 키워드(JWT/Firebase/AWS)와의 연결 — 본문 보조 */
export const rabbitholeProductContext: string[] = [
  "JWT 인증·XSS/CSRF 대응 토큰 저장 전략, Spring·Gemini API 연동: avis-tron4.0 프로젝트에서 다뤘습니다.",
  "AWS S3 등 인프라 연동 경험: 레거시·내부 도메인 프로젝트(이력서·프로젝트 상세 참고).",
  "Firebase Auth(Google Sign-In)·Firestore 랭킹 시스템: 기존 라이브 서비스 프로젝트에서 적용 사례 보유.",
];

/** 서브컬쳐 '덕력' 어필 — 김남해 메인 프로필과 동일 데이터 재사용 */
export { namhaeOtaku as rabbitholeOtaku } from "@/lib/namhaeOtaku";
