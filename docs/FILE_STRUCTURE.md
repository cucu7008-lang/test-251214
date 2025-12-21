# 전체 파일 구조 및 설명

## 프로젝트 루트

```
byeongjeom-landing/
├── .git/                      # Git 저장소
├── .next/                     # Next.js 빌드 출력 (자동 생성)
├── node_modules/              # NPM 패키지 (자동 생성)
├── docs/                      # 프로젝트 문서
├── public/                    # 정적 파일
├── src/                       # 소스 코드
├── .env.local                 # 환경 변수 (로컬)
├── .eslintrc.json            # ESLint 설정
├── .gitignore                # Git 무시 파일
├── next.config.ts            # Next.js 설정
├── package.json              # NPM 패키지 정의
├── package-lock.json         # 패키지 잠금 파일
├── postcss.config.mjs        # PostCSS 설정
├── README.md                 # 프로젝트 소개
├── tailwind.config.ts        # Tailwind CSS 설정
└── tsconfig.json             # TypeScript 설정
```

## docs/ - 문서 폴더

```
docs/
├── README.md                  # 프로젝트 개요
├── SETUP.md                   # 설치 및 설정 가이드
├── API.md                     # API 문서
├── COMPONENTS.md              # 컴포넌트 가이드
├── FIREBASE.md                # Firebase 사용법
├── DEPLOYMENT.md              # 배포 가이드
└── FILE_STRUCTURE.md          # 이 파일
```

## public/ - 정적 파일

```
public/
├── logo.png                   # 로고 이미지 (PNG)
├── logo.svg                   # 로고 이미지 (SVG)
├── favicon.ico                # 파비콘
├── robots.txt                 # 검색 엔진 크롤러 설정
└── sitemap.xml                # 사이트맵
```

## src/ - 소스 코드

### src/app/ - Next.js App Router 페이지

```
src/app/
├── layout.tsx                 # 루트 레이아웃
├── page.tsx                   # 홈페이지
├── globals.css                # 전역 스타일
│
├── admin/                     # 관리자 페이지
│   ├── layout.tsx            # 관리자 레이아웃
│   ├── page.tsx              # 대시보드
│   ├── firebase-sync/        # Firebase 동기화
│   │   └── page.tsx
│   ├── orders/               # 주문 관리
│   │   └── page.tsx
│   ├── products/             # 상품 관리
│   │   └── page.tsx
│   └── users/                # 사용자 관리
│       └── page.tsx
│
├── api/                       # API 라우트
│   ├── auth/                 # 인증 API
│   │   └── [...nextauth]/
│   │       └── route.ts
│   ├── firebase/             # Firebase API
│   │   ├── sync/
│   │   │   └── route.ts
│   │   └── test/
│   │       └── route.ts
│   └── news/                 # 뉴스 API (예시)
│       └── route.ts
│
├── auth/                      # 인증 페이지
│   └── signin/
│       └── page.tsx
│
├── firebase-test/             # Firebase 테스트 페이지
│   └── page.tsx
│
├── mypage/                    # 마이페이지
│   ├── layout.tsx
│   ├── page.tsx              # 마이페이지 홈
│   ├── orders/               # 주문 내역
│   │   └── page.tsx
│   ├── profile/              # 프로필 관리
│   │   └── page.tsx
│   └── settings/             # 설정
│       └── page.tsx
│
├── payment/                   # 결제 페이지
│   ├── fail/                 # 결제 실패
│   │   └── page.tsx
│   └── success/              # 결제 성공
│       └── page.tsx
│
├── payment-test/              # 결제 테스트
│   └── page.tsx
│
├── preview/                   # 미리보기 페이지
│   └── page.tsx
│
├── products/                  # 상품 페이지
│   └── [id]/                 # 동적 라우트
│       └── page.tsx
│
└── review-test/               # 리뷰 테스트
    └── page.tsx
```

### src/components/ - React 컴포넌트

