'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  const handleKakaoSignIn = async () => {
    await signIn('kakao', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      {/* 뒤로가기 버튼 */}
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
      >
        <ArrowLeft className="h-5 w-5" />
        홈으로
      </Link>

      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">상가다이찌</h1>
          <p className="text-gray-600">병점복합타운 상가 & 사무실 전문</p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            로그인 / 회원가입
          </h2>

          <div className="space-y-4">
            {/* 구글 로그인 */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </button>

            {/* 카카오 로그인 */}
            <button
              onClick={handleKakaoSignIn}
              className="w-full flex items-center justify-center gap-3 text-[#3C1E1E] px-6 py-4 rounded-xl font-medium transition-all shadow-sm hover:shadow"
              style={{ backgroundColor: '#FEE500' }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523 1.09l.006-.002-.003.005-1.383-3.701a.536.536 0 0 0-.99-.003l-1.395 3.702a.472.472 0 0 0 .877.332l.266-.712h1.936l.241.649a.472.472 0 1 0 .884-.33v.06zm-4.97-1.092h-.968v-.808h.968a.4.4 0 1 1 0 .808zm0-1.694h-.968v-.704h.968a.35.35 0 1 1 0 .704zm.854-.11a1.29 1.29 0 0 0-.854-2.472H5.718a.472.472 0 0 0-.472.472v4.15a.472.472 0 1 0 .944 0v-1.166h.807a1.29 1.29 0 0 0 .849-.62.48.48 0 0 0 .02-.02l-.001.003z"/>
              </svg>
              카카오로 계속하기
            </button>
          </div>

          {/* 안내 문구 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              소셜 로그인을 통해 간편하게 가입하고
              <br />
              맞춤형 상가 정보를 받아보세요.
            </p>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            로그인 시{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              이용약관
            </Link>{' '}
            및{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              개인정보처리방침
            </Link>
            에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
