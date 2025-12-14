"use client";

import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "김영희",
    role: "카페 창업자",
    content: "처음 창업이라 걱정이 많았는데, 병점복합타운 컨설턴트분이 처음부터 끝까지 꼼꼼하게 도와주셔서 무사히 오픈할 수 있었어요. 특히 상권 분석 자료가 정말 도움이 많이 됐습니다.",
    rating: 5,
    business: "카페 운영 6개월차",
  },
  {
    name: "박민수",
    role: "음식점 양도",
    content: "3년간 운영하던 식당을 양도하게 됐는데, 복잡한 절차를 대행해주시고 적정 권리금도 받을 수 있었습니다. 새로운 사업 시작에 큰 도움이 됐어요.",
    rating: 5,
    business: "양도 완료",
  },
  {
    name: "이지은",
    role: "네일샵 운영",
    content: "역세권이라 유동인구가 정말 많아요. 주변에 다양한 업종이 있어서 시너지 효과도 나고, 무엇보다 주차장이 넓어서 고객분들이 편하게 오실 수 있어요.",
    rating: 5,
    business: "네일샵 운영 1년차",
  },
  {
    name: "최준혁",
    role: "사무실 임대",
    content: "신축 건물이라 시설이 깨끗하고 관리도 잘 되어 있습니다. 합리적인 임대료에 이 정도 퀄리티면 정말 만족스럽습니다. 직원들도 출퇴근이 편해 좋아합니다.",
    rating: 5,
    business: "IT 스타트업 대표",
  },
];

const stats = [
  { number: "98%", label: "고객 만족도" },
  { number: "150+", label: "성공 창업 사례" },
  { number: "50+", label: "양도양수 성사" },
  { number: "24시간", label: "상담 응대" },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-purple-400 font-medium text-sm uppercase tracking-wider">
            고객 후기
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            실제 고객님들의 <span className="gradient-text">생생한 후기</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            병점복합타운과 함께한 분들의 진솔한 이야기를 들어보세요.
          </p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 후기 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* 인용 아이콘 */}
              <Quote className="w-10 h-10 text-purple-500/30 mb-4" />

              {/* 내용 */}
              <p className="text-gray-300 leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* 별점 */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* 작성자 정보 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