```
src/components/
├── admin/                     # 관리자 컴포넌트
│   ├── AdminHeader.tsx       # 관리자 헤더
│   └── AdminSidebar.tsx      # 관리자 사이드바
│
├── auth/                      # 인증 컴포넌트
│   └── AdminGuard.tsx        # 관리자 권한 가드
│
├── layout/                    # 레이아웃 컴포넌트
│   ├── Header.tsx            # 메인 헤더
│   └── Footer.tsx            # 푸터
│
├── providers/                 # Context Providers
│   └── SessionProvider.tsx   # NextAuth 세션 Provider
│
└── sections/                  # 랜딩페이지 섹션
    ├── Hero.tsx              # 히어로 섹션
    ├── Benefits.tsx          # 혜택 섹션
    ├── Offer.tsx             # 오퍼/할인 섹션
    ├── Products.tsx          # 상품 목록 섹션
    ├── ProductsShowcase.tsx  # 상품 쇼케이스
    └── Story.tsx             # 스토리 섹션
```

### src/lib/ - 유틸리티 및 설정

```
src/lib/
├── firebase.ts                # Firebase 초기화 설정
└── firebaseSync.ts            # Firebase CRUD 함수
```

### 기타 src/ 파일

```
src/
└── auth.ts                    # NextAuth 설정
```

## 주요 설정 파일 상세

### package.json

```json
{
  "name": "byeongjeom-landing",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev --turbopack -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.0.10",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-auth": "^5.0.0-beta.25",
    "firebase": "^11.1.0",
    "@radix-ui/react-*": "^1.1.2",
    "lucide-react": "^0.469.0",
    "tailwindcss": "^3.4.1"
  }
}
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
```

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 환경 변수 파일

### .env.local (로컬 개발)

```env
# NextAuth
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=http://localhost:3001

# Google OAuth
GOOGLE_CLIENT_ID=<your-id>
GOOGLE_CLIENT_SECRET=<your-secret>

# Kakao OAuth
KAKAO_CLIENT_ID=<your-id>
KAKAO_CLIENT_SECRET=<your-secret>

# Toss Payments
NEXT_PUBLIC_TOSS_CLIENT_KEY=<your-key>
TOSS_SECRET_KEY=<your-secret>

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=<your-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-id>
```

## Git 관련 파일

### .gitignore

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## 문서 작성 가이드

### Markdown 파일 작성 시

1. **README.md**: 프로젝트 전체 개요
2. **SETUP.md**: 설치 및 초기 설정 단계별 가이드
3. **API.md**: 모든 API 엔드포인트 및 함수 문서화
4. **COMPONENTS.md**: 각 컴포넌트 사용법 및 Props
5. **FIREBASE.md**: Firebase 설정 및 데이터 구조
6. **DEPLOYMENT.md**: 배포 프로세스 및 체크리스트
7. **FILE_STRUCTURE.md**: 전체 파일 구조 및 설명

### 문서 업데이트 시기

- **새 기능 추가**: 관련 문서 업데이트
- **API 변경**: API.md 수정
- **컴포넌트 추가**: COMPONENTS.md에 추가
- **배포 설정 변경**: DEPLOYMENT.md 업데이트

## 파일 명명 규칙

### 컴포넌트 파일

- **React 컴포넌트**: PascalCase (예: `Header.tsx`)
- **페이지**: `page.tsx` 또는 `route.ts`
- **레이아웃**: `layout.tsx`
- **유틸리티**: camelCase (예: `firebase.ts`)

### 폴더 구조

- **기능 기반**: 관련 파일을 한 폴더에 그룹화
- **라우팅**: App Router의 폴더 구조 따름
- **공통 컴포넌트**: `/components`에 위치
- **페이지 전용**: 해당 페이지 폴더 내 위치

## 코드 스타일 가이드

### TypeScript

- **타입 정의**: 인터페이스 우선 사용
- **명명**: PascalCase for types, camelCase for variables
- **엄격 모드**: strict mode 활성화

### React

- **함수형 컴포넌트**: 화살표 함수 또는 function 선언
- **Hooks**: useState, useEffect 등 적절히 사용
- **Props**: TypeScript 인터페이스로 정의

### CSS/Tailwind

- **유틸리티 우선**: Tailwind 클래스 사용
- **커스텀 스타일**: 필요시 globals.css에 추가
- **반응형**: Mobile First 접근

## 추가 리소스

### 외부 문서 링크

- [Next.js 문서](https://nextjs.org/docs)
- [Firebase 문서](https://firebase.google.com/docs)
- [NextAuth 문서](https://next-auth.js.org)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Toss Payments 문서](https://docs.tosspayments.com)

### 내부 참조

- 프로젝트 README: [../README.md](../README.md)
- 설정 가이드: [SETUP.md](./SETUP.md)
- API 문서: [API.md](./API.md)
