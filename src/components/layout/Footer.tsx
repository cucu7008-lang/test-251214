'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12 py-16 lg:py-20 relative z-10">
        {/* 회사 정보 */}
        <div className="mb-10">
          <h3 className="font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent text-xl lg:text-2xl mb-6 tracking-tight">
            병점역광장부동산공인중개사사무소
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-base lg:text-lg">
            <div className="space-y-3">
              <p className="leading-relaxed group hover:translate-x-2 transition-transform duration-200">
                <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">주소:</span> 경기도 화성시 병점노을4로19, 골든스퀘어 I 109-1호
              </p>
              <p className="leading-relaxed group hover:translate-x-2 transition-transform duration-200">
                <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">대표:</span> 전화룡
              </p>
              <p className="leading-relaxed group hover:translate-x-2 transition-transform duration-200">
                <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">전화번호:</span>{' '}
                <a
                  href="tel:010-5533-3214"
                  className="relative inline-block hover:text-blue-600 transition-all duration-300 font-medium group"
                >
                  <span className="relative z-10">010-5533-3214</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </p>
            </div>
            <div className="space-y-3">
              <p className="leading-relaxed group hover:translate-x-2 transition-transform duration-200">
                <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">등록번호:</span> 41590-2024-10018
              </p>
              <p className="leading-relaxed group hover:translate-x-2 transition-transform duration-200">
                <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">이메일:</span>{' '}
                <a
                  href="mailto:td5875@naver.com"
                  className="relative inline-block hover:text-blue-600 transition-all duration-300 font-medium group"
                >
                  <span className="relative z-10">td5875@naver.com</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </p>
              <p className="leading-relaxed group hover:translate-x-2 transition-transform duration-200">
                <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">사업자등록번호:</span> 625-10-00813
              </p>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-10 border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent">
          <p className="text-center text-base lg:text-lg font-medium bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            Copyright {currentYear} 병점역광장부동산공인중개사사무소. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
