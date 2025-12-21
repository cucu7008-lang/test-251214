"use client";

import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function BusinessCardSection() {
  const businessCards = [
    {
      image: "/business-card-1.jpg",
      alt: "병점역광장부동산 명함 - 상가 & 사무실 전문",
    },
    {
      image: "/business-card-2.jpg",
      alt: "상가다이찌 명함 - 상업용부동산 토지",
    },
    {
      image: "/business-card-3.jpg",
      alt: "전화룡 대표 명함 - 상가, 오피스, 오피스텔",
    },
  ];

  return (
    <section id="business-card" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-medium text-sm uppercase tracking-wider">
            Contact Information
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              연락처 정보
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            언제든지 편하게 연락주세요. 성심성의껏 상담해드리겠습니다.
          </p>
        </div>

        {/* 명함 갤러리 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {businessCards.map((card, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-64 bg-gray-800">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-sm font-medium">{card.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 주요 연락처 정보 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 전화 */}
          <a
            href="tel:010-5533-3214"
            className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">전화 상담</h3>
            <p className="text-gray-400 mb-3 text-sm">빠르고 정확한 전화 상담</p>
            <p className="text-yellow-400 font-bold text-lg">010-5533-3214</p>
          </a>

          {/* 이메일 */}
          <a
            href="mailto:td5875@naver.com"
            className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">이메일 문의</h3>
            <p className="text-gray-400 mb-3 text-sm">언제든지 이메일로 문의</p>
            <p className="text-yellow-400 font-bold">td5875@naver.com</p>
          </a>

          {/* 방문 상담 */}
          <a
            href="https://map.naver.com/v5/search/경기도%20화성시%20병점노을4로19%2C%20골든스퀘어%20I%20109-1호"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">방문 상담</h3>
            <p className="text-gray-400 mb-3 text-sm">병점역 도보 5분 거리</p>
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
              <span>지도 보기</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
