"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const [onAbout, setOnAbout] = useState(true);
  const { lang, setLang } = useLang();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const update = () => {
      setOnAbout(window.scrollY < window.innerHeight * 0.5);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (pathname.startsWith("/detail")) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* 호버 트리거 영역 */}
      <div
        className="absolute top-0 left-0 w-full h-4 pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
      />

      {/* 네비게이션 바 */}
      <header
        className={`w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pointer-events-auto ${
          onAbout
            ? "translate-y-0"
            : `transition-transform duration-500 ease-in-out ${hovered ? "translate-y-0" : "-translate-y-full"}`
        }`}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="mx-auto flex h-14 md:h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-6">
          <div className="flex min-w-0 items-center gap-1.5 md:gap-2">
            {pathname.startsWith("/haeyoungsoftware") ? (
              <span className="truncate font-semibold text-xs tracking-tight text-foreground md:text-sm">
                HAEYOUNGSOFTWARE
              </span>
            ) : (
              <a
                href="https://www.haeyounglab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-semibold text-xs tracking-tight text-foreground underline-offset-4 hover:text-emerald-600 hover:underline md:text-sm"
              >
                HAEYOUNGLAB
              </a>
            )}
            {mounted ? (
              <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-medium tracking-tight text-muted-foreground md:text-xs">
                <Link
                  href="/Namhae_Kim"
                  className="hover:text-foreground transition-colors"
                >
                  김남해
                </Link>
                <span aria-hidden="true">·</span>
                <Link
                  href="/Minyoung_Kim"
                  className="hover:text-foreground transition-colors"
                >
                  김민영
                </Link>
              </span>
            ) : (
              <span className="shrink-0 text-[11px] font-medium tracking-tight text-muted-foreground md:text-xs">
                김남해 · 김민영
              </span>
            )}
          </div>

          {/* 우측 버튼 */}
          <div className="flex items-center gap-1 md:gap-2">
            {pathname.startsWith("/haeyoungsoftware") ? (
              <a
                href="https://www.haeyounglab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold tracking-tight text-foreground underline-offset-4 hover:text-emerald-600 hover:underline px-3"
              >
                HAEYOUNGLAB
              </a>
            ) : (
              <Button asChild variant="ghost" size="sm" className="text-xs md:text-sm font-medium px-3 h-8 text-muted-foreground hover:text-foreground">
                <Link href="/haeyoungsoftware">HAEYOUNGSOFTWARE</Link>
              </Button>
            )}
            {/* 언어 토글 */}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground px-3 h-8"
              onClick={() => setLang(lang === "KO" ? "EN" : lang === "EN" ? "JP" : "KO")}
            >
              {lang === "KO" ? "EN" : lang === "EN" ? "日本語" : "한국어"}
            </Button>

            {/* 다크모드 토글 */}
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 px-0 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="테마 전환"
            >
              {mounted ? (isDark ? "☀️" : "🌙") : "🌙"}
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}