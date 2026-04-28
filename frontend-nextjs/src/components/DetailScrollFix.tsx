"use client";

import { useEffect } from "react";

export default function DetailScrollFix() {
  useEffect(() => {
    document.documentElement.classList.add("detail-page");
    return () => {
      document.documentElement.classList.remove("detail-page");
    };
  }, []);

  return null;
}