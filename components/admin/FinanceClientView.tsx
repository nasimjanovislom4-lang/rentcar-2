"use client";

import { useState } from "react";

interface FinanceClientViewProps {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  bookings: any[];
  expenses: any[];
  paymentStats: { method: string; total: number; count: number }[];
}

export default function FinanceClientView({
  totalRevenue,
  totalExpenses,
  netProfit,
  bookings,
  expenses,
  paymentStats,
}: FinanceClientViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"ALL" | "MONTH" | "WEEK">("ALL");

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  const handleExportCSV = () => {
    const headers = ["Buyurtma / ID", "Turi", "Sana", "To'lov Usuli", "Summa (UZS)", "Tavsif"];
    const rows: string[][] = [];

    bookings.forEach((b) => {
      rows.push([
        b.bookingNumber,
        "TUSHUM (Ijara)",
        new Date(b.createdAt).toLocaleDateString("uz-UZ"),
        b.paymentMethod,
        b.totalPrice.toString(),
        `Mijoz: ${b.client?.fullName || ""}, Avto: ${b.car?.name || ""}`,
      ]);
    });

    expenses.forEach((e) => {
      rows.push([
        e.id.slice(-6),
        "XARAJAT",
        new Date(e.date).toLocaleDateString("uz-UZ"),
        "Kompaniya hisobidan",
        `-${e.amount}`,
        `${e.type}: ${e.description} (${e.car?.name || ""})`,
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Moliyaviy_Hisobot_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Payment method icons and labels
  const getMethodBadge = (m: string) => {
    switch (m) {
      case "PAYME":
        return { label: "Payme", color: "#00cccc", icon: "💳" };
      case "CLICK":
        return { label: "Click", color: "#0070ba", icon: "📱" };
      case "CASH":
        return { label: "Naqd pul", color: "#10b981", icon: "💵" };
      case "BANK_TRANSFER":
        return { label: "Bank o'tkazmasi", color: "#8b5cf6", icon: "🏦" };
      default:
        return { label: m, color: "var(--accent-blue)", icon: "💰" };
    }
  };

  return (
    <div>
      {/* Top Controls and Export */}
      <div className="flex-between" style={{ marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { id: "ALL", label: "Barcha Davr" },
            { id: "MONTH", label: "Shu Oy" },
            { id: "WEEK", label: "Shu Hafta" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPeriod(tab.id as any)}
              className={`btn btn-sm ${selectedPeriod === tab.id ? "btn-primary" : "btn-outline"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleExportCSV}
          className="btn btn-outline"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          id="export-finance-csv-btn"
        >
          📊 Excel (CSV) Hisobotini Yuklab Olish
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Jami Yalpi Tushum</div>
          <div style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.4rem", color: "var(--accent-green)" }}>
            {formatPrice(totalRevenue)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            ✓ {bookings.length} ta muvaffaqiyatli buyurtma
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Jami Texnik va Operatsion Xarajatlar</div>
          <div style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.4rem", color: "#ef4444" }}>
            {formatPrice(totalExpenses)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            ⚠️ {expenses.length} ta qayd etilgan xarajat
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Sof Foyda (Net Profit)</div>
          <div style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.4rem", color: netProfit >= 0 ? "var(--accent-blue)" : "#ef4444" }}>
            {formatPrice(netProfit)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            Rentabellik ko'rsatkichi: {totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Grid: Payment Method Distribution & Expenses Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Payment Methods */}
        <div className="glass-card" style={{ padding: "1.8rem", borderRadius: "var(--radius-md)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            To'lov Usullari Bo'yicha Tushum Ulushi
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {paymentStats.map((item) => {
              const meta = getMethodBadge(item.method);
              const percent = totalRevenue > 0 ? Math.round((item.total / totalRevenue) * 100) : 0;
              return (
                <div key={item.method}>
                  <div className="flex-between" style={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                    <span>
                      {meta.icon} <strong>{meta.label}</strong> ({item.count} ta to'lov)
                    </span>
                    <span style={{ fontWeight: 700 }}>
                      {formatPrice(item.total)} ({percent}%)
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${percent}%`,
                        height: "100%",
                        background: meta.color,
                        borderRadius: "4px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expenses List */}
        <div className="glass-card" style={{ padding: "1.8rem", borderRadius: "var(--radius-md)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.2rem" }}>
            Oxirgi Xarajatlar Qaydlari
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", maxHeight: "300px", overflowY: "auto" }}>
            {expenses.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Hozircha xarajatlar kiritilmagan.</p>
            ) : (
              expenses.map((e) => (
                <div
                  key={e.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.8rem",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(255,255,255,0.02)",
                    borderLeft: "3px solid #ef4444",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      {e.description}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                      {e.car?.name} ({e.car?.plateNumber}) • {new Date(e.date).toLocaleDateString("uz-UZ")}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: "#ef4444", fontSize: "0.95rem" }}>
                    -{formatPrice(e.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Financial Transactions Ledger */}
      <div className="glass-card" style={{ overflowX: "auto", borderRadius: "var(--radius-md)" }}>
        <div style={{ padding: "1.2rem 1.5rem", borderBottom: "1px solid var(--glass-border)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Oxirgi Moliyaviy Tranzaksiyalar (Buyurtmalar)</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--glass-border)", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
              <th style={{ padding: "1rem" }}>Buyurtma Kodi</th>
              <th style={{ padding: "1rem" }}>Sana</th>
              <th style={{ padding: "1rem" }}>Mijoz</th>
              <th style={{ padding: "1rem" }}>Avtomobil</th>
              <th style={{ padding: "1rem" }}>To'lov Usuli</th>
              <th style={{ padding: "1rem" }}>Garov (Depozit)</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Ijara Qiymati</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 10).map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }} className="table-row-hover">
                <td style={{ padding: "1rem", fontWeight: 700 }}>{b.bookingNumber}</td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  {new Date(b.createdAt).toLocaleDateString("uz-UZ")}
                </td>
                <td style={{ padding: "1rem" }}>{b.client?.fullName}</td>
                <td style={{ padding: "1rem" }}>{b.car?.name}</td>
                <td style={{ padding: "1rem" }}>
                  <span className="badge badge-outline">
                    {getMethodBadge(b.paymentMethod).label}
                  </span>
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  {formatPrice(b.depositAmount)}
                </td>
                <td style={{ padding: "1rem", textAlign: "right", fontWeight: 700, color: "var(--accent-green)" }}>
                  {formatPrice(b.totalPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
