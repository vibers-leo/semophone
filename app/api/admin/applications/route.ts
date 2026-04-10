import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/jwt';
import { isSuperAdmin } from '@/lib/super-admins';

export async function GET() {
  const session = await getSession();
  if (!session || !isSuperAdmin(session.email)) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, phone, email, position, region, message,
              resume_url, resume_file_name, status, admin_memo, created_at
       FROM semophone.applications
       ORDER BY created_at DESC
       LIMIT 200`
    );
    return NextResponse.json(result.rows);
  } catch (e) {
    console.error('admin/applications GET error:', e);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
