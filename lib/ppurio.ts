/**
 * 뿌리오(Ppurio) 알림톡/SMS — NCP 프록시 경유
 *
 * 세모폰 컨테이너 → NCP ppurio-proxy(:4200) → Ppurio API
 * IP 화이트리스트 우회 (팬이지와 동일 패턴)
 */

const NCP_PROXY_URL = process.env.PPURIO_PROXY_URL || 'http://172.17.0.1:4200';
const PROXY_SECRET = process.env.PPURIO_PROXY_SECRET || 'faneasy-ppurio-2026';
const PPURIO_ACCOUNT = process.env.PPURIO_ACCOUNT || 'designdlab';
const SENDER_NUMBER = process.env.PPURIO_SENDER_NUMBER || '01092493872';

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/** 전화번호 정규화 (숫자만) */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/** 카카오 알림톡 발송 (NCP 프록시 경유) */
export async function sendAlimtalk(params: {
  to: string;
  changeWord: Record<string, string>;
  smsFailoverContent?: string;
}): Promise<SendResult> {
  const senderProfile = process.env.PPURIO_SENDER_PROFILE || '';
  const templateCode = process.env.PPURIO_TEMPLATE_CODE || '';

  if (!senderProfile || !templateCode) {
    console.warn('⚠️ PPURIO_SENDER_PROFILE 또는 PPURIO_TEMPLATE_CODE 미설정 — SMS 폴백 시도');
    if (params.smsFailoverContent) {
      return sendSmsViaAlimtalk(params.to, params.smsFailoverContent);
    }
    return { success: false, error: '알림톡 템플릿 미설정' };
  }

  try {
    const payload: Record<string, unknown> = {
      account: PPURIO_ACCOUNT,
      messageType: 'ALT',
      senderProfile,
      templateCode,
      duplicateFlag: 'Y',
      targetCount: 1,
      targets: [{ to: normalizePhone(params.to), name: 'Customer', changeWord: params.changeWord }],
      refKey: `SEMO_${Date.now()}`,
      isResend: 'N',
    };

    // 알림톡 실패 시 SMS 폴백
    if (params.smsFailoverContent) {
      payload.isResend = 'Y';
      payload.resend = {
        messageType: params.smsFailoverContent.length <= 90 ? 'SMS' : 'LMS',
        from: normalizePhone(SENDER_NUMBER),
        content: params.smsFailoverContent,
      };
    }

    const res = await fetch(`${NCP_PROXY_URL}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: PROXY_SECRET, payload }),
    });
    const data = await res.json();

    if (data.code === '1000') {
      console.log('✅ 알림톡 발송 성공:', data.messageKey);
      return { success: true, messageId: data.messageKey };
    }
    console.error('❌ 알림톡 발송 실패:', data);
    return { success: false, error: data.description || data.error || '알림톡 발송 실패' };
  } catch (error) {
    console.error('❌ 알림톡 에러:', error);
    return { success: false, error: String(error) };
  }
}

/** SMS 단독 발송 (알림톡 대체 발송 경로 활용) */
async function sendSmsViaAlimtalk(to: string, content: string): Promise<SendResult> {
  try {
    // 프록시에 SMS 전용 엔드포인트가 없으므로, 알림톡 대체발송(isResend) 패턴 사용 불가
    // 직접 Ppurio API 호출 시도 (NCP IP에서 호출이므로 통과 가능)
    const account = PPURIO_ACCOUNT;
    const apiKey = process.env.PPURIO_API_KEY || '';
    if (!apiKey) return { success: false, error: 'PPURIO_API_KEY 미설정' };

    const basicAuth = Buffer.from(`${account}:${apiKey}`).toString('base64');
    const tokenRes = await fetch('https://message.ppurio.com/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${basicAuth}` },
    });
    if (!tokenRes.ok) return { success: false, error: `Token error: ${tokenRes.status}` };
    const { token } = await tokenRes.json();

    const messageType = Buffer.byteLength(content, 'utf-8') <= 90 ? 'SMS' : 'LMS';
    const res = await fetch('https://message.ppurio.com/v1/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        account,
        messageType,
        from: normalizePhone(SENDER_NUMBER),
        content,
        duplicateFlag: 'Y',
        targetCount: 1,
        targets: [{ to: normalizePhone(to) }],
        refKey: `SEMO_SMS_${Date.now()}`,
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
 * 알림톡 실패 시 SMS 자동 폴백
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
