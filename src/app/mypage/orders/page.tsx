'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Mail, Eye, Download } from 'lucide-react';

interface Order {
  id: string;
  title: string;
  propertyType: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  consultant: string;
  amount: string;
  description: string;
  location: string;
  consultDate?: string;
}

const statusConfig = {
  pending: {
    label: '대기중',
    color: 'bg-yellow-100 text-yellow-700',
    dotColor: 'bg-yellow-500',
  },
  'in-progress': {
    label: '진행중',
    color: 'bg-blue-100 text-blue-700',
    dotColor: 'bg-blue-500',
  },
  completed: {
    label: '완료',
    color: 'bg-green-100 text-green-700',
    dotColor: 'bg-green-500',
  },
  cancelled: {
    label: '취소',
    color: 'bg-red-100 text-red-700',
    dotColor: 'bg-red-500',
  },
};

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | Order['status']>('all');

  // 임시 주문 데이터
  const orders: Order[] = [
    {
      id: 'ORD-2025-001',
      title: '병점복합타운 프리미엄 상가',
      propertyType: '1층 상가',
      date: '2025-01-15',
      status: 'in-progress',
      consultant: '김상가',
      amount: '월 250만원',
      description: '병점역 도보 5분 거리의 최고 입지',
      location: '경기도 화성시 병점동 123-45',
      consultDate: '2025-01-20 14:00',
    },
    {
      id: 'ORD-2025-002',
      title: '병점복합타운 고급 사무실',
      propertyType: '7층 사무실',
      date: '2025-01-10',
      status: 'completed',
      consultant: '이부동',
      amount: '월 180만원',
      description: '쾌적한 업무 환경과 현대적인 인테리어',
      location: '경기도 화성시 병점동 123-45',
      consultDate: '2025-01-12 10:00',
    },
    {
      id: 'ORD-2025-003',
      title: '병점복합타운 코너 상가',
      propertyType: '1층 코너 상가',
      date: '2025-01-05',
      status: 'pending',
      consultant: '박매물',
      amount: '월 320만원',
      description: '양면 개방형 코너 상가로 최대 노출도',
      location: '경기도 화성시 병점동 123-45',
    },
    {
      id: 'ORD-2024-050',
      title: '병점 오피스텔 투자 상담',
      propertyType: '오피스텔',
      date: '2024-12-20',
      status: 'cancelled',
      consultant: '최투자',
      amount: '3억 5천만원',
      description: '투자용 오피스텔 매매 상담',
      location: '경기도 화성시 병점동',
    },
  ];

  const tabs = [
    { key: 'all', label: '전체', count: orders.length },
    {
      key: 'pending',
      label: '대기중',
      count: orders.filter((o) => o.status === 'pending').length,
    },
    {
      key: 'in-progress',
      label: '진행중',
      count: orders.filter((o) => o.status === 'in-progress').length,
    },
    {
      key: 'completed',
      label: '완료',
      count: orders.filter((o) => o.status === 'completed').length,
    },
    {
      key: 'cancelled',
      label: '취소',
      count: orders.filter((o) => o.status === 'cancelled').length,
    },
  ];

  const filteredOrders =
    selectedTab === 'all'
      ? orders
      : orders.filter((order) => order.status === selectedTab);

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">주문 내역</h1>
        <p className="text-gray-600">상담 신청 내역을 확인하고 관리할 수 있습니다.</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-2xl shadow-sm p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  selectedTab === tab.key
                    ? 'bg-white/20'
                    : 'bg-gray-200'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              주문 내역이 없습니다
            </h3>
            <p className="text-gray-600">
              {selectedTab === 'all'
                ? '아직 상담 신청 내역이 없습니다.'
                : `${tabs.find((t) => t.key === selectedTab)?.label} 상태의 주문이 없습니다.`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 헤더 */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {order.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusConfig[order.status].color
                      }`}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">주문번호: {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">{order.amount}</p>
                  <p className="text-sm text-gray-500">{order.propertyType}</p>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>신청일: {order.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>담당자: {order.consultant}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{order.location}</span>
                </div>
                {order.consultDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>상담 예정: {order.consultDate}</span>
                  </div>
                )}
              </div>

              {/* 설명 */}
              <p className="text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                {order.description}
              </p>

              {/* 액션 버튼 */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Eye className="h-4 w-4" />
                  상세보기
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  <Download className="h-4 w-4" />
                  다운로드
                </button>
                {order.status === 'pending' && (
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
                    취소
                  </button>
                )}
              </div>

              {/* 진행 상태 타임라인 */}
              {order.status === 'in-progress' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>신청</span>
                    <span>접수</span>
                    <span>상담</span>
                    <span>완료</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
