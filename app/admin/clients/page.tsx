import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import ClientsClientView from "@/components/admin/ClientsClientView";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      bookings: {
        select: {
          id: true,
          bookingNumber: true,
          totalPrice: true,
          status: true,
          startDate: true,
          endDate: true,
          car: {
            select: {
              name: true,
              plateNumber: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader title="Mijozlar Bazasi & Xavfsizlik (CRM)" />
      <main style={{ padding: "2rem" }}>
        <ClientsClientView initialClients={clients} />
      </main>
    </div>
  );
}
