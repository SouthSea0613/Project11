// ── 타입 정의 ──────────────────────────────────────────────

export type DeveloperNote = {
  date: string;
  title: string;
  content: string;
};

export type RoadmapPhase = {
  phase: string;
  label: string;
  period: string;
  status: "done" | "active" | "upcoming";
  items: string[];
};

export type PatchChange = {
  tag: "new" | "fix" | "improve";
  text: string;
};

export type PatchNote = {
  version: string;
  date: string;
  type: string;
  changes: PatchChange[];
};

export type CardItem = {
  slug: string;
  title: string;
  badge: string;
  desc: string;
  details?: string;
  url?: string;
  img: string | null;
  images?: string[];
  icon: string;
  bg: string;
  developerNotes?: DeveloperNote[];
  roadmap?: RoadmapPhase[];
  patchNotes?: PatchNote[];
};

// ── 게임 ───────────────────────────────────────────────────

export const games: CardItem[] = [
  {
    slug: "jump-game", title: "점프게임", badge: "아케이드",
    desc: "끝없이 올라가는 실시간 랭킹 경쟁 게임", img: null, icon: "🕹️",
    bg: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  },
  {
    slug: "bitcoin-simulator", title: "비트코인 시뮬레이터", badge: "시뮬",
    desc: "비트코인 모의 투자 게임", img: null, icon: "₿",
    bg: "linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #7a4100 100%)",
      developerNotes:[
          {date:"2026.03.29", title:"코인투자와 생활시뮬레이션", content:"현재 집 꾸미기 시스템의 핵심인 RoomSystem을 개발 중입니다. 내가 배치한 '컴퓨터'가 코인 상승 확률을 높여주고, '냉장고'가 식비를 줄여주는 등 인테리어가 전략이 되는 재미를 보여드리겠습니다."},
          {date:"2026.03.27", title:"0원 무한 생존 버그 수정", content:"초기 테스트 중 자산이 정확히 0원이 되면 파산 체크를 통과해 버리는 버그가 있었습니다. 이를 < 0에서 <= 0으로 수정하고, 보유 코인 가치까지 합산해 체크하도록 로직을 강화했습니다."},
          {date:"2026.03.11", title:"코드 기반의 UI설계", content:"이번 프로젝트는 유니티 씬에 프리팹을 미리 배치하지 않고, UIManager를 통해 코드 레벨에서 모든 패널을 제어하도록 설계했습니다. 덕분에 UI 간의 데이터 전달이 명확해졌습니다."},
          {date:"2026.03.10", title:"파산과 생존", content:"자산이 0원이 되면 게임오버되는 조건에 생활비라는 변수를 넣었습니다. 코인 수익의 22%는 세금으로 나가고,식비가 나갑니다. 이 압박감이 플레이어로 하여금 더 신중한 투자를 하게 만듭니다."},
      ],
      roadmap: [
          {
              phase: "Phase 1",
              label: "Core Investment System",
              period: "2026 Q1",
              status: "done",
              items: [
                  "틱(Tick) 기반 실시간 경제 엔진 및 백그라운드 처리 구현",
                  "FUTURE_CHANGES_COUNT 기반 코인 시뮬레이션 로직 완성",
                  "계좌 분리(현금/코인), 대출 및 22% 수익 과세 시스템 구축",
                  "Firebase Auth(Google) 및 Firestore 랭킹 시스템 연동",
                  "0원 무한 생존 차단 및 UI 렌더링 버그 수정 완료"
              ]
          },
          {
              phase: "Phase 2",
              label: "Room & Furniture System",
              period: "2026 Q2",
              status: "active",
              items: [
                  "방 등급별(지하방~아파트) N×N 그리드 타일맵 배치 시스템",
                  "가구별 실시간 버프(코인 확률 보정, 생활비 할인) 연동",
                  "가구 강화(Lv1~5) 및 티비 레벨별 가격 예측 기능 구현",
                  "주거 방식(월세/전세) 선택 및 보증금 환급 로직 개발",
                  "가구 보관함 및 방 데이터 저장/복원 시스템 (SaveManager)"
              ]
          },
          {
              phase: "Phase 3",
              label: "Social & Global Expansion",
              period: "2026 Q4",
              status: "upcoming",
              items: [
                  "전체 랭킹 상위 유저 집 방문 및 인테리어 구경 기능",
                  "파산 유저 집 '빨간딱지' 표시 등 시각적 몰입감 강화",
              ]
          }
      ],
      patchNotes: [
          // {
          //     version: "v1.4.0",
          //     date: "2026.04.10",
          //     type: "업데이트",
          //     changes: [
          //         { tag: "new", text: "방 꾸미기(RoomPanel) 및 가구 배치 시스템 레이아웃 추가" },
          //         { tag: "improve", text: "가구 레벨(Lv1~5)에 따른 코인 변동 확률 보정 로직 통합" },
          //         { tag: "improve", text: "주거 방식(월세/전세) 선택 및 보증금 환급 경제 시스템 반영" },
          //     ]
          // },
          {
              version: "v1.3.0",
              date: "2026.03.29",
              type: "업데이트",
              changes: [
                  { tag: "fix", text: "게임오버 시 Firestore 점수 저장 완주 보장 (Coroutine 도입)" },
                  { tag: "fix", text: "랭킹 시스템 내 🥇🥈🥉 이모지 렌더링 오류 수정 및 텍스트 통일" },
                  { tag: "improve", text: "구글 로그인 세션 유지 로직(SignInSilently) 예외 처리 강화" },
                  { tag: "improve", text: "UI 레이어 순서(SortingOrder) 조정을 통한 타이틀 텍스트 가려짐 수정" },
                  { tag: "fix", text: "0원 무한 생존 버그 수정을 위한 파산 판정 조건 강화 (<= 0 체크)" },
              ]
          },
          {
              version: "v1.2.0",
              date: "2026.03.20",
              type: "업데이트",
              changes: [
                  { tag: "new", text: "Firebase Auth 및 Google Sign-In 연동 시스템 구축" },
                  { tag: "new", text: "은행 대출(BankSystem) 및 연체 이자 자동 계산 시스템 추가" },
                  { tag: "improve", text: "5틱 주기 자동 저장(SaveManager) 및 JSON 직렬화 구조 개선" },
                  { tag: "improve", text: "코인 매도 수익에 대한 22% 과세 시스템 및 틱 단위 정산 적용" },
              ]
          },
          {
              version: "v1.1.0",
              date: "2026.03.11",
              type: "업데이트",
              changes: [
                  { tag: "new", text: "틱(Tick) 기반 코인 시장 시뮬레이션 및 가격 변동 엔진 최초 구현" },
                  { tag: "new", text: "MainHUDPanel 중심의 자산 표시 및 틱 진행바 UI 구조 설계" },
                  { tag: "new", text: "코인 상장/폐지 및 미래 변동폭(FUTURE_CHANGES) 선계산 로직 도입" },
              ]
          },
      ]
  },
  /* {
    slug: "hylab-quest", title: "HAEYOUNGLAB Quest", badge: "RPG",
    desc: "광활한 세계를 탐험하는 오픈월드 RPG", img: null, icon: "🎮",
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  },
  {
    slug: "cyber-grid", title: "CyberGrid", badge: "전략",
    desc: "미래 도시를 배경으로 한 전략 시뮬레이션", img: null, icon: "🏙️",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #0d2137 50%, #0a3d62 100%)",
  },
  {
    slug: "pulse-runner", title: "PulseRunner", badge: "액션",
    desc: "빠른 템포의 리듬 기반 러닝 게임", img: null, icon: "⚡",
    bg: "linear-gradient(135deg, #1a0000 0%, #3d0c0c 50%, #6b1010 100%)",
  },
  {
    slug: "mind-vault", title: "MindVault", badge: "퍼즐",
    desc: "두뇌를 자극하는 심층 퍼즐 어드벤처", img: null, icon: "🧩",
    bg: "linear-gradient(135deg, #001a0a 0%, #0d3320 50%, #1a5c3a 100%)",
  },
  {
    slug: "star-forge", title: "StarForge", badge: "시뮬",
    desc: "우주 행성을 건설하는 샌드박스 시뮬레이션", img: null, icon: "🌌",
    bg: "linear-gradient(135deg, #050520 0%, #0a0a40 50%, #0d0d60 100%)",
  },
  {
    slug: "shadow-blade", title: "ShadowBlade", badge: "액션",
    desc: "닌자 세계를 배경으로 한 스텔스 액션", img: null, icon: "🥷",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a1a00 100%)",
  },
  {
    slug: "zen-garden", title: "ZenGarden", badge: "캐주얼",
    desc: "힐링 감성의 정원 가꾸기 모바일 게임", img: null, icon: "🌸",
    bg: "linear-gradient(135deg, #0a1a0a 0%, #1a3320 50%, #0d2610 100%)",
  }, */
];

