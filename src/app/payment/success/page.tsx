'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, Package } from 'lucide-react';

interface PaymentInfo {
  paymentKey: string;
  orderId: string;
  amount: string;
  orderName?: string;
  approvedAt?: string;
  method?: string;
  [key: string]: unknown;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      if (!paymentKey || !orderId || !amount) {
        alert('결제 정보가 올바르지 않습니다.');
        router.push('/');
        return;
      }

      try {
        // 실제 환경에서는 서버 API를 호출하여 결제 승인을 처리해야 합니다
        // const response = await fetch('/api/payment/confirm', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ paymentKey, orderId, amount }),
        // });
        // const data = await response.json();

        // 테스트 환경에서는 클라이언트에서 임시 데이터 설정
        setPaymentInfo({
          paymentKey,
          orderId,
          amount,
          method: '카드',
          approvedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error('결제 승인 오류:', error);
        alert('결제 승인 중 오류가 발생했습니다.');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">결제 처리중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* 성공 아이콘 */}
        <div className="text-center mb-8">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">결제가 완료되었습니다</h1>
          <p className="text-gray-600">주문이 성공적으로 처리되었습니다.</p>
        </div>

        {/* 결제 정보 */}
        {paymentInfo && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">결제 정보</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">주문번호</span>
                <span className="font-medium text-gray-900">{paymentInfo.orderId}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">결제 금액</span>
                <span className="font-bold text-blue-600 text-xl">
                  {parseInt(paymentInfo.amount).toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">결제 수단</span>
                <span className="font-medium text-gray-900">{paymentInfo.method}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">승인 시간</span>
                <span className="font-medium text-gray-900">
                  {new Date(paymentInfo.approvedAt).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 안내 메시지 */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-2">다음 단계</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>주문 내역은 마이페이지에서 확인하실 수 있습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>담당자가 곧 연락드릴 예정입니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>결제 영수증은 등록하신 이메일로 발송됩니다.</span>
            </li>
          </ul>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/mypage/orders"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Package className="h-5 w-5" />
            주문 내역
          </Link>
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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
