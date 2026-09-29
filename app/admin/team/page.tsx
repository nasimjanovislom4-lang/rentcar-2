import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import TeamClientView from "@/components/admin/TeamClientView";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader title="Xodimlar va Huquqlar (RBAC)" />
      <main style={{ padding: "2rem" }}>
        <TeamClientView initialUsers={users} />
      </main>
    </div>
  );
}
