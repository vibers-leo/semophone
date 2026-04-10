import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
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
