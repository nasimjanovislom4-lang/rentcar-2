import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarGallery360 from "@/components/CarGallery360";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({
    where: { id },
  });

  if (!car) {
    notFound();
  }

  let images: string[] = [];
  try {
    images = JSON.parse(car.images);
  } catch {
    images = [];
  }

  let features: string[] = [];
  try {
    features = JSON.parse(car.features);
  } catch {
    features = [];
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main className="container" style={{ padding: "3rem 1.5rem 5rem", flexGrow: 1 }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--text-secondary)" }}>
            Bosh sahifa
          </Link>{" "}
          /{" "}
          <Link href="/cars" style={{ color: "var(--text-secondary)" }}>
            Katalog
          </Link>{" "}
          / <span style={{ color: "var(--text-primary)" }}>{car.name}</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Gallery, Specs & Calendar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Gallery with 360 viewer */}
            <CarGallery360 images={images} carName={car.name} />

            {/* Description & Features */}
            <div className="glass-card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.2rem" }}>
                Avtomobil afzalliklari va qulayliklari
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "0.8rem",
                }}
              >
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span style={{ color: "var(--accent-emerald)" }}>✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="glass-card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.2rem" }}>
                Texnik xususiyatlar
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Brend & Rusum</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                    {car.brand} {car.model}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Ishlab chiqarilgan yil</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>{car.year}-yil</p>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Uzatmalar qutisi</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                    {car.transmission === "AUTOMATIC" ? "Avtomat (AT)" : "Mexanika (MT)"}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Yoqilg'i turi</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>{car.fuelType}</p>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>O'rindiqlar soni</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>{car.seats} kishilik</p>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Yurgan masofasi</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>
                    {car.mileage.toLocaleString()} km
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Kuzov rangi</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>{car.color}</p>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Davlat raqami</span>
                  <p style={{ fontWeight: 600, marginTop: "0.2rem" }}>{car.plateNumber}</p>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <AvailabilityCalendar dailyPrice={car.dailyPrice} />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div className="glass-card-elevated" style={{ padding: "2rem" }}>
              <div className="flex-between" style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(59, 130, 246, 0.15)",
                    color: "var(--accent-blue)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                  }}
                >
                  {car.category}
                </span>

                {car.status === "AVAILABLE" ? (
                  <span className="badge badge-available">● Hozir mavjud</span>
                ) : (
                  <span className="badge badge-maintenance">● {car.status}</span>
                )}
              </div>

              <h1 style={{ fontSize: "1.7rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                {car.name}
              </h1>

              <div
                style={{
                  padding: "1.2rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "var(--radius-md)",
                  margin: "1.5rem 0",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div className="flex-between" style={{ marginBottom: "0.6rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Kunlik ijara:</span>
                  <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-blue)" }}>
                    {formatPrice(car.dailyPrice)}
                  </span>
                </div>
                <div className="flex-between">
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Garov depoziti:</span>
                  <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {formatPrice(car.depositAmount)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  marginBottom: "2rem",
                }}
              >
                <div>✓ KASKO va OSAGO to'liq sug'urta qilingan</div>
                <div>✓ Depozit avtomobil qaytarilgach 100% qaytariladi</div>
                <div>✓ Bepul yuvilgan va to'liq yonilg'i bilan topshiriladi</div>
                <div>✓ Cheklanmagan kunlik masofa (limit yo'q)</div>
              </div>

              {car.status === "AVAILABLE" ? (
                <Link
                  href={`/checkout?carId=${car.id}`}
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.9rem" }}
                  id="book-now-cta"
                >
                  ⚡ Tezkor bron qilish
                </Link>
              ) : (
                <button
                  disabled
                  className="btn btn-outline"
                  style={{ width: "100%", padding: "0.9rem", opacity: 0.5 }}
                >
                  Avtomobil hozirda band
                </button>
              )}

              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginTop: "1rem",
                }}
              >
                Bron qilish uchun faqat pasport va haydovchilik guvohnomasi kerak
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
