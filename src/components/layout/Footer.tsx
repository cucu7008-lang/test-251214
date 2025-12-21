'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* 회사 정보 */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 text-lg mb-4">상가다이찌</h3>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>
              <span className="font-medium">주소:</span> 경기도 화성시 병점동 123-45
              병점복합타운
            </p>
            <p>
              <span className="font-medium">전화:</span>{' '}
              <a
                href="tel:1588-0000"
                className="hover:text-blue-600 transition-colors"
              >
                1588-0000
              </a>
            </p>
            <p>
              <span className="font-medium">이메일:</span>{' '}
              <a
                href="mailto:contact@sangadaiji.com"
                className="hover:text-blue-600 transition-colors"
              >
                contact@sangadaiji.com
              </a>
            </p>
            <p>
              <span className="font-medium">사업자등록번호:</span> 123-45-67890
            </p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Copyright {currentYear} 상가다이찌. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
