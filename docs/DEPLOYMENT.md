# 배포 가이드

## Vercel 배포

### 1. Vercel 계정 생성

1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. 새 프로젝트 생성

### 2. GitHub 연동

```bash
# GitHub에 코드 푸시
git add .
git commit -m "프로젝트 완료"
git push origin main
```

### 3. Vercel에서 프로젝트 import

1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. GitHub 저장소 선택: `cucu7008-lang/test-251214`
3. 프로젝트 설정:
   - Framework Preset: Next.js
   - Root Directory: `byeongjeom-landing`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 4. 환경 변수 설정

Vercel 프로젝트 설정에서 Environment Variables 추가:

```env
# NextAuth
NEXTAUTH_SECRET=<your-secret>
NEXTAUTH_URL=https://your-domain.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>

# Kakao OAuth (선택)
KAKAO_CLIENT_ID=<your-kakao-id>
KAKAO_CLIENT_SECRET=<your-kakao-secret>

# Toss Payments
NEXT_PUBLIC_TOSS_CLIENT_KEY=<your-toss-key>
TOSS_SECRET_KEY=<your-toss-secret>

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-measurement-id>
```

**중요:** `NEXTAUTH_URL`은 배포된 도메인으로 설정!

### 5. 배포

"Deploy" 버튼 클릭하여 배포 시작

### 6. OAuth 리디렉션 URI 업데이트

배포 완료 후 Google Cloud Console에서 승인된 리디렉션 URI 추가:

```
https://your-domain.vercel.app/api/auth/callback/google
```

## Vercel CLI 배포

### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

### 2. 로그인

```bash
vercel login
```

### 3. 프로젝트 링크

```bash
cd byeongjeom-landing
vercel link
```

### 4. 환경 변수 설정

```bash
# Production 환경 변수 추가
vercel env add NEXTAUTH_SECRET production
vercel env add GOOGLE_CLIENT_ID production
# ... 나머지 환경 변수
```

또는 `.env.local` 파일을 기반으로:

```bash
vercel env pull .env.production
```

### 5. 배포

**프리뷰 배포:**
```bash
vercel
```

**프로덕션 배포:**
```bash
vercel --prod
```

## 커스텀 도메인 설정

### 1. 도메인 구매

- Namecheap, GoDaddy 등에서 도메인 구매

### 2. Vercel에서 도메인 추가

1. Vercel 프로젝트 설정 → "Domains"
2. 도메인 입력 (예: `example.com`)
3. DNS 설정 안내 확인

### 3. DNS 설정

도메인 등록업체에서 다음 레코드 추가:

**A 레코드:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME 레코드 (www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4. SSL 인증서

Vercel이 자동으로 Let's Encrypt SSL 인증서 발급

## 빌드 최적화

### 1. next.config.js 최적화

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // 번들 크기 분석
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      };
    }
    return config;
  },

  // 압축
  compress: true,

  // 파워 글로우 제거 (프로덕션)
  poweredByHeader: false,
};

module.exports = nextConfig;
```

### 2. 번들 크기 분석

```bash
# Bundle Analyzer 설치
npm install @next/bundle-analyzer

# 분석 실행
ANALYZE=true npm run build
```

### 3. 이미지 최적화

- WebP 형식 사용
- 적절한 크기로 리사이징
- Lazy Loading 활용

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="설명"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

## 성능 모니터링

### 1. Vercel Analytics

Vercel 프로젝트에서 Analytics 활성화:

1. 프로젝트 설정 → "Analytics"
2. "Enable Analytics" 클릭

### 2. Web Vitals 추적

`app/layout.tsx`에 추가:

```typescript
export function reportWebVitals(metric: any) {
  console.log(metric);
  // Analytics 서비스로 전송
}
```

### 3. Lighthouse

```bash
# Lighthouse CI 설치
npm install -g @lhci/cli

# 실행
lhci autorun --collect.url=https://your-domain.vercel.app
```

## CI/CD 설정

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

**GitHub Secrets 설정:**
- `VERCEL_TOKEN`: Vercel 개인 액세스 토큰
- `VERCEL_ORG_ID`: Vercel 조직 ID
- `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

## 롤백

### Vercel 대시보드에서

1. 프로젝트 → "Deployments"
2. 이전 배포 선택
3. "Promote to Production" 클릭

### CLI에서

```bash
# 이전 배포 목록 확인
vercel ls

# 특정 배포로 롤백
vercel promote <deployment-url>
```

## 환경 분리

### 개발 환경

```bash
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3001
```

### 스테이징 환경

```bash
# .env.staging
NEXT_PUBLIC_API_URL=https://staging.example.com
NEXTAUTH_URL=https://staging.example.com
```

### 프로덕션 환경

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://example.com
NEXTAUTH_URL=https://example.com
```

## 보안 체크리스트

- [ ] 환경 변수에 민감 정보 저장
- [ ] `.env.local`을 `.gitignore`에 추가
- [ ] HTTPS 강제 (Vercel 자동 처리)
- [ ] CSP (Content Security Policy) 헤더 설정
- [ ] CORS 정책 설정
- [ ] Rate Limiting 구현
- [ ] Firebase 보안 규칙 검토

## 배포 후 확인사항

1. **기능 테스트**
   - [ ] 로그인/로그아웃
   - [ ] 상품 조회
   - [ ] 리뷰 작성
   - [ ] 관리자 페이지
   - [ ] 결제 플로우

2. **성능 테스트**
   - [ ] Lighthouse 점수 (90+ 목표)
   - [ ] 페이지 로드 시간 (3초 이하)
   - [ ] 이미지 최적화 확인

3. **SEO 확인**
   - [ ] robots.txt
   - [ ] sitemap.xml
   - [ ] Meta tags
   - [ ] Open Graph

4. **모바일 테스트**
   - [ ] 반응형 디자인
   - [ ] 터치 이벤트
   - [ ] 모바일 네비게이션

## 문제 해결

### 빌드 실패

```bash
# 로컬에서 빌드 테스트
npm run build

# 로그 확인
vercel logs <deployment-url>
```

### 환경 변수 오류

```bash
# 환경 변수 목록 확인
vercel env ls

# 환경 변수 값 확인
vercel env pull
```

### 404 에러

`vercel.json` 파일로 리라이팅 설정:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## 모니터링 및 알림

### Vercel Integration

1. Slack 알림 설정
2. Discord 웹훅 연동
3. 이메일 알림 활성화

### Sentry 통합

```bash
npm install @sentry/nextjs

# Sentry 초기화
npx @sentry/wizard -i nextjs
```

## 비용 최적화

**Vercel 무료 플랜:**
- 100GB 대역폭/월
- 빌드 시간 100시간/월
- 무제한 배포

**유료 플랜으로 업그레이드 고려 시:**
- 트래픽 증가
- 팀 협업 필요
- 고급 분석 도구 필요

## 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel CLI 문서](https://vercel.com/docs/cli)

## 현재 배포 정보

- **Production URL**: https://byeongjeom-landing.vercel.app
- **GitHub Repository**: https://github.com/cucu7008-lang/test-251214
- **Vercel Project**: cucu7008s-projects/byeongjeom-landing
- **Framework**: Next.js 16.0.10
- **Node.js Version**: 18.x
