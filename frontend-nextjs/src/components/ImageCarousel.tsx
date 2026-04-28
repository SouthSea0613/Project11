"use client";

import { useEffect, useState } from "react";

interface ImageCarouselProps {
    images?: string[];
    count?: number;
}

export default function ImageCarousel({ images, count = 4 }: ImageCarouselProps) {
    const total = images ? images.length : count;
    const [activeIdx, setActiveIdx] = useState(0);
    const [, setSlide] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => {
                const next = (prev + 1) % total;
                if (next === 0) {
                    setSlide(false);
                    setTimeout(() => setSlide(true), 30);
                } else {
                    setSlide(true);
                }
                return next;
            });
        }, 3500);
        return () => clearInterval(timer);
    }, [total]);

    return (
        <div className="flex flex-col gap-3">
            {/* 메인 이미지 */}
            <div className="relative w-full h-[260px] md:h-[400px] lg:h-[480px] rounded-xl lg:rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-sm">
                {Array.from({ length: total }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 flex items-center justify-center text-white/20 text-sm transition-opacity duration-700 ease-in-out"
                        style={{ opacity: i === activeIdx ? 1 : 0 }}
                    >
                        {images?.[i] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={images[i]}
                                alt={`이미지 ${i + 1}`}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span>이미지 {i + 1}</span>
                        )}
                    </div>
                ))}

                {/* 좌우 화살표 */}
                <button
                    onClick={() => { setSlide(true); setActiveIdx((prev) => (prev - 1 + total) % total); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/20 text-white/70 hover:bg-black/60 hover:text-white transition-all flex items-center justify-center text-sm"
                    aria-label="이전"
                >
                    ‹
                </button>
                <button
                    onClick={() => { setSlide(true); setActiveIdx((prev) => (prev + 1) % total); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/20 text-white/70 hover:bg-black/60 hover:text-white transition-all flex items-center justify-center text-sm"
                    aria-label="다음"
                >
                    ›
                </button>

                {/* 번호 표시 */}
                <span className="absolute bottom-2 right-3 text-xs text-white/40 font-mono">
                    {activeIdx + 1} / {total}
                </span>
            </div>

            {/* 썸네일 스트립 */}
            <div className="flex gap-2">
                {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setSlide(true); setActiveIdx(i); }}
                        className={`flex-1 h-14 md:h-16 rounded-lg border overflow-hidden transition-all duration-300 ${
                            i === activeIdx
                                ? "border-white/60 opacity-100 scale-[1.03]"
                                : "border-white/15 opacity-40 hover:opacity-70"
                        }`}
                        style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                        {images?.[i] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={images[i]} alt="" className="w-full h-full object-contain" />
                        ) : (
                            <span className="flex items-center justify-center h-full text-white/20 text-xs">{i + 1}</span>
                        )}
                    </button>
                ))}
            </div>

        </div>
    );
}