/**
 * 김남해 서브컬쳐 '덕력' 어필 데이터.
 * 김남해 메인 프로필(/Namhae_Kim)과 래빗홀 제출 페이지(/Namhae_Kim/rabbithole) 모두에서 사용됩니다.
 */

export type OtakuPillar = {
  icon: string;
  title: string;
  /** 캐릭터·계정 등 핵심 메타 정보 (선택) */
  meta?: { label: string; value: string }[];
  /** 집착의 깊이 */
  depth: string;
  /** 사유 */
  reason: string;
  /** 책임·역할 풀사이클 (공대장 같은 리더십 사례용) */
  roleBlock?: {
    title: string;
    subtitle?: string;
    items: { icon: string; label: string; text: string }[];
    /** 마지막 1줄 — 개발/업무로의 자연스러운 매핑 */
    bridge?: string;
  };
  /** 외부 증빙 링크 (FFXIV Lodestone, FFLogs 등) */
  links?: { label: string; href: string; note?: string }[];
  /** 보조 리스트 (탐독 리스트 등) */
  lists?: { label: string; items: string[] }[];
};

export const namhaeOtaku = {
  level: "Lv.3",
  type: "심연 집중형",
  intro:
    "넓고 얕은 지식보다, **한 번 선택한 세계관의 심연을 끝까지 파헤치는 것**에 집착합니다. 제 몰입의 근거는 다음 두 가지입니다.",
  pillars: [
    {
      icon: "⚔️",
      title: "FFXIV 글로벌 서버 '절(Ultimate)' 난이도 공대장",
      meta: [
        { label: "캐릭터", value: "Psycho-path Asha-maru" },
        { label: "월드 / DC", value: "Ixion (Mana)" },
        { label: "잡 운용", value: "**올라운더** — 전 잡 Lv.100 (탱커·힐러·DPS 모두 수행)" },
        { label: "최고 기록", value: "The Omega Protocol (Ultimate) — **세계 39위**" },
      ],
      depth:
        "전 세계 유저 중 **0.1%**만이 도전하는 **최고난도 컨텐츠**를 위해 수개월간 매일 같은 시간에 모여 **20분간의 무결점 플레이**를 지향했습니다.",
      reason:
        "단 한 명의 실수도 허용되지 않는 **극한의 시퀀스**를 완성하기 위해 **수천 번의 전멸**을 견뎠습니다. '클리어'라는 결과보다 그 **압도적인 난도를 정복해 나가는 과정** 자체에 중독되어 있습니다.",
      roleBlock: {
        title: "공대장 풀사이클 — 단순 플레이어가 아닌 8인 팀 운영자",
        subtitle: "0.1% 컨텐츠 클리어는 결국 사람과 일정을 관리한 결과입니다.",
        items: [
          {
            icon: "🧲",
            label: "인원 모집",
            text: "직군(탱·힐·DPS) 균형과 출석 가능성을 보고 **8인을 직접 스카우트**",
          },
          {
            icon: "🧠",
            label: "전략 수립",
            text: "보스 기믹을 분해해 **자체 공략·콜링 시퀀스를 설계**, 페이즈별 분담 정의",
          },
          {
            icon: "🖼️",
            label: "슬라이드 제작",
            text: "포지셔닝·역할·타임라인을 **시각화한 자료를 직접 제작**해 팀에 공유",
          },
          {
            icon: "🗓️",
            label: "일정 조율",
            text: "8명의 시간대·생업을 맞춰 **수개월간 정기 트라이** 운영",
          },
          {
            icon: "🤝",
            label: "팀원 불화 조율",
            text: "갈등 발생 시 **1:1 면담·교체 결정·합의 도출**까지 책임지고 처리",
          },
          {
            icon: "🎙️",
            label: "실전 지휘",
            text: "트라이 중 **실시간 콜링·복원**·시도/회고 루프 운영, 모랄 유지",
          },
          {
            icon: "🏆",
            label: "결과",
            text: "최종 클리어 + The Omega Protocol(Ultimate) **세계 39위** 도달",
          },
        ],
        bridge:
          "이 풀사이클은 그대로 엔지니어링 팀의 \u201C**인력 인터뷰·온보딩, 스프린트 계획·회고, 위키/슬라이드 빌딩, 회의 운영, 팀 내 중재, 릴리스 일정 관리**\u201D로 옮겨 적용됩니다.",
      },
      links: [
        {
          label: "FFXIV Lodestone — 캐릭터 프로필",
          href: "https://jp.finalfantasyxiv.com/lodestone/character/36950353/",
          note: "잡 LV·종족·소속 등 공식 프로필",
        },
        {
          label: "FFLogs — 클리어 로그 (The Omega Protocol 세계 39위)",
          href: "https://www.fflogs.com/character/jp/ixion/psycho-path%20asha-maru",
          note: "전투 로그·랭킹 객관 증빙",
        },
      ],
    },
    {
      icon: "📚",
      title: "고전 문학의 '긴 호흡' 탐독",
      depth:
        "남들이 '지루하다'고 느끼는 **수천 페이지 분량의 대서사시**에 깊게 침잠합니다.",
      reason:
        "현대의 짧은 도파민보다, **19세기 인간 내면의 복잡한 뒤틀림**이나 조지 오웰이 그린 **디스토피아적 세계관**처럼 무겁고 축축한 텍스트 속에서 헤엄치는 것을 좋아합니다.",
      lists: [
        {
          label: "탐독 리스트",
          items: [
            "단테 《신곡》",
            "마키아벨리 《군주론》",
            "셰익스피어 《햄릿》",
            "셰익스피어 《오셀로》",
            "밀턴 《실락원》",
            "밀턴 《복락원》",
            "조너선 스위프트 《걸리버 여행기》",
            "괴테 《젊은 베르테르의 슬픔》",
            "괴테 《파우스트》",
            "도스토옙스키 《죄와 벌》",
            "도스토옙스키 《악령》",
            "도스토옙스키 《카라마조프가의 형제들》",
            "올더스 헉슬리 《멋진 신세계》",
            "조지 오웰 《1984》",
            "필립 K. 딕 《안드로이드는 전기양을 꿈꾸는가?》",
            "다자이 오사무 《인간 실격》",
            "프루스트 《잃어버린 시간을 찾아서》 전권",
          ],
        },
      ],
    },
  ] satisfies OtakuPillar[],
  closing:
    "**수만 번의 전멸**을 견디며 시퀀스를 완성하는 끈기와, **수천 페이지의 긴 텍스트**를 끝까지 읽어내는 집중력은, **디버깅·아키텍처 설계·장기 운영** 같은 \u201C긴 호흡\u201D이 필요한 개발 작업에서도 동일하게 발휘됩니다.",
} as const;
