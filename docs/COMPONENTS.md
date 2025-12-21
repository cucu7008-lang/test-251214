# 컴포넌트 사용 가이드

## 컴포넌트 구조

```
src/components/
├── admin/              # 관리자 전용 컴포넌트
│   ├── AdminHeader.tsx
│   └── AdminSidebar.tsx
├── auth/              # 인증 관련 컴포넌트
│   └── AdminGuard.tsx
├── layout/            # 레이아웃 컴포넌트
│   ├── Header.tsx
│   └── Footer.tsx
├── providers/         # Context Providers
│   └── SessionProvider.tsx
└── sections/          # 랜딩페이지 섹션
    ├── Hero.tsx
    ├── Benefits.tsx
    ├── Products.tsx
    ├── ProductsShowcase.tsx
    ├── Offer.tsx
    └── Story.tsx
```

## 레이아웃 컴포넌트

### Header

메인 네비게이션 헤더

**위치:** `src/components/layout/Header.tsx`

**기능:**
- 로고 표시
- 네비게이션 메뉴
- 로그인/로그아웃 버튼
- 마이페이지 링크

**사용 예시:**

```tsx
import Header from '@/components/layout/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
```

### Footer

페이지 하단 푸터

**위치:** `src/components/layout/Footer.tsx`

**기능:**
- 회사 정보
- 연락처
- SNS 링크
- 저작권 정보

**사용 예시:**

```tsx
import Footer from '@/components/layout/Footer';

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

## 섹션 컴포넌트

### Hero

메인 히어로 섹션

**위치:** `src/components/sections/Hero.tsx`

**기능:**
- 메인 타이틀 및 설명
- CTA 버튼
- 배경 이미지/비디오

**Props:**

```typescript
interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}
```

**사용 예시:**

```tsx
<Hero
  title="병점복합타운 프리미엄 상가"
  subtitle="최고의 입지, 최상의 조건"
  ctaText="상담 신청하기"
  ctaLink="/contact"
/>
```

### Products

상품 목록 섹션

**위치:** `src/components/sections/Products.tsx`

**기능:**
- 상품 카드 그리드
- 필터링 및 정렬
- 상세 페이지 링크

**사용 예시:**

```tsx
<Products />
```

### Benefits

혜택 안내 섹션

**위치:** `src/components/sections/Benefits.tsx`

**기능:**
- 주요 혜택 나열
- 아이콘 표시
- 설명 텍스트

**사용 예시:**

```tsx
<Benefits />
```

## 관리자 컴포넌트

### AdminSidebar

관리자 사이드바 네비게이션

**위치:** `src/components/admin/AdminSidebar.tsx`

**기능:**
- 관리자 메뉴 표시
- 현재 페이지 하이라이트
- 로고 및 사이트 링크

**메뉴 항목:**
- 대시보드
- 사용자 관리
- 상품 관리
- 주문 관리
- Firebase 동기화
- 시스템 설정

**사용 예시:**

```tsx
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

### AdminHeader

관리자 헤더

**위치:** `src/components/admin/AdminHeader.tsx`

**기능:**
- 페이지 제목
- 사용자 정보
- 알림 아이콘

**사용 예시:**

```tsx
import AdminHeader from '@/components/admin/AdminHeader';

<AdminHeader title="대시보드" />
```

## 인증 컴포넌트

### AdminGuard

관리자 권한 보호 컴포넌트

**위치:** `src/components/auth/AdminGuard.tsx`

**기능:**
- 로그인 확인
- 관리자 권한 확인
- 미인증 시 리디렉션
- 권한 없음 페이지 표시

**관리자 이메일 설정:**

```typescript
const adminEmails = [
  'admin@sangadaiji.com',
  'test@admin.com',
  'cucu7008@gmail.com'
];
```

**사용 예시:**

