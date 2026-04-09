import { NextResponse } from 'next/server';

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID || '23dc9e59dbc8c795728a6da39324cd3c';
const REDIRECT_URI = 'https://semophone.co.kr/api/auth/kakao/callback';

export async function GET() {
  const params = new URLSearchParams({
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'profile_nickname,account_email',
  });
  return NextResponse.redirect(`https://kauth.kakao.com/oauth/authorize?${params}`);
}
