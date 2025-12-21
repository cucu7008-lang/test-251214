import { MapPin, Phone, Mail, Building2, Hash, User, FileText, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

// 네이버 블로그 아이콘 SVG
const NaverBlogIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.273 12.845L7.376 0H0v24h7.726l8.898-12.845L24 24V0h-7.727z"/>
  </svg>
);

export default function FooterSection() {
  // 정적 연도 값 사용 (hydration mismatch 방지)
  const currentYear = 2025;

  return (
    <footer className="relative py-16 bg-gradient-to-b from-black via-gray-950 to-black border-t border-yellow-500/20">
      {/* 배경 장식 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 사무실 위치 사진 */}
        <div className="mb-12">
          <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-yellow-500/20">
            <Image
              src="/office-exterior.jpg"
              alt="병점역광장부동산 사무실 위치 - 골든스퀘어 I"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-bold text-lg">찾아오시는 길</span>
              </div>
              <p className="text-white text-sm mb-1">경기도 화성시 병점노을4로19, 골든스퀘어 I 109-1호</p>
              <p className="text-gray-300 text-sm">병점역 도보 5분 거리 | 주차 가능</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            <div className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                병점역광장부동산
              </h3>
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-transparent rounded-full mt-2" />
            </div>
            <p className="text-sm text-yellow-100/60 mb-4">
              공인중개사사무소
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              신뢰와 전문성으로<br />
              최상의 부동산 서비스를 제공합니다.
            </p>
          </div>

          {/* 연락처 정보 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
              연락처 정보
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300 text-sm group hover:text-yellow-400 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-yellow-400" />
                </div>
                <span>010-5533-3214</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm group hover:text-yellow-400 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-yellow-400" />
                </div>
                <span>td5875@naver.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm group hover:text-yellow-400 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors flex-shrink-0">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="leading-relaxed">
                  경기도 화성시 병점노을4로19,<br />
                  골든스퀘어 I 109-1호
                </span>
              </li>
            </ul>
          </div>

          {/* 사업자 정보 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
              사업자 정보
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs">대표</span>
                  <p className="text-gray-300">전화룡</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs">등록번호</span>
                  <p className="text-gray-300">41590-2024-10018</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Hash className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs">사업자등록번호</span>
                  <p className="text-gray-300">625-10-00813</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 소셜 미디어 */}
        <div className="mb-8 pb-8 border-b border-yellow-500/10">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-lg font-semibold text-white">소셜 미디어</h4>
            <div className="flex gap-4">
              <a
                href="https://blog.naver.com/td5875"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 hover:scale-110 transition-all"
                aria-label="네이버 블로그"
              >
                <NaverBlogIcon />
              </a>
              <a
                href="#instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 hover:scale-110 transition-all"
                aria-label="인스타그램"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#youtube"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 hover:scale-110 transition-all"
                aria-label="유튜브"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="pt-8 border-t border-yellow-500/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              Copyright {currentYear} <span className="text-yellow-400/80">병점역광장부동산공인중개사사무소</span>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 text-sm hover:text-yellow-400 transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-yellow-400 transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
