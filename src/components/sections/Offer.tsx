'use client';

import { Phone, Mail, Clock } from 'lucide-react';

export default function Offer() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* 헤더 */}
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            지금 바로 무료 상담을 신청하세요
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            병점 상가 전문가가 직접 상담해드립니다.
            <br />
            연락 주시면 24시간 내에 답변드리겠습니다.
          </p>

          {/* 연락 정보 */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Phone className="w-8 h-8 text-white mx-auto mb-3" />
              <p className="text-white font-medium mb-1">전화 상담</p>
              <a
                href="tel:1588-0000"
                className="text-blue-100 hover:text-white transition-colors"
              >
                1588-0000
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Mail className="w-8 h-8 text-white mx-auto mb-3" />
              <p className="text-white font-medium mb-1">이메일 상담</p>
              <a
                href="mailto:contact@sangadaiji.com"
                className="text-blue-100 hover:text-white transition-colors"
              >
                contact@sangadaiji.com
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Clock className="w-8 h-8 text-white mx-auto mb-3" />
              <p className="text-white font-medium mb-1">운영 시간</p>
              <p className="text-blue-100">평일 09:00 - 18:00</p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1588-0000"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              전화로 상담하기
            </a>
            <a
              href="mailto:contact@sangadaiji.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              이메일로 문의하기
            </a>
          </div>

          {/* 추가 안내 */}
          <p className="mt-8 text-sm text-blue-100">
            상담 신청 시 병점 상권 분석 리포트를 무료로 제공해드립니다
          </p>
        </div>
      </div>
    </section>
  );
}
