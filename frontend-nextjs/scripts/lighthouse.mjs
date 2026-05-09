/**
 * Lighthouse 자동 점검.
 *  - 기본은 dev 서버(http://localhost:3000) 가 떠 있는 상태에서 실행하면 됩니다.
 *  - perf 점수까지 정확히 보려면 prod 빌드(`next start`)를 먼저 띄운 뒤 실행하세요.
 *
 * 출력:
 *   .lighthouse/<route>.json  (전체 결과)
 *   .lighthouse/summary.json  (요약 점수)
 *   .lighthouse/summary.md    (마크다운 요약)
 *   콘솔: 라우트별 4개 카테고리 점수
 */

import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", ".lighthouse");

const BASE = process.env.LH_BASE_URL ?? "http://localhost:3000";

/**
 * 시스템 Chrome이 없을 때 Edge / 사용자 지정 경로로 fallback.
 * 우선순위: CHROME_PATH 환경변수 → 시스템 Chrome → Edge.
 */
function resolveChromePath() {
  if (process.env.CHROME_PATH && fsSync.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ];
  for (const p of candidates) {
    if (fsSync.existsSync(p)) return p;
  }
  return undefined; // chrome-launcher 기본 동작에 위임
}

const routes = [
  { name: "home", path: "/" },
  { name: "namhae", path: "/Namhae_Kim" },
  { name: "minyoung", path: "/Minyoung_Kim" },
  { name: "project-planit", path: "/projects/planit" },
  { name: "project-rd-autonote", path: "/projects/rd-autonote" },
];

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

function fmt(score) {
  if (score == null) return "  -";
  const v = Math.round(score * 100);
  const colorOpen = v >= 90 ? "\x1b[32m" : v >= 50 ? "\x1b[33m" : "\x1b[31m";
  const close = "\x1b[0m";
  return `${colorOpen}${String(v).padStart(3)}${close}`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const chromePath = resolveChromePath();
  if (chromePath) {
    console.log(`[lh] Using browser: ${chromePath}`);
  }
  const chrome = await launch({
    chromePath,
    chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
  });
  const port = chrome.port;

  const summary = [];

  try {
    for (const r of routes) {
      const url = `${BASE}${r.path}`;
      console.log(`\n→ Auditing ${r.name} (${url})`);
      try {
        const result = await lighthouse(
          url,
          {
            port,
            output: "json",
            logLevel: "error",
            onlyCategories: CATEGORIES,
          },
          {
            extends: "lighthouse:default",
            settings: {
              formFactor: "desktop",
              screenEmulation: {
                mobile: false,
                width: 1440,
                height: 900,
                deviceScaleFactor: 1,
                disabled: false,
              },
              throttling: {
                rttMs: 40,
                throughputKbps: 10 * 1024,
                cpuSlowdownMultiplier: 1,
                requestLatencyMs: 0,
                downloadThroughputKbps: 0,
                uploadThroughputKbps: 0,
              },
            },
          }
        );

        const lhr = result.lhr;
        const scores = Object.fromEntries(
          CATEGORIES.map((c) => [c, lhr.categories[c]?.score ?? null])
        );

        // 카테고리별 실패한 audit 모으기 (개선 힌트용)
        const issues = {};
        for (const cat of CATEGORIES) {
          const refs = lhr.categories[cat]?.auditRefs ?? [];
          const failing = refs
            .map((ref) => lhr.audits[ref.id])
            .filter(
              (a) =>
                a &&
                a.score != null &&
                a.score < 0.9 &&
                a.scoreDisplayMode !== "notApplicable" &&
                a.scoreDisplayMode !== "manual" &&
                a.scoreDisplayMode !== "informative"
            )
            .map((a) => ({
              id: a.id,
              title: a.title,
              score: a.score,
              displayValue: a.displayValue,
            }));
          if (failing.length) issues[cat] = failing;
        }

        summary.push({ route: r.name, url, scores, issues });
        await fs.writeFile(
          path.join(outDir, `${r.name}.json`),
          JSON.stringify(lhr, null, 2)
        );

        console.log(
          `   perf=${fmt(scores.performance)} a11y=${fmt(scores.accessibility)} bp=${fmt(scores["best-practices"])} seo=${fmt(scores.seo)}`
        );
      } catch (err) {
        console.error(`   ✗ ${r.name}: ${err?.message ?? err}`);
        summary.push({ route: r.name, url, error: String(err?.message ?? err) });
      }
    }
  } finally {
    await chrome.kill();
  }

  await fs.writeFile(
    path.join(outDir, "summary.json"),
    JSON.stringify(summary, null, 2)
  );

  // 마크다운 요약
  const md = ["# Lighthouse Summary", ""];
  md.push(`Base URL: ${BASE}`);
  md.push("");
  md.push("| Route | Perf | A11y | BP | SEO |");
  md.push("| --- | --- | --- | --- | --- |");
  for (const s of summary) {
    if (s.error) {
      md.push(`| ${s.route} | ERROR | ERROR | ERROR | ERROR |`);
      continue;
    }
    const pct = (v) => (v == null ? "-" : Math.round(v * 100));
    md.push(
      `| ${s.route} | ${pct(s.scores.performance)} | ${pct(s.scores.accessibility)} | ${pct(s.scores["best-practices"])} | ${pct(s.scores.seo)} |`
    );
  }
  md.push("");
  md.push("## Failing audits (per route)");
  for (const s of summary) {
    if (s.error || !s.issues) continue;
    md.push(`\n### ${s.route}`);
    for (const cat of Object.keys(s.issues)) {
      md.push(`- **${cat}**`);
      for (const a of s.issues[cat]) {
        md.push(
          `  - [${Math.round((a.score ?? 0) * 100)}] ${a.title}${a.displayValue ? ` — ${a.displayValue}` : ""}`
        );
      }
    }
  }
  await fs.writeFile(path.join(outDir, "summary.md"), md.join("\n"));

  console.log("\n=== Summary ===");
  for (const s of summary) {
    if (s.error) {
      console.log(`${s.route.padEnd(22)}  ERROR: ${s.error}`);
      continue;
    }
    console.log(
      `${s.route.padEnd(22)}  perf=${fmt(s.scores.performance)} a11y=${fmt(s.scores.accessibility)} bp=${fmt(s.scores["best-practices"])} seo=${fmt(s.scores.seo)}`
    );
  }
  console.log(`\nReports → ${outDir}`);
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
