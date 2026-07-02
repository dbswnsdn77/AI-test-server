import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userInput } = await request.json();

    // 1. Google Gen AI 클라이언트 초기화 (환경변수의 키를 자동으로 가져옵니다)
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // 2. 사용자가 입력한 내용에 특정 내용 덧붙이기 (예: 요약 및 번역 요청 등)
    const systemPrompt = "다음 사용자의 입력 내용을 친절하고 정중한 답변 톤으로 다듬어서 설명해줘:\n\n";
    const fullPrompt = `${systemPrompt}${userInput}`;

    // 3. Gemini 모델 호출 (최신 고속 모델인 gemini-2.5-flash 사용)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    // 4. 결과를 프론트엔드로 반환
    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'AI 답변을 생성하는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}