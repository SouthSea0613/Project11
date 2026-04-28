"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { games, utilities, webapps, type CardItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const scrumBot = utilities.find((item) => item.slug === "scrum-bot")!;

function getStatus(item: CardItem): "완료" | "진행중" | "예정" {
  if (!item.roadmap || item.roadmap.length === 0) return "예정";
  if (item.roadmap.some((p) => p.status === "active")) return "진행중";
  if (item.roadmap.every((p) => p.status === "done")) return "완료";
  return "예정";
}

const STATUS_STYLE = {
  완료: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
  진행중: "border-emerald-400/50 bg-emerald-400/10 text-emerald-400",
  예정: "border-border bg-muted/50 text-muted-foreground",
};

const scaleupTracks = [
  { stage: "초기", target: "정부 R&D/TIPS 스타트업", goal: "추징 리스크가 높은 고객군에서 레퍼런스 확보" },
  { stage: "성장", target: "R&D 연구소 보유 중소기업", goal: "수기 연구노트 체계를 디지털 증빙 체계로 전환" },
  { stage: "도약", target: "글로벌 엔터프라이즈", goal: "ERP/PLM/MES 연동 컴플라이언스 엔진 공급" },
];

const columns = [
  { label: "Web / App", section: "webapp", items: webapps },
  { label: "Middleware", section: "utility", items: utilities },
  { label: "Game", section: "game", items: games },
];

export default function LandingBottomSections() {
  const [featured, setFeatured] = useState<{ item: CardItem; section: string }>({
    item: scrumBot,
    section: "utility",
  });

  const { item, section } = featured;
  const status = getStatus(item);
  const isScrumBot = item.slug === "scrum-bot";

  return (
    <>
      <section
        id="sandbox"
        className="snap-start snap-always min-h-dvh md:h-dvh border-b bg-background/82 backdrop-blur-[2px] px-4 md:px-6 pt-16 md:pt-20 pb-6 md:pb-4 overflow-y-auto"
      >
        <div className="mx-auto max-w-screen-2xl h-full flex flex-col justify-start md:justify-center">

          {/* 헤더 */}
          <motion.div
            className="mb-4 md:mb-5 flex flex-col gap-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge className="h-auto w-fit rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Other Explorations
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Scale-up & Archive</h2>
            <p className="max-w-2xl text-sm md:text-base text-muted-foreground">
              시장 진입 로드맵과 실험형 프로젝트 아카이브를 함께 공개해 실행 우선순위를 명확히 보여줍니다.
            </p>
          </motion.div>

          {/* 스케일업 단계 */}
          <motion.div
            className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
          >
            {scaleupTracks.map((track) => (
              <Card key={track.stage} className="border-emerald-500/20 bg-emerald-500/5 py-0">
                <CardContent className="px-4 py-3">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">{track.stage} 단계</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{track.target}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{track.goal}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* 피처드 카드 — 선택된 항목 표시 */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.06 }}
          >
            <Card className="border-emerald-400/40 bg-emerald-500/5 py-3">
              <CardHeader className="px-4 pb-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className="h-auto border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-300">
                      {isScrumBot ? "Validation Highlight" : "Selected"}
                    </Badge>
                    <Badge className={`h-auto border px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLE[status]}`}>
                      {status}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="h-auto text-[10px]">{item.badge}</Badge>
                </div>
                <CardTitle className="text-base md:text-lg text-foreground mt-2">
                  {item.icon} {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pt-2 pb-0">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                {isScrumBot && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    메인 아이템(세무 증빙 자동화 툴) 구체화 전, 협업툴 연동·API·챗봇·AI 자동화 가능성을 선행 검증한 프로젝트입니다.
                  </p>
                )}
                {item.details && !isScrumBot && (
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.details}</p>
                )}
                {item.roadmap && item.roadmap.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.roadmap.map((phase) => (
                      <Badge key={phase.phase} variant="secondary" className="h-auto px-2 py-0.5 text-[10px]">
                        {phase.label}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex items-center gap-4 pb-1">
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium text-emerald-500 hover:text-emerald-400">
                      프로젝트 보기 →
                    </a>
                  )}
                  <Link href={`/detail/${section}/${item.slug}`}
                    className="text-xs font-medium text-emerald-500 hover:text-emerald-400">
                    상세 보기 →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3열 프로젝트 컬럼 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
          >
            {columns.map(({ label, section: col, items }) => (
              <div key={label} className="flex flex-col rounded-xl border border-emerald-500/20 bg-card/40 overflow-hidden">
                <div className="border-b border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                  <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase">{label}</p>
                </div>
                <div className="flex flex-col gap-2 p-3 flex-1">
                  {items.map((it) => {
                    const st = getStatus(it);
                    const isActive = it.slug === item.slug;
                    return (
                      <button
                        key={it.slug}
                        onClick={() => setFeatured({ item: it, section: col })}
                        className={`w-full flex items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors text-left ${
                          isActive
                            ? "border-emerald-500/50 bg-emerald-500/10"
                            : "border-emerald-500/15 bg-background/60 hover:border-emerald-500/40 hover:bg-emerald-500/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl shrink-0 w-8 text-center">{it.icon}</span>
                          <div className="min-w-0">
                            <p className="text-base font-semibold text-foreground truncate">{it.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{it.desc}</p>
                          </div>
                        </div>
                        <Badge className={`shrink-0 h-auto border px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[st]}`}>
                          {st}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      <section
        id="contact"
        className="snap-start min-h-dvh border-b bg-muted/55 backdrop-blur-[2px] px-4 md:px-6 pt-32 md:pt-44 pb-6"
      >
        <motion.div
          className="mx-auto max-w-screen-2xl w-full flex flex-col lg:flex-row gap-10 items-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex-1 flex flex-col gap-3">
            <Badge className="h-auto w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-emerald-500 uppercase">
              Contact
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">도입 상담 요청</h2>
            <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
              귀사 협업툴 로그와 현재 증빙 프로세스를 진단해, 추징 리스크를 줄이는 도입 시나리오를 1:1로 제안드립니다.
            </p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>📞 010-2895-7823</li>
              <li>✉️ tksz0613@gmail.com</li>
              <li>🧾 세무 대리인/연구소장 동시 참여 진단 가능</li>
            </ul>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Card className="border-border bg-background py-0">
                <CardContent className="px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">1단계</p>
                  <p className="text-sm font-medium text-foreground">리스크/로그 진단</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background py-0">
                <CardContent className="px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">2단계</p>
                  <p className="text-sm font-medium text-foreground">유료 PoC 적용</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background py-0">
                <CardContent className="px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">3단계</p>
                  <p className="text-sm font-medium text-foreground">정식 운영 전환</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <ContactForm theme="light" />
        </motion.div>
      </section>

      <Footer />
    </>
  );
}