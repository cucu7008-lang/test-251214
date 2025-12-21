'use client';

import Image from 'next/image';

export default function Story() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 텍스트 영역 */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              10년간 병점 상가만을
              <br />
              전문으로 해온 이유
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                2014년부터 병점복합타운 상가 중개를 시작한 병점역광장부동산은 이 지역의
                상권 변화와 발전을 함께해왔습니다.
              </p>
              <p>
                단순히 매물을 소개하는 것을 넘어, 창업자의 꿈과 투자자의
                안정적인 수익을 함께 고민합니다. 지역 상권에 대한 깊은 이해와
                풍부한 경험으로 최적의 솔루션을 제시합니다.
              </p>
              <p>
                500건 이상의 중개 경험과 98%의 높은 고객 만족도가
                저희의 전문성을 증명합니다.
              </p>
            </div>

            {/* 강점 리스트 */}
            <ul className="mt-8 space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">병점 상권 전문 분석 및 컨설팅</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">투명한 거래와 신뢰 기반 서비스</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">계약 후에도 지속되는 사후 관리</span>
              </li>
            </ul>
          </div>

          {/* 이미지 영역 */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-200">
            <Image
              src="/land.png"
              alt="병점복합타운"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
