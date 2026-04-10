import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { signToken, COOKIE_NAME } from '@/lib/jwt';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_URL}/api/auth/google/callback`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=oauth_failed`);
  }

  try {
    // code → access_token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=oauth_failed`);
    }

    // access_token → user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userRes.json();

    if (!googleUser.email) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=no_email`);
    }

    // DB에서 어드민 확인 또는 upsert
    const { rows } = await pool.query(
      `INSERT INTO semophone.admin_users (email, name, provider, provider_id)
       VALUES ($1, $2, 'google', $3)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, provider_id = EXCLUDED.provider_id, updated_at = NOW()
       RETURNING id, email, name, provider, is_active`,
      [googleUser.email, googleUser.name, googleUser.id]
    );

    const user = rows[0];
    if (!user.is_active) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=inactive`);
    }

    const token = await signToken({ id: user.id, email: user.email, name: user.name, provider: 'google' });

    const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin`);
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return res;
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login?error=server_error`);
  }
}
