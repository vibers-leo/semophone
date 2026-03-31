import { Resend } from 'resend';

export interface ContactInquiry {
  name: string;
  phone: string;
  email?: string;
  message: string;
  storeName?: string;
  type?: string; // 'job_application' | 'job_inquiry' | 'partnership' | undefined
  resumeUrl?: string;
  resumeFileName?: string;
}

// 문의 유형별 제목 & 레이블
function getInquiryLabel(type?: string): { subject: string; badge: string } {
  switch (type) {
    case 'job_application':
      return { subject: `[세모폰 채용접수] ${'{name}'}님 지원서`, badge: '채용 지원' };
    case 'job_inquiry':
      return { subject: `[세모폰 채용문의] ${'{name}'}님`, badge: '채용 문의' };
    case 'partnership':
      return { subject: `[세모폰 협력문의] ${'{name}'}님`, badge: '협력 문의' };
    default:
      return { subject: `[세모폰 문의] ${'{name}'}님`, badge: '고객 문의' };
  }
}

/**
 * 문의 접수 시 관리자에게 이메일 알림 발송 (Resend 사용)
 * TO: admin@semophone.co.kr (CONTACT_TO_EMAIL 환경변수)
 * BCC: designd@designd.co.kr, juuuno@naver.com, juuuno1116@gmail.com
 */
export async function sendContactNotification(inquiry: ContactInquiry) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY is missing. Email will NOT be sent.');
    return { success: false, error: 'RESEND_API_KEY missing' };
  }

  const resend = new Resend(resendApiKey);

  const formatPhone = (num: string) => {
    if (!num) return '';
    const cleaned = ('' + num).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) return `${match[1]}-${match[2]}-${match[3]}`;
    return num;
  };

  const formattedPhone = formatPhone(inquiry.phone);

  // TO: 세모폰 메인 수신 (환경변수 우선, 없으면 admin@semophone.co.kr)
  const toEmail = process.env.CONTACT_TO_EMAIL || 'admin@semophone.co.kr';

  // BCC: 고정 3곳 (숨은참조)
  const bccEmails = ['designd@designd.co.kr', 'juuuno@naver.com', 'juuuno1116@gmail.com'];

  // 발신자
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  // 문의 유형별 제목 & 배지
  const { badge } = getInquiryLabel(inquiry.type);
  const subjectLabel = (() => {
    switch (inquiry.type) {
      case 'job_application': return `[세모폰 채용접수] ${inquiry.name}님 지원서`;
      case 'job_inquiry':     return `[세모폰 채용문의] ${inquiry.name}님`;
      case 'partnership':     return `[세모폰 협력문의] ${inquiry.name}님`;
      default:                return `[세모폰 문의] ${inquiry.name}님 - ${inquiry.storeName || '일반'} 문의`;
    }
  })();

  console.log('📧 Sending email to:', toEmail, '| BCC:', bccEmails);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      bcc: bccEmails,
      subject: subjectLabel,
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #FEE500; padding: 20px; text-align: center;">
            <p style="color: #737373; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">세모폰 홈페이지</p>
            <h2 style="color: #1A1A1A; margin: 0; font-size: 18px; font-weight: 900;">${badge} 접수</h2>
          </div>

          <div style="padding: 24px;">
            <div style="margin-bottom: 24px;">
              <p style="color: #737373; font-size: 12px; margin-bottom: 4px;">접수일시</p>
              <p style="color: #404040; margin: 0; font-size: 14px;">${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
            </div>

            <div style="background-color: #FAF9F7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 13px; width: 80px; vertical-align: top;">이름</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;">${inquiry.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 13px; vertical-align: top;">연락처</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;">
                    <a href="tel:${inquiry.phone}" style="color: #1A1A1A; text-decoration: none;">${formattedPhone}</a>
                  </td>
                </tr>
                ${inquiry.storeName ? `
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 13px; vertical-align: top;">분류</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">${inquiry.storeName}</td>
                </tr>` : ''}
                ${inquiry.email ? `
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 13px; vertical-align: top;">이메일</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${inquiry.email}" style="color: #1A1A1A;">${inquiry.email}</a>
                  </td>
                </tr>` : ''}
              </table>
            </div>

            <div>
              <p style="color: #737373; font-size: 13px; margin-bottom: 8px;">내용</p>
              <div style="background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #404040; line-height: 1.7; white-space: pre-wrap; font-size: 14px;">${inquiry.message}</div>
            </div>

            ${inquiry.resumeUrl ? `
            <div style="margin-top: 20px; padding: 16px; background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
              <div>
                <p style="color: #92400E; font-size: 12px; font-weight: bold; margin: 0 0 4px;">📎 이력서 첨부됨</p>
                <p style="color: #78350F; font-size: 13px; margin: 0 0 8px;">${inquiry.resumeFileName || '이력서'}</p>
                <a href="${inquiry.resumeUrl}" target="_blank" style="display: inline-block; background-color: #FEE500; color: #1A1A1A; font-weight: bold; font-size: 13px; padding: 8px 16px; border-radius: 6px; text-decoration: none;">이력서 다운로드 →</a>
              </div>
            </div>` : ''}

            <div style="margin-top: 32px; text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #b0b0b0; font-size: 11px; margin: 0;">세모폰 홈페이지(semophone.co.kr)에서 자동 발송된 메일입니다.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend email error:', error);
      return { success: false, error };
    }

    console.log('✅ Email sent via Resend:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return { success: false, error };
  }
}
