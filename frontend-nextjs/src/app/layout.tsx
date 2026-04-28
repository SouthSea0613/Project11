import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
    url: "https://www.haeyounglab.com",
    siteName: "haeyounglab",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "haeyounglab" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "haeyounglab (해영랩) | 아이디어와 실행의 실험실",
    description: "게임, 웹앱, 미들웨어 등 다양한 아이디어를 실현하는 해영랩(HAEYOUNGLAB)입니다.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://www.haeyounglab.com"),
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        {/* 1. head 태그 안쪽으로 위치 이동을 권장합니다 */}
        <head>
            <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1856461656226617"
                    crossOrigin="anonymous"></script>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
            <LanguageProvider>
                <Navbar />
                {children}
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
