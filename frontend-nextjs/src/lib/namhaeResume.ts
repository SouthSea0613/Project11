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

/** 자기소개서 섹션: 지원동기 */
export const namhaeMotivation = {
  title: "지원동기 (이직 사유)",
  paragraphs: [
    "노바소프트 실무와 HaeYoungLab 창업 경험을 통해 기술의 실전성을 체득했습니다. Next.js·NestJS 기반으로 제품을 밑바닥부터 만들며 사용자 요구를 기술로 구현하는 역량을 키웠지만, 동시에 1인 개발의 한계도 명확히 보았습니다.",
    "창업 과정에서 가장 아쉬웠던 점은 설계를 날카롭게 검증해줄 동료와 사수의 부재였습니다. 이제는 코드 리뷰와 엔지니어링 표준이 확립된 환경에서 더 높은 완성도의 시스템을 만들고 싶습니다.",
    "창업가적 실행력과 비즈니스 통찰을 팀의 기술 자산과 결합해, 제품의 성장을 함께 만드는 엔지니어로 기여하고자 합니다.",
  ],
};

/** 자기소개서 섹션: 핵심 역량 및 업무 성과 */
export const namhaeCaseStudies = [
  {
    title: "사례 1 · 노바소프트",
    topic: "엔터프라이즈 보안 시스템 데이터 동기화 및 안정화",
    problem:
      "대규모 그룹사 인프라에서 데이터 파편화가 발생하고, 서비스 가용성 확보가 중요한 상황",
    approach: [
      "MSSQL 기반 DB-to-DB 실시간 동기화 로직 설계",
      "IIS 웹서버 이중화(Virtual-IP) 및 SVN 형상관리 체계 수립",
      "고객사·협력사와 기술 협의 리딩",
    ],
    outcome:
      "파라다이스 그룹 보안 통합 시스템 구축 완수, 무중단 운영 환경 정착",
  },
  {
    title: "사례 2 · R&D 오토노트",
    topic: "시장 검증부터 구현까지 Full-Cycle 제품 리딩",
    problem:
      "세무 리스크 문제를 해결하기 위해 도메인 검증과 기술적 증거력 확보가 동시에 필요한 상황",
    approach: [
      "세무사 자문 및 국세청 가이드라인 분석 후 기술 사양(SHA-256 타임스탬핑)으로 치환",
      "제조/바이오 대상 50건+ 콜드 아웃리치로 페인 포인트 검증",
      "Vector 전처리 + RAG로 불필요 데이터 제거 및 비용 최적화",
    ],
    outcome:
      "LLM API 토큰 비용 약 60% 절감, 연구 행정 시간 20% 단축 목표의 제품 구조 완성",
  },
  {
    title: "사례 3 · PlanIt",
    topic: "시스템으로 행동을 견인하는 ChatOps 협업 툴 설계",
    problem:
      "사용자의 의지에 의존하지 않는 강제성 있는 아키텍처가 필요했던 협업툴 사용성 이슈",
    approach: [
      "Start-End 스크럼 설계로 결정론적 실행 구조 구현",
      "Slack/Discord Webhook, 챗봇 API 연동으로 Headless 참여 환경 구축",
      "자동 리포트 생성과 배포 자동화 파이프라인 고도화",
    ],
    outcome:
      "불필요한 대면 회의 시간 30% 절감, 신규 기능 배포 주기 1분 내외 단축",
  },
];

/** 자기소개서 섹션: 직무 전문성 및 강점 */
export const namhaeStrengths = [
  {
    title: "비즈니스 엔지니어링",
    bullets: [
      "현장 인터뷰·전문가 자문·아웃리치를 통해 문제를 정의하고 기술로 치환",
      "낯선 도메인에서도 법리·요건을 빠르게 학습해 구현 사양으로 전환",
    ],
  },
  {
    title: "자동화 및 운영 효율화",
    bullets: [
      "Webhook/API 기반 비침습 자동화로 사용자 추가 작업 최소화",
      "Docker·CI/CD 중심으로 배포 주기 단축 및 운영 공수 절감",
    ],
  },
  {
    title: "성장 중심 협업 태도",
    bullets: [
      "설계가 틀릴 수 있음을 전제로 피드백을 빠르게 수용",
      "개인 경험을 팀 문화·표준과 결합해 조직의 기술 자산으로 전환",
    ],
  },
];

/** 자기소개서 섹션: 입사 후 포부 */
export const namhaeFuturePlan = [
  "설계의 완성도를 높이기 위해 팀 기준으로 지속 검증받고, 피드백을 즉시 반영하는 개발자로 성장",
  "비즈니스 임팩트(운영 효율·비용 절감·데이터 신뢰성)를 우선하는 아키텍처 구축",
  "창업·현장 경험에서 얻은 실행력을 팀의 긍정적 에너지로 전환해 제품 목표 정렬에 기여",
];
