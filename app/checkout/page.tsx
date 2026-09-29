import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnePageCheckout from "@/components/OnePageCheckout";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ carId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const cars = await prisma.car.findMany({
    orderBy: { dailyPrice: "asc" },
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main className="container" style={{ padding: "3rem 1.5rem 5rem", flexGrow: 1 }}>
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
            One-Page Checkout
          </span>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginTop: "0.3rem" }}>
            Tezkor Buyurtma Berish
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.4rem" }}>
            Ortiqcha sahifalarsiz bitta ekranda avtomobilni band qiling.
          </p>
        </div>

        <OnePageCheckout cars={cars} selectedCarId={resolvedParams.carId} />
      </main>

      <Footer />
    </div>
  );
}
