export type MemberId = "minyoung";

/** 갤러리 항목: 단순 경로(string)이거나 캡션이 있는 객체 */
export type GalleryEntry = string | { src: string; caption?: string };

export type GalleryItem = { src: string; caption?: string };

/** GalleryEntry[] 또는 string[] 어떤 형태든 일관된 객체 배열로 정규화 */
export function normalizeGallery(
  entries: GalleryEntry[] | undefined
): GalleryItem[] {
  if (!entries) return [];
  return entries.map((entry) =>
    typeof entry === "string" ? { src: entry } : entry
  );
}

export type PortfolioProject = {
  slug: string;
  title: string;
  period: string;
  thumbnail: string;
  /** 상세 페이지·탭 상단 히어로 이미지. 비우면 placeholder 표시. */
  heroImage?: string;
  /** 갤러리 슬롯. 비어있으면 placeholder 카드 노출. */
  gallery?: GalleryEntry[];
  /** 프로젝트 한 줄 역할 (탭 헤더용) */
  role?: string;
  stack: string[];
  summary: string;
  problem: string;
  solution: string[];
  outcome: string[];
  metrics: string[];
  members: MemberId[];
  links: {
    demo?: string;
    github?: string;
  };
};

export type TeamMemberProfile = {
  id: MemberId;
  name: string;
  role: string;
  intro: string;
  skills: string[];
  highlights: string[];
  profilePath: string;
};

/** 홈 히어로·소개 — 김민영 이력서 기반 */
export const haeyoungLabPitch = {
  tagline: "Backend · Full-stack Engineer",
  heroTitle: "김민영",
  heroSubtitle:
    "데이터 무결성과 운영 효율을 함께 설계하는 백엔드·풀스택 엔지니어",
  description:
    "의료 데이터 연동 환경에서 정합성과 안정성을 우선으로 시스템을 설계해 왔습니다. C# .NET·MS-SQL 실무와 PlanIT 아키텍처, 포트폴리오 플랫폼까지 — 설계부터 배포·운영까지 측정 가능한 결과로 증명합니다.",
};

/** About — 경력 서사 */
export const haeyoungLabAbout = {
  kicker: "About Me",
  heading: "어떤 엔지니어인가",
  paragraphs: [
    "9년가량 의료 IT 현장에서 데이터 연동·저장 프로시저·운영 화면을 설계·구현해 왔습니다. C# .NET과 MS-SQL 중심의 실무 위에 PlanIT 아키텍처, 팀 포트폴리오 플랫폼 등 제품 경험을 더했습니다.",
    "추상적인 계획보다 배포된 제품과 숫자로 결과를 남기는 일을 중시합니다. 데이터 정합성, 쿼리 성능, 운영 대응 속도처럼 현장에서 바로 체감되는 지표를 개선하는 데 집중합니다.",
  ],
  pillars: [
    {
      icon: "🎯",
      title: "비즈니스 → 기술",
      desc: "추상적 계획이 아니라 측정 가능한 결과로 옮깁니다",
    },
    {
      icon: "🛡️",
      title: "신뢰성 우선",
      desc: "데이터 무결성과 운영 안정을 비기능 요구로 다룹니다",
    },
    {
      icon: "🚀",
      title: "0 → 1 실행",
      desc: "기획·개발·배포·운영 풀사이클을 끝까지 책임집니다",
    },
  ],
} as const;

/** 연락·협업 정보 */
type ContactChannel = {
  label: string;
  href: string;
  primary?: boolean;
};

export const teamContact: {
  email: string;
  responseSla: string;
  channels: ContactChannel[];
  inquiryTypes: string[];
} = {
  email: "sms0751@naver.com",
  responseSla: "보통 24시간 이내 회신",
  channels: [
    { label: "이메일", href: "mailto:sms0751@naver.com", primary: true },
    { label: "Lab 사이트", href: "https://haeyounglab.com" },
    { label: "PlanIT 데모", href: "https://planit.haeyounglab.com" },
    { label: "GitHub", href: "https://github.com/alsdud0301" },
  ],
  inquiryTypes: [
    "백엔드·풀스택 채용 / 협업",
    "의료·운영 데이터 연동·최적화",
    "B2B SaaS 아키텍처·PoC",
  ],
};

