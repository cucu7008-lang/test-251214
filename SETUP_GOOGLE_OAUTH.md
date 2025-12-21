# Google OAuth 실제 설정 가이드

현재 `cucu7008@gmail.com` 계정으로 로그인을 시도했지만 OAuth 클라이언트가 없어서 401 오류가 발생했습니다.

## 단계별 설정 방법

### 1단계: Google Cloud Console 접속

1. 브라우저에서 접속: https://console.cloud.google.com/
2. `cucu7008@gmail.com` 계정으로 로그인

### 2단계: 프로젝트 생성 또는 선택

1. 상단의 프로젝트 선택 드롭다운 클릭
2. "새 프로젝트" 클릭
3. 프로젝트 이름 입력: `byeongjeom-landing` 또는 원하는 이름
4. "만들기" 클릭
5. 프로젝트가 생성되면 해당 프로젝트 선택

### 3단계: OAuth 동의 화면 구성

1. 왼쪽 메뉴에서 "API 및 서비스" > "OAuth 동의 화면" 클릭
2. 사용자 유형 선택:
   - **외부** 선택 (일반 사용자용)
   - "만들기" 클릭

3. **앱 정보 입력:**
   - 앱 이름: `상가다이찌` 또는 `병점복합타운`
   - 사용자 지원 이메일: `cucu7008@gmail.com`
   - 앱 로고: (선택사항)
   - 앱 도메인: (선택사항, 나중에 추가 가능)

4. **개발자 연락처 정보:**
   - 이메일 주소: `cucu7008@gmail.com`
   - "저장 후 계속" 클릭

5. **범위(Scopes):**
   - 기본값으로 두고 "저장 후 계속" 클릭
   - 또는 다음 범위 추가:
     - `userinfo.email`
     - `userinfo.profile`

6. **테스트 사용자 추가:**
   - "+ ADD USERS" 클릭
   - `cucu7008@gmail.com` 입력
   - "추가" 클릭
   - "저장 후 계속" 클릭

7. **요약:**
   - "대시보드로 돌아가기" 클릭

### 4단계: OAuth 클라이언트 ID 생성

1. 왼쪽 메뉴에서 "API 및 서비스" > "사용자 인증 정보" 클릭
2. 상단의 "+ 사용자 인증 정보 만들기" 클릭
3. "OAuth 클라이언트 ID" 선택

4. **애플리케이션 유형:**
   - "웹 애플리케이션" 선택

5. **이름:**
   - `병점복합타운 웹 클라이언트` (원하는 이름 입력)

6. **승인된 JavaScript 원본:**
   - "+ URI 추가" 클릭
   - 입력: `http://localhost:3001`
   - (프로덕션 배포 시 실제 도메인도 추가)

7. **승인된 리디렉션 URI:**
   - "+ URI 추가" 클릭
   - 입력: `http://localhost:3001/api/auth/callback/google`
   - (프로덕션 배포 시 실제 도메인도 추가)

8. "만들기" 클릭

### 5단계: 클라이언트 ID 및 시크릿 복사

생성 완료 팝업이 나타나면:

1. **클라이언트 ID** 복사 (예: `123456789-abcdefg.apps.googleusercontent.com`)
2. **클라이언트 보안 비밀번호** 복사 (예: `GOCSPX-abcdefghijklmnop`)

### 6단계: .env.local 파일 업데이트

복사한 값을 `.env.local` 파일에 입력:

```env
GOOGLE_CLIENT_ID=여기에-복사한-클라이언트-ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=여기에-복사한-클라이언트-시크릿
```

**예시:**
```env
GOOGLE_CLIENT_ID=123456789-abc123xyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-1234567890abcdefghijk
```

### 7단계: 개발 서버 재시작

환경 변수가 적용되도록 개발 서버 재시작:

```bash
# Ctrl+C로 현재 서버 중지 후
npm run dev
```

또는 그냥 브라우저를 새로고침하면 자동으로 환경 변수가 다시 로드됩니다.

### 8단계: 로그인 테스트

1. 브라우저에서 http://localhost:3001/auth/signin 접속
2. "Google로 로그인" 버튼 클릭
3. `cucu7008@gmail.com` 계정 선택
4. 권한 승인
5. 로그인 완료!

## 프로덕션 배포 시 추가 설정

실제 도메인에 배포할 때:

1. Google Cloud Console > OAuth 클라이언트 ID 편집
2. 승인된 JavaScript 원본에 추가:
   ```
   https://yourdomain.com
   ```
3. 승인된 리디렉션 URI에 추가:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

4. `.env.local` 또는 프로덕션 환경 변수 업데이트:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

## 앱 공개 (선택사항)

현재 앱은 "테스트" 모드로, 등록된 테스트 사용자만 로그인 가능합니다.

일반 공개하려면:
1. OAuth 동의 화면으로 이동
2. "앱 게시" 또는 "프로덕션으로 게시" 클릭
3. Google 검토 프로세스 진행 (최대 6주 소요 가능)

## 문제 해결

### 여전히 401 오류가 발생하는 경우:

1. 클라이언트 ID와 시크릿을 정확히 복사했는지 확인
2. `.env.local` 파일을 저장했는지 확인
3. 개발 서버를 재시작했는지 확인
4. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
5. 시크릿 모드/인코그니토 모드에서 테스트

### 리디렉션 URI 불일치 오류:

리디렉션 URI가 정확히 일치하는지 확인:
- `http://localhost:3001/api/auth/callback/google` (끝에 슬래시 없음)

### 개발 서버 포트가 다른 경우:

포트 3001이 아닌 다른 포트를 사용 중이면:
- Google Cloud Console에서 해당 포트로 URI 업데이트
- 예: `http://localhost:3000/api/auth/callback/google`

## 참고 링크

- Google Cloud Console: https://console.cloud.google.com/
- NextAuth.js 문서: https://next-auth.js.org/providers/google
- OAuth 2.0 가이드: https://developers.google.com/identity/protocols/oauth2

---

**중요:** OAuth 클라이언트 시크릿은 절대 공개 저장소에 커밋하지 마세요!
