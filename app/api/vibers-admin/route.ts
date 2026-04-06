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

    const recentSnap = await adminDb
      .collection("applications")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const recentActivity = recentSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        type: "signup" as const,
        label: `${data.name ?? "지원자"} — ${data.position ?? ""}`,
        timestamp: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      };
    });

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
