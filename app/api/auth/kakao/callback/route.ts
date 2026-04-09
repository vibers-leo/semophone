import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { signToken, COOKIE_NAME } from '@/lib/jwt';

const KAKAO_CLIENT_ID = (process.env.KAKAO_CLIENT_ID || '23dc9e59dbc8c795728a6da39324cd3c').trim();
const REDIRECT_URI = 'https://semophone.co.kr/api/auth/kakao/callback';
const BASE_URL = 'https://semophone.co.kr';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${BASE_URL}/admin/login?error=oauth_failed`);
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
    console.log('Kakao token response:', JSON.stringify(tokenData));

    if (!tokenData.access_token) {
      const msg = encodeURIComponent(tokenData.error_description || tokenData.error || 'token_failed');
      return NextResponse.redirect(`${BASE_URL}/admin/login?error=token_failed&msg=${msg}`);
    }

    // access_token → user info
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const kakaoUser = await userRes.json();
    console.log('Kakao user:', JSON.stringify(kakaoUser));

    const email = kakaoUser.kakao_account?.email;
    const nickname = kakaoUser.kakao_account?.profile?.nickname || kakaoUser.properties?.nickname;
    const kakaoId = String(kakaoUser.id);

    if (!email) {
      return NextResponse.redirect(`${BASE_URL}/admin/login?error=no_email`);
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
      return NextResponse.redirect(`${BASE_URL}/admin/login?error=inactive`);
    }

    const token = await signToken({ id: user.id, email: user.email, name: user.name, provider: 'kakao' });

    const res = NextResponse.redirect(`${BASE_URL}/admin`);
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      domain: '.semophone.co.kr',
    });
    return res;
  } catch (err: any) {
    console.error('Kakao OAuth callback error:', err);
    const msg = encodeURIComponent(err?.message || 'unknown');
    return NextResponse.redirect(`${BASE_URL}/admin/login?error=server_error&msg=${msg}`);
  }
}
