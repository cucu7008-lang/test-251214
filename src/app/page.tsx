import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero 섹션 - 강렬한 헤드라인과 CTA */}
      <HeroSection />

      {/* 문제 제기 섹션 */}
      <ProblemSection />

      {/* 솔루션 & 혜택 섹션 */}
      <SolutionSection />

      {/* 고객 후기 섹션 */}
      <TestimonialSection />

      {/* 상담 신청 폼 섹션 */}
      <ContactFormSection />

      {/* 푸터 */}
      <FooterSection />
    </main>
  );
}
