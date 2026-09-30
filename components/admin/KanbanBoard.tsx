"use client";

import { useState } from "react";
import ContractModal from "./ContractModal";
import SiteIcon from "@/components/SiteIcon";

export interface BookingWithDetails {
  id: string;
  bookingNumber: string;
  carId: string;
  clientId: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  dailyRate: number;
  totalPrice: number;
  depositAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: Date;
  car: {
    name: string;
    plateNumber: string;
    vinCode: string;
    year: number;
    color: string;
    mileage: number;
  };
  client: {
    fullName: string;
    phone: string;
    passportNumber: string;
    driverLicenseNumber: string;
    status: string;
  };
}

export default function KanbanBoard({
  initialBookings,
}: {
  initialBookings: BookingWithDetails[];
}) {
  const [bookings, setBookings] = useState<BookingWithDetails[]>(initialBookings);
  const [selectedBookingForContract, setSelectedBookingForContract] = useState<BookingWithDetails | null>(null);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    { id: "NEW", title: "Yangi Buyurtma", color: "var(--accent-blue)" },
    { id: "VERIFYING_DOCS", title: "Hujjat Tekshiruvi", color: "var(--accent-amber)" },
    { id: "CONFIRMED", title: "Tasdiqlangan", color: "var(--accent-cyan)" },
    { id: "CAR_HANDED", title: "Mashina Berildi", color: "var(--accent-emerald)" },
    { id: "COMPLETED", title: "Yakunlandi", color: "#64748b" },
  ];

  const handleStatusChange = async (bookingId: string, nextStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: nextStatus } : b))
        );
      }
    } catch (err) {
      console.error("Failed to update booking status", err);
    }
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.bookingNumber.toLowerCase().includes(q) ||
      b.client.fullName.toLowerCase().includes(q) ||
      b.car.name.toLowerCase().includes(q) ||
      b.car.plateNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Filter and Mode Switcher */}
      <div className="flex-between" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Buyurtma kodi, mijoz yoki mashina..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ width: "300px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setViewMode("kanban")}
            className={`btn btn-sm ${viewMode === "kanban" ? "btn-primary" : "btn-outline"}`}
          >
            <SiteIcon name="clipboard" size={16} /> Kanban Doskasi
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`btn btn-sm ${viewMode === "table" ? "btn-primary" : "btn-outline"}`}
          >
            <SiteIcon name="table" size={16} /> Jadval Ko'rinishi
          </button>
        </div>
      </div>

      {viewMode === "kanban" ? (
        /* Kanban Columns Grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.2rem",
            alignItems: "flex-start",
          }}
        >
          {columns.map((col) => {
            const colBookings = filteredBookings.filter((b) => b.status === col.id);
            return (
              <div
                key={col.id}
                className="glass-card"
                style={{
                  padding: "1.2rem",
                  minHeight: "550px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  background: "var(--bg-secondary)",
                }}
              >
                {/* Column Header */}
                <div
                  className="flex-between"
                  style={{
                    borderBottom: "2px solid var(--border-glass)",
                    paddingBottom: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: col.color }} />
                    <strong style={{ fontSize: "0.95rem" }}>{col.title}</strong>
                  </div>
                  <span
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {colBookings.length}
                  </span>
                </div>

                {/* Cards in column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", flexGrow: 1 }}>
                  {colBookings.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        padding: "1rem",
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-glass)",
                        boxShadow: "var(--glass-shadow)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      <div className="flex-between">
                        <strong style={{ color: "var(--accent-blue)" }}>#{b.bookingNumber}</strong>
                        <span className="badge badge-info">{b.totalDays} kun</span>
                      </div>

                      <div>
                        <div style={{ fontWeight: 700 }}>{b.car.name}</div>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {b.car.plateNumber}
                        </span>
                      </div>

                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Mijoz: <strong>{b.client.fullName}</strong>
                      </div>

                      <div className="flex-between" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.5rem" }}>
                        <span style={{ fontWeight: 800, color: "var(--accent-emerald)" }}>
                          {formatPrice(b.totalPrice)}
                        </span>
                        <span className="badge badge-success" style={{ fontSize: "0.7rem" }}>
                          {b.paymentStatus}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.4rem" }}>
                        <button
                          onClick={() => setSelectedBookingForContract(b)}
                          className="btn btn-outline btn-sm"
                          style={{ flexGrow: 1, fontSize: "0.75rem", padding: "0.3rem" }}
                          title="PDF Shartnoma va Aktni shakllantirish"
                        >
                          <SiteIcon name="fileText" size={14} /> PDF Shartnoma
                        </button>
                      </div>

                      {/* Quick Status Advance */}
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className="form-select"
                        style={{ fontSize: "0.75rem", padding: "0.3rem", marginTop: "0.2rem" }}
                      >
                        <option value="NEW">Yangi buyurtma</option>
                        <option value="VERIFYING_DOCS">Hujjat tekshirilmoqda</option>
                        <option value="CONFIRMED">Tasdiqlandi</option>
                        <option value="CAR_HANDED">Mashina topshirildi</option>
                        <option value="COMPLETED">Yakunlandi</option>
                        <option value="CANCELLED">Bekor qilindi</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", textAlign: "left", color: "var(--text-muted)" }}>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Kod</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Avtomobil</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Mijoz</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Telefon</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Muddat</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Summa</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>To'lov</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Status</th>
                  <th style={{ padding: "0.85rem 0.5rem" }}>Hujjat</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "1rem 0.5rem", fontWeight: 700, color: "var(--accent-blue)" }}>
                      #{b.bookingNumber}
                    </td>
                    <td style={{ padding: "1rem 0.5rem", fontWeight: 600 }}>{b.car.name}</td>
                    <td style={{ padding: "1rem 0.5rem" }}>{b.client.fullName}</td>
                    <td style={{ padding: "1rem 0.5rem" }}>{b.client.phone}</td>
                    <td style={{ padding: "1rem 0.5rem" }}>{b.totalDays} kun</td>
                    <td style={{ padding: "1rem 0.5rem", fontWeight: 700 }}>{formatPrice(b.totalPrice)}</td>
                    <td style={{ padding: "1rem 0.5rem" }}>
                      <span className="badge badge-success">{b.paymentStatus}</span>
                    </td>
                    <td style={{ padding: "1rem 0.5rem" }}>
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className="form-select"
                        style={{ fontSize: "0.78rem", padding: "0.3rem" }}
                      >
                        <option value="NEW">Yangi</option>
                        <option value="VERIFYING_DOCS">Hujjat tekshiruvi</option>
                        <option value="CONFIRMED">Tasdiqlandi</option>
                        <option value="CAR_HANDED">Mashina berildi</option>
                        <option value="COMPLETED">Yakunlandi</option>
                        <option value="CANCELLED">Bekor qilindi</option>
                      </select>
                    </td>
                    <td style={{ padding: "1rem 0.5rem" }}>
                      <button
                        onClick={() => setSelectedBookingForContract(b)}
                        className="btn btn-outline btn-sm"
                      >
                        <SiteIcon name="fileText" size={14} /> PDF Shartnoma
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contract Generation Modal */}
      <ContractModal
        isOpen={!!selectedBookingForContract}
        onClose={() => setSelectedBookingForContract(null)}
        bookingData={selectedBookingForContract}
      />
    </div>
  );
}
