import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function FooterSection() {
  // 정적 연도 값 사용 (hydration mismatch 방지)
  const currentYear = 2025;

  return (
    <footer className="py-16 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">병점복합타운</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              예비창업자와 상가 운영자를 위한<br />
              프리미엄 상업공간 솔루션을 제공합니다.
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>031-546-8787</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>cucu7008@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>경기도 화성시 병점노을4로 19 1층 109-1호</span>
              </li>
            </ul>
          </div>

          {/* 운영시간 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">운영시간</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>평일 9:00 ~ 20:00</span>
              </li>
              <li className="text-gray-400 text-sm pl-7">토요일 9:00~ 20:00</li>
              <li className="text-gray-400 text-sm pl-7">일요일/공휴일 휴무</li>
            </ul>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">바로가기</h4>
            <ul className="space-y-3">
              <li>
                <a href="#benefits" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                  혜택 안내
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                  고객 후기
                </a>
              </li>
              <li>
                <a href="#contact-form" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                  상담 신청
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} 병점복합타운. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 text-sm hover:text-purple-400 transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-purple-400 transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
