/**
 * AI 대화식 구독 파서 (Groq API)
 * 사용자가 "넷플릭스, 유튜브 프리미엄" 같이 말하면 자동으로 구독 인식
 */

// Groq SDK import (환경 변수 필요: GROQ_API_KEY)
// import Groq from 'groq-sdk';

export interface ParsedSubscription {
  serviceName: string;
  planName?: string;
  confidence: number; // 0-1
}

export interface ConversationResponse {
  message: string;
  parsedSubscriptions: ParsedSubscription[];
  readyToComplete: boolean;
}

/**
 * Groq API로 사용자 입력 파싱
 */
export async function parseUserMessage(userMessage: string): Promise<ConversationResponse> {
  try {
    // TODO: Groq API 설정 후 주석 해제
    // const groq = new Groq({
    //   apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
    // });

    const prompt = `You are a subscription service assistant. The user is telling you about their subscriptions in Korean.

User message: "${userMessage}"

Extract subscription services mentioned. Common services:
- Netflix (넷플릭스)
- YouTube Premium (유튜브 프리미엄)
- Disney+ (디즈니플러스)
- Spotify (스포티파이)
- Apple Music (애플 뮤직)
- Wavve (웨이브)
- Tving (티빙)

Respond in JSON format:
{
  "message": "friendly Korean response acknowledging the subscriptions",
  "parsedSubscriptions": [
    {
      "serviceName": "서비스명",
      "planName": "플랜명 (선택사항)",
      "confidence": 0.95
    }
  ],
  "readyToComplete": true/false (true if user says "끝", "그만", "정리" etc)
}`;

    // TODO: Groq API 호출
    /*
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful subscription service assistant. Always respond in valid JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(responseText);

    return {
      message: parsed.message || '말씀하신 구독 서비스를 확인했어요!',
      parsedSubscriptions: parsed.parsedSubscriptions || [],
      readyToComplete: parsed.readyToComplete || false,
    };
    */

    // 임시: 간단한 키워드 매칭 (Groq API 설정 전)
    const subscriptions: ParsedSubscription[] = [];
    const services = [
      { keywords: ['넷플릭스', 'netflix'], name: 'Netflix' },
      { keywords: ['유튜브', 'youtube'], name: 'YouTube Premium' },
      { keywords: ['디즈니', 'disney'], name: 'Disney+' },
      { keywords: ['스포티파이', 'spotify'], name: 'Spotify' },
      { keywords: ['웨이브', 'wavve'], name: 'Wavve' },
      { keywords: ['티빙', 'tving'], name: 'Tving' },
    ];

    const lowercaseMessage = userMessage.toLowerCase();
    for (const service of services) {
      if (service.keywords.some((kw) => lowercaseMessage.includes(kw))) {
        subscriptions.push({
          serviceName: service.name,
          confidence: 0.9,
        });
      }
    }

    const endKeywords = ['끝', '그만', '정리', '완료', '됐어', '됐습니다'];
    const readyToComplete = endKeywords.some((kw) => lowercaseMessage.includes(kw));

    let message = '';
    if (subscriptions.length > 0) {
      message = `${subscriptions.map((s) => s.serviceName).join(', ')} 확인했어요! 다른 구독 서비스도 사용하시나요? 😊`;
    } else if (readyToComplete) {
      message = '구독 정보를 정리해드릴게요!';
    } else {
      message = '어떤 구독 서비스를 사용하시는지 말씀해주세요. (예: 넷플릭스, 유튜브 프리미엄)';
    }

    return {
      message,
      parsedSubscriptions: subscriptions,
      readyToComplete,
    };
  } catch (error) {
    console.error('[ConversationParser] Error:', error);
    return {
      message: '죄송해요, 잘 이해하지 못했어요. 다시 말씀해주시겠어요?',
      parsedSubscriptions: [],
      readyToComplete: false,
    };
  }
}
