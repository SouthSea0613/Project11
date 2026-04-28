"use client";

import { useRef, useState } from "react";

const slides = [
  {
    id: 1,
    accent: "bg-blue-500",
    label: "WELCOME",
    title: "해영랩(HAEYOUNGLAB)에 오신 것을 환영합니다",
    desc: "혁신적인 기술과 콘텐츠를 경험하세요. 해영랩(HAEYOUNGLAB)이 만드는 새로운 세계를 만나보세요.",
  },
  {
    id: 2,
    accent: "bg-violet-500",
    label: "ABOUT",
    title: "우리를 소개합니다",
    desc: "해영랩(HAEYOUNGLAB)의 비전과 미션, 그리고 우리가 걸어온 길을 확인하세요.",
  },
  {
    id: 3,
    accent: "bg-indigo-500",
    label: "PATENT",
    title: "특허 기술",
    desc: "독자적인 기술력으로 미래를 선도합니다. 다양한 분야의 혁신 특허를 보유하고 있습니다.",
  },
  {
    id: 4,
    accent: "bg-teal-500",
    label: "GAME",
    title: "게임 콘텐츠",
    desc: "몰입감 있는 게임 경험을 제공합니다. 창의적인 게임 세계로 초대합니다.",
  },
  {
    id: 5,
    accent: "bg-cyan-500",
    label: "PROGRAM",
    title: "프로그램",
    desc: "생산성을 높이는 스마트한 솔루션. 다양한 환경에 최적화된 프로그램을 제공합니다.",
  },
  {
    id: 6,
    accent: "bg-pink-500",
    label: "FUTURE",
    title: "더 나은 미래를 만들어갑니다",
    desc: "기술의 경계를 넘어 새로운 가능성을 탐구하며 해영랩(HAEYOUNGLAB)과 함께 미래를 만들어가세요.",
  },
];

export default function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft ?? 0));
    setScrollLeft(containerRef.current?.scrollLeft ?? 0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft ?? 0);
    const walk = (x - startX) * 1.2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <section className="w-full border-b bg-muted/30 py-6">
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`
          flex gap-5 overflow-x-scroll px-8
          scrollbar-none select-none
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="
              flex-shrink-0
              w-[80vw]
              sm:w-[55vw]
              md:w-[40vw]
              lg:w-[30vw]
              xl:w-[22vw]
              2xl:w-[17vw]
              h-64
              sm:h-72
              lg:h-80
              rounded-2xl border bg-card text-card-foreground shadow-sm
              overflow-hidden
              hover:shadow-lg transition-shadow duration-200
            "
          >
            {/* 상단 컬러 블록 */}
            <div className={`h-2 w-full ${slide.accent}`} />

            <div className="flex flex-col justify-between h-[calc(100%-8px)] p-6">
              <div className="flex flex-col gap-3">
                <span
                  className={`
                    inline-block w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-widest text-white
                    ${slide.accent}
                  `}
                >
                  {slide.label}
                </span>
                <h3 className="font-bold text-lg leading-snug text-foreground">
                  {slide.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {slide.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-4">
                <span>자세히 보기</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}