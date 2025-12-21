'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

interface NavItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

const navigationItems: NavItem[] = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '서비스 안내',
    href: '/#benefits',
  },
  {
    label: '상가다이찌 소개',
    href: 'https://blog.naver.com/td5875/223233920403',
  },
  {
    label: '매물정보',
    href: 'https://new.land.naver.com/complexes?ms=37.2052876,127.0300579,18&a=APT:PRE:ABYG:JGC&e=RETAIL&realtorId=td5533',
  },
  {
    label: '고객 후기',
    href: '/#testimonials',
  },
  {
    label: '상담 신청',
    href: '/#contact-form',
  },
];

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);

    // 외부 링크는 새 탭에서 열기
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    // 스무스 스크롤
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`glass-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-black/5' : 'shadow-md shadow-black/5'
        }`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-auto">
                <Image
                  src="/sangadaichi-logo.svg"
                  alt="상가다이찌 로고"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                item.href.startsWith('http') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900/90 px-3 py-2 rounded-lg hover:bg-yellow-500/10 hover:text-yellow-600 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="font-medium text-gray-900/90 px-3 py-2 rounded-lg hover:bg-yellow-500/10 hover:text-yellow-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}

              {/* 전화 상담 버튼 */}
              <a
                href="tel:010-5533-3214"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-6 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all hover:scale-105"
              >
                📞 010-5533-3214
              </a>
            </nav>

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ marginTop: '80px' }}
        >
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={toggleMenu}
          ></div>

          {/* 메뉴 패널 */}
          <div
            className="absolute top-0 left-0 right-0 mx-4 mt-4 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
            style={{
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }}
          >
            <nav className="py-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="block px-6 py-4 font-medium text-gray-900 hover:bg-yellow-500/10 hover:text-yellow-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}

              {/* 모바일 전화 상담 */}
              <div className="border-t border-white/20 mt-2 pt-2">
                <a
                  href="tel:010-5533-3214"
                  className="block px-6 py-4 font-bold text-yellow-600 hover:bg-yellow-500/10 transition-colors"
                >
                  📞 010-5533-3214
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
