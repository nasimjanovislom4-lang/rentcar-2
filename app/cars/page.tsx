import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCatalogClient from "@/components/CarCatalogClient";

export const dynamic = "force-dynamic";

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const cars = await prisma.car.findMany({
    orderBy: { dailyPrice: "asc" },
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div className="container" style={{ padding: "3rem 1.5rem 5rem", flexGrow: 1 }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span
            style={{
              color: "var(--accent-blue)",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Avtopark
          </span>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "0.3rem" }}>
            Avtomobillar Katalogi
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.4rem" }}>
            O'zingizga ma'qul bo'lgan avtomobilni tanlang va real vaqtda tezkor bron qiling.
          </p>
        </div>

        <CarCatalogClient
          initialCars={cars}
          initialCategory={resolvedParams.category || "ALL"}
        />
      </div>

      <Footer />
    </div>
  );
}
