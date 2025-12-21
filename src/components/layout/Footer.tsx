'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        {/* 회사 정보 */}
        <div className="mb-10">
          <h3 className="font-bold text-gray-900 text-xl lg:text-2xl mb-6 tracking-tight">
            병점역광장부동산공인중개사사무소
          </h3>
          <div className="space-y-3 text-gray-700 text-base lg:text-lg">
            <p className="leading-relaxed">
              <span className="font-semibold text-gray-900">주소:</span> 경기도 화성시 병점노을4로19, 골든스퀘어 I 109-1호
            </p>
            <p className="leading-relaxed">
              <span className="font-semibold text-gray-900">대표:</span> 전화룡
            </p>
            <p className="leading-relaxed">
              <span className="font-semibold text-gray-900">전화번호:</span>{' '}
              <a
                href="tel:010-5533-3214"
                className="hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                010-5533-3214
              </a>
            </p>
            <p className="leading-relaxed">
              <span className="font-semibold text-gray-900">등록번호:</span> 41590-2024-10018
            </p>
            <p className="leading-relaxed">
              <span className="font-semibold text-gray-900">이메일:</span>{' '}
              <a
                href="mailto:td5875@naver.com"
                className="hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                td5875@naver.com
              </a>
            </p>
            <p className="leading-relaxed">
              <span className="font-semibold text-gray-900">사업자등록번호:</span> 625-10-00813
            </p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-10 border-t-2 border-gray-300">
          <p className="text-center text-base lg:text-lg text-gray-700 font-medium">
            Copyright {currentYear} 병점역광장부동산공인중개사사무소. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
