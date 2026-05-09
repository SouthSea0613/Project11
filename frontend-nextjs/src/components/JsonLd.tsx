import type { ReactElement } from "react";

type JsonLdProps = {
  /** schema.org JSON-LD payload (단일 객체 또는 객체 배열) */
  data: Record<string, unknown> | Record<string, unknown>[];
  /** 디버깅·중복 제거용 식별자 */
  id?: string;
};

/**
 * 서버 컴포넌트 — `<script type="application/ld+json">`을 페이지에 주입합니다.
 * Next.js metadata API가 직접 지원하지 않는 구조화 데이터를 안전하게 출력합니다.
 */
export default function JsonLd({ data, id }: JsonLdProps): ReactElement {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
