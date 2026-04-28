"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="about"
      className="snap-start snap-always relative flex items-center border-b px-4 md:px-6 min-h-dvh md:h-dvh pt-16 md:pt-20 pb-6 md:pb-0 overflow-y-auto md:overflow-hidden"
    >
      <div className="absolute -top-20 left-[-10%] -z-10 h-[380px] w-[380px] rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-24 right-[-8%] -z-10 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_25%,rgba(16,185,129,0.10),transparent_36%),radial-gradient(circle_at_75%_15%,rgba(59,130,246,0.14),transparent_40%),linear-gradient(120deg,rgba(12,16,32,0.88),rgba(4,9,22,0.92))]" />

      <div className="mx-auto max-w-screen-2xl w-full flex flex-col items-start justify-center gap-8">
        <motion.div
          className="w-full max-w-4xl flex flex-col gap-6 lg:gap-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="w-fit rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-emerald-200 uppercase">
            R&D Tax Credit Evidence Middleware
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight max-w-3xl">
            가장 완벽한 R&D 증빙은
            <br />
            업무를 방해하지 않는 기록에서 나옵니다.
          </h1>

          <p className="text-white/75 leading-relaxed max-w-2xl text-base md:text-lg">
            SHA-256 무결성 보증과 실시간 타임스탬프를 통한 비침습적 R&D 증빙 미들웨어
          </p>

          <div className="flex gap-3 flex-wrap w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-fit h-11 px-6 text-sm md:text-base font-semibold bg-emerald-400 text-black hover:bg-emerald-300"
            >
              <a href="/check">우리 회사 추징 리스크 1분 진단하기</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-fit h-11 px-5 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/haeyoungsoftware" className="inline-flex items-center gap-1.5">
                haeyoungsoftware 둘러보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full sm:w-fit h-11 px-5 text-white/85 hover:text-white"
            >
              <a href="#value" className="inline-flex items-center gap-1.5">
                핵심 증빙 구조 보기
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 w-full max-w-4xl">
            {[
              { label: "핵심 파이프라인", value: "4-Step", hint: "수집→자동화→시점확인→검토" },
              { label: "리스크 지표", value: "450억+", hint: "부당 적발 추징액 증가" },
              { label: "초기 검증", value: "LOI 3개사", hint: "정부과제 수행 기업" },
              { label: "법적 신뢰성", value: "RFC 3161", hint: "공인 시점확인 기반" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/15 bg-black/20 px-3 py-2.5">
                <p className="text-[11px] text-white/60">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-emerald-200">{item.value}</p>
                <p className="text-[11px] text-white/45 hidden sm:block">{item.hint}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}