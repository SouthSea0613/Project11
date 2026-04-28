"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type GanttItem = {
  label: string;
  track: string;
  start: number;
  end: number;
  progress: number;
  status: "완료" | "진행중" | "예정";
};

const timelineLabels = ["5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

const ganttItems: GanttItem[] = [
  { label: "협업 로그 수집 챗봇·웹훅 완성", track: "제품개발", start: 0, end: 2, progress: 100, status: "완료" },
  { label: "RFC 3161 + SHA-256 증빙 엔진", track: "제품개발", start: 1, end: 4, progress: 82, status: "진행중" },
  { label: "LLM 기반 PMR 자동 생성기", track: "도메인검증", start: 2, end: 5, progress: 74, status: "진행중" },
  { label: "국세청 패턴 기반 리스크 경고", track: "도메인검증", start: 4, end: 7, progress: 38, status: "예정" },
  { label: "Slack/Jira 마켓플레이스 등록", track: "사업마케팅", start: 6, end: 8, progress: 22, status: "예정" },
];

const activities = [
  { time: "09:18", title: "세무사무소 2곳과 소명 리포트 검증 미팅", meta: "legal-validation" },
  { time: "10:06", title: "정부과제 수행 기업 3개사 PoC 요구사항 정리", meta: "poc-onboarding" },
  { time: "10:32", title: "PMR 문장화 프롬프트 튜닝 배치 반영", meta: "pmr-engine" },
  { time: "11:11", title: "리스크 모니터링 대시보드 샘플 업데이트", meta: "tax-monitoring" },
  { time: "11:44", title: "협업 로그 무결성 검증 리포트 재생성", meta: "integrity-check" },
];

const labStats = [
  { label: "세무 자문 파트너", value: "2개 사무소" },
  { label: "PoC 목표 고객", value: "3개 기업" },
  { label: "협업툴 연동 목표", value: "2종 이상" },
  { label: "IP 확보 계획", value: "특허 2건" },
];

function statusStyle(status: GanttItem["status"]) {
  if (status === "완료") return "bg-emerald-500/15 text-emerald-300 border-emerald-400/30";
  if (status === "진행중") return "bg-blue-500/15 text-blue-300 border-blue-400/30";
  return "bg-white/10 text-white/60 border-white/20";
}

function barStyle(status: GanttItem["status"]) {
  if (status === "완료") return "from-emerald-400 to-cyan-400";
  if (status === "진행중") return "from-blue-400 to-cyan-400";
  return "from-zinc-500 to-zinc-400";
}

export default function LiveLabDashboardSection() {
  return (
    <section
      id="live-log"
      className="snap-start snap-always min-h-dvh md:h-dvh border-b bg-[#060b19]/82 backdrop-blur-[1px] px-4 md:px-6 pt-16 md:pt-20 pb-6 md:pb-4 overflow-y-auto"
    >
      <div className="mx-auto max-w-screen-2xl h-full flex flex-col justify-start md:justify-center">
        <motion.div
          className="mb-5 md:mb-6 flex flex-col gap-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="w-fit rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-blue-200 uppercase">
            Live Lab Dashboard
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">HAEYOUNGLAB Execution Log</h2>
          <p className="max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
            계획서의 문장으로 끝내지 않고, 월 단위 실행 일정과 검증 데이터를 공개합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-5 lg:items-stretch">
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="rounded-2xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-white mb-3">모바일 실행 타임라인</p>
                <div className="space-y-2">
                  {ganttItems.slice(0, 4).map((item) => (
                    <div key={item.label} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                      <p className="text-[11px] text-white/55">{item.track}</p>
                      <p className="text-xs text-white">{item.label}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <Badge className={`h-5 border text-[10px] ${statusStyle(item.status)}`}>{item.status}</Badge>
                        <span className="text-[11px] text-white/55">{item.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="hidden md:block h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="h-full rounded-2xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <CardContent className="p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">사업 추진 간트차트 (2026.05 - 2026.12)</p>
                  <span className="text-xs text-white/50">Execution Track</span>
                </div>

                <div className="hidden md:grid grid-cols-[220px_1fr] gap-3 mb-2">
                  <p className="text-[11px] text-white/45">트랙 / 작업</p>
                  <div className="grid grid-cols-8 text-[11px] text-white/45">
                    {timelineLabels.map((month) => (
                      <div key={month} className="text-center">{month}</div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {ganttItems.map((item) => {
                    const left = (item.start / timelineLabels.length) * 100;
                    const width = ((item.end - item.start) / timelineLabels.length) * 100;
                    return (
                      <div key={item.label} className="grid md:grid-cols-[220px_1fr] gap-3 items-center">
                        <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                          <p className="text-[11px] text-white/55">{item.track}</p>
                          <p className="text-xs font-medium text-white leading-relaxed">{item.label}</p>
                        </div>

                        <div className="relative rounded-lg border border-white/10 bg-black/20 h-10 overflow-hidden">
                          <div className="absolute inset-0 grid grid-cols-8">
                            {timelineLabels.map((month) => (
                              <div key={month} className="border-r border-white/10 last:border-r-0" />
                            ))}
                          </div>
                          <div
                            className={`absolute top-1.5 h-7 rounded-md bg-gradient-to-r ${barStyle(item.status)} shadow-[0_0_10px_rgba(34,211,238,0.22)]`}
                            style={{ left: `${left}%`, width: `${width}%` }}
                          >
                            <div className="flex h-full items-center justify-between px-2">
                              <span className="text-[10px] font-semibold text-black/85">{item.progress}%</span>
                              <Badge className={`h-5 border text-[10px] ${statusStyle(item.status)}`}>
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/65">
                  핵심 일정: 5-8월 코어엔진 고도화 → 9-11월 리스크 경고 시스템 → 12월 마켓플레이스 등록
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          >
            <Card className="h-full rounded-2xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <CardContent className="pt-5 md:pt-6 h-full flex flex-col">
                <div className="mb-5 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">Validation Feed</p>
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                </div>
                <ul className="space-y-3 flex-1">
                  {activities.map((activity, idx) => (
                    <li key={`${activity.time}-${activity.title}`} className={`rounded-xl border border-white/10 bg-black/20 px-4 py-3 ${idx > 2 ? "hidden md:block" : ""}`}>
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="text-sm text-white">{activity.title}</p>
                        <span className="text-xs font-mono text-white/50">{activity.time}</span>
                      </div>
                      <p className="text-xs text-cyan-200/80">{activity.meta}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
        >
          {labStats.map((item) => (
            <Card key={item.label} className="rounded-xl border-white/10 bg-white/[0.03] py-0">
              <CardContent className="px-4 py-3">
                <p className="text-xs text-white/60">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
