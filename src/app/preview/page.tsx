import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Story from "@/components/sections/Story";
import Products from "@/components/sections/Products";
import Offer from "@/components/sections/Offer";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 글래스모피즘 헤더 */}
      <Header />

      {/* 메인 콘텐츠 - 헤더 높이만큼 패딩 추가 */}
      <div className="pt-20">
        {/* 히어로 섹션 */}
        <Hero />

        {/* 무료혜택 섹션 */}
        <Benefits />

        {/* 스토리 섹션 */}
        <Story />

        {/* 상품 섹션 */}
        <Products />

        {/* 오퍼 섹션 */}
        <Offer />
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
