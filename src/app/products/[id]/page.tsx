'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowLeft, MapPin, DollarSign, Maximize2, CheckCircle, Phone, Mail, CreditCard } from 'lucide-react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  price: string;
  area: string;
  floor: string;
  deposit: string;
  features: string[];
  amenities: string[];
  location: {
    address: string;
    distance: string;
  };
}

const productsData: Record<string, Product> = {
  // 매물 정보가 추가되면 여기에 입력하세요
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const productId = params.id as string;
  const product = productsData[productId];
  const [isProcessing, setIsProcessing] = useState(false);

  // 결제 처리 함수
  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // 토스페이먼츠 SDK 로드
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ''
      );

      // 주문 ID 생성 (실제로는 서버에서 생성해야 함)
      const orderId = `ORDER-${Date.now()}`;

      // 금액 파싱 (예: "월 250만원" -> 2500000)
      const amountStr = product.price.replace(/[^0-9]/g, '');
      const amount = parseInt(amountStr) * 10000; // 만원 단위를 원 단위로 변환

      // 결제 요청 (로그인 여부와 관계없이 진행)
      await tossPayments.requestPayment('카드', {
        amount: amount,
        orderId: orderId,
        orderName: product.title,
        customerName: session?.user?.name || '게스트',
        customerEmail: session?.user?.email || 'guest@test.com',
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">매물을 찾을 수 없습니다</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 여백 */}
      <div className="h-20"></div>

      {/* 뒤로가기 버튼 */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            상품 목록으로
          </Link>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 왼쪽: 이미지 */}
          <div>
            <div className="sticky top-24">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl">🏢</div>
                </div>
                {/* 실제 이미지가 있을 경우
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                */}
              </div>
            </div>
          </div>

          {/* 오른쪽: 상세 정보 */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{product.description}</p>

            {/* 가격 정보 */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">월 임대료</div>
                  <div className="text-2xl font-bold text-blue-600">{product.price}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">보증금</div>
                  <div className="text-2xl font-bold text-blue-600">{product.deposit}</div>
                </div>
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Maximize2 className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">면적</div>
                  <div className="font-bold text-gray-900">{product.area}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">층수</div>
                  <div className="font-bold text-gray-900">{product.floor}</div>
                </div>
              </div>
            </div>

            {/* 주요 특징 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">주요 특징</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 편의시설 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">편의시설</h3>
              <div className="flex flex-wrap gap-2">
                {product.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* 상세 설명 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">상세 설명</h3>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>
            </div>

            {/* 위치 정보 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">위치</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{product.location.address}</div>
                    <div className="text-sm text-gray-600 mt-1">{product.location.distance}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 문의하기 및 결제 버튼 */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 -mx-6 px-6 py-6 lg:mx-0 lg:border-0 lg:p-0">
              <div className="grid grid-cols-3 gap-4">
                <a
                  href="tel:010-5533-3214"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Phone className="h-5 w-5" />
                  전화
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <Mail className="h-5 w-5" />
                  상담
                </a>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="h-5 w-5" />
                  {isProcessing ? '처리중...' : '결제'}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                테스트 결제 환경입니다. 실제 결제는 발생하지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
