import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      car: true,
      client: true,
      contract: true,
    },
  });

  if (!booking) {
    notFound();
  }

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("uz-UZ").format(val) + " so'm";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  let extras: string[] = [];
  try {
    extras = JSON.parse(booking.extraServices);
  } catch {
    extras = [];
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main className="container" style={{ padding: "4rem 1.5rem 6rem", flexGrow: 1, maxWidth: "800px" }}>
        {/* Success Header */}
        <div
          className="glass-card"
          style={{
            padding: "3rem 2rem",
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.15)",
              border: "2px solid var(--accent-emerald)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              margin: "0 auto 1.2rem",
              color: "var(--accent-emerald)",
            }}
          >
            ✓
          </div>

          <span
            style={{
              color: "var(--accent-emerald)",
              fontWeight: 700,
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Muvaffaqiyatli rasmiylashtirildi!
          </span>

          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.4rem", marginBottom: "0.6rem" }}>
            Buyurtmangiz Qabul Qilindi
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Buyurtma kodi:{" "}
            <strong style={{ color: "var(--accent-blue)", fontSize: "1.1rem" }}>
              #{booking.bookingNumber}
            </strong>
          </p>
        </div>

        {/* Details Card */}
        <div className="glass-card-elevated" style={{ padding: "2.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            Buyurtma va To'lov Tafsilotlari
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
            }}
          >
            <div className="flex-between">
              <span>Avtomobil:</span>
              <strong style={{ color: "var(--text-primary)" }}>
                {booking.car.name} ({booking.car.plateNumber})
              </strong>
            </div>

            <div className="flex-between">
              <span>Mijoz:</span>
              <span style={{ color: "var(--text-primary)" }}>{booking.client.fullName}</span>
            </div>

            <div className="flex-between">
              <span>Telefon raqam:</span>
              <span style={{ color: "var(--text-primary)" }}>{booking.client.phone}</span>
            </div>

            <div className="flex-between">
              <span>Ijara davri:</span>
              <span style={{ color: "var(--text-primary)" }}>
                {formatDate(booking.startDate)} — {formatDate(booking.endDate)} ({booking.totalDays} kun)
              </span>
            </div>

            {extras.length > 0 && (
              <div className="flex-between">
                <span>Qo'shimcha xizmatlar:</span>
                <span style={{ color: "var(--text-primary)" }}>{extras.join(", ")}</span>
              </div>
            )}

            <div className="flex-between">
              <span>To'lov usuli:</span>
              <span className="badge badge-info">{booking.paymentMethod}</span>
            </div>

            <div className="flex-between">
              <span>To'lov holati:</span>
              <span className="badge badge-available">● {booking.paymentStatus}</span>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "1.2rem",
                marginTop: "0.5rem",
              }}
            >
              <div className="flex-between">
                <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>
                  Jami To'langan:
                </span>
                <span style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--accent-blue)" }}>
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  textAlign: "right",
                  marginTop: "0.3rem",
                }}
              >
                + Qaytariluvchi depozit: {formatPrice(booking.depositAmount)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/cars" className="btn btn-outline">
            ← Avtoparkka qaytish
          </Link>
          <Link href="/admin/bookings" className="btn btn-primary">
            ⚡ Admin CRM-da ko'rish
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
