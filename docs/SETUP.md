# 프로젝트 설치 및 설정 가이드

## 시스템 요구사항

- Node.js 18.17 이상
- npm 또는 yarn
- Git

## 설치 단계

### 1. 저장소 클론

```bash
git clone https://github.com/cucu7008-lang/test-251214.git
cd test-251214/byeongjeom-landing
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력합니다:

```env
# NextAuth 설정
NEXTAUTH_SECRET=<openssl rand -base64 32로 생성>
NEXTAUTH_URL=http://localhost:3001

# Google OAuth 설정
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Kakao OAuth 설정 (선택사항)
KAKAO_CLIENT_ID=your-kakao-rest-api-key
KAKAO_CLIENT_SECRET=your-kakao-client-secret

# Toss Payments 설정
NEXT_PUBLIC_TOSS_CLIENT_KEY=your-toss-client-key
TOSS_SECRET_KEY=your-toss-secret-key

# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Google OAuth 설정

### 1. Google Cloud Console에서 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성
3. "API 및 서비스" > "OAuth 동의 화면" 설정
4. "사용자 인증 정보" > "OAuth 2.0 클라이언트 ID" 생성

### 2. 승인된 리디렉션 URI 추가

**개발 환경:**
```
http://localhost:3001/api/auth/callback/google
```

**프로덕션 환경:**
```
https://your-domain.vercel.app/api/auth/callback/google
```

### 3. 클라이언트 ID와 시크릿 복사

생성된 클라이언트 ID와 시크릿을 `.env.local`에 추가합니다.

## Firebase 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 새 프로젝트 생성
3. "웹 앱 추가" 클릭

### 2. Firestore Database 설정

1. "Firestore Database" 생성
2. 테스트 모드로 시작 (나중에 보안 규칙 설정)
3. 위치 선택: `asia-northeast3` (서울)

### 3. Firebase Storage 설정

1. "Storage" 활성화
2. 테스트 모드로 시작
3. 보안 규칙 설정:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /reviews/{reviewId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

### 4. Firestore 보안 규칙 설정

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 상품은 모두 읽기 가능
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // 리뷰는 모두 읽기 가능, 인증된 사용자만 작성
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }

    // 사용자 정보는 본인만 접근
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 주문 정보는 본인만 접근
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Firebase 설정 값 복사

Firebase 프로젝트 설정에서 "앱 설정"의 구성 객체를 복사하여 `.env.local`에 추가합니다.

## Toss Payments 설정

### 1. Toss Payments 계정 생성

1. [Toss Payments 개발자센터](https://developers.tosspayments.com/) 접속
2. 회원가입 및 로그인
3. 새 앱 생성

### 2. API 키 발급

1. "개발자센터" > "내 앱"에서 앱 선택
2. "API 키" 탭에서 클라이언트 키와 시크릿 키 복사
3. 테스트 키와 라이브 키 확인

### 3. 환경 변수 설정

```env
# 테스트 환경
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_...
TOSS_SECRET_KEY=test_sk_...

# 프로덕션 환경 (실제 결제 시)
NEXT_PUBLIC_TOSS_CLIENT_KEY=live_ck_...
TOSS_SECRET_KEY=live_sk_...
```

## 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:3001`에서 실행됩니다.

## 초기 데이터 설정

### Firebase 데이터 동기화

1. 개발 서버 실행 후 `http://localhost:3001/firebase-test` 접속
2. "Firebase로 데이터 업로드" 버튼 클릭
3. 샘플 데이터 (상품, 사용자, 주문, 리뷰) 자동 생성

## 관리자 계정 설정

`src/components/auth/AdminGuard.tsx` 파일에서 관리자 이메일 추가:

```typescript
const adminEmails = [
  'admin@sangadaiji.com',
  'test@admin.com',
  'your-email@gmail.com'  // 본인 이메일 추가
];
```

## 빌드 및 배포

### 로컬 빌드

```bash
npm run build
npm start
```

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

## 문제 해결

### 포트 충돌

다른 포트를 사용하려면 `package.json`의 dev 스크립트 수정:

```json
"dev": "next dev -p 3002"
```

### Firebase 연결 오류

1. `.env.local` 파일의 Firebase 설정 확인
2. Firebase 프로젝트에서 "웹 앱" 등록 확인
3. 브라우저 콘솔에서 상세 오류 확인

### OAuth 로그인 실패

1. Google Cloud Console에서 리디렉션 URI 확인
2. `.env.local`의 `NEXTAUTH_URL` 확인
3. `NEXTAUTH_SECRET` 생성 확인

## 다음 단계

설정이 완료되었다면 다음 문서를 참고하세요:

- [API.md](./API.md) - API 라우트 문서
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 가이드
- [FIREBASE.md](./FIREBASE.md) - Firebase 사용법
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드
