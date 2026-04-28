"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  ChevronRight,
  Gauge,
  ShieldAlert,
  TrendingUp,
  Users2,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Answer = "yes" | "no";

type Question = {
  id: number;
  category: string;
  text: string;
  riskyAnswer: Answer;
  desc: string;
};

type CategoryStat = {
  category: string;
  total: number;
  risky: number;
  safe: number;
  riskScore: number;
  defenseScore: number;
};

type TrendPoint = {
  label: string;
  value: number;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "인적 요건",
    text: "[연구 전담성] 연구원이 연구 업무 외에 영업, 일반 행정 등 비연구 활동을 10% 이상 병행하고 있습니까?",
    riskyAnswer: "yes",
    desc: "겸직은 국세청이 공제를 부인하는 가장 흔하고 강력한 사유입니다.",
  },
  {
    id: 2,
    category: "인적 요건",
    text: "[인건비 소명] 특정 연구원의 투입 공수(Man-month)를 객관적으로 증명할 실시간 '로그(Log)'를 보유하고 있습니까?",
    riskyAnswer: "no",
    desc: "단순 엑셀 기록은 주관적 서술로 간주되어 증거력을 잃기 쉽습니다.",
  },
  {
    id: 3,
    category: "기술적 무결성",
    text: "[타임스탬프] 연구노트에 수정 및 조작이 불가능함을 증명하는 '수학적(Hash) 타임스탬프'가 찍혀 있습니까?",
    riskyAnswer: "no",
    desc: "수정 가능한 PDF나 수기 서명은 국세청 AI 분석 시스템의 주요 타겟입니다.",
  },
  {
    id: 4,
    category: "기술적 무결성",
    text: "[실시간성] 연구 기록이 과제 진행 중 실시간으로 생성되었음을 입증할 '제3의 신뢰 기관' 기록이 있습니까?",
    riskyAnswer: "no",
    desc: "생성 시점이 증명되지 않은 기록은 '사후 조작' 의심을 피하기 어렵습니다.",
  },
  {
    id: 5,
    category: "기술적 무결성",
    text: "[소급 작성] 연말이나 신고 기간에 맞춰 연구 보고서나 연구노트를 한꺼번에 '소급 작성'한 경험이 있습니까?",
    riskyAnswer: "yes",
    desc: "단기간 대량 문서 생성 패턴은 조사관이 가장 먼저 잡아내는 신호입니다.",
  },
  {
    id: 6,
    category: "사후 관리",
    text: "[즉시 대응력] 국세청 불시 실사 시, 과거 5개년 치의 증빙 데이터를 48시간 이내에 즉시 추출할 수 있습니까?",
    riskyAnswer: "no",
    desc: "대응 지연은 곧 시스템 부재로 간주되어 정밀 조사의 빌미가 됩니다.",
  },
  {
    id: 7,
    category: "사후 관리",
    text: "[실패 증빙] 중단되거나 실패한 프로젝트에 대해서도 '시행착오 및 난제 해결 과정'의 기록을 보유하고 있습니까?",
    riskyAnswer: "no",
    desc: "성공한 결과물만 있는 경우, 이는 '연구'가 아닌 '단순 개발'로 판단될 위험이 큽니다.",
  },
  {
    id: 8,
    category: "사후 관리",
    text: "[데이터 지속성] 핵심 연구원 퇴사 시에도 해당 인력의 연구 로그를 누락 없이 소명할 체계를 갖추고 있습니까?",
    riskyAnswer: "no",
    desc: "인력 교체가 잦은 스타트업에서 가장 빈번하게 발생하는 증빙 공백 구간입니다.",
  },
  {
    id: 9,
    category: "본질 검증",
    text: "[유지보수 구분] 국세청이 귀사의 연구를 '단순 서비스 유지보수'로 격하할 때, 반박할 원천 증거가 있습니까?",
    riskyAnswer: "no",
    desc: "기술적 진보를 증명할 원천 로그가 없으면 수억 원의 공제액이 추징될 수 있습니다.",
  },
];

const TOTAL = QUESTIONS.length;

function getRiskPercent(answers: Record<number, Answer>) {
  const riskyCount = getRiskyCount(answers);
  return Math.round((riskyCount / TOTAL) * 100);
}

function getRiskyCount(answers: Record<number, Answer>) {
  return QUESTIONS.reduce((count, q) => {
    return answers[q.id] === q.riskyAnswer ? count + 1 : count;
  }, 0);
}

