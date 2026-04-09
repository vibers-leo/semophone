import nodemailer from 'nodemailer';

export interface ContactInquiry {
  name: string;
  phone: string;
  email?: string;
  message: string;
  storeName?: string;
  type?: string; // 'job_application' | 'job_inquiry' | 'partnership' | undefined
  resumeUrl?: string;
  resumeFileName?: string;
  ncpResumeUrl?: string;
}

// 문의 유형별 제목 & 배지
function getInquiryLabel(inquiry: ContactInquiry): { subject: string; badge: string } {
  switch (inquiry.type) {
    case 'job_application':
      return { subject: `[세모폰 채용접수] ${inquiry.name}님 지원서`, badge: '채용 지원' };
    case 'job_inquiry':
      return { subject: `[세모폰 채용문의] ${inquiry.name}님`, badge: '채용 문의' };
    case 'partnership':
      return { subject: `[세모폰 협력문의] ${inquiry.name}님`, badge: '협력 문의' };
    default:
      return { subject: `[세모폰 문의] ${inquiry.name}님 - ${inquiry.storeName || '일반'} 문의`, badge: '고객 문의' };
  }
}

/**
 * 문의 접수 시 관리자/클라이언트에게 이메일 알림 (Gmail nodemailer)
 * TO: 슈퍼어드민 6명 + 클라이언트 1명
 */
export async function sendContactNotification(inquiry: ContactInquiry) {
  const gmailUser = process.env.EMAIL_USER;
  const gmailPass = process.env.EMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.warn('⚠️ EMAIL_USER 또는 EMAIL_APP_PASSWORD 없음 — 이메일 발송 스킵');
    return { success: false, error: 'Gmail credentials missing' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  });

  const formatPhone = (num: string) => {
    const cleaned = num.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : num;
  };

  const { subject, badge } = getInquiryLabel(inquiry);

  // 수신자: 슈퍼어드민 + 클라이언트
  const recipients = [
    'juuuno@naver.com',
    'juuuno1116@gmail.com',
    'designd@designd.co.kr',
    'duscontactus@gmail.com',
    'designdlab@designdlab.co.kr',
    'vibers.leo@gmail.com',
    'ssjg1185@daum.net',
  ];

  const html = `
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
                <a href="tel:${inquiry.phone}" style="color: #1A1A1A; text-decoration: none;">${formatPhone(inquiry.phone)}</a>
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
        <div style="margin-top: 20px; padding: 16px; background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px;">
          <p style="color: #92400E; font-size: 12px; font-weight: bold; margin: 0 0 4px;">📎 이력서 첨부됨</p>
          <p style="color: #78350F; font-size: 13px; margin: 0 0 10px;">${inquiry.resumeFileName || '이력서'}</p>
          <a href="${inquiry.resumeUrl}" target="_blank" style="display: inline-block; background-color: #FEE500; color: #1A1A1A; font-weight: bold; font-size: 13px; padding: 8px 16px; border-radius: 6px; text-decoration: none;">다운로드 →</a>
        </div>` : ''}

        <div style="margin-top: 32px; text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #b0b0b0; font-size: 11px; margin: 0;">세모폰 홈페이지(semophone.co.kr)에서 자동 발송된 메일입니다.</p>
        </div>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"세모폰 알림" <${gmailUser}>`,
      to: recipients.join(', '),
      subject,
      html,
    });

    console.log('✅ Email sent via Gmail:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Gmail 발송 실패:', error);
    return { success: false, error };
  }
}
