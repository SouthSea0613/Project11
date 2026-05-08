/** 이력서_20260505 (김민영) 기반 — 포트폴리오/자기소개 데이터 */

export const minyoungPhoto = "/profile/minyoung.jpg";

export const minyoungContact = {
  phoneDisplay: "010-2752-7045",
  phoneTel: "01027527045",
  email: "sms0751@naver.com",
};

export const minyoungGithubUrl = "https://github.com/alsdud0301";

export const minyoungImpactStats: { value: string; label: string }[] = [
  { value: "9M", label: "실무 경력 (이원헬스케어)" },
  { value: "30%", label: "쿼리 성능 개선" },
  { value: "50%", label: "유지보수 대응 속도 개선" },
  { value: "100", label: "Lighthouse SEO 점수" },
];

export const minyoungHeadline =
  "데이터 무결성과 운영 효율을 함께 설계하는 백엔드·풀스택 엔지니어";

export const minyoungSummary =
  "의료 데이터 연동 환경에서 데이터 정합성과 안정성을 우선으로 시스템을 설계해 왔습니다. C# .NET 기반 병원 시스템 개발부터 외부 플랫폼 연동, 저장 프로시저 최적화, 운영 화면 설계까지 수행했으며, PlanIt 프로젝트에서는 아키텍처 설계와 배포까지 리드하며 시스템 신뢰성과 확장성을 강화했습니다.";

export const minyoungSkillCategories: { label: string; items: string[] }[] = [
  {
    label: "Backend",
    items: [".NET (C#)", "Node.js", "Java", "Spring Boot", "MyBatis", "JPA"],
  },
  {
    label: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "jQuery"],
  },
  {
    label: "Database",
    items: ["MS-SQL", "PostgreSQL", "MySQL", "Oracle", "Stored Procedure"],
  },
  {
    label: "Infra / API",
    items: ["REST API", "JSON", "Git", "Vercel", "Railway"],
  },
  {
    label: "Game / Etc",
    items: ["Unity 6", "C# (Game)", "JSP", "Thymeleaf", "Python"],
  },
];

export type MinyoungExperienceBlock = {
  title: string;
  period: string;
  role: string;
  tech: string[];
  bullets: string[];
};

export const minyoungExperiences: MinyoungExperienceBlock[] = [
  {
    title: "이원헬스케어 — 카카오 케어챗 병원 예약/진료 정보 연동",
    period: "2025.09 - 2026.02",
    role: "API 인터페이스 설계 · DB 프로시저 · 연동 테스트",
    tech: ["C# WinForms", ".NET", "MS-SQL", "REST API", "JSON"],
    bullets: [
      "카카오 케어챗 플랫폼 연동으로 실시간 예약·대기 순번·진료 내역 조회 기능 구축",
      "다중 JOIN 기반 고성능 프로시저 개발 및 쿼리 튜닝으로 응답 성능 개선",
      "API 호출부터 DB 반영까지 End-to-End 통합 테스트로 연동 안정성 확보",
    ],
  },
  {
    title: "이원헬스케어 — 병원 옵션 설정/그룹화 관리 화면",
    period: "2025.07 - 2025.08",
    role: "UI 개발 · 메타데이터 DB 설계",
    tech: ["C# WinForms", ".NET", "MS-SQL"],
    bullets: [
      "그룹-옵션-상세 3단계 계층 구조로 수백 개 설정값 관리 체계화",
      "관리자 직접 CRUD 가능한 옵션 관리 툴로 유지보수 대응 속도 개선",
      "선 검증 후 저장 프로세스로 설정 충돌·중복 데이터 발생 방지",
    ],
  },
  {
    title: "이원헬스케어 — 혈당 기기 연동 및 데이터 관리",
    period: "2026.01 - 2026.02",
    role: "풀스택 개발 · 데이터 연동 로직 설계",
    tech: ["C# WinForms", ".NET", "MS-SQL"],
    bullets: [
      "외부 혈당 측정 기기와 병원 DB 간 실시간 인터페이스 설계",
      "중복 시퀀스 방지를 위한 다단계 검증 체계 도입으로 데이터 정합성 강화",
      "중간 테이블 기반 검토·이관 화면 및 원클릭 이관 프로세스 구축",
    ],
  },
  {
    title: "PlanIt — 소셜 스크럼 SaaS",
    period: "2026.01 - 2026.04",
    role: "아키텍처 설계 · 배포 리딩 · 게이미피케이션 클라이언트",
    tech: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "FastAPI",
      "PostgreSQL",
      "Unity 6",
      "C#",
    ],
    bullets: [
      "JSON 매핑 기반 컴포넌트 구조로 유연한 화면 확장성 확보",
      "Metadata/Open Graph/Twitter Card 최적화로 Lighthouse SEO 100점 달성",
      "배포 파이프라인 정비를 통해 안정적 릴리스 구조 확립",
      "방꾸미기(Room Customize) 모듈 설계 — 사용자가 자기 공간을 꾸미며 머무는 장치 구현",
      "Unity 6 기반 점프게임 미니게임 개발 — 데이터 드리븐 어빌리티·캐릭터 시스템 설계",
    ],
  },
];

