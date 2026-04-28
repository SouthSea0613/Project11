import { notFound } from "next/navigation";
import Link from "next/link";
import { allSections, SectionKey } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import ImageCarousel from "@/components/ImageCarousel";
import ContactForm from "@/components/ContactForm";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
    return Object.entries(allSections).flatMap(([section, { items }]) =>
        items.map((item) => ({ section, slug: item.slug }))
    );
}

export default async function DetailPage({
                                             params,
                                         }: {
    params: Promise<{ section: string; slug: string }>;
}) {
    const { section, slug } = await params;

    const sectionData = allSections[section as SectionKey];
    if (!sectionData) notFound();

    const card = sectionData.items.find((c) => c.slug === slug);
    if (!card) notFound();

    return (
        <main className="relative min-h-screen flex flex-col">
            {/* 배경 그라디언트 */}
            <div className="fixed inset-0 -z-10" style={{ background: card.bg }} />
            <div className="fixed inset-0 -z-10 bg-black/50" />

            {/* 상단 네비 */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-sm">
                <div className="mx-auto max-w-screen-xl h-14 flex items-center gap-4 px-4 lg:px-0">
                    <BackButton />
                    <Separator orientation="vertical" className="h-4 bg-white/20" />
                    <span className="text-xs text-white/50">{sectionData.label}</span>
                </div>
            </header>

            {/* 본문 */}
            <div className="flex-1 px-4 lg:px-20 py-8 lg:py-16">
                <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-10 lg:gap-16">

                    {/* ── 히어로 ── */}
                    <div className="flex flex-col gap-6 lg:gap-8">
                        {/* 모바일: 아이콘+타이틀 위, 이미지 아래 / 데스크탑: 좌우 배치 */}
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 lg:items-end">
                            {/* 아이콘 + 타이틀 (모바일 왼쪽 정렬) */}
                            <div className="flex flex-col gap-4 flex-shrink-0 items-start">
                                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl lg:text-5xl shadow-lg">
                                    {card.icon}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Badge className="self-start bg-white/20 text-white border-0 hover:bg-white/30">
                                        {card.badge}
                                    </Badge>
                                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                        {card.title}
                                    </h1>
                                </div>
                            </div>

                            {/* 이미지 캐러셀 */}
                            <div className="flex-1 min-w-0">
                                <ImageCarousel images={card.images ?? (card.img ? [card.img] : undefined)} count={4} />
                            </div>
                        </div>

                        <Separator className="bg-white/15" />

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                            <div className="flex-1 flex flex-col gap-3">
                                <h2 className="text-xs font-semibold tracking-widest text-white/50 uppercase">About</h2>
                                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                                    {card.details ?? card.desc}
                                </p>
                            </div>

                            <div className="flex flex-row sm:flex-row gap-3 lg:flex-col">
                                {card.url ? (
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-white text-black hover:bg-white/90 font-semibold"
                                    >
                                        <a href={card.url} target="_blank" rel="noopener noreferrer">
                                            바로가기 →
                                        </a>
                                    </Button>
                                ) : (
                                    <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm text-white/40">
                                        서비스 준비 중
                                    </div>
                                )}
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                                >
                                    <Link href="/">목록으로</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* ── 개발자 노트 ── */}
                    {card.developerNotes && card.developerNotes.length > 0 && (
                        <div className="flex flex-col gap-5 lg:gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Developer Note</span>
                                <h2 className="text-xl lg:text-2xl font-bold text-white">개발자 노트</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                {card.developerNotes.map((note) => (
                                    <Card key={note.date} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                        <CardContent className="flex flex-col gap-2 p-4">
                                            <span className="text-xs text-white/40 font-mono">{note.date}</span>
                                            <h3 className="text-sm font-semibold text-white">{note.title}</h3>
                                            <p className="text-xs text-white/60 leading-relaxed">{note.content}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {card.roadmap && card.roadmap.length > 0 && <Separator className="bg-white/10" />}

                    {/* ── 로드맵 ── */}
                    {card.roadmap && card.roadmap.length > 0 && (
                        <div className="flex flex-col gap-5 lg:gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Roadmap</span>
                                <h2 className="text-xl lg:text-2xl font-bold text-white">로드맵</h2>
                            </div>
                            <div className="flex flex-col gap-3">
                                {card.roadmap.map((phase) => (
                                    <div key={phase.phase} className="flex gap-3 lg:gap-4 items-start">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                                phase.status === "done" ? "bg-white" :
                                                    phase.status === "active" ? "bg-white/70 ring-2 ring-white/30 ring-offset-2 ring-offset-transparent" :
                                                        "bg-white/20"
                                            }`} />
                                            <div className="w-px flex-1 mt-2 bg-white/15 min-h-[40px]" />
                                        </div>
                                        <Card className="flex-1 mb-3 bg-white/5 border-white/10">
                                            <CardContent className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 lg:p-4">
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-xs font-mono text-white/40">{phase.phase}</span>
                                                        <h3 className="text-sm font-semibold text-white">{phase.label}</h3>
                                                        <Badge className={`text-[10px] border-0 ${
                                                            phase.status === "done" ? "bg-white/20 text-white" :
                                                                phase.status === "active" ? "bg-white text-black" :
                                                                    "bg-white/10 text-white/50"
                                                        }`}>
                                                            {phase.status === "done" ? "완료" : phase.status === "active" ? "진행 중" : "예정"}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                                                        {phase.items.map((item) => (
                                                            <span key={item} className="text-xs text-white/50">· {item}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-white/30 font-mono flex-shrink-0">{phase.period}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {card.patchNotes && card.patchNotes.length > 0 && <Separator className="bg-white/10" />}

                    {/* ── 패치노트 ── */}
                    {card.patchNotes && card.patchNotes.length > 0 && (
                        <div className="flex flex-col gap-5 lg:gap-6 pb-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Patch Notes</span>
                                <h2 className="text-xl lg:text-2xl font-bold text-white">패치노트</h2>
                            </div>
                            <div className="flex flex-col gap-3 lg:gap-4">
                                {card.patchNotes.map((patch) => (
                                    <Card key={patch.version} className="bg-white/5 border-white/10">
                                        <CardContent className="flex flex-col gap-3 p-4">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="text-sm font-bold text-white font-mono">{patch.version}</span>
                                                <Badge className="text-[10px] border-0 bg-white/15 text-white/70">{patch.type}</Badge>
                                                <span className="text-xs text-white/30 ml-auto">{patch.date}</span>
                                            </div>
                                            <Separator className="bg-white/10" />
                                            <ul className="flex flex-col gap-1.5">
                                                {patch.changes.map((change, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                                                        <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                                            change.tag === "new" ? "bg-emerald-500/20 text-emerald-300" :
                                                                change.tag === "fix" ? "bg-red-500/20 text-red-300" :
                                                                    "bg-blue-500/20 text-blue-300"
                                                        }`}>
                                                            {change.tag === "new" ? "NEW" : change.tag === "fix" ? "FIX" : "UPD"}
                                                        </span>
                                                        {change.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* ── 페이지 제작 문의 ── */}
            <div className="border-t border-white/10 bg-black/40 backdrop-blur-sm px-4 lg:px-20 py-10 lg:py-16">
                <div className="mx-auto max-w-screen-xl w-full">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start lg:items-center">
                        {/* 좌측: 안내 문구 */}
                        <div className="flex-1 flex flex-col gap-3 lg:gap-4">
              <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                Commission
              </span>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug">
                                페이지 제작해드립니다
                            </h2>
                            <p className="text-white/60 leading-relaxed max-w-md text-sm">
                                게임, 웹앱, 미들웨어 등 다양한 서비스 페이지를 맞춤 제작해 드립니다.
                                요구사항을 남겨주시면 빠르게 검토 후 연락드리겠습니다.
                            </p>
                            <ul className="flex flex-col gap-2 text-sm">
                                <li className="flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-base">📞</span>
                                    <div>
                                        <p className="text-xs text-white/40">전화</p>
                                        <a href="tel:010-2895-7823" className="font-medium text-white hover:underline">010-2895-7823</a>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-base">✉️</span>
                                    <div>
                                        <p className="text-xs text-white/40">이메일</p>
                                        <a href="mailto:tksz0613@gmail.com" className="font-medium text-white hover:underline">tksz0613@gmail.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* 우측: 문의 폼 */}
                        <ContactForm theme="dark" submitLabel="문의 보내기" />
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="border-t border-white/10 bg-black/50 px-4 lg:px-20 py-6">
                <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row gap-6 justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white text-black text-xs font-bold">H</span>
                            <span className="font-bold text-base text-white">HAEYOUNGLAB</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed">
                            혁신적인 기술과 창의적인 콘텐츠로<br />더 나은 세상을 만들어갑니다.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-semibold text-white/70">Contact</h4>
                        <ul className="flex flex-col gap-1 text-xs text-white/40">
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <a href="tel:010-2895-7823" className="hover:text-white transition-colors">010-2895-7823</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉️</span>
                                <a href="mailto:tksz0613@gmail.com" className="hover:text-white transition-colors">tksz0613@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-semibold text-white/70">바로가기</h4>
                        <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
                            {[
                                { label: "소개", href: "/#about" },
                                { label: "게임", href: "/haeyoungsoftware#game" },
                                { label: "웹앱", href: "/haeyoungsoftware#webapp" },
                                { label: "미들웨어", href: "/haeyoungsoftware#utility" },
                                { label: "문의", href: "/#contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Separator className="mx-auto max-w-screen-xl mt-4 bg-white/10" />
                <div className="mx-auto max-w-screen-xl mt-4 text-xs text-white/30">
                    © {new Date().getFullYear()} HAEYOUNGLAB. All rights reserved.
                </div>
            </footer>
        </main>
    );
}