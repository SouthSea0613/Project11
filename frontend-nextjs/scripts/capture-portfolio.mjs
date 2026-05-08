/**
 * 자체 포트폴리오 사이트 스크린샷 자동 캡처 스크립트.
 * dev 서버(http://localhost:3000) 가 떠 있는 상태에서 실행하세요.
 *
 * 실행:  pnpm capture:portfolio
 * 결과:  public/projects/team-portfolio-platform/*.png
 */

import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(
  __dirname,
  "..",
  "public",
  "projects",
  "team-portfolio-platform"
);

const BASE = process.env.CAPTURE_BASE_URL ?? "http://localhost:3000";

const targets = [
  {
    name: "team-portfolio-home.png",
    url: `${BASE}/`,
    waitFor: "main",
  },
  {
    name: "team-portfolio-namhae.png",
    url: `${BASE}/Namhae_Kim`,
    waitFor: "main",
  },
  {
    name: "team-portfolio-minyoung.png",
    url: `${BASE}/Minyoung_Kim`,
    waitFor: "main",
  },
  {
    name: "team-portfolio-project-planit.png",
    url: `${BASE}/projects/planit`,
    waitFor: "main",
  },
  {
    name: "team-portfolio-project-rd-autonote.png",
    url: `${BASE}/projects/rd-autonote`,
    waitFor: "main",
  },
];

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  console.log(`[capture] output → ${outDir}`);
  console.log(`[capture] base   → ${BASE}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    colorScheme: "dark",
  });

  for (const t of targets) {
    const page = await context.newPage();
    try {
      await page.goto(t.url, { waitUntil: "networkidle", timeout: 60_000 });
      if (t.waitFor) {
        await page.waitForSelector(t.waitFor, { timeout: 15_000 });
      }
      // recharts 등 클라이언트 컴포넌트 안정화를 위한 짧은 대기
      await page.waitForTimeout(800);
      const out = path.join(outDir, t.name);
      await page.screenshot({ path: out, fullPage: false });
      console.log(`[capture] ✓ ${t.name}`);
    } catch (err) {
      console.error(`[capture] ✗ ${t.name}: ${err?.message ?? err}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
