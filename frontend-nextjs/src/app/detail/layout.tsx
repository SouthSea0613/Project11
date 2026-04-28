import DetailScrollFix from "@/components/DetailScrollFix";

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DetailScrollFix />
      {children}
    </>
  );
}