/** 자기소개서(김남해) 기반 — 포트폴리오·프로필 전용 데이터 */

/** 프로필 사진 경로. 이 경로에 파일을 두면 자동으로 표시됩니다. */
export const namhaePhoto = "/profile/namhae.jpg";

/** 히어로 옆에 들어갈 임팩트 카드 4개 */
export const namhaeImpactStats: { value: string; label: string }[] = [
  { value: "0 → 1", label: "B2B SaaS 창업·풀스택 주도" },
  { value: "-60%", label: "RAG·전처리 토큰 비용 절감" },
  { value: "SIEM", label: "전사 보안 통합 감시 구축" },
  { value: "1.4y", label: "실무 경력 (정규직 기준)" },
];

/** 카테고리화된 스킬 (히어로 하단 ‘기술 스택’ 영역) */
export const namhaeSkillCategories: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["Next.js", "TypeScript", "React", "Tailwind", "shadcn/ui", "Chart.js / D3"],
  },
  {
    label: "Backend",
    items: ["NestJS", "FastAPI", "Spring Boot", ".NET (C#)", "Node.js", "JPA"],
  },
  {
    label: "AI / Data",
    items: ["LangChain", "RAG", "pgvector", "text-embedding-3", "Gemini API", "Vector Embedding"],
  },
  {
    label: "DB / Infra",
    items: ["PostgreSQL", "MSSQL", "MySQL", "Redis", "Docker", "Vercel", "Railway", "IIS 이중화"],
  },
  {
    label: "Game / Etc",
    items: ["Unity", "Unreal", "ARFoundation", "Git", "SVN"],
  },
];

export const namhaeContact = {
  /** 표시용 */
  phoneDisplay: "+82 10-2895-7823",
  /** tel: 링크용 (자기소개서 PDF와 동일 번호) */
  phoneTel: "+821028957823",
  email: "tksz0613@gmail.com",
};

export const namhaeHeadline =
  "비즈니스 문제를 기술로 치환해 실행하는 백엔드·풀스택 엔지니어";

export const namhaeSummary =
  "백엔드 및 서버 개발 중심으로 1년 4개월의 실무 경험을 보유하고 있으며, PlanIt에서 AI 기반 벡터 분석과 게이미피케이션을 결합한 협업 SaaS를 설계·구현했습니다. 또한 R&D 오토노트에서 RAG 전처리 파이프라인과 SHA-256 무결성 검증을 결합해 세무 증빙 신뢰성과 비용 효율을 동시에 개선했습니다. 기술의 실전성과 팀 협업을 중시하며, 코드 리뷰와 엔지니어링 표준 속에서 지속 가능한 시스템을 만드는 데 집중합니다.";

export type NamhaeExperienceBlock = {
  title: string;
  period: string;
  role: string;
  tech: string[];
  bullets: string[];
};

