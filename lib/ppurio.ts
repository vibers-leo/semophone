/**
 * 뿌리오(PPURIO) 알림톡/SMS 발송 API 클라이언트
 * 엔드포인트: https://message.ppurio.com
 * 알림톡 우선, 실패 시 SMS 자동 폴백 (resend 필드)
 */

const PPURIO_API_URL = 'https://message.ppurio.com';

interface PpurioConfig {
  account: string;
  apiKey: string;
}

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface TokenResponse {
  token: string;
  type: string;
  expired: string;
}

/** Access Token 발급 (Basic Auth → Bearer Token) */
async function getToken(config: PpurioConfig): Promise<string> {
  const basicAuth = Buffer.from(`${config.account}:${config.apiKey}`).toString('base64');
  const res = await fetch(`${PPURIO_API_URL}/v1/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${basicAuth}` },
  });
  if (!res.ok) throw new Error(`Token error: ${res.status} ${await res.text()}`);
  return ((await res.json()) as TokenResponse).token;
}

function generateRefKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * 카카오 알림톡 발송 (실패 시 SMS 자동 폴백)
 * 엔드포인트: POST /v1/kakao
 * messageType: ALT (알림톡)
 */
export async function sendAlimtalk(params: {
  to: string;
  changeWord: Record<string, string>; // 템플릿 변수 {"1": "값1", "2": "값2"}
  smsFailoverContent?: string;        // SMS 폴백 메시지
}): Promise<SendResult> {
  const config: PpurioConfig = {
    account: process.env.PPURIO_ACCOUNT || '',
    apiKey: process.env.PPURIO_API_KEY || '',
  };
  const senderProfile = process.env.PPURIO_SENDER_PROFILE || '';
  const templateCode = process.env.PPURIO_TEMPLATE_CODE || '';
  const senderNumber = process.env.PPURIO_SENDER_NUMBER || '';

  if (!config.account || !config.apiKey) {
    return { success: false, error: 'PPURIO 계정 설정 누락' };
  }
  if (!senderProfile || !templateCode) {
    console.warn('⚠️ PPURIO_SENDER_PROFILE 또는 PPURIO_TEMPLATE_CODE 미설정 — SMS 폴백 시도');
    // 알림톡 불가 → SMS 직접 발송
    if (params.smsFailoverContent && senderNumber) {
      return sendSMS({ from: senderNumber, to: params.to, message: params.smsFailoverContent });
    }
    return { success: false, error: '알림톡 템플릿 미설정' };
  }

  try {
    const token = await getToken(config);
    const refKey = generateRefKey();

    const body: Record<string, unknown> = {
      account: config.account,
      messageType: 'ALT',
      senderProfile,
      templateCode,
      duplicateFlag: 'Y',
      isResend: 'Y',
      targetCount: 1,
      targets: [{ to: params.to, name: 'Customer', changeWord: params.changeWord }],
      refKey,
    };

    // SMS 자동 폴백 설정
    if (params.smsFailoverContent && senderNumber) {
      body.resend = {
        messageType: params.smsFailoverContent.length <= 90 ? 'SMS' : 'LMS',
        from: senderNumber,
        content: params.smsFailoverContent,
      };
    }

    const res = await fetch(`${PPURIO_API_URL}/v1/kakao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok) {
      console.log('✅ 알림톡 발송 성공:', data);
      return { success: true, messageId: data.messageKey };
    }
    console.error('❌ 알림톡 발송 실패:', data);
    return { success: false, error: data.description || '알림톡 발송 실패' };
  } catch (error) {
    console.error('❌ 알림톡 에러:', error);
    return { success: false, error: String(error) };
  }
}

/** SMS 발송 (폴백 전용) */
async function sendSMS(params: { from: string; to: string; message: string }): Promise<SendResult> {
  const config: PpurioConfig = {
    account: process.env.PPURIO_ACCOUNT || '',
    apiKey: process.env.PPURIO_API_KEY || '',
  };
  if (!config.account || !config.apiKey) return { success: false, error: 'PPURIO 설정 누락' };

  try {
    const token = await getToken(config);
    const messageType = params.message.length <= 90 ? 'SMS' : 'LMS';

    const res = await fetch(`${PPURIO_API_URL}/v1/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        account: config.account,
        messageType,
        from: params.from,
        content: params.message,
        duplicateFlag: 'Y',
        targetCount: 1,
        targets: [{ to: params.to, name: 'Customer' }],
        refKey: generateRefKey(),
      }),
    });
    const data = await res.json();
    if (res.ok) return { success: true, messageId: data.messageKey };
    return { success: false, error: data.description || 'SMS 발송 실패' };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

/**
 * 문의 접수 시 관리자에게 알림톡 발송
 * 알림톡 실패 시 SMS 자동 폴백 (resend 필드)
 */
export async function sendContactNotificationAlimtalk(inquiry: {
  name: string;
  phone: string;
  storeName?: string;
}) {
  const adminPhones = process.env.CONTACT_SMS_RECIPIENTS?.split(',').map(p => p.trim().replace(/\D/g, '')).filter(Boolean) || [];

  if (adminPhones.length === 0) {
    return { success: false, error: '수신자 번호 미설정' };
  }

  const smsContent = `[세모폰 문의]\n${inquiry.name} / ${inquiry.phone}${inquiry.storeName ? `\n매장: ${inquiry.storeName}` : ''}\n빠른 응대 부탁드립니다.`;

  const results = await Promise.all(
    adminPhones.map(phone =>
      sendAlimtalk({
        to: phone,
        changeWord: {
          '1': inquiry.name,
          '2': inquiry.phone,
          '3': inquiry.storeName || '일반문의',
        },
        smsFailoverContent: smsContent,
      })
    )
  );

  const anySuccess = results.some(r => r.success);
  if (anySuccess) {
    console.log('✅ 관리자 알림 발송 완료');
    return { success: true };
  }
  console.error('❌ 관리자 알림 전체 실패:', results);
  return { success: false, results };
}
