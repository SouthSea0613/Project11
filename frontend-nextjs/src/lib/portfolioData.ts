export type MemberId = "namhae" | "minyoung";

export type PortfolioProject = {
  slug: string;
  title: string;
  period: string;
  thumbnail: string;
  /** 상세 페이지·탭 상단 히어로 이미지. 비우면 placeholder 표시. */
  heroImage?: string;
  /** 갤러리 슬롯. 비어있으면 placeholder 카드 노출. */
  gallery?: string[];
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

/** 홈 히어로·팀 소개 — 자기소개서 기반 HaeYoungLab 톤 */
export const haeyoungLabPitch = {
  tagline: "HaeYoungLab Team",
  heroTitle: "리스크를 줄이고, 제품으로 증명하는 팀",
  heroSubtitle: "김남해 · 김민영",
  description:
    "HaeYoungLab은 B2B SaaS와 실험적 웹 제품을 통해 기업의 재무·운영 리스크를 기술로 줄이는 것을 목표로 합니다. 공개 스크럼·협업 데이터·세무 증빙 자동화처럼 실제 비즈니스 임팩트가 있는 영역에서 0→1 제품을 만들고, 팀 포트폴리오로 과정과 결과를 투명하게 공유합니다.",
};

export const teamMembers: TeamMemberProfile[] = [
  {
    id: "namhae",
    name: "김남해",
    role: "백엔드·풀스택 엔지니어 · Backend / Full-stack",
    intro:
      "백엔드/서버 개발 중심으로 1년 4개월 실무를 수행했으며, 노바소프트 엔터프라이즈 보안 시스템과 HaeYoungLab의 PlanIt·R&D 오토노트를 통해 비즈니스 문제를 기술로 치환하는 경험을 쌓았습니다.",
    skills: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "FastAPI",
      "LangChain / RAG",
      "PostgreSQL",
      "Docker / CI·CD",
      "Slack·Notion·Discord 연동",
    ],
    highlights: [
      "PlanIt: Start-End 스크럼·ChatOps 워크플로·게임화 UX 설계",
      "R&D 오토노트: RAG 전처리·SHA-256 무결성, 토큰 비용 약 60% 절감",
      "avis-tron 4.0: SIEM 4단계 결재·DB-to-DB 실시간 동기화·IIS 이중화",
    ],
    profilePath: "/Namhae_Kim",
  },
  {
    id: "minyoung",
    name: "김민영",
    role: "Backend / Infra",
    intro:
      "안정적인 서비스 운영을 위한 서버 구조와 데이터 흐름을 설계하고, 운영 자동화를 구축합니다.",
    skills: ["Node.js", "API Design", "Infra", "Monitoring"],
    highlights: [
      "API/데이터 흐름 설계 및 성능 개선",
      "배포/운영 자동화 파이프라인 구축",
      "운영 이슈 분석 및 재발 방지 체계화",
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
    thumbnail: "/background.jpg",
    heroImage: "/projects/planit/hero.jpg",
    gallery: [
      "/projects/planit/g1.jpg",
      "/projects/planit/g2.jpg",
      "/projects/planit/g3.jpg",
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
    members: ["namhae"],
    links: {
      demo: "https://planit.haeyounglab.com/",
    },
  },
  {
    slug: "rd-autonote",
    title: "R&D 오토노트",
    period: "2026.01 - 2026.04",
    role: "파운더 · 리드 프로덕트 엔지니어",
    thumbnail: "/background.jpg",
    heroImage: "/projects/rd-autonote/hero.jpg",
    gallery: [
      "/projects/rd-autonote/g1.jpg",
      "/projects/rd-autonote/g2.jpg",
      "/projects/rd-autonote/g3.jpg",
    ],
    stack: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "pgvector",
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "FastAPI",
      "LangChain",
      "RAG",
      "Slack",
      "Notion",
      "Discord SDK",
      "Gemini API",
      "SHA-256 무결성",
      "Docker",
      "Redis",
    ],
    summary:
      "비침습형 협업 데이터 기반 세무 증빙 자동화 SaaS. 파편화된 협업 로그를 수집·정제해 연구노트로 연결하고, 감사 대응에 필요한 기술적 방어권을 확보합니다.",
    problem:
      "연구·개발 활동 증빙이 수기·이종 툴에 흩어져 있고, LLM만으로 생성하면 비용과 부정확성·감사 신뢰성 이슈가 동시에 발생합니다.",
    solution: [
      "Vector Embedding·시멘틱 유사도로 국세청 R&D 가이드라인에 맞지 않는 일상 대화 1차 필터링",
      "유효 R&D 데이터만 LLM 컨텍스트로 주입하는 RAG로 정확도 향상 및 API 토큰 비용 약 60% 절감",
      "Slack·Notion·Discord Webhook/API 통합으로 연구원 추가 작업 없이 실시간 원천 로그 수집",
      "생성 연구노트와 원천 데이터 매칭에 SHA-256 해시 박제로 사후 검증 시 조작 방어",
    ],
    outcome: [
      "제조·바이오 기업 50건 콜드 아웃리치로 세무 리스크 페인 포인트 도출 후 MVP 기획·풀스택 주도",
      "Git-Push 기반 무중단 자동 배포로 인프라 관리 공수 최소화",
    ],
    metrics: [
      "토큰 비용 약 60% 절감(RAG·전처리)",
      "이종 협업 툴 실시간 로그 파이프라인",
      "SHA-256 기반 무결성 검증",
    ],
    members: ["namhae"],
    links: {
      demo: "https://www.haeyounglab.com",
    },
  },
  {
    slug: "pet-health-llm",
    title: "반려동물 변 분석·건강 자가진단 웹앱",
    period: "2026.01 - 2026.02",
    role: "리드 아키텍트 · 풀스택",
    thumbnail: "/background.jpg",
    heroImage: "/projects/pet-health-llm/hero.jpg",
    gallery: [
      "/projects/pet-health-llm/g1.jpg",
      "/projects/pet-health-llm/g2.jpg",
      "/projects/pet-health-llm/g3.jpg",
    ],
    stack: ["Java", "Spring Boot", "JPA", "PostgreSQL", "Next.js", "TypeScript", "Tailwind", "JWT", "Gemini API"],
    summary:
      "개·고양이 변 상태 데이터를 분석해 질병 가능성을 추론하고, 병원 방문 필요성을 제안하는 LLM 연동 웹앱.",
    problem:
      "반려 가구가 초기 증상을 놓치기 쉽고, 비용·심리 부담을 줄이려면 가벼운 자가진단과 명확한 다음 행동 제안이 필요했습니다.",
    solution: [
      "LLM API 연동 파이프라인으로 분석·추론·안내 문구 생성",
      "도메인 중심 조립형 아키텍처와 컴포넌트 기반 UI로 확장·유지보수성 확보",
      "JWT Dual Token과 XSS/CSRF 대응 토큰 저장 전략",
    ],
    outcome: [
      "기능 모듈 분리·조합으로 비즈니스 로직 명확화",
      "조기 발견 유도로 사고 예방·가구 부담 경감 방향 설계",
    ],
    metrics: ["LLM 파이프라인 1차 완성", "Dual Token 인증 체계", "도메인 조립형 아키텍처"],
    members: ["namhae"],
    links: {},
  },
  {
    slug: "avis-tron-paradise",
    title: "avis-tron 4.0 — 파라다이스 그룹 전사 보안 통합 감시",
    period: "2025.06 - 재직중",
    role: "백엔드/서버개발 · 솔루션사업부 팀원",
    thumbnail: "/background.jpg",
    heroImage: "/projects/avis-tron-paradise/hero.jpg",
    gallery: [
      "/projects/avis-tron-paradise/g1.jpg",
      "/projects/avis-tron-paradise/g2.jpg",
      "/projects/avis-tron-paradise/g3.jpg",
    ],
    stack: [".NET (C#)", "JavaScript", "IIS", "MSSQL", "SIEM", "SVN"],
    summary:
      "주식회사 노바소프트에서 SIEM 연동 전사 보안 통합 감시체계 구축. 승인·동기화·이중화·대시보드까지 풀스택으로 참여했습니다.",
    problem:
      "보안 검측 데이터와 인사·운영 시스템이 분리되어 소명·동기화·가시성 확보에 시간이 많이 들었습니다.",
    solution: [
      "SIEM 데이터 연동 기반 4단계 결재·소명 시스템 구축",
      "파라다이스 그룹 인사 DB와 Real-time DB-to-DB 연동으로 전사 인적 정보 자동 동기화",
      "IIS 웹 서버 이중화(VIP) 및 SVN 형상관리로 서비스 연속성 확보",
      "임원·운영 조직용 통합 관측 대시보드로 보안 지표 가시화",
    ],
    outcome: [
      "보안 사고 대응 프로세스 체계화",
      "전 부서 협의 주도 및 기술 운영 매뉴얼 배포로 관리 효율 개선",
    ],
    metrics: ["3단계 소명 워크플로", "Real-time DB-to-DB", "IIS 이중화·통합 대시보드"],
    members: ["namhae"],
    links: {},
  },
  {
    slug: "interior-matching-platform",
    title: "인테리어 전문가 매칭·견적 자동화 플랫폼",
    period: "2025.02 - 2025.03",
    role: "팀장 · 풀스택 시스템 설계",
    thumbnail: "/background.jpg",
    heroImage: "/projects/interior-matching-platform/hero.jpg",
    gallery: [
      "/projects/interior-matching-platform/g1.jpg",
      "/projects/interior-matching-platform/g2.jpg",
      "/projects/interior-matching-platform/g3.jpg",
    ],
    stack: ["Spring Boot", "Thymeleaf", "MySQL", "jQuery", "AWS S3", "Git"],
    summary:
      "인천일보아카데미에서 예산·스타일·지역 기반 전문가 매칭과 견적 프로세스 표준화를 담당했습니다.",
    problem:
      "사용자 요구와 전문가 데이터가 체계적으로 연결되지 않아 매칭·견적에 시간이 오래 걸렸습니다.",
    solution: [
      "필터링 기반 매칭 엔진으로 최적 업체 추천",
      "단계별 견적 폼으로 전문가에게 표준화된 견적 데이터 제공",
      "거래 기반 리뷰·실시간 포트폴리오 대시보드",
    ],
    outcome: [
      "향후 결제·정산 연동을 고려한 트랜잭션·확장성 설계",
    ],
    metrics: ["매칭 엔진·표준 견적 흐름", "팀장 역할로 메인 비즈니스 로직 주도"],
    members: ["namhae"],
    links: {},
  },
  {
    slug: "team-portfolio-platform",
    title: "Team Portfolio Platform",
    period: "2026.04 - 진행 중",
    role: "정보 구조 설계 · 프론트엔드",
    thumbnail: "/background.jpg",
    heroImage: "/projects/team-portfolio-platform/hero.jpg",
    gallery: [
      "/projects/team-portfolio-platform/g1.jpg",
      "/projects/team-portfolio-platform/g2.jpg",
      "/projects/team-portfolio-platform/g3.jpg",
    ],
    stack: ["Next.js App Router", "TypeScript"],
    summary:
      "팀과 개인의 프로젝트 결과물을 구조적으로 보여주는 포트폴리오 허브.",
    problem:
      "단일 프로젝트 소개 중심 구조로는 팀 전체 역량과 멤버별 기여를 전달하기 어려웠습니다.",
    solution: [
      "프로젝트/팀원/상세 페이지를 연결하는 정보 구조 설계",
      "공통 데이터 소스로 홈/멤버/상세를 일관되게 렌더링",
      "네비게이션에서 멤버 활성 상태 강조로 탐색성 개선",
    ],
    outcome: [
      "팀 소개 중심 랜딩에서 포트폴리오 허브로 전환 완료",
      "프로젝트 상세 라우트 기반 확장 가능한 구조 확보",
      "신규 프로젝트 추가 시 데이터만 추가하면 반영 가능",
    ],
    metrics: [
      "프로젝트 상세 페이지 자동 SSG 생성",
      "멤버별 참여 프로젝트 자동 노출",
      "공통 데이터 소스로 유지보수 비용 절감",
    ],
    members: ["namhae", "minyoung"],
    links: {},
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
