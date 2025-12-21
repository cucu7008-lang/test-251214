# Firebase 설정 및 사용법

## Firebase 프로젝트 구조

```
Firebase Project: daizzi-20251221
├── Firestore Database
│   ├── products/      # 상품 컬렉션
│   ├── users/         # 사용자 컬렉션
│   ├── orders/        # 주문 컬렉션
│   └── reviews/       # 리뷰 컬렉션
└── Storage
    └── reviews/       # 리뷰 이미지 저장
        └── {reviewId}/
            └── {timestamp}_{index}.{ext}
```

## Firestore 데이터 구조

### Products Collection

상품 정보 저장

**경로:** `products/{productId}`

**필드:**

```typescript
interface Product {
  id: string;                    // 고유 ID
  title: string;                 // 상품명
  description: string;           // 짧은 설명
  fullDescription: string;       // 상세 설명
  price: string;                 // 임대료
  area: string;                  // 면적
  floor: string;                 // 층수
  deposit: string;               // 보증금
  features: string[];            // 주요 특징 배열
  amenities: string[];           // 편의시설 배열
  images: string[];              // 이미지 URL 배열
  location: {
    address: string;             // 주소
    distance: string;            // 역세권 정보
  };
}
```

**예시 데이터:**

```json
{
  "id": "product-1",
  "title": "병점복합타운 프리미엄 상가",
  "description": "병점역 도보 5분 거리의 최고 입지!",
  "fullDescription": "병점역에서 도보 5분...",
  "price": "월 250만원",
  "area": "50평 (165㎡)",
  "floor": "1층",
  "deposit": "5,000만원",
  "features": ["역세권", "주차 가능", "1층 상가"],
  "amenities": ["냉난방", "주차 5대", "화장실 2개"],
  "images": [
    "https://images.unsplash.com/...",
    "https://images.unsplash.com/...",
    "https://images.unsplash.com/..."
  ],
  "location": {
    "address": "경기도 화성시 병점동 123-45",
    "distance": "병점역 도보 5분"
  }
}
```

### Users Collection

사용자 정보 저장

**경로:** `users/{userId}`

**필드:**

```typescript
interface User {
  id: string;                                          // 고유 ID
  name: string;                                        // 이름
  email: string;                                       // 이메일
  role: 'user' | 'admin';                             // 권한
  status: 'active' | 'inactive' | 'suspended';        // 상태
  createdAt: string;                                  // 가입일
  lastLoginAt?: string;                               // 마지막 로그인
}
```

**예시 데이터:**

```json
{
  "id": "1",
  "name": "김철수",
  "email": "kim@example.com",
  "role": "user",
  "status": "active",
  "createdAt": "2025-01-01",
  "lastLoginAt": "2025-01-20"
}
```

### Orders Collection

주문 정보 저장

**경로:** `orders/{orderId}`

**필드:**

```typescript
interface Order {
  id: string;                                          // 주문 ID
  userId: string;                                      // 사용자 ID
  productId: string;                                   // 상품 ID
  productTitle: string;                                // 상품명
  amount: string;                                      // 결제 금액
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';  // 상태
  date: string;                                        // 주문일
  customerName: string;                                // 고객명
  customerEmail: string;                               // 고객 이메일
}
```

**예시 데이터:**

```json
{
  "id": "order-1",
  "userId": "1",
  "productId": "product-1",
  "productTitle": "병점복합타운 프리미엄 상가",
  "amount": "250만원",
  "status": "completed",
  "date": "2025-01-15",
  "customerName": "김철수",
  "customerEmail": "kim@example.com"
}
```

### Reviews Collection

리뷰 정보 저장

**경로:** `reviews/{reviewId}`

**필드:**

```typescript
interface Review {
  id: string;              // 리뷰 ID
  productId: string;       // 상품 ID
  userId: string;          // 작성자 ID
  userName: string;        // 작성자명
  userEmail: string;       // 작성자 이메일
  rating: number;          // 별점 (1-5)
  comment: string;         // 리뷰 내용
  images?: string[];       // 이미지 URL 배열
  createdAt: string;       // 작성일
}
```

**예시 데이터:**

```json
{
  "id": "review-1",
  "productId": "product-1",
  "userId": "1",
  "userName": "김철수",
  "userEmail": "kim@example.com",
  "rating": 5,
  "comment": "위치가 정말 좋고 시설도 깨끗합니다!",
  "images": [
    "https://firebasestorage.googleapis.com/...",
    "https://firebasestorage.googleapis.com/..."
  ],
  "createdAt": "2025-01-18"
}
```

## Firebase Storage 구조

### 리뷰 이미지 저장

**경로:** `reviews/{reviewId}/{filename}`

**파일명 형식:** `{reviewId}_{timestamp}_{index}.{ext}`

**예시:**
```
reviews/
  └── review-1234567890/
      ├── review-1234567890_1642345678_0.jpg
      ├── review-1234567890_1642345678_1.jpg
      └── review-1234567890_1642345678_2.png
```

## Firebase 보안 규칙

### Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 상품 - 모두 읽기 가능, 관리자만 쓰기
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // 리뷰 - 모두 읽기 가능, 인증된 사용자만 작성, 본인/관리자만 삭제
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
                    (resource.data.userId == request.auth.uid ||
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow delete: if request.auth != null &&
                    (resource.data.userId == request.auth.uid ||
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // 사용자 - 본인만 읽기/쓰기, 관리자는 모두 가능
    match /users/{userId} {
      allow read: if request.auth != null &&
                  (request.auth.uid == userId ||
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null &&
                   (request.auth.uid == userId ||
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // 주문 - 본인/관리자만 접근
    match /orders/{orderId} {
      allow read: if request.auth != null &&
                  (resource.data.userId == request.auth.uid ||
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null;
    }
  }
}
```

### Storage 보안 규칙

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // 리뷰 이미지
    match /reviews/{reviewId}/{allPaths=**} {
      // 모두 읽기 가능
      allow read: if true;

      // 인증된 사용자만 업로드
      allow create: if request.auth != null &&
                    request.resource.size < 5 * 1024 * 1024 &&  // 5MB 제한
                    request.resource.contentType.matches('image/.*');

      // 업로더 또는 관리자만 삭제 가능
      allow delete: if request.auth != null;
    }
  }
}
```

## Firebase 초기화 코드

### 클라이언트 초기화

**파일:** `src/lib/firebase.ts`

```typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// 중복 초기화 방지
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
```

## CRUD 작업 예시

### 데이터 읽기

```typescript
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 모든 상품 조회
const querySnapshot = await getDocs(collection(db, 'products'));
const products = [];
querySnapshot.forEach((doc) => {
  products.push(doc.data());
});
```

### 데이터 쓰기

```typescript
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 상품 추가
await setDoc(doc(db, 'products', 'product-1'), {
  id: 'product-1',
  title: '병점복합타운 프리미엄 상가',
  // ... 기타 필드
});
```

### 데이터 업데이트

```typescript
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 상품 정보 업데이트
await updateDoc(doc(db, 'products', 'product-1'), {
  price: '월 300만원'
});
```

### 데이터 삭제

```typescript
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 상품 삭제
await deleteDoc(doc(db, 'products', 'product-1'));
```

### 쿼리

```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 특정 상품의 리뷰 조회
const q = query(
  collection(db, 'reviews'),
  where('productId', '==', 'product-1')
);
const querySnapshot = await getDocs(q);
```

## 이미지 업로드

```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

// 파일 업로드
const file = imageFile;  // File 객체
const fileName = `review-123_${Date.now()}_0.jpg`;
const storageRef = ref(storage, `reviews/review-123/${fileName}`);

await uploadBytes(storageRef, file);
const downloadURL = await getDownloadURL(storageRef);

console.log('업로드된 이미지 URL:', downloadURL);
```

## 이미지 삭제

```typescript
import { ref, deleteObject, listAll } from 'firebase/storage';
import { storage } from '@/lib/firebase';

// 리뷰 폴더 내 모든 이미지 삭제
const reviewFolderRef = ref(storage, `reviews/review-123`);
const fileList = await listAll(reviewFolderRef);

const deletePromises = fileList.items.map((item) => deleteObject(item));
await Promise.all(deletePromises);
```

## 데이터 마이그레이션

초기 데이터 설정:

```bash
# 개발 서버 실행
npm run dev

# Firebase 테스트 페이지 접속
http://localhost:3001/firebase-test

# "Firebase로 데이터 업로드" 버튼 클릭
```

또는 API를 통해:

```bash
curl -X POST http://localhost:3001/api/firebase/sync
```

## 모니터링

Firebase Console에서 실시간 모니터링:

1. **Firestore**: 데이터 구조 및 쿼리 확인
2. **Storage**: 저장 용량 및 파일 목록
3. **Authentication**: 로그인 사용자 통계
4. **Analytics**: 사용자 행동 분석

## 백업 및 복원

### Firestore 백업

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 백업 (export)
firebase firestore:export gs://your-bucket/backups

# 복원 (import)
firebase firestore:import gs://your-bucket/backups
```

## 성능 최적화

1. **인덱싱**: 복합 쿼리에 대한 인덱스 생성
2. **캐싱**: 자주 조회되는 데이터 클라이언트 캐싱
3. **페이지네이션**: limit() 및 startAfter() 사용
4. **이미지 최적화**: WebP 형식, 적절한 크기로 압축

## 비용 관리

- **Firestore**: 읽기/쓰기/삭제 작업 당 과금
- **Storage**: 저장 용량 및 다운로드 대역폭
- **무료 할당량**: 일일 50,000 reads, 20,000 writes, 20,000 deletes
- **비용 절감**: 불필요한 쿼리 최소화, 캐싱 활용

## 문제 해결

### 연결 오류

```typescript
try {
  const data = await getDocs(collection(db, 'products'));
} catch (error) {
  console.error('Firebase 오류:', error);
  // 재시도 로직 또는 사용자 알림
}
```

### 권한 오류

보안 규칙 확인 및 로그인 상태 검증:

```typescript
import { getAuth } from 'firebase/auth';

const auth = getAuth();
if (!auth.currentUser) {
  console.log('로그인이 필요합니다');
}
```

## 추가 참고사항

- Firebase 공식 문서: https://firebase.google.com/docs
- Firestore 가이드: https://firebase.google.com/docs/firestore
- Storage 가이드: https://firebase.google.com/docs/storage
