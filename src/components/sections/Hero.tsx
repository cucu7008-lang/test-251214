'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-24 lg:py-36 xl:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* 메인 타이틀 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            병점복합타운 상가 전문
            <br />
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              병점역광장부동산
            </span>
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-xl lg:text-2xl xl:text-3xl text-gray-700 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            창업부터 양도양수까지, 병점 상가의 모든 것을 한 곳에서.
            <br />
            전문 컨설턴트가 함께하는 성공적인 상가 투자를 시작하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              무료 상담 신청하기
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              매물 둘러보기
            </a>
          </div>

          {/* 신뢰 지표 */}
          <div className="mt-20 lg:mt-24 grid grid-cols-3 gap-10 lg:gap-12 text-center">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <p className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2">500+</p>
              <p className="text-base lg:text-lg text-gray-600 font-medium">중개 건수</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <p className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2">98%</p>
              <p className="text-base lg:text-lg text-gray-600 font-medium">고객 만족도</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <p className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2">10년+</p>
              <p className="text-base lg:text-lg text-gray-600 font-medium">업계 경력</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
