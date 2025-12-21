'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  area: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 'product-1',
    title: '병점복합타운 프리미엄 상가',
    description: '병점역 도보 5분 거리의 최고 입지! 높은 유동인구와 편리한 접근성으로 사업 성공을 보장합니다.',
    image: '/images/product-1.jpg',
    price: '월 250만원',
    area: '50평',
    features: ['역세권', '주차 가능', '1층 상가', '화장실 별도'],
  },
  {
    id: 'product-2',
    title: '병점복합타운 고급 사무실',
    description: '쾌적한 업무 환경과 현대적인 인테리어로 고급스러운 사무 공간을 제공합니다.',
    image: '/images/product-2.jpg',
    price: '월 180만원',
    area: '35평',
    features: ['채광 우수', '주차 2대', '회의실 포함', '냉난방 완비'],
  },
  {
    id: 'product-3',
    title: '병점복합타운 코너 상가',
    description: '양면 개방형 코너 상가로 최대 노출도! 카페, 음식점, 소매점에 최적화된 공간입니다.',
    image: '/images/product-3.jpg',
    price: '월 320만원',
    area: '65평',
    features: ['코너 상가', '양면 출입', '넓은 주차장', '덤웨이터'],
  },
];

export default function ProductsShowcase() {
  return (
    <section id="products" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            프리미엄 상가 & 사무실
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            병점복합타운의 엄선된 매물을 확인하세요. 각 공간은 최고의 입지와 조건을 자랑합니다.
          </p>
        </div>

        {/* 상품 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* 상품 이미지 */}
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🏢</div>
                </div>
                {/* 실제 이미지가 있을 경우
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {product.price}
                </div>
              </div>

              {/* 상품 정보 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    📏 {product.area}
                  </span>
                </div>

                {/* 특징 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* 더보기 버튼 */}
                <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                  상세보기
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 더 많은 매물 보기 */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            전체 매물 보기
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
