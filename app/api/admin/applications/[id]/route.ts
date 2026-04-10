import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { status, admin_memo } = body;

  try {
    const sets: string[] = ['updated_at = NOW()'];
    const values: (string | undefined)[] = [];
    let idx = 1;
    if (status !== undefined) { sets.push(`status = $${idx++}`); values.push(status); }
    if (admin_memo !== undefined) { sets.push(`admin_memo = $${idx++}`); values.push(admin_memo); }

    values.push(id);
    await pool.query(
      `UPDATE semophone.applications SET ${sets.join(', ')} WHERE id = $${idx}`,
      values
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('admin/applications PATCH error:', e);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
