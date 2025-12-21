'use client';

import { MapPin, DollarSign, SquareStack } from 'lucide-react';

const products = [
  {
    title: '소형 상가',
    location: '병점복합타운 A동',
    area: '33㎡ (10평)',
    price: '보증금 5,000만원 / 월세 150만원',
    features: [
      '역세권 도보 3분 거리',
      '유동인구 많은 1층 위치',
      '프랜차이즈 입점 가능',
      '즉시 입주 가능',
    ],
  },
  {
    title: '중형 상가',
    location: '병점복합타운 B동',
    area: '66㎡ (20평)',
    price: '보증금 1억원 / 월세 250만원',
    features: [
      '넓은 주차 공간 확보',
      '코너 자리 시야 확보',
      '내부 인테리어 완료',
      '화장실 내부 완비',
    ],
  },
  {
    title: '대형 상가',
    location: '병점복합타운 C동',
    area: '132㎡ (40평)',
    price: '보증금 2억원 / 월세 400만원',
    features: [
      '메인도로 정면 위치',
      '2층 구조 활용도 높음',
      '대형 간판 설치 가능',
      '주차 3대 확보 가능',
    ],
  },
];

export default function Products() {
  return (
    <section id="products" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            추천 매물
          </h2>
          <p className="text-lg text-gray-600">
            지금 바로 입주 가능한 프리미엄 상가를 만나보세요
          </p>
        </div>

        {/* 상품 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* 카드 헤더 */}
              <div className="bg-blue-50 p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {product.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <SquareStack className="w-4 h-4 mr-1" />
                  {product.area}
                </div>
              </div>

              {/* 카드 바디 */}
              <div className="p-6">
                {/* 가격 */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-start text-blue-600 font-bold text-lg">
                    <DollarSign className="w-5 h-5 mr-1 mt-1 flex-shrink-0" />
                    <span>{product.price}</span>
                  </div>
                </div>

                {/* 특징 */}
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="text-blue-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* 버튼 */}
                <a
                  href="#contact"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  상담 신청하기
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
