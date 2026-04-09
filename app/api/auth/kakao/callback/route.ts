import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { signToken, COOKIE_NAME } from '@/lib/jwt';

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_URL}/api/auth/kakao/callback`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=oauth_failed`);
  }

  try {
    // code → access_token
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=oauth_failed`);
    }

    // access_token → user info
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const kakaoUser = await userRes.json();

    const email = kakaoUser.kakao_account?.email;
    const nickname = kakaoUser.kakao_account?.profile?.nickname || kakaoUser.properties?.nickname;
    const kakaoId = String(kakaoUser.id);

    if (!email) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=no_email`);
    }

    const { rows } = await pool.query(
      `INSERT INTO semophone.admin_users (email, name, provider, provider_id)
       VALUES ($1, $2, 'kakao', $3)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, provider_id = EXCLUDED.provider_id, updated_at = NOW()
       RETURNING id, email, name, provider, is_active`,
      [email, nickname, kakaoId]
    );

    const user = rows[0];
    if (!user.is_active) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=inactive`);
    }

    const token = await signToken({ id: user.id, email: user.email, name: user.name, provider: 'kakao' });

    const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin`);
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return res;
  } catch (err) {
    console.error('Kakao OAuth callback error:', err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=server_error`);
  }
}
