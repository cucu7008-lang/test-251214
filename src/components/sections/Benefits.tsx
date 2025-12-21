'use client';

import { CheckCircle, FileText, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle,
    title: '무료 상담',
    description: '전문 컨설턴트가 제공하는 1:1 맞춤 상담 서비스. 창업부터 입점까지 모든 과정을 무료로 지원합니다.',
  },
  {
    icon: FileText,
    title: '계약서 검토',
    description: '복잡한 상가 계약서를 전문가가 꼼꼼히 검토해드립니다. 불리한 조항 없이 안전한 계약을 보장합니다.',
  },
  {
    icon: TrendingUp,
    title: '시장 분석 리포트',
    description: '병점 상권 분석 자료와 매출 예측 리포트를 무료로 제공합니다. 데이터 기반의 현명한 투자 결정을 하세요.',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            무료로 제공되는 혜택
          </h2>
          <p className="text-lg text-gray-600">
            병점역광장부동산만의 특별한 서비스를 경험하세요
          </p>
        </div>

        {/* 혜택 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
