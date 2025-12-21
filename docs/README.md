# 병점복합타운 상가 랜딩페이지 프로젝트

## 프로젝트 개요

Next.js 16, TypeScript, Tailwind CSS를 사용한 상가 임대 랜딩페이지입니다.

### 주요 기능

1. **랜딩페이지**
   - 히어로 섹션
   - 상품 쇼케이스
   - 혜택 안내
   - 오퍼/할인 정보

2. **인증 시스템**
   - Google OAuth 로그인
   - Kakao OAuth 로그인 (준비됨)
   - NextAuth.js v5 사용

3. **Firebase 통합**
   - Firestore: 상품, 사용자, 주문, 리뷰 데이터
   - Storage: 리뷰 이미지 업로드

4. **관리자 대시보드**
   - 사용자 관리
   - 상품 관리
   - 주문 관리
   - Firebase 데이터 동기화
   - 리뷰 삭제 기능

5. **리뷰 시스템**
   - 별점 평가 (1-5점)
   - 이미지 첨부 (최대 5개)
   - 실시간 Firebase 연동
   - 관리자 삭제 권한

6. **결제 시스템**
   - Toss Payments 통합
   - 결제 성공/실패 페이지

7. **마이페이지**
   - 프로필 관리
   - 주문 내역
   - 설정

## 기술 스택

- **Frontend**: Next.js 16.0.10 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide React
- **Authentication**: NextAuth.js v5
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Payment**: Toss Payments
- **Deployment**: Vercel

## 프로젝트 구조

```
byeongjeom-landing/
├── docs/                      # 프로젝트 문서
│   ├── README.md
│   ├── SETUP.md
│   ├── API.md
│   ├── COMPONENTS.md
│   ├── FIREBASE.md
│   └── DEPLOYMENT.md
├── public/                    # 정적 파일
├── src/
│   ├── app/                   # Next.js App Router 페이지
│   │   ├── admin/            # 관리자 페이지
│   │   ├── api/              # API 라우트
│   │   ├── auth/             # 인증 페이지
│   │   ├── mypage/           # 마이페이지
│   │   ├── payment/          # 결제 페이지
│   │   ├── products/         # 상품 상세
│   │   └── review-test/      # 리뷰 테스트
│   ├── components/           # React 컴포넌트
│   │   ├── admin/           # 관리자 컴포넌트
│   │   ├── auth/            # 인증 컴포넌트
│   │   ├── layout/          # 레이아웃
│   │   ├── providers/       # Context Providers
│   │   └── sections/        # 섹션 컴포넌트
│   └── lib/                 # 유틸리티 함수
│       ├── firebase.ts      # Firebase 설정
│       └── firebaseSync.ts  # Firebase 동기화
└── .env.local               # 환경 변수

```

## 배포 정보

- **Production URL**: https://byeongjeom-landing.vercel.app
- **GitHub**: https://github.com/cucu7008-lang/test-251214
- **Vercel Project**: cucu7008s-projects/byeongjeom-landing

## 문서 목록

1. [SETUP.md](./SETUP.md) - 프로젝트 설치 및 설정 가이드
2. [API.md](./API.md) - API 라우트 문서
3. [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 사용 가이드
4. [FIREBASE.md](./FIREBASE.md) - Firebase 설정 및 사용법
5. [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 환경 변수

`.env.local` 파일에 다음 변수들이 필요합니다:

```env
# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Toss Payments
NEXT_PUBLIC_TOSS_CLIENT_KEY=your-toss-client-key
TOSS_SECRET_KEY=your-toss-secret-key
```

## 주요 기능 설명

### 1. 인증 시스템
- Google OAuth를 통한 소셜 로그인
- 관리자 권한 기반 접근 제어
- 세션 관리

### 2. Firebase 통합
- Firestore를 통한 데이터 관리
- Storage를 통한 이미지 저장
- 실시간 데이터 동기화

### 3. 관리자 기능
- 대시보드에서 통계 확인
- 사용자/상품/주문 관리
- 리뷰 삭제 권한

### 4. 리뷰 시스템
- 별점 및 텍스트 리뷰
- 이미지 업로드 (최대 5개)
- Firebase Storage 연동

### 5. 결제 시스템
- Toss Payments API 연동
- 결제 성공/실패 처리
- 주문 내역 저장

## 라이선스

이 프로젝트는 개인/상업적 용도로 자유롭게 사용 가능합니다.

## 지원

문의사항이 있으시면 GitHub Issues를 통해 연락주세요.
