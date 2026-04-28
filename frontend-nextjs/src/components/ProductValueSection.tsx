"use client";

import { ShieldCheck, Workflow, FileText, ClipboardCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub, FaJira, FaSlack, FaDiscord, FaTelegram } from "react-icons/fa";
import { SiNotion, SiGoogle, SiKakaotalk } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

const pipelineSteps = [
  {
    step: 1,
    icon: Workflow,
    title: "로그 수집",
    subtitle: "비침습 수집",
    description: "설치형 강제 입력 없이 챗봇/웹훅 기반으로 기존 협업 로그를 실시간 수집해 연구 흐름을 방해하지 않습니다.",
  },
  {
    step: 2,
    icon: FileText,
    title: "PMR 자동화",
    subtitle: "자동 문서화",
    description: "LLM이 협업 로그를 PMR 연구노트 형식으로 구조화해 수기 작성 없이 증빙 문서를 자동 생성합니다.",
  },
  {
    step: 3,
    icon: ShieldCheck,
    title: "RFC3161 시점확인",
    subtitle: "무결성 보증",
    description: "사후 소급 작성이 아닌 시점확인 기반 디지털 발자국으로 기록의 진본성과 추적 가능성을 함께 확보합니다.",
  },
  {
    step: 4,
    icon: ClipboardCheck,
    title: "관리자 검토",
    subtitle: "소명 대응 리포트",
    description: "관리자 검토를 거쳐 국세청 소명 대응 형태로 즉시 출력하고 추징 리스크에 대비합니다.",
  },
];


const executionSignals = [
  "핵심 기술 특허 가출원 완료",
  "협업 툴 연동 시제품 자체 구현 완료",
  "세무 전문가 자문 기반 법적 유효성 검토",
  "정부과제 수행 기업 대상 유료 PoC 목표",
];

const levyTrendData = [
  { year: "22", value: 120 },
  { year: "23", value: 210 },
  { year: "24", value: 320 },
  { year: "25", value: 450 },
];

const adminCostTrendData = [
  { year: "22", value: 14 },
  { year: "23", value: 17 },
  { year: "24", value: 19 },
  { year: "25", value: 23 },
];

