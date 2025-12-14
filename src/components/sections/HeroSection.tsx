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
        <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-purple-300 text-sm font-medium">신규 입점 특별 혜택 진행중</span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="animate-fadeInUp-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          <span className="block drop-shadow-lg">병점복합타운에서</span>
          <span className="block gradient-text drop-shadow-lg">창업의 꿈을 실현하세요</span>
        </h1>

        {/* 서브 헤드라인 */}
        <p className="animate-fadeInUp-delay-2 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 drop-shadow-md">
          예비창업자부터 상가 양도양수까지,<br className="hidden sm:block" />
          <span className="text-white font-medium">최적의 입지</span>에서 성공적인 비즈니스를 시작하세요.
        </p>

        {/* CTA 버튼 */}
        <div className="animate-fadeInUp-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="gradient-purple text-white text-lg px-8 py-6 rounded-full animate-pulse-glow hover:scale-105 transition-transform shadow-2xl"
          >
            무료 상담 신청하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-purple-500/50 text-purple-300 text-lg px-8 py-6 rounded-full hover:bg-purple-500/20 transition-colors backdrop-blur-sm"
            onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })}
          >
            자세히 알아보기
          </Button>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-colors">
            <MapPin className="w-8 h-8 text-purple-400 mb-3" />
            <span className="text-3xl font-bold text-white mb-1">병점역 5분</span>
            <span className="text-gray-300 text-sm">최고의 접근성</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-colors">
            <Building2 className="w-8 h-8 text-purple-400 mb-3" />
            <span className="text-3xl font-bold text-white mb-1">50+</span>
            <span className="text-gray-300 text-sm">다양한 업종 입점</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-colors">
            <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
            <span className="text-3xl font-bold text-white mb-1">연 15%</span>
            <span className="text-gray-300 text-sm">유동인구 증가율</span>
          </div>
        </div>
      </div>

      {/* 하단 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
