"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";

type ProfilePhotoViewerProps = {
  src: string;
  alt: string;
};

export default function ProfilePhotoViewer({ src, alt }: ProfilePhotoViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        aria-label={`${alt} 크게 보기`}
      >
        <ImageSlot
          src={src}
          alt={alt}
          aspect="aspect-square"
          rounded="rounded-2xl"
          label="프로필 사진"
          className="transition hover:opacity-90"
          sizes="(min-width: 768px) 280px, 60vw"
          priority
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} 확대 이미지`}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
            >
              닫기
            </button>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 720px, 90vw"
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
