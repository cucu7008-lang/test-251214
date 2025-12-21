# API 라우트 문서

## 개요

이 프로젝트는 Next.js App Router의 Route Handlers를 사용하여 API를 구현합니다.

## 인증 API

### `/api/auth/[...nextauth]`

NextAuth.js의 인증 엔드포인트입니다.

**지원하는 OAuth 제공자:**
- Google
- Kakao (설정 필요)

**주요 엔드포인트:**
- `GET /api/auth/signin` - 로그인 페이지
- `POST /api/auth/signin/:provider` - OAuth 로그인 시작
- `GET /api/auth/callback/:provider` - OAuth 콜백
- `GET /api/auth/signout` - 로그아웃
- `GET /api/auth/session` - 현재 세션 정보

**사용 예시:**

```typescript
import { signIn, signOut, useSession } from 'next-auth/react';

// 로그인
await signIn('google');

// 로그아웃
await signOut();

// 세션 정보 가져오기
const { data: session } = useSession();
```

## Firebase API

### `GET /api/firebase/test`

Firebase 연결 테스트 및 샘플 데이터 조회

**응답:**

```json
{
  "success": true,
  "message": "Firebase 연결 성공",
  "products": [
    {
      "id": "product-1",
      "title": "병점복합타운 프리미엄 상가",
      "price": "월 250만원",
      ...
    }
  ],
  "users": [...],
  "orders": [...],
  "reviews": [...]
}
```

### `POST /api/firebase/sync`

Firebase에 샘플 데이터 동기화

**요청:**

```typescript
const response = await fetch('/api/firebase/sync', {
  method: 'POST'
});
```

**응답:**

```json
{
  "success": true,
  "message": "데이터 동기화 완료",
  "results": {
    "products": {
      "success": true,
      "count": 3
    },
    "users": {
      "success": true,
      "count": 3
    },
    "orders": {
      "success": true,
      "count": 5
    },
    "reviews": {
      "success": true,
      "count": 4
    }
  }
}
```

## Firebase 동기화 함수

### 상품 관련

#### `getProductsFromFirebase()`

모든 상품 조회

```typescript
import { getProductsFromFirebase } from '@/lib/firebaseSync';

const products = await getProductsFromFirebase();
```

**반환:**

```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  area: string;
  floor: string;
  deposit: string;
  features: string[];
  amenities: string[];
  images: string[];
  location: {
    address: string;
    distance: string;
  };
}[]
```

### 리뷰 관련

#### `addReviewToFirebase(review)`

새 리뷰 추가

```typescript
import { addReviewToFirebase } from '@/lib/firebaseSync';

const result = await addReviewToFirebase({
  productId: 'product-1',
  userId: 'user@example.com',
  userName: '홍길동',
  userEmail: 'user@example.com',
  rating: 5,
  comment: '정말 좋은 상가입니다!',
  images: ['https://...', 'https://...']
});
```

**매개변수:**

```typescript
{
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;  // 1-5
  comment: string;
  images?: string[];  // 이미지 URL 배열
}
```

**반환:**

```typescript
{
  success: boolean;
  review?: Review;
  error?: string;
}
```

#### `getAllReviewsFromFirebase()`

모든 리뷰 조회

```typescript
import { getAllReviewsFromFirebase } from '@/lib/firebaseSync';

const reviews = await getAllReviewsFromFirebase();
```

#### `getReviewsByProductId(productId)`

특정 상품의 리뷰 조회

```typescript
import { getReviewsByProductId } from '@/lib/firebaseSync';

const reviews = await getReviewsByProductId('product-1');
```

#### `deleteReviewFromFirebase(reviewId)`

리뷰 삭제 (관리자 전용)

```typescript
import { deleteReviewFromFirebase } from '@/lib/firebaseSync';

const result = await deleteReviewFromFirebase('review-123');
```

**반환:**

```typescript
{
  success: boolean;
  message?: string;
  error?: string;
}
```

### 이미지 업로드

#### `uploadReviewImages(files, reviewId)`

리뷰 이미지를 Firebase Storage에 업로드

```typescript
import { uploadReviewImages } from '@/lib/firebaseSync';

const imageFiles: File[] = [...]; // 파일 배열
const reviewId = 'review-123';

const imageUrls = await uploadReviewImages(imageFiles, reviewId);
// 반환: ['https://...', 'https://...']
```

**매개변수:**
- `files`: File[] - 업로드할 이미지 파일 배열
- `reviewId`: string - 리뷰 ID

**반환:** `string[]` - 업로드된 이미지의 다운로드 URL 배열

**저장 경로:** `reviews/{reviewId}/{timestamp}_{index}.{ext}`

### 사용자 관련

#### `getUsersFromFirebase()`

모든 사용자 조회

```typescript
import { getUsersFromFirebase } from '@/lib/firebaseSync';

const users = await getUsersFromFirebase();
```

**반환:**

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
}[]
```

### 주문 관련

#### `getOrdersFromFirebase()`

모든 주문 조회

```typescript
import { getOrdersFromFirebase } from '@/lib/firebaseSync';

const orders = await getOrdersFromFirebase();
```

**반환:**

```typescript
interface Order {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  amount: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  customerName: string;
  customerEmail: string;
}[]
```

## 에러 처리

모든 Firebase 함수는 try-catch로 에러를 처리하며, 실패 시 빈 배열 또는 에러 객체를 반환합니다.

```typescript
try {
  const products = await getProductsFromFirebase();
  // 성공 처리
} catch (error) {
  console.error('상품 로드 실패:', error);
  // 에러 처리
}
```

## 보안 고려사항

### 인증 확인

민감한 작업은 반드시 인증 확인:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

const session = await getServerSession(authOptions);

if (!session) {
  return new Response('Unauthorized', { status: 401 });
}
```

### 관리자 권한 확인

관리자 전용 기능:

```typescript
const adminEmails = ['admin@sangadaiji.com', 'test@admin.com'];

if (!session?.user?.email || !adminEmails.includes(session.user.email)) {
  return new Response('Forbidden', { status: 403 });
}
```

### CORS 설정

필요시 CORS 헤더 추가:

```typescript
return new Response(JSON.stringify(data), {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
```

## 성능 최적화

### 캐싱

자주 조회되는 데이터는 클라이언트 캐싱:

```typescript
const { data, isLoading } = useSWR('/api/products', fetcher, {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
});
```

### 페이지네이션

대량 데이터 조회 시 페이지네이션 구현:

```typescript
const q = query(
  collection(db, 'products'),
  orderBy('createdAt', 'desc'),
  limit(10)
);
```

## 추가 참고사항

- 모든 API는 `/api` 경로 아래에 위치
- Firebase 함수는 `/lib/firebaseSync.ts`에 정의
- NextAuth 설정은 `/src/auth.ts`에 위치
- 환경 변수는 `.env.local`에서 관리
