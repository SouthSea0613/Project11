import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
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

export const metadata: Metadata = {
  title: "haeyounglab (해영랩) | 아이디어와 실행의 실험실",
  description: "게임, 웹앱, 미들웨어 등 다양한 아이디어를 실현하는 해영랩(HAEYOUNGLAB)입니다. 상상을 현실로, 아이디어를 실행으로.",
  keywords: ["haeyounglab", "해영랩", "HAEYOUNGLAB", "게임", "웹앱", "미들웨어", "스타트업", "아이디어"],
  openGraph: {
    title: "haeyounglab (해영랩) | 아이디어와 실행의 실험실",
    description: "게임, 웹앱, 미들웨어 등 다양한 아이디어를 실현하는 해영랩(HAEYOUNGLAB)입니다.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "haeyounglab (해영랩) | 아이디어와 실행의 실험실",
    description: "게임, 웹앱, 미들웨어 등 다양한 아이디어를 실현하는 해영랩(HAEYOUNGLAB)입니다.",
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
