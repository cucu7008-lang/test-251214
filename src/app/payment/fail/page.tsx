'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, Home, ArrowLeft } from 'lucide-react';

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* 실패 아이콘 */}
        <div className="text-center mb-8">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-100 mb-6">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">결제에 실패했습니다</h1>
          <p className="text-gray-600">결제 처리 중 문제가 발생했습니다.</p>
        </div>

        {/* 에러 정보 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">오류 정보</h2>
          <div className="space-y-4">
            {errorCode && (
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">오류 코드</span>
                <span className="font-medium text-red-600">{errorCode}</span>
              </div>
            )}
            {errorMessage && (
              <div className="py-3">
                <span className="text-gray-600 block mb-2">오류 메시지</span>
                <p className="text-gray-900 bg-red-50 p-4 rounded-lg">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-orange-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-orange-900 mb-2">결제 실패 원인</h3>
          <ul className="space-y-2 text-sm text-orange-800">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>카드 한도 초과 또는 잔액 부족</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>카드 정보 입력 오류</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>네트워크 연결 문제</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">•</span>
              <span>결제 취소 또는 사용자 이탈</span>
            </li>
          </ul>
        </div>

        {/* 고객 지원 */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-2">도움이 필요하신가요?</h3>
          <p className="text-sm text-gray-600 mb-4">
            결제 관련 문의사항이 있으시면 고객센터로 연락주세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:1588-0000"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              전화: 1588-0000
            </a>
            <a
              href="mailto:contact@sangadaiji.com"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              이메일: contact@sangadaiji.com
            </a>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            다시 시도
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            <Home className="h-5 w-5" />
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
