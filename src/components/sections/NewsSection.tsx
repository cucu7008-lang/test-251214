"use client";

import { useState, useEffect, useCallback } from "react";
import { Newspaper, ExternalLink, RefreshCw, Clock } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  link: string;
  thumbnail: string;
  source: string;
  date: string;
  summary: string;
}

interface NewsResponse {
  success: boolean;
  total: number;
  displayed: number;
  lastUpdated: string;
  news: NewsItem[];
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 뉴스 데이터 가져오기
  const fetchNews = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);

    try {
      const response = await fetch("/api/news", {
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Failed to fetch news");

      const data: NewsResponse = await response.json();

      if (data.success && data.news) {
        // 메인에 9개만 노출
        setNews(data.news.slice(0, 9));
        setLastUpdated(formatLastUpdated(data.lastUpdated));
      }
    } catch (error) {
      console.error("뉴스 로딩 실패:", error);
      // 에러 시 기본 데이터 표시
      setNews(getDefaultNews());
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // 마지막 업데이트 시간 포맷
  const formatLastUpdated = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // 기본 뉴스 데이터
  const getDefaultNews = (): NewsItem[] => [
    {
      id: 1,
      title: "서울 아파트값 3주 연속 상승...강남 재건축 주도",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "10분 전",
      summary: "서울 아파트값이 3주 연속 상승세를 이어가고 있습니다.",
    },
    {
      id: 2,
      title: "GTX-A 개통 임박...수도권 부동산 지형 변화",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "25분 전",
      summary: "GTX-A 노선 개통이 임박하면서 수도권 부동산 시장 변화 예상",
    },
    {
      id: 3,
      title: "전세사기 피해 지원 확대...정부 추가 대책 발표",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "32분 전",
      summary: "정부가 전세사기 피해자 지원을 위한 추가 대책을 발표했습니다.",
    },
    {
      id: 4,
      title: "상가 임대료 동향...핵심 상권 회복세 뚜렷",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "45분 전",
      summary: "핵심 상권의 상가 임대료가 회복세를 보이고 있습니다.",
    },
    {
      id: 5,
      title: "2024년 부동산 전망...전문가들 의견 분분",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "52분 전",
      summary: "2024년 부동산 시장 전망에 대해 전문가들의 의견이 엇갈리고 있습니다.",
    },
    {
      id: 6,
      title: "신혼부부 특별공급 확대...청약 경쟁률 완화",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "1시간 전",
      summary: "정부가 신혼부부 특별공급 물량을 확대하기로 결정했습니다.",
    },
    {
      id: 7,
      title: "지방 미분양 증가...건설사 자금난 우려",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "1시간 전",
      summary: "지방 미분양 물량이 증가하면서 건설사들의 자금난 우려가 커지고 있습니다.",
    },
    {
      id: 8,
      title: "재개발·재건축 규제 완화...정비사업 속도",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "1시간 전",
      summary: "정부가 재개발·재건축 규제를 대폭 완화하기로 결정했습니다.",
    },
    {
      id: 9,
      title: "오피스텔 투자 주의보...공실률 상승 지속",
      link: "https://news.naver.com/section/101",
      thumbnail: "",
      source: "네이버뉴스",
      date: "2시간 전",
      summary: "오피스텔 공실률이 지속적으로 상승하면서 투자자들의 주의가 필요합니다.",
    },
  ];

  // 초기 로딩 및 1시간마다 자동 업데이트
  useEffect(() => {
    fetchNews();

    // 1시간(3600000ms)마다 자동 업데이트
    const interval = setInterval(() => {
      fetchNews();
    }, 3600000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  // 수동 새로고침
  const handleRefresh = () => {
    fetchNews(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              실시간 부동산 뉴스
            </h2>
          </div>
          <p className="text-gray-400 text-lg">
            1시간마다 자동 업데이트되는 네이버 최신 뉴스
          </p>

          {/* 마지막 업데이트 시간 & 새로고침 버튼 */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>마지막 업데이트: {lastUpdated}</span>
              </div>
            )}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-full text-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              새로고침
            </button>
          </div>
        </div>

        {/* 뉴스 그리드 */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-4 animate-pulse">
                <div className="w-full h-40 bg-gray-700 rounded-lg mb-4" />
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-purple-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                {/* 썸네일 */}
                <div className="relative w-full h-40 bg-gray-700 overflow-hidden">
                  {item.thumbnail && item.thumbnail !== "/placeholder-news.jpg" ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                      <Newspaper className="w-12 h-12 text-gray-600" />
                    </div>
                  )}

                  {/* 출처 뱃지 */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                      {item.source}
                    </span>
                  </div>

                  {/* 시간 뱃지 */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-black/60 text-gray-300 text-xs rounded-full">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* 내용 */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>

                  {item.summary && (
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {item.summary}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <span>기사 읽기</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* 더보기 안내 */}
        <div className="text-center mt-10">
          <a
            href="https://news.naver.com/breakingnews/section/101/260"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
          >
            더 많은 뉴스 보기
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
