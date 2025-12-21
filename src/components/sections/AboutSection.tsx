"use client";

import { MapPin, Award, Users, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 사무실 사진 */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden border-4 border-yellow-500/20">
              <Image
                src="/office-exterior.jpg"
                alt="병점역광장부동산 사무실 외관 - 골든스퀘어 I 위치"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* 오버레이 텍스트 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">병점역 도보 5분 거리</span>
                </div>
                <p className="text-white text-sm">
                  경기도 화성시 병점노을4로19, 골든스퀘어 I 109-1호
                </p>
              </div>
            </div>

            {/* 장식 요소 */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* 오른쪽: 회사 소개 */}
          <div>
            <div className="mb-6">
              <span className="text-yellow-400 font-medium text-sm uppercase tracking-wider">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
                병점역광장부동산<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  공인중개사사무소
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                다년간의 경험과 전문성으로 고객님의 성공적인 부동산 거래를 책임집니다.
                병점역 인근 최고의 입지에서 신뢰할 수 있는 부동산 서비스를 제공합니다.
              </p>
            </div>

            {/* 핵심 강점 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">공인중개사 자격증 보유</h3>
                  <p className="text-gray-400 text-sm">전문가의 정확한 상담과 안전한 거래 보장</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">다년간의 실무 경험</h3>
                  <p className="text-gray-400 text-sm">병점역 일대 매물 정보와 시세에 정통</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">100+ 성공 거래</h3>
                  <p className="text-gray-400 text-sm">수많은 고객의 성공적인 부동산 거래 지원</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:010-5533-3214"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg transition-all hover:scale-105"
              >
                📞 전화 상담
              </a>
              <a
                href="#contact-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-yellow-500 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-colors"
              >
                무료 상담 신청
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
