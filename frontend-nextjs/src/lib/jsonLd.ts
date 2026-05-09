/**
 * schema.org JSON-LD 페이로드 빌더.
 * 각 페이지의 `<JsonLd data={...}>` 에 그대로 넘길 수 있는 객체를 반환합니다.
 */

import type { PortfolioProject, TeamMemberProfile } from "@/lib/portfolioData";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const abs = (path: string): string => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
};

/** 사이트 전역 Organization */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "해영랩",
    url: SITE_URL,
    logo: abs("/projects/team-portfolio-platform/team-portfolio-home.png"),
    sameAs: [
      "https://github.com/SouthSea0613",
      "https://github.com/alsdud0301",
    ],
  };
}

/** 홈 — WebSite (사이트 검색·이름) */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_NAME} Team Portfolio`,
    url: SITE_URL,
    inLanguage: "ko-KR",
  };
}

/** 멤버 페이지 — Person */
export function personLd(args: {
  member: TeamMemberProfile | undefined;
  fallbackName: string;
  /** 멤버 페이지 경로 ("/Namhae_Kim" 등) */
  path: string;
  /** 프로필 사진 (절대/상대 모두 허용) */
  imagePath: string;
  /** schema.org `description` */
  description: string;
  /** GitHub, 이메일 등 외부 링크 */
  sameAs?: string[];
  email?: string;
  /** "Backend / Full-stack" 같은 직무 */
  jobTitle?: string;
  /** 사용 기술 → `knowsAbout` */
  knowsAbout?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: args.member?.name ?? args.fallbackName,
    url: abs(args.path),
    image: abs(args.imagePath),
    description: args.description,
    jobTitle: args.jobTitle ?? args.member?.role,
    email: args.email ? `mailto:${args.email}` : undefined,
    sameAs: args.sameAs?.length ? args.sameAs : undefined,
    knowsAbout: args.knowsAbout?.length
      ? args.knowsAbout
      : args.member?.skills,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** 프로젝트 상세 — CreativeWork (소프트웨어 제품/포트폴리오 작업물) */
export function projectLd(args: {
  project: PortfolioProject;
  authors: TeamMemberProfile[];
  imagePath: string;
}) {
  const { project, authors, imagePath } = args;
  const path = `/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: abs(path),
    image: abs(imagePath),
    inLanguage: "ko-KR",
    keywords: project.stack.join(", "),
    author: authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      url: abs(a.profilePath),
    })),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "WebSite",
      name: `${SITE_NAME} Team Portfolio`,
      url: SITE_URL,
    },
  };
}

/** 빵부스러기 (홈 → 멤버 → 프로젝트 등) */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
