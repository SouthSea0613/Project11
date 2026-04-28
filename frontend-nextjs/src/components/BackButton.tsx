"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
      onClick={() => router.back()}
    >
      ← 돌아가기
    </Button>
  );
}