'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  ShoppingBag,
  CreditCard,
  Bell,
  TrendingUp,
  Calendar,
  ChevronRight,
  Award,
  Gift,
} from 'lucide-react';

export default function MypageDashboard() {
  const { data: session } = useSession();

  // 임시 데이터 (실제로는 API에서 가져와야 함)
  const stats = {
    totalOrders: 12,
    pendingOrders: 2,
    points: 5400,
    grade: 'VIP',
  };

  const recentOrders = [
    {
      id: '1',
      title: '병점복합타운 프리미엄 상가 상담',
      date: '2025-01-15',
      status: '진행중',
      amount: '250만원',
    },
    {
      id: '2',
      title: '병점복합타운 고급 사무실 상담',
      date: '2025-01-10',
      status: '완료',
      amount: '180만원',
    },
  ];

  const quickActions = [
    {
      label: '내 정보 수정',
      href: '/mypage/profile',
      icon: <Award className="h-6 w-6" />,
      color: 'blue',
    },
    {
      label: '주문 내역',
      href: '/mypage/orders',
      icon: <ShoppingBag className="h-6 w-6" />,
      color: 'purple',
    },
    {
      label: '포인트',
      href: '/mypage/points',
      icon: <Gift className="h-6 w-6" />,
      color: 'green',
    },
    {
      label: '설정',
      href: '/mypage/settings',
      icon: <Bell className="h-6 w-6" />,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 환영 메시지 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          환영합니다, {session?.user?.name}님! 👋
        </h1>
        <p className="text-blue-100">
          오늘도 좋은 하루 되세요. 병점복합타운에서 완벽한 공간을 찾아보세요.
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats.totalOrders}
          </h3>
          <p className="text-sm text-gray-600">총 상담 건수</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats.pendingOrders}
          </h3>
          <p className="text-sm text-gray-600">진행중</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats.points.toLocaleString()}P
          </h3>
          <p className="text-sm text-gray-600">보유 포인트</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats.grade}
          </h3>
          <p className="text-sm text-gray-600">회원 등급</p>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">빠른 메뉴</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-${action.color}-100 hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-all group`}
            >
              <div
                className={`h-14 w-14 rounded-full bg-${action.color}-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <div className={`text-${action.color}-600`}>{action.icon}</div>
              </div>
              <span className="font-medium text-gray-900 text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 최근 주문 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">최근 상담 내역</h2>
          <Link
            href="/mypage/orders"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            전체보기
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {order.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {order.date}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === '진행중'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{order.amount}</p>
              </div>
            </div>
          ))}
        </div>

        {recentOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">아직 상담 내역이 없습니다.</p>
            <Link
              href="/#contact"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              상담 신청하기 →
            </Link>
          </div>
        )}
      </div>

      {/* 알림 & 공지사항 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">알림</h2>
          <Bell className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">병점복합타운 프리미엄 상가</span>{' '}
                상담이 승인되었습니다.
              </p>
              <p className="text-xs text-gray-500 mt-1">2시간 전</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-gray-700">
                새로운 매물 정보가 업데이트되었습니다.
              </p>
              <p className="text-xs text-gray-500 mt-1">1일 전</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
