'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Shield } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

// 임시로 이메일 기반으로 관리자 확인 (실제로는 DB에서 role 확인)
const isAdminUser = (email?: string | null) => {
  if (!email) return false;
  // 실제 환경에서는 DB의 user.role === 'admin'으로 확인해야 함
  const adminEmails = [
    'admin@sangadaiji.com',
    'test@admin.com',
    'cucu7008@gmail.com'
  ];
  return adminEmails.includes(email);
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const { data: session, status } = useSession();

  // 로딩 중
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">로딩중...</p>
        </div>
      </div>
    );
  }

  // 로그인하지 않은 경우
  if (status === 'unauthenticated') {
    redirect('/auth/signin?callbackUrl=/admin');
  }

  // 로그인했지만 관리자가 아닌 경우
  if (session && !isAdminUser(session.user?.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            접근 권한 없음
          </h1>
          <p className="text-gray-600 mb-6">
            관리자 권한이 필요한 페이지입니다.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              뒤로가기
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              홈으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 관리자인 경우
  return <>{children}</>;
}
