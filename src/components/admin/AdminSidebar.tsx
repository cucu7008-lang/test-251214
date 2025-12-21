'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Home,
  Database,
} from 'lucide-react';

interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    title: '대시보드',
    href: '/admin',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: '사용자 관리',
    href: '/admin/users',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: '상품 관리',
    href: '/admin/products',
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: '주문 관리',
    href: '/admin/orders',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: 'Firebase 동기화',
    href: '/admin/firebase-sync',
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: '시스템 설정',
    href: '/admin/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* 로고 */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">관리자 페이지</h1>
            <p className="text-xs text-gray-500">상가다이찌</p>
          </div>
        </Link>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
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
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 사이트로 돌아가기 */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>사이트로 돌아가기</span>
        </Link>
      </div>
    </aside>
  );
}
