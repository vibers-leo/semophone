import { NextResponse } from 'next/server';
import { sendContactNotification, ContactInquiry } from '@/lib/email';
import { sendContactNotificationAlimtalk } from '@/lib/ppurio';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message, storeName, type, resumeUrl, resumeFileName } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ success: false, error: '이름, 연락처, 문의내용은 필수입니다.' }, { status: 400 });
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return NextResponse.json({ success: false, error: '올바른 전화번호 형식이 아닙니다.' }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 });
    }

    const inquiry: ContactInquiry = {
      name, phone, email, message, storeName, type,
      resumeUrl: resumeUrl || '',
      resumeFileName: resumeFileName || '',
      ncpResumeUrl: '',
    };

    // PostgreSQL에 문의 저장 (핵심 — 실패 시 에러 반환)
    try {
      await pool.query(
        `INSERT INTO semophone.contacts (name, phone, email, message, inquiry_type, subject, resume_url, resume_file_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [name, phone, email || null, message, type || 'general', storeName || null, resumeUrl || null, resumeFileName || null]
      );
      console.log('✅ DB 저장 완료:', name, phone);
    } catch (e) {
      console.error('❌ PostgreSQL 저장 실패:', e);
      return NextResponse.json({ success: false, error: '문의 접수 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // 알림 발송 (best-effort — 실패해도 접수는 완료)
    const notifications: string[] = [];
    try {
      const emailResult = await sendContactNotification(inquiry);
      if (emailResult.success) notifications.push('이메일');
      console.log('📧 Email result:', emailResult);
    } catch (e) { console.error('📧 Email 발송 실패:', e); }

    try {
      const alimtalkResult = await sendContactNotificationAlimtalk({ name: inquiry.name, phone: inquiry.phone, storeName: inquiry.storeName });
      if (alimtalkResult.success) notifications.push('알림톡');
      console.log('📱 알림톡 result:', alimtalkResult);
    } catch (e) { console.error('📱 알림톡 발송 실패:', e); }

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
      notifications: notifications.length ? notifications.join(', ') + ' 알림 발송됨' : '접수 완료',
    });
  } catch (error) {
    console.error('❌ Contact API error:', error);
    return NextResponse.json({ success: false, error: '문의 접수 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
