import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                // 1. ads.txt를 제외한 모든 경로를 캡처합니다.
                // :path* 는 하위 경로까지 모두 포함한다는 의미입니다.
                source: "/:path((?!ads.txt).*)",
                // 2. 캡처된 경로를 서브도메인의 동일한 경로로 보냅니다.
                destination: "https://planit.haeyounglab.com/:path*",
                // 3. 301 영구 리다이렉트 설정을 통해 SEO 점수를 유지합니다.
                permanent: true,
            },
        ];
    },
};

export default nextConfig;