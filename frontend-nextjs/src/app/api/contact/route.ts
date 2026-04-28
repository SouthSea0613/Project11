import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "tksz0613@gmail.com";

function getResend(): Resend | null {
    const key = process.env.RESEND_API_KEY;
    if (!key) return null;
    return new Resend(key);
}

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: "모든 항목을 입력해주세요." }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
        return NextResponse.json(
            { error: "메일 발송 설정이 되어 있지 않습니다." },
            { status: 500 },
        );
    }

    const { error } = await resend.emails.send({
        from: "HAEYOUNGLAB 문의 <onboarding@resend.dev>",
        to: TO_EMAIL,
        subject: `[HAEYOUNGLAB 문의] ${name}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px;">
                <h2 style="color: #111;">새 문의가 도착했습니다</h2>
                <table style="width:100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px; color: #555;">이름</td><td style="padding: 8px;">${name}</td></tr>
                    <tr><td style="padding: 8px; color: #555;">이메일</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
                </table>
                <hr style="margin: 16px 0;" />
                <p style="white-space: pre-wrap; color: #222;">${message}</p>
            </div>
        `,
    });

    if (error) {
        return NextResponse.json({ error: "발송에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}