export default function ProductValueSection() {
  return (
    <section
      id="value"
      className="snap-start snap-always min-h-dvh md:h-dvh border-b bg-background/78 backdrop-blur-[2px] px-4 md:px-6 pt-16 md:pt-20 pb-4 md:pb-5 overflow-y-auto"
    >
      <div className="mx-auto flex h-full min-h-0 max-w-screen-2xl flex-col justify-start gap-0 py-1 md:justify-center md:py-2">
        <motion.div
          className="mb-3 flex flex-col gap-2 md:mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Badge className="h-auto w-fit border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-emerald-400 uppercase">
            Product Value
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-[2rem] font-bold leading-snug text-foreground">
            추징을 막는 문서는 결과가 아니라 과정에서 만들어집니다
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-nowrap">
            해영랩(HAEYOUNGLAB)은 R&D 오토노트 구조를 통해 증빙 공백, 사후 소급 리스크, 연구 인력 행정 매몰 문제를 하나의 파이프라인으로 해결합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:flex md:items-stretch md:gap-2">
          {pipelineSteps.flatMap(({ step, icon: Icon, title, subtitle, description }, idx) => [
            <motion.div
              key={title}
              className="md:flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
            >
              <Card className="h-full border-emerald-500/20 bg-emerald-500/5 py-3 backdrop-blur-sm transition-colors hover:border-emerald-400/40 md:py-3">
                <CardHeader className="space-y-1.5 p-4 pb-0 md:p-3 md:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">STEP {step}</span>
                  </div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 md:h-8 md:w-8">
                    <Icon className="h-4 w-4 md:h-[15px] md:w-[15px]" />
                  </div>
                  <CardTitle className="text-sm leading-snug text-card-foreground md:text-[0.9rem]">{title}</CardTitle>
                  <p className="text-[11px] text-emerald-500">{subtitle}</p>
                </CardHeader>
                <CardContent className="p-4 pt-2 md:p-3 md:pt-1.5">
                  <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </motion.div>,
            idx < pipelineSteps.length - 1 ? (
              <div key={`arrow-${idx}`} className="hidden md:flex items-center justify-center shrink-0 text-emerald-400">
                <ChevronRight className="h-7 w-7" strokeWidth={2.5} />
              </div>
            ) : null,
          ]).filter(Boolean)}
        </div>


        <motion.div
          className="mt-2 md:hidden"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
        >
          <Card className="border-border/70 bg-card/50">
            <CardHeader className="pb-0">
              <CardTitle className="text-sm">모바일 핵심 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border bg-background/70 px-2.5 py-2">
                  <p className="text-[11px] text-muted-foreground">추징 리스크</p>
                  <p className="text-sm font-semibold text-emerald-500">450억+</p>
                </div>
                <div className="rounded-md border border-border bg-background/70 px-2.5 py-2">
                  <p className="text-[11px] text-muted-foreground">행정 매몰</p>
                  <p className="text-sm font-semibold text-emerald-500">20%</p>
                </div>
              </div>
              <div className="rounded-md border border-border bg-background/70 px-2.5 py-2">
                <p className="text-[11px] text-muted-foreground">4-Step Pipeline</p>
                <p className="text-xs text-foreground mt-0.5">로그 수집 → PMR 자동화 → RFC3161 시점확인 → 관리자 검토</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-2 hidden gap-3 md:grid md:grid-cols-1 lg:grid-cols-[1.45fr_1fr] lg:gap-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
        >
          <Card className="border-border/70 bg-card/50 py-1">
            <CardHeader className="p-4 pb-1 md:p-3 md:pb-0">
              <CardTitle className="text-sm">문제 강도 지표</CardTitle>
            </CardHeader>
            <CardContent className="grid h-full grid-rows-[auto_auto_1fr] gap-2 p-4 pt-0 md:p-3 md:pt-0">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-border bg-background/60 p-2.5">
                  <div className="mb-1.5 flex items-end justify-between">
                    <p className="text-xs text-muted-foreground">부당 적발 추징액 추이</p>
                    <p className="text-sm font-bold text-rose-500">450억</p>
                  </div>
                  <ChartContainer
                    config={{
                      levy: { label: "추징액(억)", color: "oklch(0.63 0.22 29)" },
                    }}
                    className="mx-auto aspect-auto h-[150px] w-full max-w-full"
                  >
                    <LineChart data={levyTrendData} margin={{ top: 22, right: 32, left: 16, bottom: 2 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/60" />
                      <XAxis
                        dataKey="year"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={6}
                        tickFormatter={(v) => `${v}년`}
                        padding={{ left: 24, right: 24 }}
                        className="text-[10px] fill-muted-foreground"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        width={36}
                        domain={[0, 500]}
                        tickFormatter={(v) => `${v}억`}
                        className="text-[10px] fill-muted-foreground"
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="추징액"
                        stroke="var(--color-levy)"
                        strokeWidth={2}
                        dot={{ r: 3.5, fill: "var(--color-levy)", stroke: "var(--background)", strokeWidth: 1.5 }}
                        activeDot={{ r: 5 }}
                      >
                        <LabelList
                          dataKey="value"
                          position="top"
                          offset={4}
                          className="fill-foreground text-[10px] font-semibold"
                          formatter={(v) => (typeof v === "number" ? `${v}억` : `${v}`)}
                        />
                      </Line>
                    </LineChart>
                  </ChartContainer>
                </div>

                <div className="rounded-lg border border-border bg-background/60 p-2.5">
                  <div className="mb-1.5 flex items-end justify-between">
                    <p className="text-xs text-muted-foreground">연구 인력 행정 매몰 비용</p>
                    <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">23h/주</p>
                  </div>
                  <ChartContainer
                    config={{
                      adminCost: { label: "매몰 시간(시간)", color: "oklch(0.63 0.22 29)" },
                    }}
                    className="mx-auto aspect-auto h-[150px] w-full max-w-full"
                  >
                    <BarChart data={adminCostTrendData} margin={{ top: 12, right: 10, left: 2, bottom: 2 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/60" />
                      <XAxis
                        dataKey="year"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={6}
                        tickFormatter={(v) => `${v}년`}
                        className="text-[10px] fill-muted-foreground"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        width={32}
                        domain={[0, 24]}
                        tickFormatter={(v) => `${v}h`}
                        className="text-[10px] fill-muted-foreground"
                      />
                      <Bar dataKey="value" fill="var(--color-adminCost)" radius={[5, 5, 0, 0]}>
                        <LabelList
                          dataKey="value"
                          position="top"
                          offset={4}
                          className="fill-foreground text-[10px] font-semibold"
                          formatter={(v) => (typeof v === "number" ? `${v}h` : `${v}`)}
                        />
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-2.5">
                  <p className="text-xs font-semibold text-red-400 mb-2">핵심 위험 시그널</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "실시간 기록 부재", desc: "수기 기록 공백 발생" },
                      { label: "소급 작성 의심", desc: "타임스탬프 불일치" },
                      { label: "제출 체계 미흡", desc: "48시간 내 대응 불가" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-1.5">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        <div>
                          <p className="text-[11px] font-semibold text-foreground/90">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5">
                  <p className="text-xs font-semibold text-amber-400 mb-2">파급 영향 요약</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "추징 리스크 가속", desc: "연간 누적 450억+" },
                      { label: "개발 시간 잠식", desc: "인력 20% 행정 소모" },
                      { label: "실사 대응 장기화", desc: "즉시 제출 체계 부재" },
                      { label: "자동화 시 즉시 회수", desc: "비용 전환 효과 확보" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-1.5">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <div>
                          <p className="text-[11px] font-semibold text-foreground/90">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/50 py-1">
            <CardHeader className="p-4 pb-1 md:p-3 md:pb-0">
              <CardTitle className="text-sm">연동 진행 중인 Tool</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-4 pt-0 md:p-3 md:pt-0">
              <div className="rounded-lg border border-border bg-background/60 p-2.5">
                <p className="text-xs text-emerald-500 font-semibold mb-2">✓ 연동 완료</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Slack", icon: FaSlack, color: "text-[#9b4dca]" },
                    { name: "Notion", icon: SiNotion, color: "text-foreground" },
                  ].map((tool) => (
                    <div key={tool.name} className="rounded-md border border-border bg-background/60 px-2 py-2">
                      <div className="flex items-center gap-2">
                        <tool.icon className={`h-4 w-4 shrink-0 ${tool.color}`} />
                        <p className="text-[11px] font-semibold">{tool.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background/60 p-2.5">
                <p className="text-xs text-muted-foreground font-semibold mb-2">○ 연동 예정</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Discord", icon: FaDiscord, color: "text-[#5865F2]" },
                    { name: "GitHub", icon: FaGithub, color: "text-foreground" },
                    { name: "Jira", icon: FaJira, color: "text-[#2b77ff]" },
                    { name: "Google", icon: SiGoogle, color: "text-[#4285F4]" },
                    { name: "Telegram", icon: FaTelegram, color: "text-[#229ED9]" },
                    { name: "KakaoTalk", icon: SiKakaotalk, color: "text-[#FEE500]" },
                  ].map((tool) => (
                    <div key={tool.name} className="rounded-md border border-border bg-background/60 px-2 py-2">
                      <div className="flex flex-col items-center gap-1">
                        <tool.icon className={`h-4 w-4 ${tool.color}`} />
                        <p className="text-[10px] font-semibold text-center">{tool.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
        >
          <Card className="border-border/70 bg-card/50 py-1">
            <CardHeader className="p-4 pb-2 md:p-3 md:pb-1">
              <CardTitle className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Execution Proof
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-3 md:pt-0">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
                {executionSignals.map((item, idx) => (
                  <div key={item} className={`rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground ${idx > 1 ? "hidden md:block" : ""}`}>
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}
