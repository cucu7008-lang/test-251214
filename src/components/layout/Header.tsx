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
    label: '회사소개',
    href: '/about',
  },
  {
    label: '상품',
    href: '/#products',
    submenu: [
      { label: '상품 1', href: '/products/product-1' },
      { label: '상품 2', href: '/products/product-2' },
      { label: '상품 3', href: '/products/product-3' },
    ],
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
                  src="/logo.svg"
                  alt="로고"
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.submenu ? (
                    <>
                      <button
                        className="font-medium text-gray-900/90 px-3 py-2 rounded-lg hover:bg-white/20 hover:text-blue-600 transition-colors"
                        onClick={() =>
                          setActiveSubmenu(
                            activeSubmenu === item.label ? null : item.label
                          )
                        }
                      >
                        {item.label}
                      </button>
                      {/* 서브메뉴 드롭다운 */}
                      <div
                        className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        style={{
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.label}
                            href={subitem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-white/40 hover:text-blue-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-medium text-gray-900/90 px-3 py-2 rounded-lg hover:bg-white/20 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* 로그인 시 마이페이지 메뉴 추가 */}
              {session && (
                <Link
                  href="/mypage"
                  className="font-medium text-gray-900/90 px-3 py-2 rounded-lg hover:bg-white/20 hover:text-blue-600 transition-colors"
                >
                  마이페이지
                </Link>
              )}

              {/* 로그인/회원가입 또는 사용자 메뉴 */}
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">{session.user?.name || '사용자'}</span>
                  </button>

                  {/* 사용자 드롭다운 메뉴 */}
                  {showUserMenu && (
                    <div
                      className="absolute top-full right-0 mt-2 w-48 rounded-xl overflow-hidden"
                      style={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href="/mypage/profile"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/40 hover:text-blue-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        내 정보
                      </Link>
                      <Link
                        href="/mypage/orders"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/40 hover:text-blue-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        주문내역
                      </Link>
                      <Link
                        href="/mypage/settings"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/40 hover:text-blue-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        설정
                      </Link>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white/40 hover:text-red-600 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  로그인
                </Link>
              )}
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
                <div key={item.label}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveSubmenu(
                            activeSubmenu === item.label ? null : item.label
                          )
                        }
                        className="w-full text-left px-6 py-4 font-medium text-gray-900 hover:bg-white/40 transition-colors"
                      >
                        {item.label}
                      </button>
                      {activeSubmenu === item.label && (
                        <div className="bg-white/20">
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.label}
                              href={subitem.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(subitem.href);
                              }}
                              className="block px-10 py-3 text-gray-700 hover:bg-white/40 hover:text-blue-600 transition-colors"
                            >
                              {subitem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="block px-6 py-4 font-medium text-gray-900 hover:bg-white/40 transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              {/* 모바일 로그인/로그아웃 */}
              <div className="border-t border-white/20 mt-2 pt-2">
                {session ? (
                  <>
                    <div className="px-6 py-3 text-sm text-gray-600">
                      {session.user?.name || '사용자'}님
                    </div>
                    <Link
                      href="/profile"
                      onClick={toggleMenu}
                      className="block px-6 py-4 font-medium text-gray-900 hover:bg-white/40 transition-colors"
                    >
                      내 정보
                    </Link>
                    <button
                      onClick={() => {
                        toggleMenu();
                        signOut({ callbackUrl: '/' });
                      }}
                      className="w-full text-left px-6 py-4 font-medium text-red-600 hover:bg-white/40 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      로그아웃
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    onClick={toggleMenu}
                    className="block px-6 py-4 font-medium text-blue-600 hover:bg-white/40 transition-colors"
                  >
                    로그인 / 회원가입
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