export const minyoungEducation = [
  {
    school: "부천대학교",
    detail: "컴퓨터소프트웨어 전공 졸업 (2021.03 - 2024.02) · 학점 3.44/4.5",
  },
  { school: "박문여자고등학교", detail: "졸업" },
];

export const minyoungTraining = [
  "(과정평가형) 반응형웹 기반 Back-End/풀스택 개발자 과정 (인천일보아카데미, 2024.09 - 2025.03)",
];

export const minyoungMotivation = {
  title: "지원동기",
  paragraphs: [
    "의료 데이터 무결성을 책임지는 실무를 통해, 작은 데이터 오염이 비즈니스와 사용자에게 치명적 손실로 이어질 수 있음을 현장에서 체감했습니다.",
    "이후 PlanIt 프로젝트에서 아키텍처 설계부터 배포까지 전 과정을 리드하며, 기술적 완성도가 비즈니스 신뢰로 연결되는 흐름을 경험했습니다.",
    "겉으로 보이는 화려함보다 시스템 이면의 견고함을 중시하며, 서비스 확장기의 복잡한 리스크를 기술로 해결하는 팀에 기여하고자 합니다.",
  ],
};

export const minyoungCaseStudies = [
  {
    title: "사례 1 · 카카오 케어챗 연동",
    topic: "데이터 처리 아키텍처 최적화",
    problem:
      "UNION 기반 조회 로직이 데이터 증가 시 시스템 부하와 응답 지연을 유발",
    approach: [
      "실행 계획 분석으로 인덱스 스캔 저해 요소 제거",
      "WHERE 필터 선적용 + 비즈니스 로직 맞춤 프로시저로 쿼리 구조 재설계",
    ],
    outcome: "응답 속도 30% 이상 향상 및 대규모 트래픽에서도 안정적 처리 체계 확보",
  },
  {
    title: "사례 2 · 옵션 관리 시스템",
    topic: "유지보수 효율화 구조 개편",
    problem:
      "분산된 옵션 관리 체계로 설정 변경 시 프로젝트/위치 탐색 비용이 큰 상태",
    approach: [
      "그룹-옵션 리스트-상세의 3단계 계층형 통합 관리 구조 설계",
      "선 검증 후 저장 프로세스로 충돌·중복 발생 가능성 차단",
    ],
    outcome: "운영 부서 기준 유지보수 대응 속도 50% 이상 단축",
  },
  {
    title: "사례 3 · 혈당 데이터 연동",
    topic: "의료 데이터 무결성 방어 로직",
    problem:
      "중복 시퀀스 충돌로 누락/오염 가능성이 존재하는 실시간 인터페이스 환경",
    approach: [
      "1차 유효성 검증 + 2차 시퀀스 충돌 방지의 다단계 검증 체계 도입",
      "인터페이스 테이블 누락 없는 저장 보장 구조 설계",
    ],
    outcome:
      "로직 결함으로 인한 누락을 최소화하고 데이터 정확도·의료 안정성 향상에 기여",
  },
];

export const minyoungStrengths = [
  {
    title: "데이터 정합성 중심 설계",
    bullets: [
      "예외 상황에서도 누락·충돌을 방지하는 방어적 로직 설계",
      "의료/연동 도메인에서 무결성을 서비스 신뢰도로 연결",
    ],
  },
  {
    title: "성능 최적화 및 운영 효율",
    bullets: [
      "실행 계획 기반 쿼리 튜닝 및 프로시저 최적화 경험",
      "운영 도구 구조화로 유지보수 대응 속도 개선",
    ],
  },
  {
    title: "빠른 학습과 실무 투입",
    bullets: [
      "외부 플랫폼 API 연동부터 DB 반영까지 End-to-End 수행",
      "새로운 서비스 구조를 빠르게 파악하고 안정적 코드 기여",
    ],
  },
];

export const minyoungFuturePlan = [
  "초기 온보딩 기간에 서비스 구조와 코드베이스를 신속히 파악해 안정적인 코드 기여",
  "지표 기반 성능 최적화와 운영 자동화로 팀의 개발·운영 생산성 강화",
  "예외 상황을 먼저 고려하는 방어적 설계를 내재화해 서비스 신뢰도 향상",
];

export const minyoungExternalLinks = [
  { label: "GitHub (@alsdud0301)", href: minyoungGithubUrl },
  { label: "팀 포트폴리오", href: "https://team.haeyounglab.com" },
  { label: "PlanIt", href: "https://planit.haeyounglab.com" },
];

export const minyoungLanguages = "어학/자격증: 이력서 기재 기준 별도 없음";
