"use client";

import Link from "next/link";
import { useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";
import { ImageLightbox, type LightboxItem } from "@/components/ImageLightbox";

export type HighlightImageItem = {
  src: string;
  caption: string;
  /** 캡션 클릭 시 이동할 프로젝트 상세 경로 */
  href: string;
};

type HighlightImageGridProps = {
  items: HighlightImageItem[];
  /** 호버·포커스 강조 색 */
  accent?: "emerald" | "sky";
};

const ACCENT_TEXT: Record<NonNullable<HighlightImageGridProps["accent"]>, string> = {
  emerald: "group-hover:text-emerald-400",
  sky: "group-hover:text-sky-400",
};

const ACCENT_BORDER: Record<NonNullable<HighlightImageGridProps["accent"]>, string> = {
  emerald: "hover:border-emerald-400/60",
  sky: "hover:border-sky-400/60",
};

const ACCENT_RING: Record<NonNullable<HighlightImageGridProps["accent"]>, string> = {
  emerald: "focus-visible:ring-emerald-500",
  sky: "focus-visible:ring-sky-500",
};

/**
 * 자료 카드 그리드 — 이미지를 클릭하면 라이트박스가 열리고,
 * 캡션은 별도 링크로 프로젝트 상세 페이지로 이동합니다.
 */
export default function HighlightImageGrid({
  items,
  accent = "emerald",
}: HighlightImageGridProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const lightboxItems: LightboxItem[] = items.map((item) => ({
    src: item.src,
    alt: item.caption,
    caption: item.caption,
  }));

  return (
    <>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <article
            key={item.src}
            className={`overflow-hidden rounded-lg border bg-background/40 transition ${ACCENT_BORDER[accent]}`}
          >
            <button
              type="button"
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
              className={`group relative block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 ${ACCENT_RING[accent]}`}
              aria-label={`${item.caption} 크게 보기`}
            >
              <ImageSlot
                src={item.src}
                alt={item.caption}
                aspect="aspect-[16/10]"
                rounded="rounded-none"
                label="이미지 추가 예정"
                className="transition group-hover:opacity-90"
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                  확대 ⤢
                </span>
              </span>
            </button>
            <Link
              href={item.href}
              className={`block p-2 text-[11px] text-muted-foreground transition ${ACCENT_TEXT[accent]}`}
            >
              {item.caption} →
            </Link>
          </article>
        ))}
      </div>
      <ImageLightbox
        items={lightboxItems}
        initialIndex={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
