import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/vibers-sync
 * Firebase idToken을 Firebase REST API로 검증 후 vibers 생태계에 멤버십 등록
 * firebase-admin SDK 없이 REST API로 검증 (semophone은 Admin SDK 미사용)
 */
export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    if (!idToken) return NextResponse.json({ ok: false }, { status: 400 });

    // Firebase REST API로 idToken 검증
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) return NextResponse.json({ ok: false }, { status: 500 });

    const verifyRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!verifyRes.ok) return NextResponse.json({ ok: false }, { status: 401 });

    const verifyData = await verifyRes.json();
    const firebaseUser = verifyData.users?.[0];
    if (!firebaseUser?.email) return NextResponse.json({ ok: false }, { status: 401 });

    // vibers 생태계 연결
    await fetch(
      `${process.env.VIBERS_SITE_URL ?? 'https://vibers.co.kr'}/api/vibers/connect`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-vibers-secret': process.env.VIBERS_CONNECT_SECRET ?? '',
        },
        body: JSON.stringify({
          type: 'join',
          brandSlug: 'semophone',
          userEmail: firebaseUser.email,
          userName: firebaseUser.displayName ?? null,
          userAvatar: firebaseUser.photoUrl ?? null,
        }),
      }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
