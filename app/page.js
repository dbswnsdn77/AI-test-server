'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await response.json();
      if (data.result) {
        setOutput(data.result);
      } else {
        setOutput(data.error || '오류가 발생했습니다.');
      }
    } catch (err) {
      setOutput('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-8">
          ✨ 나의 첫 AI 서비스 ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 중앙 입력창 */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              무엇이든 입력해보세요
            </label>
            <textarea
              rows={4}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-700"
              placeholder="여기에 내용을 입력하면 특정 질문을 덧붙여 AI에게 전송합니다..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center"
          >
            {isLoading ? (
              <span className="animate-pulse">AI가 생각하는 중...</span>
            ) : (
              '구글 AI에게 전송하기'
            )}
          </button>
        </form>

        {/* 하단 결과 출력창 */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            AI 답변 결과
          </label>
          <div className="w-full min-h-[150px] p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
            {output || (
              <span className="text-slate-500 italic">
                위에서 전송 버튼을 누르면 여기에 답변이 출력됩니다.
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}