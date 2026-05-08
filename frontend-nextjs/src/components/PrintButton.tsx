"use client";

import { useCallback } from "react";

type PrintButtonProps = {
  /** 인쇄 시 페이지 제목으로 잠깐 사용할 문서 타이틀 (예: 김남해_HaeYoungLab) */
  documentTitle?: string;
  className?: string;
  label?: string;
};

/**
 * 브라우저 인쇄 다이얼로그를 호출합니다.
 * 사용자는 "대상: PDF로 저장"을 선택해 PDF로 추출할 수 있습니다.
 */
export default function PrintButton({
  documentTitle,
  className,
  label = "PDF로 저장",
}: PrintButtonProps) {
  const handleClick = useCallback(() => {
    if (typeof window === "undefined") return;
    const original = document.title;
    if (documentTitle) document.title = documentTitle;
    const restore = () => {
      document.title = original;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  }, [documentTitle]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "print-hide inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
      }
      aria-label="PDF로 저장 (인쇄 다이얼로그 열기)"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9V2h12v7" />
        <rect x="6" y="14" width="12" height="8" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      </svg>
      {label}
    </button>
  );
}
