import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import KanbanBoard from "@/components/admin/KanbanBoard";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      car: {
        select: {
          name: true,
          plateNumber: true,
          vinCode: true,
          year: true,
          color: true,
          mileage: true,
        },
      },
      client: {
        select: {
          fullName: true,
          phone: true,
          passportNumber: true,
          driverLicenseNumber: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader title="Buyurtmalar & Shartnomalar Boshqaruvi" />
      <main style={{ padding: "2rem" }}>
        <KanbanBoard initialBookings={bookings} />
      </main>
    </div>
  );
}
