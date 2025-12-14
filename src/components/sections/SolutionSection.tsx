"use client";

import { CheckCircle2, Sparkles, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Target,
    title: "최적의 입지 분석",
    description: "유동인구, 상권분석, 경쟁업체 현황을 종합 분석하여 최적의 자리를 추천해 드립니다.",
    features: ["상권 빅데이터 분석", "맞춤형 업종 추천", "실시간 매물 정보"],
  },
  {
    icon: Zap,
    title: "원스톱 창업 지원",
    description: "계약부터 인테리어, 사업자등록까지 창업의 모든 과정을 한 번에 해결하세요.",
    features: ["전문 컨설턴트 배정", "인테리어 업체 연결", "법률/세무 상담"],
  },
  {
    icon: Users,
    title: "양도양수 중개 서비스",
    description: "투명하고 안전한 양도양수 절차로 원하는 조건에 맞는 거래를 성사시켜 드립니다.",
    features: ["실매물만 취급", "안전거래 시스템", "권리금 협상 대행"],
  },
];

const benefits = [
  "병점역 도보 5분 거리의 프리미엄 입지",
  "연간 15% 이상 증가하는 유동인구",
  "다양한 업종 mix로 시너지 효과",
  "충분한 주차공간 확보",
  "신축 건물의 쾌적한 환경",
  "합리적인 임대 조건",
];

export default function SolutionSection() {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-purple-400 font-medium text-sm uppercase tracking-wider">
            솔루션
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            병점복합타운이 <span className="gradient-text">해답</span>입니다
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            성공적인 창업과 안전한 양도양수를 위한 완벽한 솔루션을 제공합니다.
          </p>
        </div>

        {/* 솔루션 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
            >
              {/* 아이콘 */}
              <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <solution.icon className="w-8 h-8 text-white" />
              </div>

              {/* 제목 & 설명 */}
              <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{solution.description}</p>

              {/* 기능 목록 */}
              <ul className="space-y-3">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 혜택 섹션 */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* 왼쪽: 텍스트 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-purple-400 font-medium">병점복합타운만의 특별함</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                왜 병점복합타운인가요?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 오른쪽: CTA */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="p-8 rounded-2xl bg-black/50 border border-purple-500/30">
                <p className="text-2xl font-bold text-white mb-2">
                  지금 바로 시작하세요
                </p>
                <p className="text-gray-400 mb-6">
                  무료 상담으로 맞춤 솔루션을 받아보세요
                </p>
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="gradient-purple text-white px-8 py-6 rounded-full text-lg hover:scale-105 transition-transform w-full"
                >
                  무료 상담 신청
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
