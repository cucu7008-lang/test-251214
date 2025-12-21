import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import PortfolioSection from "@/components/sections/PortfolioSection";
import NewsSection from "@/components/sections/NewsSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import AIChatbot from "@/components/chatbot/AIChatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero 섹션 - 강렬한 헤드라인과 CTA */}
      <HeroSection />

      {/* 문제 제기 섹션 */}
      <ProblemSection />

      {/* 솔루션 & 혜택 섹션 */}
      <SolutionSection />

      {/* 상품 쇼케이스 섹션 */}
      <ProductsShowcase />

      {/* 3D 매물 갤러리 섹션 */}
      <PortfolioSection />

      {/* 실시간 부동산 뉴스 섹션 */}
      <NewsSection />

      {/* 고객 후기 섹션 */}
      <TestimonialSection />

      {/* 상담 신청 폼 섹션 */}
      <ContactFormSection />

      {/* AI 챗봇 */}
      <AIChatbot />
    </main>
  );
}
