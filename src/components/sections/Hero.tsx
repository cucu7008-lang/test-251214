'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* 메인 타이틀 */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            병점복합타운 상가 전문
            <br />
            <span className="text-blue-600">병점역광장부동산</span>
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
            창업부터 양도양수까지, 병점 상가의 모든 것을 한 곳에서.
            <br />
            전문 컨설턴트가 함께하는 성공적인 상가 투자를 시작하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              무료 상담 신청하기
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              매물 둘러보기
            </a>
          </div>

          {/* 신뢰 지표 */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600 mt-1">중개 건수</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600 mt-1">고객 만족도</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">10년+</p>
              <p className="text-sm text-gray-600 mt-1">업계 경력</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
