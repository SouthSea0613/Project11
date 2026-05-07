/** 기술 스택 카테고리 분류·색상 시스템 */

export type StackCategory = "frontend" | "backend" | "ai" | "infra" | "etc";

export const STACK_CATEGORIES: StackCategory[] = [
  "frontend",
  "backend",
  "ai",
  "infra",
  "etc",
];

export const STACK_LABEL: Record<StackCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  ai: "AI / Data",
  infra: "DB / Infra",
  etc: "Etc",
};

/** Recharts 등 SVG fill용 hex 색상 */
export const STACK_COLOR_HEX: Record<StackCategory, string> = {
  frontend: "#0ea5e9",
  backend: "#10b981",
  ai: "#a855f7",
  infra: "#f59e0b",
  etc: "#ec4899",
};

/** 작은 dot 표기용 Tailwind 배경 클래스 */
export const STACK_DOT_CLASS: Record<StackCategory, string> = {
  frontend: "bg-sky-500",
  backend: "bg-emerald-500",
  ai: "bg-violet-500",
  infra: "bg-amber-500",
  etc: "bg-pink-500",
};

/** 칩(badge)용 Tailwind 클래스 */
export const STACK_BADGE_CLASS: Record<StackCategory, string> = {
  frontend: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  backend: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  ai: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  infra: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  etc: "border-pink-400/30 bg-pink-400/10 text-pink-300",
};

/** 개별 기술명(`Next.js`, `PostgreSQL` 등)을 카테고리 키로 분류 */
export function classifyTech(tech: string): StackCategory {
  const t = tech.toLowerCase();
  if (
    /(next|react|tailwind|shadcn|chart\.js|d3|jquery|thymeleaf|tsx|js|html|css|typescript|javascript)/.test(
      t
    )
  )
    return "frontend";
  if (
    /(nest|spring|fastapi|node|java|c#|\.net|prisma|jpa|mybatis|server|api|rest)/.test(
      t
    )
  )
    return "backend";
  if (/(langchain|rag|gemini|embed|vector|pgvector|llm|ai)/.test(t)) return "ai";
  if (
    /(postgres|mssql|ms-sql|mysql|oracle|redis|docker|vercel|railway|iis|svn|git|aws|s3|stored)/.test(
      t
    )
  )
    return "infra";
  return "etc";
}

/**
 * 자유 텍스트 카테고리 라벨(`"Frontend"`, `"AI / Data"`, `"Database"` 등)을
 * dot 색상 클래스로 매핑. 이력서 데이터용.
 */
export function categoryLabelToDot(label: string): string {
  const k = label.toLowerCase();
  if (k.includes("front")) return STACK_DOT_CLASS.frontend;
  if (k.includes("back")) return STACK_DOT_CLASS.backend;
  if (k.includes("ai") || k.includes("data") || k.includes("ml"))
    return STACK_DOT_CLASS.ai;
  if (
    k.includes("db") ||
    k.includes("infra") ||
    k.includes("database") ||
    k.includes("api")
  )
    return STACK_DOT_CLASS.infra;
  return STACK_DOT_CLASS.etc;
}