export const teamMembers: TeamMemberProfile[] = [
  {
    id: "minyoung",
    name: "김민영",
    role: "백엔드·풀스택 엔지니어 · Backend / Full-stack",
    intro:
      "의료 데이터 연동 환경에서 데이터 무결성과 운영 효율을 중심으로 시스템을 설계·구현해 왔습니다. C# .NET, MS-SQL 기반 실무와 PlanIt 아키텍처 경험을 통해 신뢰성 높은 서비스를 지향합니다.",
    skills: [
      ".NET (C#)",
      "MS-SQL",
      "API Integration",
      "Query Tuning",
      "Next.js",
      "TypeScript",
      "Unity 6",
    ],
    highlights: [
      "카카오 케어챗 연동: 쿼리 구조 최적화로 응답 성능 30% 개선",
      "옵션 관리 구조화: 운영 대응 속도 50%+ 개선",
      "혈당 데이터 인터페이스: 다단계 검증으로 데이터 무결성 강화",
      "PlanIT 게이미피케이션: 방꾸미기 모듈 + Unity 6 점프게임 개발",
    ],
    profilePath: "/Minyoung_Kim",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "planit",
    title: "PlanIT",
    period: "2026.01 - 2026.04",
    role: "핵심 개발자 · 풀스택 아키텍처",
    thumbnail: "/projects/planit/planit-gallery-04.png",
    heroImage: "/projects/planit/planit-gallery-04.png",
    gallery: [
      { src: "/projects/planit/planit-hero.png", caption: "PlanIT — 메인 화면" },
      {
        src: "/projects/planit/planit-gallery-01.png",
        caption: "PlanIT — 제품 화면 1",
      },
      {
        src: "/projects/planit/planit-gallery-02.png",
        caption: "PlanIT — 제품 화면 2",
      },
      {
        src: "/projects/planit/planit-gallery-03.png",
        caption: "PlanIT — 제품 화면 3",
      },
      {
        src: "/projects/planit/planit-scrumbot-01.png",
        caption: "ChatOps 스크럼봇 — 작성 인터랙션",
      },
      {
        src: "/projects/planit/planit-scrumbot-02.png",
        caption: "ChatOps 스크럼봇 — 자동 리포트",
      },
      {
        src: "/projects/planit/planit-scrumbot-03.png",
        caption: "ChatOps 스크럼봇 — Slack/Discord 연동",
      },
      {
        src: "/projects/planit/planit-scrumbot-04.png",
        caption: "ChatOps 스크럼봇 — 잔디형 활동 시각화",
      },
      {
        src: "/projects/planit/planit-scrumbot-05.png",
        caption: "ChatOps 스크럼봇 — 진척도 인사이트",
      },
    ],
    stack: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Tailwind",
      "Chart.js / D3",
      "shadcn",
      "FastAPI",
      "LangChain",
      "Slack / Discord API",
      "Vector Embedding",
      "Vercel",
      "Railway",
      "Docker",
      "Redis",
    ],
    summary:
      "게임화와 벡터 분석을 결합한 차세대 소셜 스크럼 SaaS. 메신저 연동으로 작성 장벽을 낮추고, 활동 시각화와 인사이트로 동기부여를 강화합니다.",
    problem:
      "개인·팀의 계획과 회고가 도구마다 흩어지고, 스크럼 작성이 번거로워 지속 사용과 커뮤니티 피드백이 약해지는 문제가 있었습니다.",
    solution: [
      "데일리·위클리·먼슬리 스크럼 주기 자동화 및 Slack·Discord 연동으로 진입 장벽 최소화",
      "GitHub 잔디형 활동 시각화, 팔로잉·좋아요로 상호 동기부여·게임화",
      "스크럼 텍스트 Vector 임베딩으로 업무 성향·진척도 분석, 인터랙티브 차트로 인사이트 제공",
      "기업·팀 단위 유료 구독 모델과 자동 리포트로 불필요한 대면 회의 시간 30% 절감",
    ],
    outcome: [
      "핵심 사용자 경험(작성·피드·랭킹)을 제품 단위로 정리해 운영 가능한 형태로 구축",
      "배포 자동화(Vercel·Railway·Docker)로 신규 기능 배포 주기를 1분 내외로 단축",
    ],
    metrics: [
      "Slack·Discord 연동 스크럼 파이프라인",
      "Vector 기반 활동·진척 인사이트",
      "유료 구독·리포트 자동화 설계",
    ],
    members: ["minyoung"],
    links: {
      demo: "https://planit.haeyounglab.com/",
    },
  },
  {
    slug: "kakao-carechat-integration",
    title: "카카오 케어챗 병원 예약/진료 정보 연동",
    period: "2025.09 - 2026.02",
    role: "API 인터페이스 설계 · DB 프로시저 · 연동 테스트",
    thumbnail: "/projects/kakao-carechat-integration/kakao-carechat-workflow.png",
    heroImage: "/projects/kakao-carechat-integration/kakao-carechat-workflow.png",
    gallery: [
      {
        src: "/projects/kakao-carechat-integration/kakao-carechat-workflow.png",
        caption: "카카오 헬스케어 데이터 연동 워크플로우",
      },
    ],
    stack: ["C# WinForms", ".NET", "MS-SQL", "REST API", "JSON"],
    summary:
      "카카오 케어챗 플랫폼과 병원 시스템을 연결해 실시간 예약·대기·진료 정보 조회를 가능하게 한 연동 프로젝트.",
    problem:
      "파편화된 데이터 조회 구조와 증가하는 데이터량으로 응답 지연 및 시스템 부하 문제가 발생.",
    solution: [
      "다중 JOIN 기반 고성능 Stored Procedure 설계 및 쿼리 튜닝",
      "RESTful 기반 엔드포인트와 복합 데이터 매핑 로직 구현",
      "API 호출→DB 반영 End-to-End 데이터 흐름 검증 체계 구축",
    ],
    outcome: [
      "응답 성능 30% 이상 개선",
      "실시간 예약/진료 조회 기능 안정화",
      "연동 시스템 운영 안정성 강화",
    ],
    metrics: ["응답 성능 +30%", "E2E 연동 테스트 체계", "실시간 조회 안정화"],
    members: ["minyoung"],
    links: {},
  },
  {
    slug: "hospital-option-admin",
    title: "병원 옵션 설정/그룹화 관리 시스템",
    period: "2025.07 - 2025.08",
    role: "UI 개발 · 메타데이터 DB 설계",
    thumbnail: "/background.jpg",
    stack: ["C# WinForms", ".NET", "MS-SQL"],
    summary:
      "분산된 병원 옵션 설정을 그룹-리스트-상세 구조로 통합해 운영 효율을 높인 관리자 시스템.",
    problem:
      "프로젝트별로 흩어진 옵션 구조로 인해 설정 변경 시 위치 탐색 비용이 크고 운영 대응이 지연됨.",
    solution: [
      "3단계 계층형 옵션 관리 구조 설계",
      "관리자 직접 CRUD 가능한 통합 관리 화면 구현",
      "선 검증 후 저장 프로세스로 설정 충돌/중복 방지",
    ],
    outcome: [
      "운영 담당자 기준 유지보수 대응 속도 50%+ 개선",
      "숙련도와 무관한 직관적 설정 제어 환경 구축",
    ],
    metrics: ["대응 속도 +50% 이상", "계층형 옵션 구조", "충돌 방지 검증 프로세스"],
    members: ["minyoung"],
    links: {},
  },
  {
    slug: "glucose-device-interface",
    title: "혈당 기기 연동 및 데이터 관리 화면",
    period: "2026.01 - 2026.02",
    role: "풀스택 개발 · 데이터 연동 설계",
    thumbnail: "/projects/glucose-device-interface/glucose-device-photo.png",
    heroImage: "/projects/glucose-device-interface/glucose-device-photo.png",
    gallery: [
      {
        src: "/projects/glucose-device-interface/glucose-device-photo.png",
        caption: "병원 혈당 측정 기기 + 노트북 대시보드 실제 사용 환경",
      },
      {
        src: "/projects/glucose-device-interface/glucose-device-workflow.png",
        caption: "병원 혈당 기기 연동 흐름도 — 다단계 검증·시퀀스 충돌 방지",
      },
    ],
    stack: ["C# WinForms", ".NET", "MS-SQL"],
    summary:
      "외부 혈당 측정 기기와 병원 내부 DB를 실시간 인터페이스로 연결하고 데이터 검증/이관 운영 화면을 구축한 프로젝트.",
    problem:
      "중복 시퀀스 충돌과 수기 입력 오류로 데이터 누락·오염 가능성이 존재하는 의료 데이터 연동 환경.",
    solution: [
      "1차 유효성 검증 + 2차 시퀀스 충돌 방지의 다단계 검증 도입",
      "중간(Staging) 테이블 선저장 후 관리자 검토/이관 플로우 구현",
      "환자/기간 필터와 원클릭 이관 기능으로 운영 편의성 강화",
    ],
    outcome: [
      "데이터 정합성 향상 및 누락 최소화",
      "수동 입력 오류 감소와 운영 처리 시간 단축",
    ],
    metrics: ["다단계 검증 체계", "Staging 기반 이관", "실시간 데이터 정합성 강화"],
    members: ["minyoung"],
    links: {},
  },
  {
    slug: "team-portfolio-platform",
    title: "Portfolio Platform",
    period: "2026.04 - 진행 중",
    role: "정보 구조 설계 · 프론트엔드",
    thumbnail: "/projects/team-portfolio-platform/team-portfolio-home.png",
    heroImage: "/projects/team-portfolio-platform/team-portfolio-home.png",
    gallery: [
      {
        src: "/projects/team-portfolio-platform/team-portfolio-home.png",
        caption: "Team Portfolio — 홈 (임팩트·대표 프로젝트·기술 트리맵)",
      },
      {
        src: "/projects/team-portfolio-platform/team-portfolio-minyoung.png",
        caption: "Team Portfolio — 김민영 프로필 (한눈에 보기)",
      },
      {
        src: "/projects/team-portfolio-platform/team-portfolio-project-planit.png",
        caption: "Team Portfolio — 프로젝트 상세(PlanIT) 페이지",
      },
    ],
    stack: ["Next.js App Router", "TypeScript"],
    summary:
      "프로젝트와 경력을 구조적으로 보여주는 개인 포트폴리오 허브.",
    problem:
      "단일 프로젝트 소개만으로는 역량과 기여 범위를 한눈에 전달하기 어려웠습니다.",
    solution: [
      "프로젝트·프로필·상세 페이지를 연결하는 정보 구조 설계",
      "공통 데이터 소스로 홈·프로필·상세를 일관되게 렌더링",
      "검색·필터·기술 트리맵으로 탐색성 강화",
    ],
    outcome: [
      "랜딩에서 포트폴리오 허브로 전환 완료",
      "프로젝트 상세 라우트 기반 확장 가능한 구조 확보",
      "신규 프로젝트 추가 시 데이터만 추가하면 반영 가능",
    ],
    metrics: [
      "프로젝트 상세 페이지 자동 SSG 생성",
      "참여 프로젝트 자동 노출",
      "공통 데이터 소스로 유지보수 비용 절감",
    ],
    members: ["minyoung"],
    links: {},
  },
  {
    slug: "planit-jump-game",
    title: "PlanIT 미니게임 — 점프게임",
    period: "2026.02 - 2026.04",
    role: "Unity 클라이언트 개발 · 게임 시스템 설계",
    thumbnail: "/projects/planit-jump-game/jump-game-gameplay.png",
    heroImage: "/projects/planit-jump-game/jump-game-gameplay.png",
    gallery: [
      {
        src: "/projects/planit-jump-game/jump-game-gameplay.png",
        caption: "실제 플레이 — 무한 점프, 7m / Best 16m 점수 시스템",
      },
      {
        src: "/projects/planit-jump-game/jump-game-character-select.png",
        caption: "캐릭터 선택 + PhaseThroughAbility 어빌리티 코드",
      },
      {
        src: "/projects/planit-jump-game/jump-game-unity-editor.png",
        caption: "Unity 6 에디터 — Note20 Ultra 시뮬레이터 검증",
      },
    ],
    stack: ["Unity 6", "C#", "Mobile (Android/iOS)", "ScriptableObject"],
    summary:
      "PlanIT 안에서 즐길 수 있는 모바일 아케이드 점프게임. 캐릭터별 어빌리티와 끝없이 올라가는 플랫폼 구조로 사용자가 짧은 시간에 몰입할 수 있는 미니게임 경험을 제공합니다.",
    problem:
      "협업 SaaS 사용자가 짧은 휴식 시간에 자연스럽게 머물 수 있는 게이미피케이션 요소가 필요했고, 캐릭터·어빌리티 시스템을 확장 가능하게 설계해야 했습니다.",
    solution: [
      "캐릭터 선택 시스템과 PhaseThrough/Revive 등 어빌리티를 ScriptableObject 기반 데이터 드리븐 구조로 설계",
      "끝없이 올라가는 플랫폼 스포너·점프 물리·점수(현재/최고) UI 구현",
      "Unity 6 UIRoot/Managers 구조로 게임 상태(GameManager·PlatformSpawner) 모듈화",
      "모바일 시뮬레이터(Note20 Ultra) 기반으로 실제 디바이스 비율 검증",
    ],
    outcome: [
      "어빌리티/캐릭터 추가가 데이터 작성만으로 가능한 확장형 구조 확보",
      "PlanIT 본체와 분리된 클라이언트 빌드로 협업 SaaS의 게이미피케이션 컴포넌트 확보",
    ],
    metrics: [
      "데이터 드리븐 어빌리티 시스템",
      "확장 가능한 캐릭터 선택 구조",
      "모바일 세로 화면 최적화",
    ],
    members: ["minyoung"],
    links: {},
  },
  {
    slug: "planit-room-customize",
    title: "PlanIT 방꾸미기 (Room Customize)",
    period: "2026.02 - 2026.04",
    role: "프론트엔드 모듈 설계 · 게이미피케이션 UX",
    thumbnail: "/projects/planit/planit-gallery-04.png",
    heroImage: "/projects/planit/planit-gallery-04.png",
    gallery: [],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "Drag & Drop",
    ],
    summary:
      "PlanIT 사용자가 자신의 가상 공간을 자유롭게 꾸미며 머무는 시간을 늘리도록 설계한 게이미피케이션 모듈. 가구 배치·테마 변경·아이템 잠금 해제로 SaaS 사용 동기를 만듭니다.",
    problem:
      "협업 SaaS는 작성·확인 후 곧바로 이탈하는 패턴이 반복되어 재방문·체류 시간이 약했습니다. 가벼운 휴식·자기표현 장치 없이 ‘업무 도구’ 정체성에 머무르는 한계.",
    solution: [
      "사용자 개인 공간(룸)과 가구 카탈로그를 데이터 드리븐 구조로 설계해 신규 아이템을 데이터 추가만으로 확장",
      "드래그앤드롭 기반 배치 UI와 미리보기 그리드로 즉각적 인터랙션 피드백 제공",
      "스크럼 작성·연속 출석 등 행동 보상으로 가구·테마를 잠금 해제하는 게이미피케이션 루프 설계",
      "PlanIT 본체 라우트와 분리된 모듈 구조로 추후 점프게임처럼 독립 확장 가능",
    ],
    outcome: [
      "PlanIT 사용자가 작성 이외에 머무를 수 있는 1차 체류 장치 확보",
      "스크럼 보상 → 룸 커스터마이즈 → 재방문으로 이어지는 동기 루프 정립",
    ],
    metrics: [
      "데이터 드리븐 가구·테마 카탈로그",
      "행동 보상 기반 잠금 해제 시스템",
      "독립 확장 가능한 모듈 구조",
    ],
    members: ["minyoung"],
    links: {
      demo: "https://planit.haeyounglab.com/",
    },
  },
  {
    slug: "internal-dashboard",
    title: "Internal Dashboard",
    period: "2025.11 - 2026.02",
    thumbnail: "/background.jpg",
    stack: ["Next.js", "Recharts", "API Route"],
    summary:
      "팀 운영 지표를 한 화면에서 추적하는 내부 대시보드. 의사결정을 빠르게 만드는 목적의 도구.",
    problem:
      "지표가 여러 도구에 흩어져 있어 현황 파악에 시간이 오래 걸리고, 회의 전 데이터 정리에 과도한 비용이 들었습니다.",
    solution: [
      "핵심 KPI를 카드/차트 중심으로 통합 시각화",
      "자주 보는 기간 필터와 비교 뷰 제공",
      "운영 이슈 확인을 위한 로그/지표 확인 동선 단축",
    ],
    outcome: [
      "주요 지표 조회 동선을 단순화해 팀 공유 속도 개선",
      "정기 리뷰 미팅에서 동일 지표 기준으로 논의 가능",
      "지표 기반 우선순위 결정 프로세스 정착",
    ],
    metrics: [
      "핵심 KPI 카드/차트 통합 화면 제공",
      "기간 비교 뷰로 리포트 작성 시간 단축",
      "운영 회의 공통 지표 기준 확립",
    ],
    members: ["minyoung"],
    links: {},
  },
];

export function getMemberById(memberId: MemberId) {
  return teamMembers.find((member) => member.id === memberId);
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getProjectsByMember(memberId: MemberId) {
  return portfolioProjects.filter((project) => project.members.includes(memberId));
}
