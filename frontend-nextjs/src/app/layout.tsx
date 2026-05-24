import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  DEFAULT_OG_IMAGE_PATH,
  PORTFOLIO_OWNER_NAME,
  PORTFOLIO_SITE_TITLE,
  SITE_URL,
} from "@/lib/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultDescription =
  "의료·운영 데이터 연동과 B2B SaaS 제품 경험을 소개하는 김민영의 백엔드·풀스택 포트폴리오입니다.";

export const metadata: Metadata = {
  title: {
    default: PORTFOLIO_SITE_TITLE,
    template: `%s | ${PORTFOLIO_OWNER_NAME}`,
  },
  description: defaultDescription,
  keywords: [
    "김민영",
    "포트폴리오",
    "백엔드",
    "풀스택",
    ".NET",
    "MS-SQL",
    "의료 IT",
  ],
  openGraph: {
    title: PORTFOLIO_SITE_TITLE,
    description: defaultDescription,
    url: SITE_URL,
    siteName: PORTFOLIO_OWNER_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_OWNER_NAME} Portfolio`,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PORTFOLIO_SITE_TITLE,
    description: defaultDescription,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Script
          id="adsbygoogle-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1856461656226617"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
