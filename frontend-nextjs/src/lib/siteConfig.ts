/** 프로덕션 사이트 기준 URL — 메타데이터·사이트맵에서 공통 사용 */
export const SITE_URL = "https://www.haeyounglab.com" as const;

export const SITE_NAME = "HaeYoungLab" as const;

/**
 * 기본 OG/Twitter 이미지 (public 기준 경로).
 * 전용 1200×630 에셋이 없을 때 실제 존재하는 팀 포트폴리오 스크린샷 사용.
 */
export const DEFAULT_OG_IMAGE_PATH =
  "/projects/team-portfolio-platform/team-portfolio-home.png" as const;
