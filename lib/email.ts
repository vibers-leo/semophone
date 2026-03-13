import nodemailer from 'nodemailer';

export interface ContactInquiry {
  name: string;
  phone: string;
  email?: string;
  message: string;
  storeName?: string; // 문의한 매장 이름
}

/**
 * 문의 접수 시 관리자에게 이메일 알림 발송
 */
export async function sendContactNotification(inquiry: ContactInquiry) {
  // Gmail SMTP 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Gmail 주소
      pass: process.env.EMAIL_APP_PASSWORD, // Gmail 앱 비밀번호
    },
  });

  // 전화번호 포맷팅 (01012345678 -> 010-1234-5678)
  const formatPhone = (num: string) => {
    if (!num) return '';
    const cleaned = ('' + num).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return num;
  };

  const formattedPhone = formatPhone(inquiry.phone);

  // 수신자 이메일 (환경변수로 관리)
  const recipientEmails = process.env.CONTACT_EMAIL_RECIPIENTS?.split(',') || ['juuuno1116@gmail.com'];

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmails.join(', '),
    subject: `[세모폰 문의] ${inquiry.name}님 - ${inquiry.storeName || '일반'} 문의`,
    html: `
      <div style="font-family: 'Apple SD Gothic Neo', -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #F2C811; padding: 20px; text-align: center;">
          <h2 style="color: #1A1A1A; margin: 0; font-size: 18px; font-weight: 900;">세모폰 고객 문의 접수</h2>
        </div>

        <div style="padding: 24px;">
          <div style="margin-bottom: 24px;">
            <p style="color: #737373; font-size: 14px; margin-bottom: 8px;">문의 정보</p>
            <h1 style="color: #1A1A1A; font-size: 24px; margin: 0; font-weight: 900;">${inquiry.storeName ? inquiry.storeName + ' 매장 문의' : '일반 문의'}</h1>
            <p style="color: #404040; margin-top: 4px;">접수일시: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
          </div>

          <div style="background-color: #FAF7F0; border-radius: 8px; padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 80px;">고객명</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;">${inquiry.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373; font-size: 14px;">연락처</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;">
                  <a href="tel:${inquiry.phone}" style="color: #1A1A1A; text-decoration: none;">${formattedPhone}</a>
                </td>
              </tr>
              ${inquiry.email ? `
              <tr>
                <td style="padding: 8px 0; color: #737373; font-size: 14px;">이메일</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-weight: bold;">
                  <a href="mailto:${inquiry.email}" style="color: #F2C811; text-decoration: none;">${inquiry.email}</a>
                </td>
              </tr>` : ''}
            </table>
          </div>

          <div style="margin-top: 24px;">
            <p style="color: #737373; font-size: 14px; margin-bottom: 8px;">문의 내용</p>
            <div style="background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #404040; line-height: 1.6; white-space: pre-wrap;">${inquiry.message}</div>
          </div>

          <div style="margin-top: 32px; text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #737373; font-size: 12px; margin: 0;">세모폰 홈페이지에서 자동 발송된 메일입니다.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent successfully to:', recipientEmails);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send contact notification email:', error);
    return { success: false, error };
  }
}
