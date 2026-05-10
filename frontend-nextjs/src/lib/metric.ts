/**
 * 프로젝트 메트릭 문자열 분류·파싱.
 *
 * 메트릭은 데이터 모델에서 단순 string[] 이지만,
 *  - 숫자가 포함된 결과 ("RAG 토큰 비용 60% 절감")
 *  - 정성적 결과 ("데이터 드리븐 어빌리티 시스템")
 * 두 종류가 섞여 있어 UI에서 위계가 깨집니다.
 *
 * 이 헬퍼는 모든 표시 지점에서 동일한 규칙으로 분류해
 *  - 숫자형은 강조 컬러 + 큰 숫자 슬롯
 *  - 정성형은 흐릿한 보조 칩
 * 으로 일관되게 렌더되도록 합니다.
 */

export type MetricKind = "numeric" | "qualitative";

export type ParsedMetric = {
  /** 원본 문자열 */
  raw: string;
  kind: MetricKind;
  /** 숫자형일 때만 채워짐. 예: "60%", "1분", "x10" */
  number?: string;
  /** 숫자 부분을 제외한 나머지 텍스트. 정성형일 때는 raw와 동일 */
  rest: string;
};

const NUMBER_REGEX =
  /[+\-−×x]?\s?\d+(?:\.\d+)?\s*(?:%|배|x|X|초|분|시간|시|주|일|개월|개|점|회|건|건수|MB|GB|KB|ms|fps|만|억)/;

export function classifyMetric(raw: string): ParsedMetric {
  const m = NUMBER_REGEX.exec(raw);
  if (!m) {
    return { raw, kind: "qualitative", rest: raw };
  }
  const number = m[0].replace(/\s+/g, "");
  const rest = raw.replace(m[0], "").replace(/\s{2,}/g, " ").trim();
  return { raw, kind: "numeric", number, rest };
}

export function classifyMetrics(list: string[]): ParsedMetric[] {
  return list.map(classifyMetric);
}

/** 헤드라인용 — 숫자형 중 첫 번째, 없으면 정성형 첫 번째 */
export function pickHeadlineMetric(list: string[]): ParsedMetric | null {
  if (list.length === 0) return null;
  const parsed = classifyMetrics(list);
  return parsed.find((p) => p.kind === "numeric") ?? parsed[0];
}
