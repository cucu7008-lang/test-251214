'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
  User,
  ShoppingBag,
  Settings,
  Home,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    label: '대시보드',
    href: '/mypage',
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: '내 정보',
    href: '/mypage/profile',
    icon: <User className="h-5 w-5" />,
  },
  {
    label: '주문내역',
    href: '/mypage/orders',
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    label: '설정',
    href: '/mypage/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // 로그인 체크
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩중...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 여백 */}
      <div className="h-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 (데스크톱) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              {/* 사용자 정보 */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {session?.user?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {session?.user?.name || '사용자'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* 메뉴 */}
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* 모바일 탭 네비게이션 */}
          <div className="lg:hidden">
            <div className="bg-white rounded-2xl shadow-sm p-2 flex gap-2 overflow-x-auto">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
