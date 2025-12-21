# 인증 시스템 설정 가이드

## 🔐 소셜 로그인 설정 완료

헤더에 회원가입/로그인 기능과 구글, 카카오 소셜 로그인이 추가되었습니다.

## ✅ 완료된 작업

1. ✅ NextAuth.js v5 설치
2. ✅ 구글 OAuth 프로바이더 설정
3. ✅ 카카오 OAuth 프로바이더 설정
4. ✅ 로그인/회원가입 UI 페이지 생성
5. ✅ 헤더에 로그인 버튼 및 사용자 메뉴 추가
6. ✅ 모바일 메뉴에 로그인 기능 추가
7. ✅ SessionProvider 설정

## 🚀 OAuth 설정 방법

소셜 로그인을 활성화하려면 다음 단계를 따르세요:

### 1. Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "사용자 인증 정보" 메뉴로 이동
4. "사용자 인증 정보 만들기" > "OAuth 2.0 클라이언트 ID" 선택
5. 애플리케이션 유형: "웹 애플리케이션" 선택
6. 승인된 리디렉션 URI 추가:
   - 개발: `http://localhost:3001/api/auth/callback/google`
   - 프로덕션: `https://yourdomain.com/api/auth/callback/google`
7. 생성된 클라이언트 ID와 시크릿을 `.env.local`에 입력:
   ```
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

### 2. Kakao OAuth 설정

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. "내 애플리케이션" > "애플리케이션 추가하기"
3. 앱 이름, 회사명 입력 후 생성
4. "앱 설정" > "플랫폼" > "Web 플랫폼 등록"
   - 사이트 도메인 입력 (개발: `http://localhost:3001`)
5. "제품 설정" > "카카오 로그인" 활성화
6. Redirect URI 설정:
   - 개발: `http://localhost:3001/api/auth/callback/kakao`
   - 프로덕션: `https://yourdomain.com/api/auth/callback/kakao`
7. "동의항목" 설정에서 필수 동의 항목 설정:
   - 닉네임 (필수)
   - 프로필 사진 (선택)
   - 카카오계정(이메일) (필수)
8. "앱 키" > "REST API 키"와 "보안" > "Client Secret" 발급
9. `.env.local`에 입력:
   ```
   KAKAO_CLIENT_ID=your-rest-api-key
   KAKAO_CLIENT_SECRET=your-client-secret
   ```

### 3. 환경 변수 설정

`.env.local` 파일에 모든 필수 값을 입력하세요:

```env
# NextAuth 설정
NEXTAUTH_SECRET=cH13Ya2QWP5qnoTDwfmt02t0UO6WgONt1etzXjow6Qs=
NEXTAUTH_URL=http://localhost:3001

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Kakao OAuth
KAKAO_CLIENT_ID=your-kakao-rest-api-key
KAKAO_CLIENT_SECRET=your-kakao-client-secret
```

> **프로덕션 배포 시 주의사항:**
> - `NEXTAUTH_URL`을 실제 도메인으로 변경
> - `NEXTAUTH_SECRET`을 새로운 랜덤 값으로 변경 (`openssl rand -base64 32`)
> - OAuth Redirect URI에 프로덕션 도메인 추가

## 📱 사용 방법

### 로그인
1. 헤더의 "로그인" 버튼 클릭
2. Google 또는 Kakao 로그인 선택
3. 소셜 계정으로 인증

### 로그인 후
- 헤더에 사용자 이름 표시
- 드롭다운 메뉴에서 "내 정보" 또는 "로그아웃" 선택 가능
- 모바일에서도 동일한 기능 제공

## 🗂️ 주요 파일 구조

```
src/
├── auth.ts                          # NextAuth 설정
├── app/
│   ├── api/auth/[...nextauth]/
│   │   └── route.ts                 # NextAuth API 라우트
│   └── auth/signin/
│       └── page.tsx                 # 로그인 페이지
├── components/
│   ├── layout/
│   │   └── Header.tsx               # 인증 버튼이 포함된 헤더
│   └── providers/
│       └── SessionProvider.tsx      # 세션 프로바이더
```

## 🔧 추가 기능 구현 가능

- 사용자 프로필 페이지 (`/profile`)
- 데이터베이스 연동 (Prisma + PostgreSQL/MySQL)
- 이메일/비밀번호 로그인 추가
- 회원 전용 콘텐츠 보호
- 사용자 역할 관리 (관리자, 일반 사용자 등)

## 📚 참고 문서

- [NextAuth.js 공식 문서](https://next-auth.js.org/)
- [Google OAuth 설정 가이드](https://support.google.com/cloud/answer/6158849)
- [Kakao Login 가이드](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
