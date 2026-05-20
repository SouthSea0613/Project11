/**
 * 김민영 — 기술 기록 (실무 노트) 엔트리.
 * Day N 형식으로 추가. src/lib/minyoungTechNotes.ts 의 notes 배열에 항목을 넣으면 됩니다.
 */

export type TechNoteCategory =
  | "코드 리뷰"
  | "설계"
  | "운영"
  | "성능"
  | "정합성"
  | "배포"
  | "기타";

export type MinyoungTechNote = {
  /** 표시용 — Day 1, Day 2 … */
  day: number;
  /** 카드 상단 짧은 제목 */
  title: string;
  /** YYYY-MM-DD (선택) */
  date?: string;
  category: TechNoteCategory;
  /** 어떤 맥락에서 썼는지 (프로젝트·PR·장애 등) */
  context: string;
  /** 관찰·문제·리뷰 포인트 */
  observation: string;
  /** 판단·조치·리뷰 코멘트 요지 */
  action: string;
  /** 다음에 반복할 규칙·체크리스트 한 줄 */
  takeaway: string;
  /** 관련 스택 태그 (선택) */
  tags?: string[];
  /** 관련 프로젝트 slug (선택) — /projects/[slug] 링크 */
  projectSlug?: string;
};

export const minyoungTechNotesMeta = {
  tabLabel: "기술 기록",
  kicker: "Field Notes",
  heading: "실무 노트",
  subtitle:
    "리뷰·설계·운영에서 검증한 것만 Day 단위로 남깁니다. 공부일지가 아니라, 다시 쓸 수 있는 기록입니다.",
} as const;

/**
 * 엔트리를 여기에 추가하세요.
 * day 번호는 1부터 연속일 필요 없습니다 (Day 3, Day 7처럼 띄어도 됨).
 */
export const minyoungTechNotes: MinyoungTechNote[] = [
  {
    day: 1,
    title: "저장 프로시저 리뷰 — 실행 계획 전에 스키마를 먼저 의심한다",
    date: "2026-05-01",
    category: "코드 리뷰",
    context: "레거시 MS-SQL 연동 모듈 PR 리뷰",
    observation:
      "쿼리 튜닝 제안만 올라왔는데, 조인 키 타입 불일치로 인덱스가 아예 타지 않는 케이스였습니다.",
    action:
      "실행 계획 캡처 전에 **스키마·FK·NULL 처리**를 표로 정리해 리뷰 코멘트에 첨부. 인덱스 추가 제안은 보류.",
    takeaway:
      "성능 이슈 PR은 '쿼리 문장'보다 **데이터 계약(타입·키·NULL)** 부터 본다.",
    tags: ["MS-SQL", "리뷰", "실행 계획"],
  },
  // Day 2 이후 — 아래 형식을 복사해 채우세요.
  // {
  //   day: 2,
  //   title: "제목 한 줄",
  //   category: "설계",
  //   context: "맥락",
  //   observation: "관찰",
  //   action: "조치·판단",
  //   takeaway: "다음에 쓸 규칙",
  // },
];
