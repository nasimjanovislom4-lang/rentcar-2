import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import NotificationList from "@/components/admin/NotificationList";
import SiteIcon, { type SiteIconName } from "@/components/SiteIcon";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [cars, bookings, notifications] = await Promise.all([
    prisma.car.findMany(),
    prisma.booking.findMany({
      include: { car: true, client: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const totalCars = cars.length;
  const rentedCars = cars.filter((c) => c.status === "RENTED").length;
  const availableCars = cars.filter((c) => c.status === "AVAILABLE").length;
  const maintenanceCars = cars.filter((c) => c.status === "MAINTENANCE").length;

  const fleetUtilizationRate = totalCars > 0 ? Math.round((rentedCars / totalCars) * 100) : 0;

  // Calculate revenue
  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  return (
    <div>
      <AdminHeader title="Dashboard & Asosiy Ko'rsatkichlar" />

      <main style={{ padding: "2rem" }}>
        {/* Top 4 Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <StatCard
            title="Umumiy Tushum"
            value={formatPrice(totalRevenue)}
            subtitle="Bu oydagi faol ijara tushumlari"
            icon={"wallet" satisfies SiteIconName}
            trend="+18.4%"
            color="green"
          />

          <StatCard
            title="Ijaradagi Avtomobillar"
            value={`${rentedCars} / ${totalCars}`}
            subtitle={`Avtopark bandligi: ${fleetUtilizationRate}%`}
            icon={"carFront" satisfies SiteIconName}
            trend={`${fleetUtilizationRate}% band`}
            color="blue"
          />

          <StatCard
            title="Bo'sh Avtomobillar"
            value={`${availableCars} ta`}
            subtitle="Bron qilishga tayyor"
            icon={"sparkles" satisfies SiteIconName}
            color="amber"
          />

          <StatCard
            title="Texnik Servisda"
            value={`${maintenanceCars} ta`}
            subtitle="Ta'mir yoki ko'rikda"
            icon={"wrench" satisfies SiteIconName}
            color="rose"
          />
        </div>

        {/* 2 Column Layout: Quick Actions & Notifications */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2rem",
            alignItems: "flex-start",
            marginBottom: "2.5rem",
          }}
        >
          {/* Recent Bookings Summary */}
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>So'nggi Buyurtmalar</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Oxirgi qabul qilingan bronlar
                </span>
              </div>
              <Link href="/admin/bookings" className="btn btn-outline btn-sm">
                Barchasi (Kanban) <SiteIcon name="arrowRight" size={16} />
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", textAlign: "left", color: "var(--text-muted)" }}>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Kod</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Avtomobil</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Mijoz</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Muddat</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Summa</th>
                    <th style={{ padding: "0.75rem 0.5rem" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: "1px solid var(--border-subtle)",
                        transition: "background var(--transition-fast)",
                      }}
                    >
                      <td style={{ padding: "0.85rem 0.5rem", fontWeight: 700, color: "var(--accent-blue)" }}>
                        #{b.bookingNumber}
                      </td>
                      <td style={{ padding: "0.85rem 0.5rem", fontWeight: 600 }}>{b.car.name}</td>
                      <td style={{ padding: "0.85rem 0.5rem" }}>{b.client.fullName}</td>
                      <td style={{ padding: "0.85rem 0.5rem" }}>{b.totalDays} kun</td>
                      <td style={{ padding: "0.85rem 0.5rem", fontWeight: 700 }}>{formatPrice(b.totalPrice)}</td>
                      <td style={{ padding: "0.85rem 0.5rem" }}>
                        <span className="badge badge-info">{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notifications Center */}
          <NotificationList notifications={notifications} />
        </div>
      </main>
    </div>
  );
}