```tsx
import AdminGuard from '@/components/auth/AdminGuard';

export default function AdminPage() {
  return (
    <AdminGuard>
      <div>관리자 전용 컨텐츠</div>
    </AdminGuard>
  );
}
```

**동작:**
1. 로딩 중: 로딩 스피너 표시
2. 미인증: `/auth/signin`으로 리디렉션
3. 권한 없음: 접근 거부 페이지 표시
4. 관리자: 자식 컴포넌트 렌더링

## Providers

### SessionProvider

NextAuth 세션 Provider

**위치:** `src/components/providers/SessionProvider.tsx`

**기능:**
- 세션 상태 관리
- 전역 세션 접근

**사용 예시:**

```tsx
// app/layout.tsx
import SessionProvider from '@/components/providers/SessionProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

**세션 사용:**

```tsx
'use client';
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;

  return <div>Hello, {session.user?.name}</div>;
}
```

## 유틸리티 함수

### 이미지 업로드 헬퍼

리뷰 이미지 업로드 시 사용:

```tsx
const [imageFiles, setImageFiles] = useState<File[]>([]);
const [imagePreviews, setImagePreviews] = useState<string[]>([]);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);

  setImageFiles(prev => [...prev, ...files]);

  files.forEach(file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews(prev => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(file);
  });
};
```

## 스타일링 가이드

### Tailwind CSS 클래스

**색상:**
- Primary: `bg-blue-600`, `text-blue-600`
- Success: `bg-green-600`, `text-green-600`
- Danger: `bg-red-600`, `text-red-600`
- Warning: `bg-yellow-600`, `text-yellow-600`

**레이아웃:**
- Container: `max-w-7xl mx-auto px-4`
- Card: `bg-white rounded-lg shadow-lg p-6`
- Button: `bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700`

**반응형:**
- Mobile First 접근
- `sm:`, `md:`, `lg:`, `xl:` 브레이크포인트 사용

**예시:**

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
      제목
    </h1>
  </div>
</div>
```

## 아이콘

Lucide React 아이콘 사용:

```tsx
import { Star, Send, CheckCircle, X, Trash2 } from 'lucide-react';

<Star className="h-5 w-5 text-yellow-400" />
<Send className="h-5 w-5" />
<CheckCircle className="h-5 w-5 text-green-600" />
```

**일반적인 아이콘 크기:**
- 작은 아이콘: `h-4 w-4`
- 중간 아이콘: `h-5 w-5`
- 큰 아이콘: `h-6 w-6`
- 매우 큰 아이콘: `h-8 w-8` 또는 `h-12 w-12`

## 모달 컴포넌트

리뷰 상세보기 모달 예시:

```tsx
{selectedItem && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    onClick={() => setSelectedItem(null)}
  >
    <div
      className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sticky top-0 bg-white border-b p-6">
        <h3 className="text-xl font-bold">제목</h3>
        <button onClick={() => setSelectedItem(null)}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6">
        내용
      </div>
    </div>
  </div>
)}
```

## 폼 컴포넌트

일관된 폼 스타일:

```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-2">
      라벨
    </label>
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      required
    />
  </div>

  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
  >
    제출
  </button>
</form>
```

## 로딩 상태

로딩 스피너:

```tsx
{isLoading && (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
  </div>
)}
```

## 베스트 프랙티스

1. **컴포넌트 분리**: 재사용 가능한 작은 컴포넌트로 분리
2. **타입 안정성**: TypeScript 인터페이스 정의
3. **접근성**: ARIA 레이블 및 키보드 네비게이션 지원
4. **반응형**: Mobile First 디자인
5. **성능**: 불필요한 리렌더링 방지 (React.memo, useMemo)

## 추가 참고사항

- 모든 클라이언트 컴포넌트는 `'use client'` 지시어 필수
- 서버 컴포넌트는 기본값
- 상태 관리가 필요한 경우 클라이언트 컴포넌트 사용
- 이미지 최적화를 위해 Next.js Image 컴포넌트 사용 권장
