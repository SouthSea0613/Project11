"use client";

import { createContext, useContext, useState } from "react";
import { t, type Translations } from "@/lib/translations";

export type Lang = "KO" | "EN" | "JP";

// TS 서버 캐시 이슈 우회: unknown 경유 캐스트
const tr_map = t as unknown as Record<Lang, Translations>;

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    tr: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "KO",
    setLang: () => {},
    tr: tr_map["KO"],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("KO");
    return (
        <LanguageContext.Provider value={{ lang, setLang, tr: tr_map[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}