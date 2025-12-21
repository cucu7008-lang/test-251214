'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24 lg:py-36 xl:py-40 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* 메인 타이틀 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-8 leading-tight tracking-tight animate-fadeInUp">
            병점복합타운 상가 전문
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              병점역광장부동산
            </span>
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-xl lg:text-2xl xl:text-3xl text-gray-700 mb-12 leading-relaxed font-medium max-w-3xl mx-auto animate-fadeInUp-delay-1">
            창업부터 양도양수까지, 병점 상가의 모든 것을 한 곳에서.
            <br />
            전문 컨설턴트가 함께하는 성공적인 상가 투자를 시작하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fadeInUp-delay-2">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">무료 상담 신청하기</span>
            </a>
            <a
              href="#products"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-900 text-lg font-semibold rounded-xl border-2 border-gray-300 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 group-hover:text-blue-600 transition-colors">매물 둘러보기</span>
            </a>
          </div>

          {/* 신뢰 지표 */}
          <div className="mt-20 lg:mt-24 grid grid-cols-3 gap-10 lg:gap-12 text-center animate-fadeInUp-delay-3">
            <div className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-110 transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="relative z-10 text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">500+</p>
              <p className="relative z-10 text-base lg:text-lg text-gray-600 font-medium">중개 건수</p>
            </div>
            <div className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-110 transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="relative z-10 text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">98%</p>
              <p className="relative z-10 text-base lg:text-lg text-gray-600 font-medium">고객 만족도</p>
            </div>
            <div className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-110 transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="relative z-10 text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">10년+</p>
              <p className="relative z-10 text-base lg:text-lg text-gray-600 font-medium">업계 경력</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
