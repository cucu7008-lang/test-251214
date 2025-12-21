'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* 회사 정보 */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 text-lg mb-4">병점역광장부동산공인중개사사무소</h3>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>
              <span className="font-medium">주소:</span> 경기도 화성시 병점노을4로19, 골든스퀘어 I 109-1호
            </p>
            <p>
              <span className="font-medium">대표:</span> 전화룡
            </p>
            <p>
              <span className="font-medium">전화번호:</span>{' '}
              <a
                href="tel:010-5533-3214"
                className="hover:text-blue-600 transition-colors"
              >
                010-5533-3214
              </a>
            </p>
            <p>
              <span className="font-medium">등록번호:</span> 41590-2024-10018
            </p>
            <p>
              <span className="font-medium">이메일:</span>{' '}
              <a
                href="mailto:td5875@naver.com"
                className="hover:text-blue-600 transition-colors"
              >
                td5875@naver.com
              </a>
            </p>
            <p>
              <span className="font-medium">사업자등록번호:</span> 625-10-00813
            </p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Copyright {currentYear} 병점역광장부동산공인중개사사무소. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
