'use client';

import React from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardMetric {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

export default function AdminDashboard() {
  // 주요 지표 데이터
  const metrics: DashboardMetric[] = [
    {
      title: '총 사용자 수',
      value: '2,847',
      change: 12.5,
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
    },
    {
      title: '오늘 신규 가입자',
      value: '42',
      change: 8.2,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'green',
    },
    {
      title: '총 주문 수',
      value: '1,234',
      change: -3.1,
      icon: <ShoppingBag className="h-6 w-6" />,
      color: 'purple',
    },
    {
      title: '총 매출액',
      value: '12.5억원',
      change: 15.7,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'orange',
    },
  ];

  // 월별 매출 데이터
  const salesData = [
    { month: '1월', sales: 850 },
    { month: '2월', sales: 920 },
    { month: '3월', sales: 1050 },
    { month: '4월', sales: 980 },
    { month: '5월', sales: 1150 },
    { month: '6월', sales: 1280 },
    { month: '7월', sales: 1420 },
    { month: '8월', sales: 1350 },
    { month: '9월', sales: 1480 },
    { month: '10월', sales: 1580 },
    { month: '11월', sales: 1650 },
    { month: '12월', sales: 1750 },
  ];

  // 상품별 판매량
  const productData = [
    { name: '프리미엄 상가', sales: 45 },
    { name: '고급 사무실', sales: 38 },
    { name: '코너 상가', sales: 32 },
    { name: '오피스텔', sales: 28 },
    { name: '복합 매물', sales: 22 },
  ];

  // 최근 가입자
  const recentUsers = [
    { id: 1, name: '김철수', email: 'kim@example.com', date: '2025-01-20', status: 'active' },
    { id: 2, name: '이영희', email: 'lee@example.com', date: '2025-01-20', status: 'active' },
    { id: 3, name: '박민수', email: 'park@example.com', date: '2025-01-19', status: 'active' },
    { id: 4, name: '정수진', email: 'jung@example.com', date: '2025-01-19', status: 'inactive' },
    { id: 5, name: '최동욱', email: 'choi@example.com', date: '2025-01-18', status: 'active' },
  ];

  // 최근 주문
  const recentOrders = [
    { id: 'ORD-001', customer: '김상가', product: '프리미엄 상가', amount: '250만원', status: 'completed', date: '2025-01-20' },
    { id: 'ORD-002', customer: '이부동', product: '고급 사무실', amount: '180만원', status: 'in-progress', date: '2025-01-20' },
    { id: 'ORD-003', customer: '박매물', product: '코너 상가', amount: '320만원', status: 'pending', date: '2025-01-19' },
    { id: 'ORD-004', customer: '최투자', product: '오피스텔', amount: '3.5억원', status: 'completed', date: '2025-01-19' },
    { id: 'ORD-005', customer: '정창업', product: '복합 매물', amount: '450만원', status: 'in-progress', date: '2025-01-18' },
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600">시스템 전체 현황을 확인할 수 있습니다</p>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center text-${metric.color}-600`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* 차트 섹션 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 월별 매출 그래프 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">월별 매출 추이</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 상품별 판매량 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">상품별 판매량</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="sales" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 최근 활동 테이블 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 최근 가입자 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 가입자</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">이름</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">이메일</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">가입일</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status as keyof typeof statusColors]}`}>
                        {user.status === 'active' ? '활성' : '비활성'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 최근 주문 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 주문</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">주문번호</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">고객</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">금액</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {order.status === 'pending' ? '대기' : order.status === 'in-progress' ? '진행중' : '완료'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 빠른 액션 버튼 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="/admin/users" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900">사용자 관리</h3>
        </a>
        <a href="/admin/products" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-center">
          <ShoppingBag className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900">상품 관리</h3>
        </a>
        <a href="/admin/orders" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-center">
          <ShoppingBag className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900">주문 관리</h3>
        </a>
        <a href="/admin/settings" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-center">
          <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900">시스템 설정</h3>
        </a>
      </div>
    </div>
  );
}
