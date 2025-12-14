import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// 사이트 URL
const siteUrl = "https://byeongjeom-landing.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // 기본 메타 정보
  title: {
    default: "상가다이찌 | 병점복합타운 상가 & 사무실 전문",
    template: "%s | 상가다이찌",
  },
  description: "병점복합타운 상가·사무실 전문 상가다이찌입니다. 창업 상담, 양도양수, 매물정보, 부동산 상식까지 한 곳에서! 병점역 도보 5분, 무료 상담 신청하세요.",

  // SEO 키워드
  keywords: [
    "상가다이찌",
    "병점복합타운",
    "병점 상가",
    "병점 사무실",
    "병점역 상가",
    "화성시 상가",
    "상가 창업",
    "상가 양도양수",
    "상가 임대",
    "사무실 임대",
    "창업 상담",
    "매물정보",
    "부동산 상식",
    "병점 부동산",
    "화성 부동산",
  ],

  // 작성자 정보
  authors: [{ name: "상가다이찌", url: siteUrl }],
  creator: "상가다이찌",
  publisher: "상가다이찌",

  // 검색 엔진 설정
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 언어 및 지역 설정
  alternates: {
    canonical: siteUrl,
    languages: {
      "ko-KR": siteUrl,
    },
  },

  // Open Graph (페이스북, 카카오톡 등)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "상가다이찌",
    title: "상가다이찌 | 병점복합타운 상가 & 사무실 전문",
    description: "병점복합타운 상가·사무실 전문! 창업 상담, 양도양수, 매물정보, 부동산 상식까지. 병점역 도보 5분, 지금 무료 상담 신청하세요.",
    images: [
      {
        url: "/land.png",
        width: 1200,
        height: 630,
        alt: "상가다이찌 - 상담문의, 매물정보, 부동산 상식, 홈페이지",
        type: "image/png",
      },
    ],
  },

  // Twitter 카드
  twitter: {
    card: "summary_large_image",
    title: "상가다이찌 | 병점복합타운 상가 & 사무실",
    description: "병점복합타운 상가·사무실 전문! 창업 상담, 양도양수, 매물정보까지.",
    images: ["/land.png"],
    creator: "@sangadaiji",
  },

  // 기타 메타 정보
  category: "부동산",
  classification: "상가/사무실 임대",

  // 네이버 웹마스터 도구 인증 (네이버 서치어드바이저에서 발급받은 코드로 교체)
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
    // 네이버는 other에서 설정
    other: {
      "naver-site-verification": "YOUR_NAVER_SITE_VERIFICATION_CODE",
    },
  },

  // 앱 관련 (필요시)
  applicationName: "상가다이찌",

  // 포맷 감지 비활성화 (전화번호 자동 링크 방지)
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

// JSON-LD 구조화 데이터 (검색 엔진 최적화)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "상가다이찌",
  description: "병점복합타운 상가·사무실 전문 부동산. 창업 상담, 양도양수, 매물정보 제공.",
  url: siteUrl,
  logo: `${siteUrl}/land.png`,
  image: `${siteUrl}/land.png`,
  telephone: "1588-0000",
  email: "contact@sangadaiji.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "병점동 123-45 병점복합타운",
    addressLocality: "화성시",
    addressRegion: "경기도",
    postalCode: "18000",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.2294,
    longitude: 126.9526,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  sameAs: [
    // 소셜 미디어 URL 추가
  ],
  priceRange: "$$",
  areaServed: {
    "@type": "City",
    name: "화성시",
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
        {/* Pretendard 폰트 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />

        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 네이버 애널리틱스 (필요시 ID 교체) */}
        {/* <script src="//wcs.naver.net/wcslog.js"></script> */}

        {/* Google Analytics 4 - GA_MEASUREMENT_ID를 실제 ID로 교체하세요 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
