"use client";

import Image from "next/image";
import { useState } from "react";

type ImageSlotProps = {
  src?: string;
  alt: string;
  /** Tailwind aspect-ratio class. 기본 16/9 */
  aspect?: string;
  /** placeholder 안내 문구 */
  label?: string;
  className?: string;
  /** 라운드 강도 (rounded-md / rounded-xl 등) */
  rounded?: string;
};

/**
 * 이미지가 아직 없을 때 점선 placeholder, 있을 때 실제 이미지를 표시합니다.
 * 파일이 없거나 로드에 실패하면 자동으로 placeholder로 폴백합니다.
 */
export function ImageSlot({
  src,
  alt,
  aspect = "aspect-[16/9]",
  label = "이미지 추가 예정",
  className = "",
  rounded = "rounded-xl",
}: ImageSlotProps) {
  const [errored, setErrored] = useState(false);
  const showImage = !!src && !errored;

  return (
    <div
      className={`relative overflow-hidden border ${
        showImage ? "border-border/60 bg-muted/40" : "border-dashed border-border/70"
      } ${rounded} ${aspect} ${className}`}
      aria-label={showImage ? undefined : label}
    >
      {showImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setErrored(true)}
          unoptimized
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-slate-500/5 to-emerald-500/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="1.6" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span className="text-[11px] font-medium tracking-wide">{label}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
