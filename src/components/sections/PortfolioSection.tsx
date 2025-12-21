"use client";

import { ExternalLink, Building, Home, Briefcase } from "lucide-react";

export default function PortfolioSection() {
  const naverLandUrl = "https://new.land.naver.com/complexes?ms=37.2052876,127.0300579,18&a=APT:PRE:ABYG:JGC&e=RETAIL&realtorId=td5533";

  const categories = [
    {
      icon: Building,
      title: "상가 매물",
      description: "병점복합타운 상가, 코너 상가 등 다양한 상업용 부동산",
    },
    {
      icon: Briefcase,
      title: "사무실",
      description: "프리미엄 오피스, 공유 오피스, 소형 사무실",
    },
    {
      icon: Home,
      title: "창업 성공사례",
      description: "카페, 레스토랑, 편의점 등 성공적인 창업 사례",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            매물 갤러리
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            다양한 매물 정보를 네이버부동산에서 확인하세요
          </p>
        </div>

        {/* 카테고리 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
            >
              <category.icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </div>
          ))}
        </div>

        {/* 네이버부동산 연결 버튼 */}
        <div className="text-center">
          <a
            href={naverLandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-full text-lg transition-all hover:scale-105 shadow-2xl"
          >
            <ExternalLink className="w-6 h-6" />
            네이버부동산에서 매물 보기
          </a>
        </div>
      </div>
    </section>
  );
}
