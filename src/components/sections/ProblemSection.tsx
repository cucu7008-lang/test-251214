"use client";

import { AlertCircle, Clock, Search, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "좋은 입지 찾기가 너무 어려워요",
    description: "유동인구, 임대료, 경쟁업체... 고려할 게 너무 많아 결정이 힘드시죠?",
  },
  {
    icon: Clock,
    title: "창업 준비에 시간이 너무 오래 걸려요",
    description: "상가 계약부터 인테리어까지, 복잡한 과정에 지쳐가고 계시나요?",
  },
  {
    icon: TrendingDown,
    title: "기존 상가 매출이 기대에 못 미쳐요",
    description: "열심히 운영하지만 매출이 오르지 않아 고민이신가요?",
  },
  {
    icon: AlertCircle,
    title: "양도양수 과정이 복잡해요",
    description: "현재 운영 중인 상가를 양도하고 싶지만 어디서부터 시작해야 할지 막막하신가요?",
  },
];

export default function ProblemSection() {
  return (
    <section id="problems" className="py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-purple-400 font-medium text-sm uppercase tracking-wider">
            문제 인식
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            이런 고민, 하고 계시지 않나요?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            많은 예비창업자와 상가 운영자분들이 겪는 공통적인 어려움입니다.
          </p>
        </div>

        {/* 문제점 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <problem.icon className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 강조 메시지 */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <p className="text-xl sm:text-2xl text-white font-medium">
              &quot;더 이상 혼자 고민하지 마세요.&quot;
            </p>
            <p className="text-purple-300 mt-3">
              병점복합타운이 모든 과정을 함께합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
