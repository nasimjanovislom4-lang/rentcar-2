import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import FleetClientView from "@/components/admin/FleetClientView";

export const dynamic = "force-dynamic";

export default async function AdminFleetPage() {
  const cars = await prisma.car.findMany({
    include: {
      expenses: true,
      bookings: {
        select: { totalPrice: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader title="Avtopark Boshqaruvi & GPS Monitoring" />
      <main style={{ padding: "2rem" }}>
        <FleetClientView initialCars={cars} />
      </main>
    </div>
  );
}
