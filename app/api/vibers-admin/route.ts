import { adminDb } from "@/lib/firebase/admin";

function verifyAdminSecret(request: Request): boolean {
  const secret = process.env.VIBERS_ADMIN_SECRET;
  if (!secret) return false;
  return request.headers.get("x-vibers-admin-secret") === secret;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  if (!verifyAdminSecret(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (resource) {
    try {
      let data = null;

      if (resource === "jobs") {
        const snap = await adminDb.collection("jobOpenings").orderBy("order", "asc").get();
        data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      } else if (resource === "applications") {
        const snap = await adminDb.collection("applications").orderBy("createdAt", "desc").limit(50).get();
        data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.()?.toISOString() ?? null,
        }));
      } else if (resource === "inquiries") {
        const snap = await adminDb.collection("contacts").orderBy("createdAt", "desc").limit(50).get();
        data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.()?.toISOString() ?? null,
        }));
      }

      return Response.json({ resource, data });
    } catch (err) {
      console.error(`[vibers-admin:semophone:${resource}]`, err);
      return Response.json({ error: "Resource fetch failed" }, { status: 500 });
    }
  }

  try {
    const [jobsSnap, appSnap, contactSnap] = await Promise.all([
      adminDb.collection("jobOpenings").where("isActive", "==", true).get(),
      adminDb.collection("applications").get(),
      adminDb.collection("contacts").get(),
    ]);

    const [recentAppsSnap, recentContactsSnap] = await Promise.all([
      adminDb.collection("applications").orderBy("createdAt", "desc").limit(3).get(),
      adminDb.collection("contacts").orderBy("createdAt", "desc").limit(3).get(),
    ]);

    const recentActivity = [
      ...recentAppsSnap.docs.map((d) => {
        const data = d.data();
        return {
          id: `app-${d.id}`,
          type: "signup",
          label: `입점 신청: ${data.name ?? "신청자"} (${data.position ?? "매장"})`,
          timestamp: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        };
      }),
      ...recentContactsSnap.docs.map((d) => {
        const data = d.data();
        return {
          id: `contact-${d.id}`,
          type: "inquiry",
          label: `문의 접수: ${data.name ?? "문의자"} — ${data.subject ?? data.message?.slice(0, 30) ?? ""}`,
          timestamp: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        };
      }),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

    return Response.json({
      projectId: "semophone",
      projectName: "세모폰",
      stats: {
        totalUsers: appSnap.size,
        contentCount: jobsSnap.size,
        mau: 0,
        recentSignups: contactSnap.size,
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

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ error: "Not implemented" }, { status: 501 });
}