function riskLabel(score: number) {
  if (score >= 80) return "긴급 점검이 필요합니다";
  if (score >= 50) return "주의 단계입니다. 증빙 체계 보완이 필요합니다";
  if (score >= 20) return "관리 가능한 수준이지만 개선 여지가 있습니다";
  return "양호한 편이지만 선제 대응이 필요합니다";
}

function getCategoryStats(answers: Record<number, Answer>): CategoryStat[] {
  const grouped = QUESTIONS.reduce<Record<string, { total: number; risky: number }>>((acc, q) => {
    if (!acc[q.category]) acc[q.category] = { total: 0, risky: 0 };
    acc[q.category].total += 1;
    if (answers[q.id] === q.riskyAnswer) acc[q.category].risky += 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([category, value]) => {
      const riskScore = Math.round((value.risky / value.total) * 100);
      const defenseScore = 100 - riskScore;
      return {
        category,
        total: value.total,
        risky: value.risky,
        safe: value.total - value.risky,
        riskScore,
        defenseScore,
      };
    })
    .sort((a, b) => b.riskScore - a.riskScore);
}

function getSurchargeTrend(riskScore: number): TrendPoint[] {
  const base = 1.2 + riskScore * 0.03;
  return [
    { label: "1Q", value: Number((base * 0.72).toFixed(1)) },
    { label: "2Q", value: Number((base * 0.86).toFixed(1)) },
    { label: "3Q", value: Number((base * 1.05).toFixed(1)) },
    { label: "4Q", value: Number((base * 1.28).toFixed(1)) },
  ];
}

function getAdminCostTrend(riskScore: number): TrendPoint[] {
  const base = 26 + riskScore * 0.5;
  return [
    { label: "1Q", value: Math.round(base * 0.82) },
    { label: "2Q", value: Math.round(base * 0.9) },
    { label: "3Q", value: Math.round(base * 1.03) },
    { label: "4Q", value: Math.round(base * 1.16) },
  ];
}

export default function CheckPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isDone = step >= TOTAL;
  const currentQuestion = QUESTIONS[step];
  const riskScore = useMemo(() => getRiskPercent(answers), [answers]);
  const riskyCount = useMemo(() => getRiskyCount(answers), [answers]);
  const categoryStats = useMemo(() => getCategoryStats(answers), [answers]);
  const technicalIntegrity = useMemo(
    () => categoryStats.find((item) => item.category === "기술적 무결성"),
    [categoryStats]
  );
  const surchargeTrend = useMemo(() => getSurchargeTrend(riskScore), [riskScore]);
  const adminCostTrend = useMemo(() => getAdminCostTrend(riskScore), [riskScore]);
  const latestSurcharge = surchargeTrend.at(-1)?.value ?? 0;
  const latestAdminCost = adminCostTrend.at(-1)?.value ?? 0;
  const surchargeChange = surchargeTrend.length > 1 ? latestSurcharge - surchargeTrend[0].value : 0;
  const adminCostChange = adminCostTrend.length > 1 ? latestAdminCost - adminCostTrend[0].value : 0;
  const problemIntensity = Math.min(
    100,
    Math.round(
      (Math.min(100, (latestSurcharge / 6) * 100) + Math.min(100, (latestAdminCost / 60) * 100)) / 2
    )
  );
  const progress = Math.round((Math.min(step, TOTAL) / TOTAL) * 100);

  const onAnswer = (value: Answer) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setStep((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#040916] text-white px-3 md:px-5 pt-24 md:pt-28 pb-10">
      <div className="mx-auto max-w-[1480px] grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 md:p-5">
          <div className="mb-4">
            <p className="text-xs tracking-[0.14em] text-white/55 uppercase">R&D Tax Risk Self Check</p>
            <h1 className="mt-1.5 text-2xl md:text-[30px] font-bold">R&D 세액공제 추징 리스크 자가진단</h1>
            <p className="mt-1.5 text-sm text-white/65">
              {TOTAL}개 질문에 답변해 현재 귀사의 증빙 리스크 수준을 즉시 확인하세요.
            </p>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between text-xs text-white/60">
              <span>진행도</span>
              <span>
                {Math.min(step, TOTAL)} / {TOTAL}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={`q-${currentQuestion.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 md:p-5">
                  <p className="text-xs text-white/50 mb-2">Q{currentQuestion.id}</p>
                  <p className="mb-2 inline-flex rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/80">
                    {currentQuestion.category}
                  </p>
                  <p className="text-base md:text-lg font-semibold leading-relaxed">{currentQuestion.text}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{currentQuestion.desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={() => onAnswer("yes")}
                    className="h-11 bg-white text-black hover:bg-white/90 font-semibold"
                  >
                    예 (Yes)
                  </Button>
                  <Button
                    onClick={() => onAnswer("no")}
                    variant="outline"
                    className="h-11 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white font-semibold"
                  >
                    아니오 (No)
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-3">
                  <Card className="border-white/10 bg-black/25 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <ShieldAlert className="h-5 w-5 text-red-300" />
                        진단 결과 요약
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-base md:text-lg font-semibold">
                        귀사의 추징 위험도는 <span className="text-red-300">{riskScore}%</span>입니다.
                      </p>
                      <p className="text-sm text-white/75">{riskLabel(riskScore)}</p>
                      {riskyCount >= 5 && (
                        <div className="rounded-lg border border-red-300/30 bg-red-500/10 px-3 py-3">
                          <p className="text-sm font-semibold text-red-200">
                            증빙의 결과 대비 과정 로그가 부족합니다.
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-red-100/90">
                            조사 대응의 핵심은 생성 시점 증명입니다. 실시간 로그와 타임스탬프 체계가 없으면 소급 작성 의심을
                            받기 쉽습니다.
                          </p>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                          <p className="text-white/55">취약 응답</p>
                          <p className="mt-1 text-base font-semibold text-red-300">{riskyCount}개</p>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                          <p className="text-white/55">방어 점수</p>
                          <p className="mt-1 text-base font-semibold">{100 - riskScore}점</p>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                          <p className="text-white/55">문제 강도</p>
                          <p className="mt-1 text-base font-semibold text-amber-300">{problemIntensity}점</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-white/10 bg-black/25 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BarChart3 className="h-4 w-4 text-emerald-300" />
                        카테고리 리스크 분포
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categoryStats.map((item) => (
                        <div key={item.category} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
                          <div className="mb-1.5 flex items-center justify-between text-xs">
                            <span className="text-white/80">{item.category}</span>
                            <span className={item.riskScore >= 50 ? "text-red-300" : "text-emerald-300"}>
                              {item.riskScore}%
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className={item.riskScore >= 50 ? "h-full bg-red-300" : "h-full bg-emerald-300"}
                              style={{ width: `${item.riskScore}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-white/10 bg-black/25 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">문제 강도 지표</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-white/55">부당 적발 추징액 추이</p>
                            <p className="mt-1 text-2xl font-bold text-rose-300">{latestSurcharge.toFixed(1)}억</p>
                          </div>
                          <WalletCards className="h-5 w-5 text-rose-200" />
                        </div>
                        <p className="mt-1 text-xs text-rose-200">전분기 대비 +{surchargeChange.toFixed(1)}억 (예상)</p>
                        <div className="mt-3 grid grid-cols-4 gap-1.5">
                          {surchargeTrend.map((item) => (
                            <div key={item.label} className="space-y-1">
                              <div className="h-14 rounded bg-white/10 flex items-end overflow-hidden">
                                <div
                                  className="w-full bg-gradient-to-t from-rose-500/70 to-rose-200/80"
                                  style={{ height: `${Math.min(100, (item.value / 6) * 100)}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-center text-white/60">{item.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-white/55">연구 인력 행정 매몰 비용</p>
                            <p className="mt-1 text-2xl font-bold text-cyan-300">{latestAdminCost}h/월</p>
                          </div>
                          <Users2 className="h-5 w-5 text-cyan-200" />
                        </div>
                        <p className="mt-1 text-xs text-cyan-200">전분기 대비 +{adminCostChange}h/월</p>
                        <div className="mt-3 grid grid-cols-4 gap-1.5">
                          {adminCostTrend.map((item) => (
                            <div key={item.label} className="space-y-1">
                              <div className="h-14 rounded bg-white/10 flex items-end overflow-hidden">
                                <div
                                  className="w-full bg-gradient-to-t from-cyan-500/70 to-cyan-200/80"
                                  style={{ height: `${Math.min(100, (item.value / 60) * 100)}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-center text-white/60">{item.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-amber-300/25 bg-amber-500/10 px-3 py-2">
                      <p className="text-xs text-amber-100">
                        두 지표가 동시에 상승하면 세무 리스크와 내부 비효율이 함께 확대됩니다. 즉시 로그 체계와 제출 자동화를
                        병행하는 것이 가장 효과적입니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-black/25 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">R&D 세액공제 리스크 진단 결과서</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
                        <p className="text-[11px] text-white/60">기업명</p>
                        <p className="mt-1 text-sm font-semibold">{companyName.trim() || "미입력 (귀사)"}</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
                        <p className="text-[11px] text-white/60">진단일</p>
                        <p className="mt-1 text-sm">{new Date().toLocaleDateString("ko-KR")}</p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-red-300/30 bg-red-500/10 px-3 py-2.5">
                      <p className="text-sm leading-relaxed text-red-100">
                        귀사의 {companyName.trim() || "기업"}은 특히 기술적 무결성 섹션에서{" "}
                        <span className="font-semibold text-red-200">{technicalIntegrity?.defenseScore ?? 100}점</span>을
                        기록했습니다.
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/5">
                      <div className="grid grid-cols-[1.2fr_0.9fr_0.7fr_0.7fr] border-b border-white/10 px-3 py-2 text-[11px] text-white/60">
                        <span>카테고리</span>
                        <span>방어점수</span>
                        <span>리스크</span>
                        <span>문항</span>
                      </div>
                      {categoryStats.map((item) => (
                        <div
                          key={item.category}
                          className="grid grid-cols-[1.2fr_0.9fr_0.7fr_0.7fr] px-3 py-2 text-xs text-white/85 border-b border-white/5 last:border-b-0"
                        >
                          <span>{item.category}</span>
                          <span>{item.defenseScore}점</span>
                          <span className={item.riskScore >= 50 ? "text-red-300" : "text-emerald-300"}>{item.riskScore}%</span>
                          <span>
                            {item.risky}/{item.total}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                        onClick={() => window.print()}
                      >
                        결과서 PDF 저장
                      </Button>
                      <p className="text-[11px] text-white/60">인쇄 창에서 PDF로 저장을 선택하세요.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-black/25 text-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">상세 진단 리포트 받기</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="space-y-1.5">
                        <Label htmlFor="check-company" className="text-white/80">
                          기업명
                        </Label>
                        <Input
                          id="check-company"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="주식회사 해영랩"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="check-email" className="text-white/80">
                          이메일
                        </Label>
                        <Input
                          id="check-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@company.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="check-phone" className="text-white/80">
                        연락처
                      </Label>
                      <Input
                        id="check-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button className="h-11 bg-emerald-400 text-black hover:bg-emerald-300 font-semibold">
                        리포트 요청하기
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                      >
                        <Link href="/">제품 페이지 미리보기로 이동</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 md:p-5 h-fit xl:sticky xl:top-24 space-y-3">
          <div className="mb-2 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-emerald-300" />
            <p className="text-sm font-semibold">추징 위험도 (Risk Score)</p>
          </div>

          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full"
              animate={{
                width: `${riskScore}%`,
                backgroundColor:
                  riskScore >= 80 ? "#f87171" : riskScore >= 50 ? "#fb923c" : riskScore >= 20 ? "#facc15" : "#34d399",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-white/55">현재 위험 점수</p>
            <p className="text-2xl font-bold">{riskScore}%</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-xs text-white/55 mb-1">해석 가이드</p>
            <ul className="space-y-1 text-xs text-white/80">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> 0~19: 양호
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-400" /> 20~49: 개선 필요
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" /> 50~79: 주의
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" /> 80~100: 긴급 점검
              </li>
            </ul>
          </div>

          {!isDone && (
            <div className="text-xs text-white/65 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
              취약 답변 선택 시 위험도 점수가 상승합니다
            </div>
          )}

          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-white/55 mb-1">권장 대응</p>
            <p className="text-xs text-white/80 leading-relaxed">
              리스크가 50% 이상이면 즉시 증빙 로그 연결, 타임스탬프 무결성 확보, 48시간 제출 체계 점검이 필요합니다.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-white/55">문제 강도 지표</p>
              <TrendingUp className="h-3.5 w-3.5 text-amber-300" />
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-red-400"
                style={{ width: `${problemIntensity}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-white/80">종합 {problemIntensity}점 · 추징액/매몰비용 동시 관리 필요</p>
          </div>

          {isDone && (
            <Link href="/#contact" className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200">
              상세 점검 상담으로 이동
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </aside>
      </div>
    </main>
  );
}
