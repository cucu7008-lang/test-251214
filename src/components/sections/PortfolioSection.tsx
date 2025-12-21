"use client";

import { AnimatedFolder } from "@/components/ui/3d-folder";

const portfolioData = [
  {
    title: "상가 매물",
    projects: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
        title: "병점복합타운 1층 상가"
      },
      {
        id: "2",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60",
        title: "코너 상가 프리미엄"
      },
      {
        id: "3",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60",
        title: "신규 분양 상가"
      },
    ]
  },
  {
    title: "사무실",
    projects: [
      {
        id: "4",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60",
        title: "프리미엄 오피스"
      },
      {
        id: "5",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60",
        title: "공유 오피스"
      },
      {
        id: "6",
        image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop&q=60",
        title: "소형 사무실"
      },
    ]
  },
  {
    title: "창업 성공사례",
    projects: [
      {
        id: "7",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=60",
        title: "카페 창업 성공기"
      },
      {
        id: "8",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
        title: "레스토랑 오픈"
      },
      {
        id: "9",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
        title: "편의점 양도양수"
      },
    ]
  }
];

export default function PortfolioSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            매물 갤러리
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            <a
              href="https://new.land.naver.com/complexes?ms=37.2052876,127.0300579,18&a=APT:PRE:ABYG:JGC&e=RETAIL&realtorId=td5533"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors underline"
            >
              매물정보 링크
            </a>
            로 다양한 매물 정보를 확인하세요
          </p>
        </div>

        {/* 3D 폴더 갤러리 */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {portfolioData.map((folder) => (
            <AnimatedFolder
              key={folder.title}
              title={folder.title}
              projects={folder.projects}
              className="bg-gray-900/50 border-gray-800"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
