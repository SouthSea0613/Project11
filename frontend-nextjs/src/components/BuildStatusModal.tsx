"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";

const items = [
  { tag: "BUILDING", tagColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40", label: "비트코인 시뮬레이터 게임", desc: "비트코인 모의 투자 게임" },
  { tag: "BUILDING", tagColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40", label: "점프게임", desc: "끝없이 올라가는 실시간 랭킹 경쟁 게임" },
  { tag: "BUILDING", tagColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40", label: "스크럼 봇", desc: "Slack · Notion · 스프레드시트 연동 협업 자동화" },
  { tag: "BUILDING", tagColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40", label: "세무 증빙 자동화 툴", desc: "R&D 세무 증빙 협업 툴 미들웨어" },
  { tag: "PLANNED",  tagColor: "bg-white/10 text-white/40 border-white/20",                label: "유튜브 자동화 파이프라인", desc: "콘텐츠 기획·편집·업로드 자동화 시스템" },
];

export default function BuildStatusModal() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="lg"
        className={`w-fit border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white lg:hidden ${lang === "JP" ? "text-sm px-4 py-5" : "text-base px-8 py-6"}`}
      >
        {lang === "JP" ? "開発状況" : lang === "EN" ? "Build Status" : "해영랩 개발현황"}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:hidden"
          onClick={() => setOpen(false)}
        >
          {/* 딤 배경 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* 바텀 시트 */}
          <div
            className="relative w-full rounded-t-3xl border-t border-white/10 px-6 pt-6 pb-10 flex flex-col gap-6"
            style={{ background: "rgba(10,10,10,0.95)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 핸들 */}
            <div className="mx-auto w-10 h-1 rounded-full bg-white/20" />

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono text-white/40 tracking-widest">
                {"// live build status"}
              </span>
              <p className="text-2xl font-bold text-white leading-tight">지금 해영랩이 개발중인 것들</p>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[50vh] pr-1"
                 style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}>
              {items.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className={`mt-1 shrink-0 text-xs font-bold font-mono px-3 py-1 rounded border tracking-wider ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <div className="flex flex-col gap-0.5 text-right">
                    <p className="text-base font-semibold text-white leading-snug">{item.label}</p>
                    <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setOpen(false)}
              className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20"
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
