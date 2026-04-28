import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="snap-start border-t bg-background">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          {/* 브랜드 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
                H
              </span>
              <span className="font-bold text-lg text-foreground">HAEYOUNGLAB</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              연구는 집중하고, 증빙은 자동화합니다.<br />해영랩은 R&D 세무 리스크를 실행 데이터로 줄입니다.
            </p>
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="flex flex-col gap-1">
              <li>
                <Button asChild variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                  <a href="tel:010-2895-7823">📞 010-2895-7823</a>
                </Button>
              </li>
              <li>
                <Button asChild variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                  <a href="mailto:tksz0613@gmail.com">✉️ tksz0613@gmail.com</a>
                </Button>
              </li>
            </ul>
          </div>

          {/* 메뉴 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">바로가기</h4>
            <ul className="flex flex-col gap-1">
              {[
                { label: "소개", href: "#about" },
                { label: "핵심 가치", href: "#value" },
                { label: "라이브 로그", href: "#live-log" },
                { label: "샌드박스", href: "#sandbox" },
                { label: "문의", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Button asChild variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                    <a href={item.href}>{item.label}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-10" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} HAEYOUNGLAB. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}