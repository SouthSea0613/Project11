"use client";

import { useState } from "react";
import { ImageSlot } from "@/components/ImageSlot";
import { ImageLightbox, type LightboxItem } from "@/components/ImageLightbox";
import type { GalleryItem } from "@/lib/portfolioData";

type ProjectGalleryProps = {
  images: GalleryItem[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const items: LightboxItem[] = images.map((img, idx) => ({
    src: img.src,
    alt: img.caption ?? `${title} 이미지 ${idx + 1}`,
    caption:
      img.caption ?? `${title} · ${idx + 1} / ${images.length}`,
  }));

  return (
    <>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
            className="group cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={`${img.caption ?? `${title} 이미지 ${idx + 1}`} 크게 보기`}
          >
            <div className="relative">
              <ImageSlot
                src={img.src}
                alt={img.caption ?? `${title} 이미지 ${idx + 1}`}
                aspect="aspect-[4/3]"
                rounded="rounded-xl"
                label={`이미지 ${idx + 1} 추가 예정`}
                className="transition group-hover:opacity-90"
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <span className="text-[11px] font-medium text-white/90">
                  {idx + 1} / {images.length}
                </span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                  확대 ⤢
                </span>
              </span>
            </div>
            {img.caption && (
              <p className="mt-1.5 text-[11px] text-muted-foreground line-clamp-1">
                {img.caption}
              </p>
            )}
          </button>
        ))}
      </div>
      <ImageLightbox
        items={items}
        initialIndex={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
