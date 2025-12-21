"use client";

import { CheckCircle2, Sparkles, Home, Building, TrendingUp, FileText, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Building,
    title: "상가 및 사무실 전문 중개",
    description: "상가, 사무실, 오피스텔 등 상업용 부동산 매매 및 임대차 계약을 투명하고 신속하게 진행합니다.",
    features: ["상권 분석 제공", "권리금 협상 대행", "계약서 안전 검토"],
  },
  {
    icon: Home,
    title: "매매·전월세 중개",
    description: "아파트, 빌라, 주택 등 주거용 부동산 매매 및 전월세 계약을 안전하고 신속하게 진행합니다.",
    features: ["시세 정확도 100% 도전", "법률자문 포함", "임대차 컨설팅"],
  },
  {
    icon: TrendingUp,
    title: "부동산 투자 상담",
    description: "다년간의 경험으로 최적의 투자 타이밍과 물건을 추천. 안전한 자산 증식을 도와드립니다.",
    features: ["시장 동향 분석", "수익률 시뮬레이션", "세금 절감 전략"],
  },
];

const benefits = [
  "공인중개사 자격증 보유 전문가",
  "병점역 5분 거리 골든스퀘어 I 위치",
  "다년간 부동산 중개 경험",
  "투명한 수수료 체계",
  "계약 후 사후관리 서비스",
  "법무사·세무사 네트워크 연계",
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
          <span className="text-yellow-400 font-medium text-sm uppercase tracking-wider">
            전문 서비스
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            병점역광장부동산의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">전문 솔루션</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            매매부터 투자 상담까지, 모든 부동산 거래를 안전하고 투명하게 진행합니다.
          </p>
        </div>

        {/* 솔루션 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 group"
            >
              {/* 아이콘 */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <solution.icon className="w-8 h-8 text-black" />
              </div>

              {/* 제목 & 설명 */}
              <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{solution.description}</p>

              {/* 기능 목록 */}
              <ul className="space-y-3">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 혜택 섹션 */}
        <div className="rounded-3xl bg-gradient-to-br from-yellow-900/30 to-black border border-yellow-500/20 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* 왼쪽: 텍스트 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-medium">병점역광장부동산만의 특별함</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                왜 병점역광장부동산인가요?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 오른쪽: CTA */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="p-8 rounded-2xl bg-black/50 border border-yellow-500/30">
                <p className="text-2xl font-bold text-white mb-2">
                  지금 바로 상담하세요
                </p>
                <p className="text-gray-400 mb-6">
                  무료 상담으로 최적의 매물을 찾아보세요
                </p>
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8 py-6 rounded-full text-lg hover:scale-105 transition-transform w-full"
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
