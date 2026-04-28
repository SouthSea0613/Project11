export type MemberId = "namhae" | "minyoung";

export type PortfolioProject = {
  slug: string;
  title: string;
  period: string;
  thumbnail: string;
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

export const teamMembers: TeamMemberProfile[] = [
  {
    id: "namhae",
    name: "김남해",
    role: "Product / Frontend",
    intro:
      "사용자 흐름을 기준으로 기획과 구현을 연결하고, 빠른 실험으로 제품 가치를 검증합니다.",
    skills: ["Next.js", "TypeScript", "UI/UX", "Product Thinking"],
    highlights: [
      "핵심 사용자 여정 설계와 화면 구조 설계",
      "랜딩/온보딩 구간 UX 최적화",
      "팀 내 제품 우선순위 및 출시 범위 조율",
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
    period: "2026.01 - 진행 중",
    thumbnail: "/background.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    summary:
      "공개 스크럼 기반 계획 공유 서비스. 개인의 계획을 팀/커뮤니티 동기부여로 연결하는 제품.",
    problem:
      "개인 계획 앱은 기록은 쌓이지만 지속 동기와 외부 피드백 루프가 약해 장기 사용률이 떨어졌습니다.",
    solution: [
      "공개 스크럼 피드 구성으로 계획과 진행 상황을 공유",
      "좋아요/반응 기반 피드백 루프 설계",
      "일/주/월 단위 랭킹과 노출 구조로 재방문 동기 강화",
    ],
    outcome: [
      "공개 스크럼 작성 및 피드 탐색 중심의 핵심 플로우 완성",
      "콘텐츠 소비와 작성 전환을 함께 고려한 정보 구조 정립",
      "팀 포트폴리오 대표 프로젝트로 운영 가능한 상태 확보",
    ],
    metrics: [
      "공개 스크럼 메인 플로우 1차 출시",
      "일/주/월 랭킹 구조 구현",
      "반응형 UI 전 구간 대응",
    ],
    members: ["namhae", "minyoung"],
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
  {
    slug: "team-portfolio-platform",
    title: "Team Portfolio Platform",
    period: "2026.04 - 진행 중",
    thumbnail: "/background.jpg",
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
