"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Settings, Loader2, HelpCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// 부동산 전문 AI 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 "병점역광장부동산공인중개사사무소"의 전문 부동산 AI 상담사입니다.

## 중요: 첫 답변 형식
반드시 모든 답변의 시작은 "안녕하세요! 병점역광장부동산 챗봇입니다. 부동산 관련 무엇이든 물어보세요."로 시작하세요.

## 역할
- 병점복합타운 상가 및 사무실 전문 상담
- 창업 상담, 양도양수, 매물 정보 안내
- 부동산 상식 및 투자 조언 제공

## 답변 스타일
- 친절하고 전문적인 톤 유지
- 간결하고 명확한 답변 (3-4문장 이내)
- 필요시 구체적인 수치나 예시 제공
- 상담 예약 유도 (복잡한 질문은 전문 상담 권유)

## 전문 분야
1. 상가/사무실 임대 및 매매
2. 창업 아이템 추천 및 상권 분석
3. 양도양수 절차 및 주의사항
4. 부동산 계약 관련 상식
5. 병점 지역 상권 정보

## 주의사항
- 법률 자문이 필요한 경우 전문가 상담 권유
- 확실하지 않은 정보는 "확인 후 안내드리겠습니다" 응답
- 항상 "병점역광장부동산"을 통한 상담 예약 유도`;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [tempApiKey, setTempApiKey] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 로컬 스토리지에서 API 키 불러오기
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setTempApiKey(savedKey);
    }
  }, []);

  // API 키 저장
  const saveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem("gemini_api_key", tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setIsSettingsOpen(false);
    }
  };

  // Gemini API 호출
  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Gemini 2.5 Flash API 호출
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\n사용자: ${userMessage}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "API 오류가 발생했습니다.");
      }

      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "죄송합니다. 응답을 생성하지 못했습니다.";

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `오류: ${error.message}`
              : "죄송합니다. 오류가 발생했습니다. API 키를 확인해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 플로팅 챗봇 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? "hidden" : ""
        }`}
        aria-label="AI 상담 챗봇 열기"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </button>

      {/* 챗봇 창 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">병점역광장부동산 AI</h3>
                <p className="text-white/80 text-xs">부동산 전문 상담</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsGuideOpen(true)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="사용 가이드"
                title="사용 가이드"
              >
                <HelpCircle className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="API 설정"
                title="API 키 설정"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 환영 메시지 */}
            {messages.length === 0 && (
              <div className="bg-gray-800 rounded-lg p-4 text-gray-300">
                <p className="font-semibold text-white mb-2">안녕하세요! 병점역광장부동산 챗봇입니다. 👋</p>
                <p className="text-sm">
                  부동산 관련 무엇이든 물어보세요!
                  병점복합타운 상가/사무실, 창업, 양도양수, 매물 정보 등 상담해드립니다.
                </p>
                {!apiKey && (
                  <p className="text-yellow-400 text-xs mt-3">
                    ⚠️ 상담을 시작하려면 우측 상단의 ⚙️ 버튼을 눌러 API 키를 설정해주세요.
                  </p>
                )}
              </div>
            )}

            {/* 대화 메시지 */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-800 text-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* 로딩 표시 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={apiKey ? "메시지를 입력하세요..." : "API 키를 먼저 설정해주세요"}
                disabled={!apiKey || isLoading}
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!apiKey || !input.trim() || isLoading}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API 설정 모달 */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">API 키 설정</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Google Gemini API 키
                </label>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
                <p className="font-semibold text-white mb-2">API 키 발급 방법:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Google AI Studio
                    </a>
                    에 접속
                  </li>
                  <li>Google 계정으로 로그인</li>
                  <li>&quot;Create API Key&quot; 클릭</li>
                  <li>생성된 키를 복사하여 위에 붙여넣기</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={saveApiKey}
                  disabled={!tempApiKey.trim()}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 사용 가이드 모달 */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">🤖 AI 챗봇 사용 가이드</h3>
              <button
                onClick={() => setIsGuideOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6 text-gray-300">
              {/* Step 1 */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                  API 키 발급
                </h4>
                <p className="text-sm mb-2">
                  AI 상담 기능을 사용하려면 Google Gemini API 키가 필요합니다.
                </p>
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  API 키 발급받기 →
                </a>
              </div>

              {/* Step 2 */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                  API 키 입력
                </h4>
                <p className="text-sm">
                  챗봇 상단의 ⚙️ (설정) 버튼을 클릭하여 발급받은 API 키를 입력하세요.
                  키는 브라우저에 안전하게 저장됩니다.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">3</span>
                  상담 시작
                </h4>
                <p className="text-sm">
                  이제 부동산 관련 질문을 자유롭게 입력하세요!
                </p>
              </div>

              {/* 질문 예시 */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-white mb-3">💡 질문 예시</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    병점복합타운 상가 임대료가 어떻게 되나요?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    카페 창업하기 좋은 위치 추천해주세요
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    양도양수 할 때 주의할 점이 뭔가요?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    사무실 계약 시 필요한 서류는 뭔가요?
                  </li>
                </ul>
              </div>

              {/* 참고사항 */}
              <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
                <h4 className="font-bold text-yellow-400 mb-2">⚠️ 참고사항</h4>
                <ul className="space-y-1 text-sm text-yellow-200/80">
                  <li>• API 키는 무료로 발급 가능합니다</li>
                  <li>• 복잡한 상담은 전문 상담사 연결을 권장합니다</li>
                  <li>• 법률 자문은 전문가와 상담하세요</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setIsGuideOpen(false)}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
