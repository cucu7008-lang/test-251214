'use client';

import React, { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function PaymentTestPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const testProduct = {
    id: 'test-product',
    name: '병점복합타운 프리미엄 상가 (테스트)',
    price: 2500000, // 250만원
    description: '병점역 도보 5분 거리의 최고 입지',
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ''
      );

      const orderId = `TEST-ORDER-${Date.now()}`;

      await tossPayments.requestPayment('카드', {
        amount: testProduct.price,
        orderId: orderId,
        orderName: testProduct.name,
        customerName: '테스트 고객',
        customerEmail: 'test@example.com',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 오류:', error);
      alert('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            토스페이먼츠 결제 테스트
          </h1>
          <p className="text-gray-600">
            로그인 없이 바로 결제 테스트를 진행할 수 있습니다.
          </p>
        </div>

        {/* 상품 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="h-32 w-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-6xl">
              🏢
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {testProduct.name}
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            {testProduct.description}
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">결제 금액</span>
              <span className="text-3xl font-bold text-blue-600">
                {testProduct.price.toLocaleString()}원
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="h-6 w-6" />
            {isProcessing ? '결제 처리중...' : '결제하기'}
          </button>
        </div>

        {/* 테스트 안내 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            테스트 카드 정보
          </h3>
          <div className="space-y-3 text-sm">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">카드번호</div>
              <code className="text-blue-600 font-mono">4111 1111 1111 1111</code>
              <p className="text-xs text-gray-500 mt-1">(비자 테스트 카드)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">유효기간</div>
              <code className="text-blue-600 font-mono">12/25</code>
              <p className="text-xs text-gray-500 mt-1">(미래 날짜 아무거나)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">CVC</div>
              <code className="text-blue-600 font-mono">123</code>
              <p className="text-xs text-gray-500 mt-1">(임의의 3자리 숫자)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">비밀번호 앞 2자리</div>
              <code className="text-blue-600 font-mono">12</code>
              <p className="text-xs text-gray-500 mt-1">(임의의 2자리 숫자)</p>
            </div>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>주의:</strong> 이것은 테스트 환경입니다. 실제 결제는 발생하지 않으며,
            테스트용 카드 정보만 사용 가능합니다.
          </p>
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
