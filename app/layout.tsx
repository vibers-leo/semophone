import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "세모폰 - 세상의 모든 휴대폰",
  description: "직접 오시면 가격이 다릅니다. 수도권 40개 성지 매장에서 온라인에 없는 가격을 경험하세요.",
  keywords: "휴대폰, 스마트폰, 핸드폰 매장, 세모폰, 휴대폰 성지",
  openGraph: {
    title: "세모폰 — 세상모든휴대폰",
    description: "직접 오시면 가격이 다릅니다. 수도권 40개 성지 매장.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F2C811" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
