import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { signToken, COOKIE_NAME } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 });
    }

    const { rows } = await pool.query(
      'SELECT id, email, name, password_hash, provider, is_active FROM semophone.admin_users WHERE email = $1',
      [email]
    );

    const user = rows[0];
    if (!user || !user.is_active) {
      return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    if (!user.password_hash) {
      return NextResponse.json({ error: '소셜 로그인 계정입니다. Google 또는 Kakao로 로그인해주세요.' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    const token = await signToken({ id: user.id, email: user.email, name: user.name, provider: 'email' });

    const res = NextResponse.json({ success: true, user: { email: user.email, name: user.name } });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      domain: '.semophone.co.kr',
    });
    return res;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: '로그인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
