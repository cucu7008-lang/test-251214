"use client";

import { Button } from "@/components/ui/button";
import ShaderAnimation from "@/components/ui/shader-animation";
import { ArrowRight, MapPin, Building2, TrendingUp } from "lucide-react";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL Shader Animation 배경 */}
      <ShaderAnimation className="z-0" />

      {/* 오버레이 (가독성 향상) */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* 뱃지 */}
        <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-yellow-300 text-sm font-medium">병점역 5분 거리 | 전문 공인중개사 상담</span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="animate-fadeInUp-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          <span className="block drop-shadow-lg">병점역광장부동산</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-lg">신뢰와 전문성으로 함께합니다</span>
        </h1>

        {/* 서브 헤드라인 */}
        <p className="animate-fadeInUp-delay-2 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 drop-shadow-md">
          매매·전월세·상가 분양부터 투자 상담까지,<br className="hidden sm:block" />
          <span className="text-yellow-400 font-medium">다년간의 경험</span>으로 최상의 부동산 솔루션을 제공합니다.
        </p>

        {/* CTA 버튼 */}
        <div className="animate-fadeInUp-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform shadow-2xl"
          >
            무료 매물 상담 신청
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-500/50 text-yellow-300 text-lg px-8 py-6 rounded-full hover:bg-yellow-500/20 transition-colors backdrop-blur-sm"
            onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })}
          >
            서비스 안내
          </Button>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-yellow-500/20 backdrop-blur-md hover:bg-white/15 transition-colors">
            <MapPin className="w-8 h-8 text-yellow-400 mb-3" />
            <span className="text-3xl font-bold text-white mb-1">병점역 5분</span>
            <span className="text-gray-300 text-sm">골든스퀘어 I 위치</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-yellow-500/20 backdrop-blur-md hover:bg-white/15 transition-colors">
            <Building2 className="w-8 h-8 text-yellow-400 mb-3" />
            <span className="text-3xl font-bold text-white mb-1">전문가</span>
            <span className="text-gray-300 text-sm">공인중개사 자격증</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-yellow-500/20 backdrop-blur-md hover:bg-white/15 transition-colors">
            <TrendingUp className="w-8 h-8 text-yellow-400 mb-3" />
            <span className="text-3xl font-bold text-white mb-1">100+</span>
            <span className="text-gray-300 text-sm">성공 거래 건수</span>
          </div>
        </div>
      </div>

      {/* 하단 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-yellow-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
