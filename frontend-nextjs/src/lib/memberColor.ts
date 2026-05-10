/**
 * 멤버별 컬러 토큰 — 페이지·컴포넌트마다 흩어진 emerald/sky 매핑을 한 곳에 모읍니다.
 *
 * 약속:
 *   김남해 → emerald
 *   김민영 → sky
 *   비교/공통 → violet
 *
 * Tailwind 정적 분석을 위해 모든 클래스 문자열은 풀텍스트로 둡니다.
 */

import type { MemberId } from "@/lib/portfolioData";

export type MemberAccent = "emerald" | "sky";
export type AnyAccent = MemberAccent | "violet";

export const MEMBER_ACCENT: Record<MemberId, MemberAccent> = {
  namhae: "emerald",
  minyoung: "sky",
};

export const MEMBER_HEX: Record<MemberId, string> = {
  namhae: "#10b981",
  minyoung: "#0ea5e9",
};

/** 텍스트 컬러 (강조 / 호버) */
export const ACCENT_TEXT: Record<AnyAccent, string> = {
  emerald: "text-emerald-500",
  sky: "text-sky-500",
  violet: "text-violet-500",
};

export const ACCENT_HOVER_TEXT: Record<AnyAccent, string> = {
  emerald: "hover:text-emerald-500",
  sky: "hover:text-sky-500",
  violet: "hover:text-violet-500",
};

/** 둥근 알약 버튼 (카드 코너 / 칩) */
export const ACCENT_PILL: Record<AnyAccent, string> = {
  emerald:
    "border-emerald-400/40 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  sky: "border-sky-400/40 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20",
  violet:
    "border-violet-400/40 bg-violet-500/10 text-violet-500 hover:bg-violet-500/20",
};

/** 작은 dot 표기 */
export const ACCENT_DOT: Record<AnyAccent, string> = {
  emerald: "bg-emerald-400",
  sky: "bg-sky-400",
  violet: "bg-violet-400",
};

/** 카드 호버 보더 */
export const ACCENT_HOVER_BORDER: Record<AnyAccent, string> = {
  emerald: "hover:border-emerald-400/70",
  sky: "hover:border-sky-400/70",
  violet: "hover:border-violet-400/70",
};

export function memberAccent(id: MemberId): MemberAccent {
  return MEMBER_ACCENT[id];
}
