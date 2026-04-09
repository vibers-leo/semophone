import pool from "@/lib/db";

function verifyAdminSecret(request: Request): boolean {
  const secret = process.env.VIBERS_ADMIN_SECRET;
  if (!secret) return false;
  return request.headers.get("x-vibers-admin-secret") === secret;
}

export async function GET(request: Request) {
  if (!verifyAdminSecret(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  if (resource === "inquiries") {
    try {
      const { rows } = await pool.query(
        `SELECT id, name, phone, email, message, inquiry_type, subject,
                resume_url, resume_file_name, status, workflow_status, created_at
         FROM semophone.contacts
         ORDER BY created_at DESC LIMIT 100`
      );
      return Response.json({
        resource,
        data: rows.map((r) => ({ ...r, createdAt: r.created_at?.toISOString() ?? null })),
      });
    } catch (err) {
      console.error("[vibers-admin:semophone:inquiries]", err);
      return Response.json({ error: "Resource fetch failed" }, { status: 500 });
    }
  }

  try {
    const [contactsRes, recentRes] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM semophone.contacts"),
      pool.query(
        `SELECT id, name, inquiry_type, created_at
         FROM semophone.contacts ORDER BY created_at DESC LIMIT 5`
      ),
    ]);

    const recentActivity = recentRes.rows.map((r) => ({
      id: `contact-${r.id}`,
      type: "inquiry" as const,
      label: `문의 접수: ${r.name} — ${r.inquiry_type ?? "일반"}`,
      timestamp: r.created_at?.toISOString() ?? new Date().toISOString(),
    }));

    return Response.json({
      projectId: "semophone",
      projectName: "세모폰",
      stats: {
        mau: 0,
        totalUsers: 0,
        contentCount: 0,
        recentSignups: parseInt(contactsRes.rows[0].count),
      },
      recentActivity,
      health: "healthy",
    });
  } catch (err) {
    console.error("[vibers-admin:semophone]", err);
    return Response.json({
      projectId: "semophone",
      projectName: "세모폰",
      stats: { mau: 0, totalUsers: 0, contentCount: 0, recentSignups: 0 },
      recentActivity: [],
      health: "error",
    });
  }
}

export async function POST() {
  return Response.json({ error: "Not implemented" }, { status: 501 });
}
