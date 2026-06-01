/**
 * Member accent tokens (emerald / sky / violet) for profile pages and components.
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

export const ACCENT_PILL: Record<AnyAccent, string> = {
  emerald:
    "border-emerald-400/40 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  sky: "border-sky-400/40 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20",
  violet:
    "border-violet-400/40 bg-violet-500/10 text-violet-500 hover:bg-violet-500/20",
};

export const ACCENT_DOT: Record<AnyAccent, string> = {
  emerald: "bg-emerald-400",
  sky: "bg-sky-400",
  violet: "bg-violet-400",
};

export const ACCENT_HOVER_BORDER: Record<AnyAccent, string> = {
  emerald: "hover:border-emerald-400/70",
  sky: "hover:border-sky-400/70",
  violet: "hover:border-violet-400/70",
};

export function memberAccent(id: MemberId): MemberAccent {
  return MEMBER_ACCENT[id];
}