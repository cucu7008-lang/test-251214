"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, MessageCircle, Mail, Phone, User, Building } from "lucide-react";

type InterestType = "창업" | "양도" | "양수" | "사무실" | "기타";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "" as InterestType | "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const interestOptions: InterestType[] = ["창업", "양도", "양수", "사무실", "기타"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // 구글 앱스스크립트 웹앱 URL로 교체하세요
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

      if (!GOOGLE_SCRIPT_URL) {
        // 개발 환경에서는 콘솔에 로그만 출력
        console.log("Form submitted:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitted(true);
        return;
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      // no-cors 모드에서는 응답을 읽을 수 없으므로 성공으로 처리
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      setError("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKakaoClick = () => {
    // 카카오톡 채널 URL로 교체하세요
    window.open("https://pf.kakao.com/_xYourChannelId", "_blank");
  };

  if (isSubmitted) {
    return (
      <section id="contact-form" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              신청이 완료되었습니다!
            </h3>
            <p className="text-gray-400 mb-8">
              빠른 시일 내에 전문 상담사가 연락드리겠습니다.<br />
              감사합니다.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
            >
              다시 작성하기
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 텍스트 */}
          <div>
            <span className="text-purple-400 font-medium text-sm uppercase tracking-wider">
              무료 상담
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              지금 바로<br />
              <span className="gradient-text">무료 상담</span>을 신청하세요
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              전문 컨설턴트가 맞춤형 솔루션을 제안해 드립니다.<br />
              부담 없이 문의해 주세요.
            </p>

            {/* 연락처 정보 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">전화 상담</div>
                  <div className="font-medium">010-5533-3214</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">이메일</div>
                  <div className="font-medium">td5875@naver.com</div>
                </div>
              </div>
            </div>

            {/* 카카오톡 버튼 */}
            <Button
              onClick={handleKakaoClick}
              className="mt-8 bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD835] px-6 py-6 rounded-xl text-lg font-medium"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              카카오톡으로 문의하기
            </Button>
          </div>

          {/* 오른쪽: 폼 */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  이름 *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  연락처 *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* 관심 분야 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  관심 분야 *
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, interest: option })}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.interest === option
                          ? "bg-purple-500 text-white"
                          : "bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 문의 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  문의 내용
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                    placeholder="궁금한 점이나 원하시는 조건을 적어주세요"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* 제출 버튼 */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.phone || !formData.interest}
                className="w-full gradient-purple text-white py-6 rounded-xl text-lg font-medium hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    전송 중...
                  </>
                ) : (
                  "무료 상담 신청하기"
                )}
              </Button>

              <p className="text-center text-xs text-gray-500">
                신청하시면 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
