"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageLightboxProps = {
  items: LightboxItem[];
  /** 어느 인덱스부터 시작할지 (외부 트리거) */
  initialIndex?: number;
  /** 컨트롤드 모드용 — 부모에서 open 상태 관리하고 싶을 때 */
  open?: boolean;
  onClose?: () => void;
  /** 부모가 인덱스 동기화를 받고 싶을 때 */
  onIndexChange?: (idx: number) => void;
};

/**
 * 풀스크린 라이트박스. ESC/오버레이 클릭/← →/닫기 버튼으로 제어.
 */
export function ImageLightbox({
  items,
  initialIndex = 0,
  open: openProp,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const close = useCallback(() => {
    if (onClose) onClose();
    else setInternalOpen(false);
  }, [onClose]);

  const next = useCallback(() => {
    setIndex((cur) => {
      const v = (cur + 1) % items.length;
      onIndexChange?.(v);
      return v;
    });
  }, [items.length, onIndexChange]);

  const prev = useCallback(() => {
    setIndex((cur) => {
      const v = (cur - 1 + items.length) % items.length;
      onIndexChange?.(v);
      return v;
    });
  }, [items.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  if (!open || items.length === 0) return null;

  const current = items[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={close}
    >
      {/* 상단 컨트롤 */}
      <div
        className="absolute right-4 top-4 z-10 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={close}
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
          aria-label="닫기"
        >
          닫기 ✕
        </button>
      </div>

      {/* 좌우 이동 (2장 이상일 때만) */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="이전 이미지"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="다음 이미지"
          >
            ›
          </button>
        </>
      )}

      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 1024px) 70vw, 95vw"
            className="object-contain"
            unoptimized
            priority
          />
        </div>
        {current.caption && (
          <p className="text-center text-sm text-white/80">{current.caption}</p>
        )}
      </div>
    </div>
  );
}

type ZoomableImageProps = {
  src?: string;
  alt: string;
  aspect?: string;
  rounded?: string;
  label?: string;
  className?: string;
  /** 클릭 시 라이트박스에 함께 노출할 시리즈 (현재 src가 들어 있어야 함) */
  group?: LightboxItem[];
  caption?: string;
};

/**
 * 썸네일 + 클릭 시 라이트박스 자동 오픈. 단일 이미지/그룹 모두 지원.
 */
export default function ZoomableImage({
  src,
  alt,
  aspect = "aspect-[16/9]",
  rounded = "rounded-xl",
  label = "이미지 추가 예정",
  className = "",
  group,
  caption,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  const items: LightboxItem[] =
    group && group.length > 0
      ? group
      : src
        ? [{ src, alt, caption }]
        : [];

  const initialIndex =
    group && src ? Math.max(0, group.findIndex((g) => g.src === src)) : 0;

  if (!src) {
    return (
      <ImageSlot
        src={src}
        alt={alt}
        aspect={aspect}
        rounded={rounded}
        label={label}
        className={className}
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={`block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
        aria-label={`${alt} 크게 보기`}
      >
        <ImageSlot
          src={src}
          alt={alt}
          aspect={aspect}
          rounded={rounded}
          label={label}
          className={`transition hover:opacity-90 ${className}`}
        />
      </button>
      <ImageLightbox
        items={items}
        initialIndex={initialIndex}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