// ── 웹앱 ───────────────────────────────────────────────────

export const webapps: CardItem[] = [
  {
    slug: "hylab-dashboard", title: "HAEYOUNGLAB Platform", badge: "웹앱",
    desc: "해영랩 서비스 및 기술 소개 허브", img: null, icon: "📊",
    bg: "linear-gradient(135deg, #001a1a 0%, #003d3d 50%, #005c5c 100%)",
    url: "https://www.haeyounglab.com/",
    details: "해영랩(HAEYOUNGLAB)의 공식 웹사이트입니다. 혁신적인 기술과 창의적인 콘텐츠로 더 나은 세상을 만들어가는 해영랩의 다양한 서비스, 게임, 웹앱, 미들웨어 프로젝트를 확인하실 수 있습니다.",
    developerNotes: [
      { date: "2026.04.08", title: "소개 페이지 개편 & 모바일 개발현황 모달 추가", content: "소개 영역 전면 수정과 함께 소개 페이지 이미지를 추가했습니다. 디테일 페이지 데이터를 별도 파일로 분리해 유지보수성을 높였고, 모바일에서 현재 개발 중인 항목을 확인할 수 있는 개발현황 모달을 새로 구현했습니다." },
      { date: "2026.04.06", title: "디테일 페이지 모바일 최적화 & UX 개선", content: "디테일 페이지를 모바일 화면에 맞게 전면 개선했습니다. 뒤로가기 버튼 동작을 수정하고, 스크롤 시 화면이 깨지는 버그를 수정했습니다. 문의하기와 Footer를 분리했으며, 스크롤 진행바가 움직임이 없을 때 자동으로 사라지도록 개선했습니다. 이미지 슬롯과 배너 속도도 조정했습니다." },
      { date: "2026.04.05", title: "디테일 페이지 구축 & 슬라이드 배너 완성", content: "디테일 페이지에 문의 영역과 상단 메뉴바를 추가했습니다. 배너 클릭 시 팝업이 열리는 기능을 구현했고, 모바일 배너 크기 및 메뉴바 글씨 깨짐 문제를 수정했습니다. 페이지별 자동 화면 전환과 슬라이드 배너, 스크롤 페이징 기능을 완성했습니다." },
      { date: "2026.04.04", title: "프로젝트 초기 구조 세팅", content: "메뉴바와 슬라이드 배너를 추가하고 페이지 영역을 분리하는 초기 작업을 진행했습니다. 프로젝트의 기본 레이아웃과 색상 테마, 탭 아이콘이 이 시점에 정의되었습니다." },
    ],
    roadmap: [
      { phase: "Phase 1", label: "초기 출시", period: "2026 Q4", status: "done", items: ["기본 페이지 구성", "반응형 디자인"] },
      { phase: "Phase 2", label: "콘텐츠 확장", period: "2026 Q2", status: "active", items: ["서비스 소개 페이지", "블로그 연동"] },
      { phase: "Phase 3", label: "기능 고도화", period: "2026 Q4", status: "upcoming", items: ["다국어 지원", "SEO 최적화"] },
    ],
    patchNotes: [
      { version: "v1.4.0", date: "2026.04.08", type: "업데이트", changes: [
        { tag: "new", text: "모바일 개발현황 모달 추가" },
        { tag: "improve", text: "소개 페이지 문구 및 이미지 전면 개편" },
        { tag: "improve", text: "디테일 페이지 데이터 파일 분리로 구조 개선" },
      ]},
      { version: "v1.3.0", date: "2026.04.06", type: "업데이트", changes: [
        { tag: "fix", text: "스크롤 시 화면 깨짐 버그 수정" },
        { tag: "fix", text: "모바일 훅킹(스냅 스크롤) 오작동 수정" },
        { tag: "fix", text: "디테일 페이지 뒤로가기 버튼 동작 수정" },
        { tag: "new", text: "디테일 페이지 이미지 슬롯 추가" },
        { tag: "improve", text: "디테일 페이지 모바일 레이아웃 전면 개선" },
        { tag: "improve", text: "문의하기·Footer 영역 분리" },
        { tag: "improve", text: "비활성 시 진행바 자동 숨김 처리" },
        { tag: "improve", text: "배너 전환 속도 조정 및 디테일 진입 시 메뉴바 숨김" },
      ]},
      { version: "v1.2.0", date: "2026.04.05", type: "업데이트", changes: [
        { tag: "new", text: "배너 클릭 시 디테일 팝업 페이지 생성" },
        { tag: "new", text: "디테일 페이지 문의 영역 추가" },
        { tag: "new", text: "스크롤 페이지 페이징 및 자동 화면 전환 기능 추가" },
        { tag: "new", text: "메뉴바 호버 애니메이션 추가" },
        { tag: "fix", text: "모바일 배너 크기 및 메뉴바 글씨 깨짐 수정" },
        { tag: "improve", text: "페이지 영역 높이·마진 조정" },
        { tag: "improve", text: "페이지 탭 아이콘 및 색상 테마 적용" },
      ]},
      { version: "v1.1.0", date: "2026.04.04", type: "업데이트", changes: [
        { tag: "new", text: "상단 메뉴바 및 슬라이드 배너 최초 추가" },
        { tag: "new", text: "게임·웹앱·미들웨어·문의 페이지 영역 분리" },
      ]},
    ],
  },
  /* {
    slug: "flow-board", title: "FlowBoard", badge: "웹앱",
    desc: "팀 협업을 위한 스마트 작업 관리 보드", img: null, icon: "📋",
    bg: "linear-gradient(135deg, #0d0d2b 0%, #1a1a4a 50%, #2d2d7a 100%)",
  },
  {
    slug: "cloud-notes", title: "CloudNotes", badge: "웹앱",
    desc: "어디서든 접근 가능한 클라우드 메모 서비스", img: null, icon: "☁️",
    bg: "linear-gradient(135deg, #001429 0%, #003366 50%, #004d99 100%)",
  },
  {
    slug: "form-builder", title: "FormBuilder", badge: "웹앱",
    desc: "드래그 앤 드롭으로 만드는 설문·폼 빌더", img: null, icon: "📝",
    bg: "linear-gradient(135deg, #1a0029 0%, #3d0066 50%, #5c0099 100%)",
  },
  {
    slug: "shop-lite", title: "ShopLite", badge: "웹앱",
    desc: "소규모 사업자를 위한 간편 쇼핑몰 빌더", img: null, icon: "🛒",
    bg: "linear-gradient(135deg, #1a1a00 0%, #333300 50%, #4d4d00 100%)",
  },
  {
    slug: "event-hub", title: "EventHub", badge: "웹앱",
    desc: "행사·이벤트 관리 및 티켓 판매 플랫폼", img: null, icon: "🎟️",
    bg: "linear-gradient(135deg, #1a0010 0%, #3d0026 50%, #5c003a 100%)",
  },
  {
    slug: "resume-ai", title: "ResumeAI", badge: "웹앱",
    desc: "AI가 추천하는 맞춤형 이력서 작성 도구", img: null, icon: "🤖",
    bg: "linear-gradient(135deg, #001a29 0%, #003352 50%, #004d7a 100%)",
  }, */
];

