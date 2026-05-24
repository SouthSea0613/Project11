/**
 * 멤버별 컬러 토큰 — 페이지·컴포넌트마다 흩어진 sky 매핑을 한 곳에 모읍니다.
 *
 * Tailwind 정적 분석을 위해 모든 클래스 문자열은 풀텍스트로 둡니다.
 */

import type { MemberId } from "@/lib/portfolioData";

export type MemberAccent = "sky";
export type AnyAccent = MemberAccent | "violet";

export const MEMBER_ACCENT: Record<MemberId, MemberAccent> = {
  minyoung: "sky",
};

export const MEMBER_HEX: Record<MemberId, string> = {
  minyoung: "#0ea5e9",
};

/** 텍스트 컬러 (강조 / 호버) */
export const ACCENT_TEXT: Record<AnyAccent, string> = {
  sky: "text-sky-500",
  violet: "text-violet-500",
};

export const ACCENT_HOVER_TEXT: Record<AnyAccent, string> = {
  sky: "hover:text-sky-500",
  violet: "hover:text-violet-500",
};

/** 둥근 알약 버튼 (카드 코너 / 칩) */
export const ACCENT_PILL: Record<AnyAccent, string> = {
  sky: "border-sky-400/40 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20",
  violet:
    "border-violet-400/40 bg-violet-500/10 text-violet-500 hover:bg-violet-500/20",
};

/** 작은 dot 표기 */
export const ACCENT_DOT: Record<AnyAccent, string> = {
  sky: "bg-sky-400",
  violet: "bg-violet-400",
};

/** 카드 호버 보더 */
export const ACCENT_HOVER_BORDER: Record<AnyAccent, string> = {
  sky: "hover:border-sky-400/70",
  violet: "hover:border-violet-400/70",
};

export function memberAccent(id: MemberId): MemberAccent {
  return MEMBER_ACCENT[id];
}
