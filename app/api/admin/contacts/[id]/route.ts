import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/jwt';
import { isSuperAdmin } from '@/lib/super-admins';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !isSuperAdmin(session.email)) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { workflow_status, status } = body;

  try {
    const sets: string[] = [];
    const values: string[] = [];
    let idx = 1;
    if (workflow_status) { sets.push(`workflow_status = $${idx++}`); values.push(workflow_status); }
    if (status) { sets.push(`status = $${idx++}`); values.push(status); }
    if (!sets.length) return NextResponse.json({ error: 'No fields to update' }, { status: 400 });

    values.push(id);
    await pool.query(
      `UPDATE semophone.contacts SET ${sets.join(', ')} WHERE id = $${idx}`,
      values
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('admin/contacts PATCH error:', e);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
