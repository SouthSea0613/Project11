"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { games, webapps, utilities, type CardItem } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import { useLang } from "@/contexts/LanguageContext";

/* ── 섹션 ID 목록 ── */
const SECTION_IDS = ["about", "webapp", "game", "utility", "partners", "contact"] as const;

type SectionId = (typeof SECTION_IDS)[number];

/* ── 오른쪽 세로 진행바 ── */
function ProgressBar({ active }: { active: SectionId }) {
    const [visible, setVisible] = useState(false);
    const { tr } = useLang();

    const SECTIONS = [
        { id: "about",    label: tr.sectionAbout },
        { id: "webapp",   label: tr.sectionWebapp },
        { id: "game",     label: tr.sectionGame },
        { id: "utility",  label: tr.sectionMiddleware },
        { id: "partners", label: tr.sectionPartners },
        { id: "contact",  label: tr.sectionContact },
    ] as const;

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const show = () => {
            setVisible(true);
            clearTimeout(timer);
            timer = setTimeout(() => setVisible(false), 1500);
        };
        const events = ["mousemove", "mousedown", "touchstart", "touchmove", "scroll", "keydown"];
        events.forEach((e) => window.addEventListener(e, show, { passive: true }));
        return () => {
            events.forEach((e) => window.removeEventListener(e, show));
            clearTimeout(timer);
        };
    }, []);

    const isLight = active === "about";

    return (
        <div
            className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end select-none transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
        >
            {SECTIONS.map((section, i) => {
                const isActive = active === section.id;
                const isPast = SECTIONS.findIndex((s) => s.id === active) > i;

                return (
                    <div key={section.id} className="flex flex-col items-end">
                        <a href={`#${section.id}`} className="flex items-center gap-3 group" aria-label={section.label}>
                            <span className={`text-xs font-medium transition-all duration-300 ${
                                isLight
                                    ? isActive ? "text-white font-bold" : "text-white/50 group-hover:text-white"
                                    : isActive ? "text-foreground font-bold" : "text-muted-foreground group-hover:text-foreground"
                            }`}>
                                {section.label}
                            </span>
                            <div className={`rounded-full border-2 transition-all duration-300 ${
                                isLight
                                    ? isActive
                                        ? "w-4 h-4 bg-white border-white"
                                        : isPast
                                            ? "w-3 h-3 bg-white/40 border-white/40"
                                            : "w-3 h-3 bg-transparent border-white/50 group-hover:border-white"
                                    : isActive
                                        ? "w-4 h-4 bg-foreground border-foreground"
                                        : isPast
                                            ? "w-3 h-3 bg-foreground/40 border-foreground/40"
                                            : "w-3 h-3 bg-background border-muted-foreground group-hover:border-foreground"
                            }`} />
                        </a>
                        {i < SECTION_IDS.length - 1 && (
                            <div className="flex justify-end pr-[7px] py-1">
                                <div className={`w-px h-10 transition-all duration-300 ${
                                    isLight
                                        ? isPast ? "bg-white/40" : "bg-white/20"
                                        : isPast ? "bg-foreground/40" : "bg-border"
                                }`} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ── 슬라이드 선택 배너 섹션 ── */

function AutoSection({
                         id,
                         eyebrow,
                         title,
                         cards,
                         sectionKey,
                     }: {
    id: string;
    eyebrow: string;
    title: string;
    cards: CardItem[];
    sectionKey: string;
}) {
    const router = useRouter();
    const { tr } = useLang();
    const [activeIdx, setActiveIdx] = useState(0);
    const [slide, setSlide] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [winW, setWinW] = useState(0);

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 768);
            setWinW(window.innerWidth);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // 모바일: 섹션 px-8 = 양쪽 32px → 가용 너비에서 2장이 꽉 차도록
    const cardGap = isMobile ? 10 : 12;
    const visible = isMobile ?  2 :  4;
    const cardH   = isMobile ? 96 : 110;
    const cardW   = isMobile && winW > 0
        ? Math.floor((winW - 64 - cardGap) / 2)   // (화면너비 - 패딩64 - 간격) / 2
        : 200;
    const itemW = cardW + cardGap;

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => {
                const next = (prev + 1) % cards.length;
                // 마지막 → 첫 번째로 루프백할 때: transition 잠시 끔 → 즉시 이동 → 다시 킴
                if (next === 0) {
                    setSlide(false);
                    setTimeout(() => setSlide(true), 30);
                } else {
                    setSlide(true);
                }
                return next;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [cards.length]);

    const bannerW = visible * itemW - cardGap;
    const windowStart = Math.max(0, Math.min(activeIdx - 1, cards.length - visible));

    return (
        <section
            id={id}
            className="snap-start snap-always relative border-b overflow-hidden px-8 lg:px-20 h-dvh"
        >
            {/* ── 배경 레이어 ── */}
            {cards.map((card, i) => (
                <div
                    key={card.title}
                    className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
                    style={{ background: card.bg, opacity: i === activeIdx ? 0.55 : 0 }}
                />
            ))}
            <div className="absolute inset-0 bg-black/30" />

            {/* ── 콘텐츠 ── */}
            <div className="relative h-full flex flex-col py-14 max-w-screen-xl mx-auto w-full">

                {/* 상단: 타이틀(좌) + 자세히보기(우) */}
                <div className="flex items-start justify-between mt-16 md:mt-24">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">{eyebrow}</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">{title}</h2>
                    </div>
                    <Button
                        variant="outline"
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                        onClick={() => {
                            sessionStorage.setItem("scrollTop", String(document.documentElement.scrollTop));
                            router.push(`/detail/${sectionKey}/${cards[activeIdx].slug}`);
                        }}
                    >
                        {tr.viewDetail}
                    </Button>
                </div>

                <div className="flex-1" />

                {/* 하단: 배너 */}
                <div className="flex items-end">

                    {/* 왼쪽: 슬라이드 배너 + 도트 */}
                    <div className="flex flex-col gap-3">

                        {/* viewport: 4개 너비, overflow-hidden */}
                        <div
                            className="relative overflow-hidden"
                            style={{ width: `${bannerW}px`, height: `${cardH}px` }}
                        >
                            {/* 슬라이딩 선택 하이라이트 */}
                            <div
                                className="absolute top-0 bottom-0 rounded-xl border-2 border-white/60 shadow-[0_0_28px_rgba(255,255,255,0.22)] pointer-events-none z-10"
                                style={{
                                    width: `${cardW}px`,
                                    left: `${(activeIdx - windowStart) * itemW}px`,
                                    transition: slide ? "left 500ms cubic-bezier(0.4,0,0.2,1)" : "none",
                                }}
                            />

                            {/* 카드 스트립 (windowStart에 따라 translateX) */}
                            <div
                                className="flex absolute top-0 left-0 h-full"
                                style={{
                                    gap: `${cardGap}px`,
                                    transform: `translateX(-${windowStart * itemW}px)`,
                                    transition: slide ? "transform 500ms cubic-bezier(0.4,0,0.2,1)" : "none",
                                }}
                            >
                                {cards.map((card, i) => {
                                    const isActive = i === activeIdx;
                                    return (
                                        <button
                                            key={card.title}
                                            onClick={() => { setSlide(true); setActiveIdx(i); }}
                                            style={{ width: `${cardW}px`, flexShrink: 0 }}
                                            className={`relative text-left rounded-xl flex items-center gap-3 px-3 py-3 backdrop-blur-sm bg-black/35 border border-white/10 cursor-pointer transition-all duration-500
                        ${isActive ? "opacity-100 scale-[1.02]" : "opacity-55 hover:opacity-80"}`}
                                        >
                                            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-xl">
                                                {card.icon}
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <Badge className={`self-start text-[10px] border-0 transition-colors duration-500 ${
                                                    isActive ? "bg-white text-black hover:bg-white/90" : "bg-white/20 text-white/80 hover:bg-white/30"
                                                }`}>
                                                    {card.badge}
                                                </Badge>
                                                <h4 className="font-bold text-xs text-white leading-snug truncate">{card.title}</h4>
                                                <p className="text-[11px] text-white/55 line-clamp-1">{card.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 도트 인디케이터 */}
                        <div className="flex items-center gap-2">
                            {cards.map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-full transition-all duration-500"
                                    style={{
                                        width: i === activeIdx ? "22px" : "7px",
                                        height: "7px",
                                        backgroundColor: i === activeIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ── 메인 컴포넌트 ── */
export default function ContentSections() {
    const [activeSection, setActiveSection] = useState<SectionId>("game");
    const { tr } = useLang();

    // 디테일 페이지에서 돌아올 때 smooth 없이 즉시 복원 (페인트 전)
    useLayoutEffect(() => {
        const saved = sessionStorage.getItem("scrollTop");
        if (saved) {
            sessionStorage.removeItem("scrollTop");
            document.documentElement.style.scrollBehavior = "auto";
            document.documentElement.scrollTop = parseInt(saved);
            requestAnimationFrame(() => {
                document.documentElement.style.scrollBehavior = "";
            });
        }
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id as SectionId); },
                { threshold: 0.4 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <>
            <ProgressBar active={activeSection} />

            <AutoSection
                id="webapp" eyebrow="Web Applications" title={tr.sectionWebapp} cards={webapps} sectionKey="webapp"
            />
            <AutoSection
                id="game" eyebrow="Games" title={tr.sectionGame} cards={games} sectionKey="game"
            />
            <AutoSection
                id="utility" eyebrow="Utilities" title={tr.sectionMiddleware} cards={utilities} sectionKey="utility"
            />

            {/* ── 특허 & 협업기관 ── */}
            <section
                id="partners"
                className="snap-start snap-always flex flex-col justify-center border-b bg-background px-8 lg:px-20 h-dvh overflow-hidden"
            >
                <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-4 lg:gap-10 py-8 lg:py-14">
                    {/* 헤더 */}
                    <div>
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {tr.partnersEyebrow}
            </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">{tr.partnersTitle}</h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
                        {/* 보유 특허 */}
                        <div className="flex-1 flex flex-col gap-2 lg:gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 rounded-full bg-zinc-900" />
                                <h3 className="text-base lg:text-xl font-semibold text-foreground">{tr.patentsLabel}</h3>
                            </div>
                            <ul className="flex flex-col gap-1.5 lg:gap-3">
                                {[
                                    { no: "10-2024-0001", title: "R&D 세무 증빙 자동화 미들웨어", desc: "R&D 세무 증빙 협업 툴 연동 자동화 핵심 기술" },
                                ].map((p) => (
                                    <li key={p.no}>
                                        <Card className="hover:shadow-md transition-shadow">
                                            <CardContent className="flex items-center gap-3 p-2.5 lg:p-4">
                                                <span className="hidden lg:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-base flex-shrink-0">📄</span>
                                                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <Badge variant="secondary" className="text-[10px]">{p.no}</Badge>
                                                        <span className="text-xs lg:text-sm font-semibold text-foreground">{p.title}</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground hidden sm:block">{p.desc}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 협업기관 */}
                        <div className="flex-1 flex flex-col gap-2 lg:gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 rounded-full bg-zinc-400" />
                                <h3 className="text-base lg:text-xl font-semibold text-foreground">{tr.partnersLabel}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 lg:gap-3">
                                {[
                                    { name: "한국산업기술진흥원", type: "공공기관", icon: "🏛️" },
                                    { name: "서울대학교 연구소", type: "학술기관", icon: "🎓" },
                                    { name: "KAIST 기술창업원", type: "학술기관", icon: "🔬" },
                                    { name: "삼성벤처투자", type: "투자기관", icon: "💼" },
                                    { name: "중소벤처기업부", type: "공공기관", icon: "🏢" },
                                    { name: "네이버 D2SF", type: "투자기관", icon: "🤝" },
                                ].map((org) => (
                                    <Card key={org.name} className="hover:shadow-md transition-shadow">
                                        <CardContent className="flex items-center gap-2 p-2 lg:p-3">
                                            <span className="text-lg lg:text-2xl">{org.icon}</span>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <span className="text-xs font-semibold text-foreground truncate">{org.name}</span>
                                                <Badge variant="outline" className="self-start text-[10px] py-0">{org.type}</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 문의 ── */}
            <section
                id="contact"
                className="snap-start snap-always flex flex-col justify-center bg-muted/20 px-8 lg:px-20 h-dvh"
            >
                <div className="mx-auto max-w-screen-xl w-full py-8 lg:py-14">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex-1 flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {tr.contactEyebrow}
              </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{tr.contactTitle}</h2>
                            <p className="text-muted-foreground leading-relaxed max-w-md text-sm lg:text-base">
                                {tr.contactDesc}
                            </p>
                            <ul className="flex flex-col gap-2 mt-1 text-sm">
                                <li className="flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-muted text-base">📞</span>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{tr.contactPhone}</p>
                                        <a href="tel:010-2895-7823" className="font-medium text-foreground hover:underline">010-2895-7823</a>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-muted text-base">✉️</span>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{tr.contactEmail}</p>
                                        <a href="mailto:tksz0613@gmail.com" className="font-medium text-foreground hover:underline">tksz0613@gmail.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <ContactForm theme="light" />
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="scroll-snap-start border-t bg-background px-8 lg:px-20 py-6" style={{ scrollSnapAlign: "start" }}>
                <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row gap-6 justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">H</span>
                            <span className="font-bold text-base text-foreground">HAEYOUNGLAB</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {tr.footerDesc}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-semibold text-foreground">{tr.footerContact}</h4>
                        <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <a href="tel:010-2895-7823" className="hover:text-foreground transition-colors">010-2895-7823</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉️</span>
                                <a href="mailto:tksz0613@gmail.com" className="hover:text-foreground transition-colors">tksz0613@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-semibold text-foreground">{tr.footerLinks}</h4>
                        <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            {tr.footerNav.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} className="hover:text-foreground transition-colors">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Separator className="mx-auto max-w-screen-xl mt-4" />
                <div className="mx-auto max-w-screen-xl mt-4 text-xs text-muted-foreground">
                    © {new Date().getFullYear()} HAEYOUNGLAB. All rights reserved.
                </div>
            </footer>
        </>
    );
}