export const namhaeExperiences: NamhaeExperienceBlock[] = [
  {
    title: "PlanIt — 게임화·벡터 분석 기반 소셜 스크럼 SaaS",
    period: "2026.01 - 2026.04",
    role: "제품 기획 및 풀스택 아키텍처 설계",
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Next.js",
      "Tailwind",
      "Chart.js/D3",
      "shadcn",
      "FastAPI",
      "LangChain",
      "Slack/Discord API",
      "Vector Embedding",
      "Vercel",
      "Railway",
      "Docker",
      "Redis",
    ],
    bullets: [
      "데일리/위클리/먼슬리 스크럼 주기 자동화, Slack·Discord 연동으로 작성 진입 장벽 최소화",
      "GitHub 잔디형 활동 시각화, 팔로잉·좋아요로 커뮤니티 동기부여·게임화",
      "스크럼 텍스트 Vector 임베딩으로 업무 성향·진척도 분석, 인터랙티브 차트로 인사이트 제공",
      "팀·기업 단위 유료 구독 모델, 자동 리포트로 불필요한 대면 회의 시간 30% 절감",
      "Vercel·Railway·Docker 기반 배포 자동화로 신규 기능 배포 주기를 1분 내외로 단축",
    ],
  },
  {
    title: "R&D 오토노트 — 비침습형 협업 데이터 기반 세무 증빙 자동화 SaaS",
    period: "2026.01 - 2026.04",
    role: "파운더 및 리드 프로덕트 엔지니어",
    tech: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "pgvector",
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "FastAPI",
      "LangChain",
      "Slack",
      "Notion",
      "Discord SDK",
      "RAG",
      "text-embedding-3",
      "Gemini API",
      "SHA-256 무결성 검증",
      "Vercel",
      "Railway",
      "Docker",
      "Redis",
    ],
    bullets: [
      "협업 데이터 Vector Embedding·공간 저장, 국세청 R&D 가이드라인 기반 시멘틱 유사도로 일상 대화 1차 필터링 파이프라인",
      "유효 R&D 데이터만 LLM 컨텍스트로 주입하는 RAG로 연구노트 정확도 향상·API 토큰 비용 약 60% 절감",
      "Slack·Notion Webhook/API 통합으로 추가 작업 없는 실시간 원천 로그 수집",
      "연구노트·원천 데이터 매칭에 SHA-256 해시 박제로 사후 검증 시 조작 방어",
      "제조·바이오 50건 콜드 아웃리치로 페인 포인트 도출, MVP 기획부터 풀스택까지 제품 사이클 주도",
      "Git-Push 기반 무중단 자동 배포(CI/CD)로 인프라 관리 공수 최소화",
    ],
  },
  {
    title: "LLM 기반 반려동물 변 분석·건강 자가진단 웹앱",
    period: "2026.01 - 2026.02",
    role: "리드 아키텍트 및 풀스택 개발",
    tech: [
      "Java",
      "Spring Boot",
      "JPA",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "JWT Dual Token",
      "Gemini API",
    ],
    bullets: [
      "변 상태 분석·질병 가능성 추론·병원 방문 필요성 제안 LLM 파이프라인",
      "도메인 중심 조립형 아키텍처, 컴포넌트 기반 UI로 재사용·유지보수성 강화",
      "JWT Dual Token·XSS/CSRF 대응 토큰 저장 전략",
    ],
  },
  {
    title: "주식회사 노바소프트 — avis-tron 4.0 기반 파라다이스 그룹 전사 보안 통합 감시체계",
    period: "2025.06 - 재직중",
    role: "백엔드/서버개발 · 솔루션사업부 팀원",
    tech: [".NET (C#)", "JavaScript", "IIS 이중화", "MSSQL DB-to-DB Sync", "SVN", "SIEM"],
    bullets: [
      "SIEM 데이터 연동 기반 4단계 결재·소명 시스템으로 보안 사고 대응 프로세스 체계화",
      "파라다이스 그룹 인사 DB와 Real-time DB-to-DB 연동으로 전사 인적 정보 동기화",
      "IIS 이중화(VIP)·SVN 형상관리로 가용성 확보",
      "임원·운영용 통합 관측 대시보드로 보안 지표 가시화",
    ],
  },
  {
    title: "인천일보아카데미 — 인테리어 전문가 매칭·견적 자동화 플랫폼",
    period: "2025.02 - 2025.03",
    role: "풀스택 시스템 설계 및 메인 비즈니스 로직 (팀장)",
    tech: ["Spring Boot", "Thymeleaf", "MySQL", "jQuery", "AWS S3", "Git"],
    bullets: [
      "예산·스타일·지역 기반 필터링 매칭 엔진",
      "견적 프로세스 단계별 폼·전문가용 표준 견적 데이터",
      "거래 기반 리뷰·실시간 전문가 포트폴리오 대시보드",
    ],
  },
];

export const namhaeEducation = [
  { school: "인천대학교 정보통신대학원", detail: "컴퓨터공학과 졸업 (2017.03 - 2024.02)" },
  { school: "부광고등학교", detail: "이과 졸업 (2014.03 - 2017.02)" },
];

export const namhaeGithubUrl = "https://github.com/SouthSea0613";

export const namhaeExternalLinks = [
  { label: "GitHub (@SouthSea0613)", href: namhaeGithubUrl },
  { label: "팀 포트폴리오 (이 페이지)", href: "https://team.haeyounglab.com/Namhae_Kim" },
  { label: "PlanIt / 해영랩", href: "https://haeyounglab.com" },
];

export const namhaeSkillTags = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Spring Boot",
  "FastAPI",
  "NestJS",
  "C#",
  ".NET",
  "PostgreSQL",
  "Unity",
  "Git",
];

export const namhaeLanguages = "영어 비즈니스 레벨 · TOEIC 680 (2024.06.15)";

/** 인천대 수료 과정 등 학술·개인 프로젝트 (자기소개서 요약) */
export const namhaeAcademicProjects = [
  {
    title: "AR Marker-Based Desk Defense",
    tech: "Unreal Engine · ARFoundation (ARCore/ARKit) · Image Tracking · C#",
    bullets: [
      "평면 감지로 책상 평면 실시간 인식, 실물을 게임 내 장애물로 반영",
      "실물 카드 Image Tracking 시 타워 실시간 렌더링",
      "Collision·네비게이션 최적화 및 자이로·카메라 연동 Spatial UI/UX",
    ],
  },
  {
    title: "Hex-Grid 기반 SRPG",
    tech: "Unity 2D · C# · 육각 좌표계 · A* · FSM",
    bullets: [
      "큐브/축 좌표계 기반 육각 타일맵·거리·범위 선택",
      "고도·이동 비용 반영 커스텀 A*, 전용 맵 에디터",
      "ScriptableObject 기반 데이터 드리븐 설계",
    ],
  },
];
