export type Lang = "KO" | "EN" | "JP";

export const t = {
  KO: {
    /* Navbar */
    logoName: "HAEYOUNGLAB",

    /* Hero */
    heroEyebrow: "About HAEYOUNGLAB",
    heroTitle: "상상을 현실로\n아이디어를 실현하다",
    heroDesc:
      "해영랩(HAEYOUNGLAB)은 복잡한 기술 이론보다 어떻게 이 아이디어를 세상에 내놓을 수 있을까를 고민합니다. 우리는 넘쳐나는 상상력을 멈추지 않고 구현합니다. 게임, 웹 앱, 미들웨어 등 분야를 가리지 않는 실행력이 해영랩의 진짜 기술입니다.",
    heroCta: "서비스 보기 →",
    liveBuildTitle: "지금 해영랩이 개발중인 것들",

    /* Build status tags */
    tagBuilding: "BUILDING",
    tagPlanned: "PLANNED",

    /* Build items */
    buildItems: [
      { label: "비트코인 시뮬레이터 게임", desc: "비트코인 모의 투자 게임" },
      { label: "점프게임", desc: "끝없이 올라가는 실시간 랭킹 경쟁 게임" },
      { label: "스크럼 봇", desc: "Slack · Notion · 스프레드시트 연동 협업 자동화" },
      { label: "세무 증빙 자동화 툴", desc: "R&D 세무 증빙 협업 툴 미들웨어" },
      { label: "유튜브 자동화 파이프라인", desc: "콘텐츠 기획·편집·업로드 자동화 시스템" },
    ],

    /* Sections */
    sectionAbout: "소개",
    sectionGame: "게임",
    sectionWebapp: "웹앱",
    sectionMiddleware: "미들웨어",
    sectionPartners: "특허·협업",
    sectionContact: "문의",

    /* AutoSection */
    viewDetail: "자세히보기 →",

    /* Partners */
    partnersEyebrow: "Patents & Partners",
    partnersTitle: "특허 & 협업기관",
    patentsLabel: "보유 특허",
    partnersLabel: "협업기관",

    /* Contact */
    contactEyebrow: "Contact",
    contactTitle: "문의하기",
    contactDesc: "해영랩(HAEYOUNGLAB)에 궁금한 점이 있으시면 언제든지 연락 주세요. 빠른 시일 내에 답변 드리겠습니다.",
    contactPhone: "전화",
    contactEmail: "이메일",
    contactNameLabel: "이름",
    contactNamePlaceholder: "이름",
    contactEmailLabel: "이메일",
    contactEmailPlaceholder: "example@email.com",
    contactMessageLabel: "문의 내용",
    contactMessagePlaceholder: "문의 내용을 입력해 주세요.",
    contactSubmit: "문의 보내기",
    contactSending: "전송 중...",
    contactSuccess: "✓ 문의가 성공적으로 전송되었습니다!",

    /* Commission */
    commissionEyebrow: "Commission",
    commissionTitle: "페이지 제작해드립니다",
    commissionDesc: "게임, 웹앱, 미들웨어 등 다양한 서비스 페이지를 맞춤 제작해 드립니다. 요구사항을 남겨주시면 빠르게 검토 후 연락드리겠습니다.",
    commissionMessagePlaceholder: "원하시는 페이지 유형, 기능, 참고 사이트 등을 알려주세요.",
    commissionSubmit: "문의 보내기",

    /* Footer */
    footerDesc: "혁신적인 기술과 창의적인 콘텐츠로 더 나은 세상을 만들어갑니다.",
    footerContact: "Contact",
    footerLinks: "바로가기",
    footerNav: [
      { label: "소개", href: "#about" },
      { label: "웹앱", href: "/haeyoungsoftware#webapp" },
      { label: "게임", href: "/haeyoungsoftware#game" },
      { label: "미들웨어", href: "/haeyoungsoftware#utility" },
      { label: "문의", href: "#contact" },
    ],
  },

  EN: {
    /* Navbar */
    logoName: "HAEYOUNGLAB",

    /* Hero (소개) */
    heroEyebrow: "About HAEYOUNGLAB",
    heroTitle: "Imagination into Reality\nIdeas into Action",
    heroDesc:
      "HAEYOUNGLAB focuses on how to bring ideas into the world, not on complex theories. We never stop our overflowing imagination. The ability to execute across games, web apps, and middleware is HAEYOUNGLAB's true technology.",
    heroCta: "View Services →",
    liveBuildTitle: "What HAEYOUNGLAB is building now",

    /* Build status tags */
    tagBuilding: "BUILDING",
    tagPlanned: "PLANNED",

    /* Build items */
    buildItems: [
      { label: "Bitcoin Simulator Game", desc: "Bitcoin mock investment game" },
      { label: "Jump Game", desc: "Endless climbing real-time ranking game" },
      { label: "Scrum Bot", desc: "Slack · Notion · Spreadsheet automation" },
      { label: "Tax Evidence Automation Tool", desc: "R&D tax evidence middleware" },
      { label: "YouTube Automation Pipeline", desc: "Content planning · editing · upload automation" },
    ],

    /* Sections */
    sectionAbout: "About",
    sectionGame: "Games",
    sectionWebapp: "Web Apps",
    sectionMiddleware: "Middleware",
    sectionPartners: "Patents & Partners",
    sectionContact: "Contact",

    /* AutoSection */
    viewDetail: "View Details →",

    /* Partners */
    partnersEyebrow: "Patents & Partners",
    partnersTitle: "Patents & Partners",
    patentsLabel: "Patents",
    partnersLabel: "Partners",

    /* Contact */
    contactEyebrow: "Contact",
    contactTitle: "Contact Us",
    contactDesc:
      "If you have any questions about HAEYOUNGLAB, feel free to reach out. We will get back to you as soon as possible.",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactNameLabel: "Name",
    contactNamePlaceholder: "Name",
    contactEmailLabel: "Email",
    contactEmailPlaceholder: "example@email.com",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "Please enter your message.",
    contactSubmit: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "✓ Your message has been sent successfully!",

    /* Commission (detail page) */
    commissionEyebrow: "Commission",
    commissionTitle: "We build pages for you",
    commissionDesc:
      "We create custom service pages for games, web apps, middleware, and more. Leave your requirements and we'll get back to you quickly.",
    commissionMessagePlaceholder:
      "Please describe the type of page, features, or reference sites you have in mind.",
    commissionSubmit: "Send Request",

    /* Footer */
    footerDesc: "Creating a better world with innovative technology and creative content.",
    footerContact: "Contact",
    footerLinks: "Links",
    footerNav: [
      { label: "About", href: "#about" },
      { label: "Web Apps", href: "/haeyoungsoftware#webapp" },
      { label: "Games", href: "/haeyoungsoftware#game" },
      { label: "Middleware", href: "/haeyoungsoftware#utility" },
      { label: "Contact", href: "#contact" },
    ],
  },

  JP: {
    /* Navbar */
    logoName: "HAEYOUNGLAB",

    /* Hero */
    heroEyebrow: "HAEYOUNGLABについて",
    heroTitle: "想像を現実に\nアイデアを実現する",
    heroDesc:
      "HAEYOUNGLABは複雑な技術理論よりも、このアイデアをどう世に出すかを考えます。溢れる想像力を止めることなく実現し続けます。ゲーム・Webアプリ・ミドルウェアを問わない実行力が、HAEYOUNGLABの真の技術です。",
    heroCta: "サービスを見る →",
    liveBuildTitle: "HAEYOUNGLABが今開発中のもの",

    /* Build status tags */
    tagBuilding: "開発中",
    tagPlanned: "予定",

    /* Build items */
    buildItems: [
      { label: "ビットコインシミュレーターゲーム", desc: "ビットコイン模擬投資ゲーム" },
      { label: "ジャンプゲーム", desc: "無限に登るリアルタイムランキングゲーム" },
      { label: "スクラムボット", desc: "Slack · Notion · スプレッドシート連携自動化" },
      { label: "税務証憑自動化ツール", desc: "R&D税務証憑ミドルウェア" },
      { label: "YouTubeパイプライン", desc: "コンテンツ企画・編集・アップロード自動化" },
    ],

    /* Sections */
    sectionAbout: "About",
    sectionGame: "ゲーム",
    sectionWebapp: "Webアプリ",
    sectionMiddleware: "ミドルウェア",
    sectionPartners: "特許・提携",
    sectionContact: "お問い合わせ",

    /* AutoSection */
    viewDetail: "詳細を見る →",

    /* Partners */
    partnersEyebrow: "Patents & Partners",
    partnersTitle: "特許 & 提携機関",
    patentsLabel: "保有特許",
    partnersLabel: "提携機関",

    /* Contact */
    contactEyebrow: "Contact",
    contactTitle: "お問い合わせ",
    contactDesc:
      "HAEYOUNGLABについてご不明な点がございましたら、いつでもお気軽にご連絡ください。できるだけ早くご返答いたします。",
    contactPhone: "電話",
    contactEmail: "メール",
    contactNameLabel: "お名前",
    contactNamePlaceholder: "お名前",
    contactEmailLabel: "メールアドレス",
    contactEmailPlaceholder: "example@email.com",
    contactMessageLabel: "お問い合わせ内容",
    contactMessagePlaceholder: "お問い合わせ内容をご入力ください。",
    contactSubmit: "送信する",
    contactSending: "送信中...",
    contactSuccess: "✓ メッセージが正常に送信されました！",

    /* Commission */
    commissionEyebrow: "Commission",
    commissionTitle: "ページ制作承ります",
    commissionDesc:
      "ゲーム・Webアプリ・ミドルウェアなど、様々なサービスページをオーダーメイドで制作いたします。ご要件をお送りいただければ、迅速にご対応いたします。",
    commissionMessagePlaceholder:
      "ご希望のページの種類・機能・参考サイトなどをお知らせください。",
    commissionSubmit: "リクエストを送る",

    /* Footer */
    footerDesc: "革新的な技術とクリエイティブなコンテンツで、より良い世界を作っていきます。",
    footerContact: "連絡先",
    footerLinks: "リンク",
    footerNav: [
      { label: "About", href: "#about" },
      { label: "Webアプリ", href: "/haeyoungsoftware#webapp" },
      { label: "ゲーム", href: "/haeyoungsoftware#game" },
      { label: "ミドルウェア", href: "/haeyoungsoftware#utility" },
      { label: "お問い合わせ", href: "#contact" },
    ],
  },
} as const;

export type Translations = (typeof t)["EN"];