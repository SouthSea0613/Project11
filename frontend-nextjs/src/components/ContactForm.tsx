"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/contexts/LanguageContext";

type Theme = "light" | "dark";

interface ContactFormProps {
    theme?: Theme;
    title?: string;
    submitLabel?: string;
    messagePlaceholder?: string;
}

export default function ContactForm({
    theme = "light",
    title,
    submitLabel,
    messagePlaceholder,
}: ContactFormProps) {
    const { tr } = useLang();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const isDark = theme === "dark";
    const resolvedSubmitLabel = submitLabel ?? tr.contactSubmit;
    const resolvedMsgPlaceholder = messagePlaceholder ?? tr.contactMessagePlaceholder;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        });

        if (res.ok) {
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        } else {
            const data = await res.json();
            setErrorMsg(data.error ?? "오류가 발생했습니다.");
            setStatus("error");
        }
    };

    const inputClass = isDark
        ? "bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-white/30"
        : "";
    const labelClass = isDark ? "text-white/80" : "";

    const formContent = (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {title && <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-foreground"}`}>{title}</p>}
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="cf-name" className={labelClass}>{tr.contactNameLabel}</Label>
                <Input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={tr.contactNamePlaceholder} required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="cf-email" className={labelClass}>{tr.contactEmailLabel}</Label>
                <Input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tr.contactEmailPlaceholder} required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="cf-message" className={labelClass}>{tr.contactMessageLabel}</Label>
                <Textarea id="cf-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder={resolvedMsgPlaceholder} required className={`resize-none ${inputClass}`} />
            </div>

            {status === "success" && (
                <p className={`text-sm ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                    {tr.contactSuccess}
                </p>
            )}
            {status === "error" && (
                <p className={`text-sm ${isDark ? "text-red-400" : "text-red-500"}`}>
                    {errorMsg}
                </p>
            )}

            <Button
                type="submit"
                disabled={status === "loading"}
                className={isDark
                    ? "w-full bg-white text-black hover:bg-white/90 font-semibold"
                    : "w-full"
                }
            >
                {status === "loading" ? tr.contactSending : resolvedSubmitLabel}
            </Button>
        </form>
    );

    if (isDark) {
        return (
            <div className="w-full lg:w-[460px] flex flex-col gap-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 lg:p-5">
                {formContent}
            </div>
        );
    }

    return (
        <Card className="w-full lg:w-[460px]">
            <CardContent className="p-5">
                {formContent}
            </CardContent>
        </Card>
    );
}