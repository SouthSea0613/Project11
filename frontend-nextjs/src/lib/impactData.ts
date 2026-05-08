/**
 * 멤버별 비즈니스 임팩트 메트릭.
 * BarChart 용 — 모두 % 단위로 통일했습니다.
 */

export type ImpactMetric = {
  /** 메트릭이 발생한 프로젝트/맥락 */
  project: string;
  /** 무엇이 변했는지 (예: "RAG 토큰 비용") */
  label: string;
  /** 양수, 단위는 unit으로 분리 */
  value: number;
  /** 표기용 단위 — "%", "점" 등 */
  unit: string;
  /** 좋은 방향: 절감(down)인지 증가(up)인지 */
  direction: "up" | "down";
};

export const namhaeImpactMetrics: ImpactMetric[] = [
  {
    project: "R&D 오토노트",
    label: "RAG 토큰 비용 절감",
    value: 60,
    unit: "%",
    direction: "down",
  },
  {
    project: "PlanIT",
    label: "대면 회의 시간 절감",
    value: 30,
    unit: "%",
    direction: "down",
  },
  {
    project: "PlanIT 배포",
    label: "컨테이너 배포 시간 단축",
    value: 98,
    unit: "%",
    direction: "down",
  },
];

export const minyoungImpactMetrics: ImpactMetric[] = [
  {
    project: "카카오 케어챗",
    label: "쿼리 응답 성능 개선",
    value: 30,
    unit: "%",
    direction: "up",
  },
  {
    project: "옵션 관리",
    label: "운영 대응 속도 개선",
    value: 50,
    unit: "%",
    direction: "up",
  },
  {
    project: "PlanIT",
    label: "Lighthouse SEO 만점 달성",
    value: 100,
    unit: "점",
    direction: "up",
  },
];
