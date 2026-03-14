/**
 * 뿌리오(PPURIO) SMS/알림톡 발송 API 클라이언트
 *
 * API 문서: https://www.ppurio.com/
 */

interface PpurioConfig {
  account: string; // 뿌리오 계정
  apiKey: string; // API 키
}

interface SMSParams {
  from: string; // 발신번호 (등록된 번호만 가능)
  to: string; // 수신번호
  message: string; // 메시지 내용
  refKey?: string; // 참조 키 (선택)
}

interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * 뿌리오 SMS 발송
 */
export async function sendSMS(params: SMSParams): Promise<SMSResponse> {
  const config: PpurioConfig = {
    account: process.env.PPURIO_ACCOUNT || '',
    apiKey: process.env.PPURIO_API_KEY || '',
  };

  // 환경변수 확인
  if (!config.account || !config.apiKey) {
    console.warn('⚠️ PPURIO_ACCOUNT or PPURIO_API_KEY is missing. SMS will NOT be sent.');
    return { success: false, error: 'PPURIO configuration missing' };
  }

  try {
    // 비즈뿌리오 API 엔드포인트
    const apiUrl = 'https://api.bizppurio.com/v1/message';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        account: config.account,
        from: params.from,
        to: params.to,
        content: params.message,
        refKey: params.refKey,
        type: 'SMS', // SMS, LMS, MMS 중 선택
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ PPURIO SMS sent successfully:', data);
      return { success: true, messageId: data.messageId };
    } else {
      console.error('❌ PPURIO SMS send failed:', data);
      return { success: false, error: data.message || 'SMS send failed' };
    }
  } catch (error) {
    console.error('❌ PPURIO SMS error:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * 문의 접수 시 관리자에게 SMS 알림 발송
 */
export async function sendContactNotificationSMS(inquiry: {
  name: string;
  phone: string;
  storeName?: string;
}) {
  const fromNumber = process.env.PPURIO_SENDER_NUMBER || ''; // 발신번호 (뿌리오에 등록된 번호)
  const adminPhones = process.env.CONTACT_SMS_RECIPIENTS?.split(',') || []; // 관리자 전화번호들

  if (!fromNumber || adminPhones.length === 0) {
    console.warn('⚠️ PPURIO_SENDER_NUMBER or CONTACT_SMS_RECIPIENTS is missing.');
    return { success: false, error: 'SMS configuration incomplete' };
  }

  // SMS 메시지 작성
  const message = `[세모폰 문의 접수]
고객명: ${inquiry.name}
연락처: ${inquiry.phone}${inquiry.storeName ? `\n매장: ${inquiry.storeName}` : ''}

빠른 응대 부탁드립니다.`;

  // 각 관리자 번호로 SMS 발송
  const results = await Promise.all(
    adminPhones.map(async (adminPhone) => {
      const cleanPhone = adminPhone.trim().replace(/\D/g, '');
      return sendSMS({
        from: fromNumber,
        to: cleanPhone,
        message: message,
        refKey: `contact_${Date.now()}`,
      });
    })
  );

  const allSuccess = results.every(r => r.success);

  if (allSuccess) {
    console.log('✅ All admin SMS notifications sent successfully');
    return { success: true };
  } else {
    console.error('❌ Some admin SMS notifications failed:', results);
    return { success: false, results };
  }
}

/**
 * 알림톡 발송 (카카오 알림톡)
 *
 * 뿌리오는 카카오 알림톡도 지원합니다.
 * 알림톡 사용을 위해서는:
 * 1. 카카오 비즈니스 채널 생성
 * 2. 뿌리오에서 알림톡 템플릿 등록 및 승인
 * 3. 템플릿 코드 발급
 */
export async function sendAlimtalk(params: {
  templateCode: string; // 등록된 템플릿 코드
  to: string; // 수신번호
  variables: Record<string, string>; // 템플릿 변수들
}): Promise<SMSResponse> {
  const config: PpurioConfig = {
    account: process.env.PPURIO_ACCOUNT || '',
    apiKey: process.env.PPURIO_API_KEY || '',
  };

  if (!config.account || !config.apiKey) {
    console.warn('⚠️ PPURIO configuration missing for Alimtalk.');
    return { success: false, error: 'PPURIO configuration missing' };
  }

  try {
    const apiUrl = 'https://api.bizppurio.com/v1/alimtalk';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        account: config.account,
        to: params.to,
        templateCode: params.templateCode,
        variables: params.variables,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ PPURIO Alimtalk sent successfully:', data);
      return { success: true, messageId: data.messageId };
    } else {
      console.error('❌ PPURIO Alimtalk send failed:', data);
      return { success: false, error: data.message || 'Alimtalk send failed' };
    }
  } catch (error) {
    console.error('❌ PPURIO Alimtalk error:', error);
    return { success: false, error: String(error) };
  }
}
