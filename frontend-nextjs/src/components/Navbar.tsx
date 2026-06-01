"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ImageSlot";
import { useLang } from "@/contexts/LanguageContext";
import { minyoungPhoto } from "@/lib/minyoungResume";
import { PORTFOLIO_OWNER_NAME, PORTFOLIO_ROLE } from "@/lib/siteConfig";

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const [onAbout, setOnAbout] = useState(true);
  const { lang, setLang } = useLang();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const isHome = pathname === "/";
  const isAboutPage = pathname.startsWith("/Minyoung_Kim");
  const isProjectsPage = pathname.startsWith("/projects");
  const isNamhaeRoute = pathname.startsWith("/Namhae_Kim");
  const isNamhaeProfile =
    pathname === "/Namhae_Kim" || pathname.startsWith("/Namhae_Kim/");

  return (
    <div className="print-hide fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div
        className="absolute top-0 left-0 w-full h-4 pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
      />

      <header
        className={`w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pointer-events-auto ${
          onAbout
            ? "translate-y-0"
            : `transition-transform duration-500 ease-in-out ${hovered ? "translate-y-0" : "-translate-y-full"}`
        }`}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="mx-auto flex h-14 md:h-[4.5rem] max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-6">
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className="group flex min-w-0 items-center gap-2.5 md:gap-3"
          >
            {mounted ? (
              <span
                className={`block h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 transition md:h-10 md:w-10 ${
                  isHome || isAboutPage
                    ? "ring-sky-400"
                    : "ring-border group-hover:ring-sky-400/60"
                }`}
              >
                <ImageSlot
                  src={minyoungPhoto}
                  alt={`${PORTFOLIO_OWNER_NAME} 프로필`}
                  aspect="aspect-square"
                  rounded="rounded-full"
                  label=""
                  className="!border-0"
                  sizes="40px"
                />
              </span>
            ) : (
              <span className="block h-9 w-9 shrink-0 rounded-full bg-muted md:h-10 md:w-10" />
            )}
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-lg font-bold tracking-tight text-foreground md:text-2xl">
                {PORTFOLIO_OWNER_NAME}
              </span>
              <span className="hidden truncate text-[11px] font-medium text-muted-foreground sm:block md:text-xs">
                {PORTFOLIO_ROLE}
              </span>
            </span>
          </Link>

          {mounted && isNamhaeRoute && (
            <div className="hidden min-w-0 items-center gap-1 text-[11px] font-medium tracking-tight text-muted-foreground sm:flex md:text-xs">
              <Link
                href="/Namhae_Kim"
                aria-current={isNamhaeProfile ? "page" : undefined}
                className={`shrink-0 transition-colors ${
                  isNamhaeProfile
                    ? "text-emerald-500"
                    : "hover:text-foreground"
                }`}
              >
                김남해
              </Link>
              <span className="shrink-0 opacity-60">·</span>
              <Link
                href="/Minyoung_Kim"
                aria-current={isAboutPage ? "page" : undefined}
                className={`shrink-0 transition-colors ${
                  isAboutPage
                    ? "text-sky-500"
                    : "hover:text-foreground"
                }`}
              >
                김민영
              </Link>
            </div>
          )}

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/Minyoung_Kim"
              aria-current={isAboutPage ? "page" : undefined}
              className={`hidden md:inline-flex items-center rounded-md px-2.5 h-8 text-xs md:text-sm font-medium transition underline-offset-4 ${
                isAboutPage
                  ? "text-sky-500 underline"
                  : "text-muted-foreground hover:text-sky-500"
              }`}
            >
              About
            </Link>
            <Link
              href="/projects"
              aria-current={isProjectsPage ? "page" : undefined}
              className={`hidden md:inline-flex items-center rounded-md px-2.5 h-8 text-xs md:text-sm font-medium transition underline-offset-4 ${
                isProjectsPage
                  ? "text-sky-500 underline"
                  : "text-muted-foreground hover:text-sky-500"
              }`}
            >
              Projects
            </Link>
            <a
              href="https://planit.haeyounglab.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PlanIT 라이브 데모"
              className="hidden lg:inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-400/10 px-2.5 h-8 text-xs md:text-sm font-semibold text-sky-500 transition hover:border-sky-400/60 hover:bg-sky-400/20"
            >
              PlanIT
              <span aria-hidden="true" className="text-[10px] opacity-80">
                ↗
              </span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground px-3 h-8"
              onClick={() =>
                setLang(lang === "KO" ? "EN" : lang === "EN" ? "JP" : "KO")
              }
            >
              {lang === "KO" ? "EN" : lang === "EN" ? "日本語" : "한국어"}
            </Button>
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