// ── 미들웨어 ────────────────────────────────────────────────

export const utilities: CardItem[] = [
  {
    slug: "scrum-bot", title: "스크럼 봇", badge: "미들웨어",
    desc: "Slack · Notion · 스프레드시트 연동 협업 자동화", img: null, images: ["/scrumbot1.png", "/scrumbot2.png", "/scrumbot3.png", "/scrumbot4.png", "/scrumbot5.png"], icon: "🤝",
    bg: "linear-gradient(135deg, #0a1a2e 0%, #16213e 50%, #0f3460 100%)",
    url: "https://scrum.haeyounglab.com/",
    developerNotes: [
      { date: "2026.04.08", title: "하위·상위 스크럼 계층 구조 완성", content: "스크럼 주기를 부모-자식 트리 구조로 분리했습니다. 상위 주기(예: 위클리)가 종료될 때 하위 주기(데일리)의 스크럼을 자동 수집해 마크다운 다이제스트로 Slack에 발송합니다. 레거시 테이블을 정리하고 scrum_cadence_levels 단일 테이블로 통합했습니다." },
      { date: "2026.04.06", title: "데일리·위클리·먼슬리 다계층 스크럼 확장", content: "스크럼 주기를 calendar_day / week_monday / month_first / year_first / every_n_days 5가지 타입으로 확장했습니다. 각 주기별 startCron/endCron을 독립적으로 설정할 수 있으며, /scrum-set UI에서 타임존·리드·주기를 한 번에 구성할 수 있습니다." },
      { date: "2026.04.03", title: "데일리 스타트·엔드 스크럼 및 프리필 로직 구현", content: "하루 시작(LAST·PLAN)과 마무리(DONE·NEXT) 두 단계의 스크럼을 Slack DM 모달로 입력받습니다. 종료 스크럼의 DONE 항목이 다음 시작 스크럼의 LAST로, NEXT 항목이 PLAN으로 자동 프리필되어 연속성을 보장합니다. 입력된 스크럼은 채널 스레드에 누적 게시됩니다." },
      { date: "2026.03.26", title: "NestJS + Prisma + Slack Bolt 스택 초기 구축", content: "NestJS 기반 백엔드와 Prisma ORM(PostgreSQL), Slack Bolt를 통합한 초기 아키텍처를 구성했습니다. 팀별 독립 설정을 지원하는 멀티 테넌트 구조로 설계했으며, CronJob을 동적으로 등록·해제하는 스케줄러 시스템을 구현했습니다." },
    ],
    roadmap: [
      { phase: "Phase 1", label: "초기 구축", period: "2026.03", status: "done", items: ["NestJS·Prisma·Slack Bolt 통합", "멀티 테넌트 DB 설계", "동적 크론 스케줄러"] },
      { phase: "Phase 2", label: "스크럼 기능 완성", period: "2026.04", status: "active", items: ["데일리 스타트·엔드 스크럼", "위클리·먼슬리 다계층 확장", "부모-자식 다이제스트 자동화"] },
      { phase: "Phase 3", label: "외부 연동", period: "2026 Q2", status: "upcoming", items: ["Notion 페이지 자동 기록", "Google 스프레드시트 연동", "팀별 리포트 대시보드","ai 요약",] },
      { phase: "Phase 4", label: "정식 서비스", period: "2026 Q3", status: "upcoming", items: ["Slack App Directory 등록", "팀 초대·관리 UI", "사용량 분석 기능", "Discord 확장"] },
    ],
    patchNotes: [
      { version: "v1.2.0", date: "2026.04.08", type: "업데이트", changes: [
        { tag: "new", text: "상위 주기 종료 시 하위 스크럼 자동 수집 다이제스트 발송" },
        { tag: "improve", text: "레거시 스크럼 테이블 정리 및 scrum_cadence_levels 단일 테이블로 통합" },
        { tag: "new", text: "연 단위(year_first) 스크럼 주기 및 월말 스마트 감지 지원" },
      ]},
      { version: "v1.1.0", date: "2026.04.06", type: "업데이트", changes: [
        { tag: "new", text: "위클리(week_monday)·먼슬리(month_first) 스크럼 주기 추가" },
        { tag: "new", text: "N일 주기(every_n_days) 커스텀 설정 지원" },
        { tag: "improve", text: "/scrum-set 모달 UI 개선 및 타임존 설정 추가" },
        { tag: "new", text: "캘린더 모드 스크럼 입력(TODAY·CARRY·EXTRA·TOMORROW) 지원" },
      ]},
      { version: "v1.0.0", date: "2026.04.03", type: "출시", changes: [
        { tag: "new", text: "데일리 스타트 스크럼(LAST·PLAN) Slack DM 발송 및 모달 입력" },
        { tag: "new", text: "데일리 엔드 스크럼(DONE·NEXT) 자동 수집 및 채널 스레드 게시" },
        { tag: "new", text: "이전 DONE → 다음 LAST 자동 프리필 로직 구현" },
        { tag: "new", text: "팀원별 DM 자동 발송 스케줄러 (크론 기반)" },
      ]},
    ],
  },
  {
    slug: "tax-automation", title: "세무 증빙 자동화 툴", badge: "미들웨어",
    desc: "R&D 세무 증빙 협업 툴 미들웨어", img: null, icon: "🧾",
    bg: "linear-gradient(135deg, #0d1b0d 0%, #1a3a1a 50%, #0f4c0f 100%)",
  },
  {
    slug: "youtube-shorts-pipeline", title: "유튜브 쇼츠 자동화 파이프라인", badge: "미들웨어",
    desc: "쇼츠 콘텐츠 기획·편집·업로드 자동화 시스템", img: null, icon: "🎬",
    bg: "linear-gradient(135deg, #1a0000 0%, #3d0000 50%, #7a0000 100%)",
  },
  /* {
    slug: "secure-vault", title: "SecureVault", badge: "미들웨어",
    desc: "기업용 파일 암호화 및 보안 관리 도구", img: null, icon: "🔐",
    bg: "linear-gradient(135deg, #1a0000 0%, #4d0000 50%, #800000 100%)",
  },
  {
    slug: "data-sync-pro", title: "DataSync Pro", badge: "미들웨어",
    desc: "실시간 데이터 동기화 및 백업 솔루션", img: null, icon: "🔄",
    bg: "linear-gradient(135deg, #000d1a 0%, #001f3d 50%, #003366 100%)",
  },
  {
    slug: "code-lens", title: "CodeLens", badge: "미들웨어",
    desc: "코드 품질 분석 및 리뷰 자동화 툴", img: null, icon: "🔍",
    bg: "linear-gradient(135deg, #001a00 0%, #003300 50%, #1a5200 100%)",
  },
  {
    slug: "log-tracer", title: "LogTracer", badge: "미들웨어",
    desc: "시스템 로그 수집 및 이상 탐지 모니터링", img: null, icon: "📡",
    bg: "linear-gradient(135deg, #1a0d00 0%, #4d2600 50%, #804000 100%)",
  },
  {
    slug: "patch-bot", title: "PatchBot", badge: "미들웨어",
    desc: "서버 패치 및 배포 자동화 스크립트 관리", img: null, icon: "🤖",
    bg: "linear-gradient(135deg, #0d001a 0%, #1a0033 50%, #29004d 100%)",
  },
  {
    slug: "disk-map", title: "DiskMap", badge: "미들웨어",
    desc: "디스크 사용량 시각화 및 정리 도구", img: null, icon: "💾",
    bg: "linear-gradient(135deg, #001a1a 0%, #003333 50%, #004040 100%)",
  },
  {
    slug: "net-watch", title: "NetWatch", badge: "미들웨어",
    desc: "네트워크 트래픽 실시간 모니터링 미들웨어", img: null, icon: "📶",
    bg: "linear-gradient(135deg, #0a0a1a 0%, #14143d 50%, #1e1e5c 100%)",
  }, */
];

// ── 섹션 통합 ──────────────────────────────────────────────

export const allSections = {
  game: { label: "게임", items: games },
  webapp: { label: "웹앱", items: webapps },
  utility: { label: "미들웨어", items: utilities },
} as const;

export type SectionKey = keyof typeof allSections;