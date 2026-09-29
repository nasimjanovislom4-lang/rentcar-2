import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import FinanceClientView from "@/components/admin/FinanceClientView";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage() {
  const [bookings, expenses] = await Promise.all([
    prisma.booking.findMany({
      include: {
        car: { select: { name: true, plateNumber: true } },
        client: { select: { fullName: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.expense.findMany({
      include: {
        car: { select: { name: true, plateNumber: true } },
      },
      orderBy: { date: "desc" },
    }),
  ]);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  // Group payment methods
  const paymentMethodMap: Record<string, { total: number; count: number }> = {};
  bookings.forEach((b) => {
    const method = b.paymentMethod || "OTHER";
    if (!paymentMethodMap[method]) {
      paymentMethodMap[method] = { total: 0, count: 0 };
    }
    paymentMethodMap[method].total += b.totalPrice || 0;
    paymentMethodMap[method].count += 1;
  });

  const paymentStats = Object.entries(paymentMethodMap).map(([method, data]) => ({
    method,
    total: data.total,
    count: data.count,
  }));

  return (
    <div>
      <AdminHeader title="Moliyaviy Tahlil & Hisobotlar" />
      <main style={{ padding: "2rem" }}>
        <FinanceClientView
          totalRevenue={totalRevenue}
          totalExpenses={totalExpenses}
          netProfit={netProfit}
          bookings={bookings}
          expenses={expenses}
          paymentStats={paymentStats}
        />
      </main>
    </div>
  );
}
