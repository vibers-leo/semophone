import { createAdminHandler } from "@vibers/admin-kit/handler";
import { adminDb } from "@/lib/firebase/admin";

export const { GET, POST } = createAdminHandler({
  projectId: "semophone",
  projectName: "세모폰",

  async getStats() {
    try {
      const [jobsSnap, appSnap, contactSnap] = await Promise.all([
        adminDb.collection("jobOpenings").where("isActive", "==", true).get(),
        adminDb.collection("applications").get(),
        adminDb.collection("contacts").get(),
      ]);
      return {
        totalUsers: appSnap.size,
        contentCount: jobsSnap.size,
        mau: 0,
        recentSignups: contactSnap.size,
      };
    } catch {
      return { totalUsers: 0, contentCount: 0, mau: 0, recentSignups: 0 };
    }
  },

  async getRecentActivity() {
    try {
      const snap = await adminDb
        .collection("applications")
        .orderBy("createdAt", "desc")
        .limit(5)
        .get();
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          type: "signup" as const,
          label: `${data.name ?? "지원자"} — ${data.position ?? ""}`,
          timestamp: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        };
      });
    } catch {
      return [];
    }
  },

  async getResource(resource) {
    if (resource === "jobs") {
      const snap = await adminDb.collection("jobOpenings").orderBy("order", "asc").get();
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
    if (resource === "applications") {
      const snap = await adminDb.collection("applications").orderBy("createdAt", "desc").limit(50).get();
      return snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.()?.toISOString() ?? null,
      }));
    }
    if (resource === "inquiries") {
      const snap = await adminDb.collection("contacts").orderBy("createdAt", "desc").limit(50).get();
      return snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.()?.toISOString() ?? null,
      }));
    }
    return null;
  },
});
