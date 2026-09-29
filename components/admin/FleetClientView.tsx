"use client";

import { useState } from "react";
import GPSMap, { GPSVehicle } from "@/components/admin/GPSMap";
import CarEditModal from "@/components/admin/CarEditModal";

export interface FleetCarItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  vinCode: string;
  color: string;
  category: string;
  dailyPrice: number;
  depositAmount: number;
  mileage: number;
  status: string;
  currentLat: number;
  currentLng: number;
  insuranceExpiry: Date;
  nextServiceDate: Date;
  expenses: { id: string; amount: number; type: string }[];
  bookings: { totalPrice: number }[];
}

export default function FleetClientView({ initialCars }: { initialCars: FleetCarItem[] }) {
  const [cars, setCars] = useState<FleetCarItem[]>(initialCars);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("ALL");

  const refreshCars = async () => {
    try {
      const res = await fetch("/api/admin/cars");
      const data = await res.json();
      if (data.success) {
        setCars(data.cars);
      }
    } catch (err) {
      console.error("Failed to refresh cars", err);
    }
  };

  const handleStatusChange = async (carId: string, nextStatus: string) => {
    try {
      await fetch("/api/admin/cars", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: carId, status: nextStatus }),
      });
      refreshCars();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  const filteredCars = cars.filter((c) => {
    if (filterCategory !== "ALL" && c.category !== filterCategory) return false;
    return true;
  });

  const gpsVehicles: GPSVehicle[] = cars.map((c) => ({
    id: c.id,
    name: c.name,
    plateNumber: c.plateNumber,
    category: c.category,
    status: c.status,
    currentLat: c.currentLat,
    currentLng: c.currentLng,
    mileage: c.mileage,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Action Header */}
      <div className="flex-between" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Avtopark Boshqaruvi & Nazorat</h2>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Jami {cars.length} ta transport vositasi ro'yxatga olingan
          </span>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" id="add-car-btn">
          ➕ Yangi Mashina Qo'shish
        </button>
      </div>

      {/* GPS Real-Time Map */}
      <GPSMap vehicles={gpsVehicles} />

      {/* Fleet List & Vehicle ROI Table */}
      <div className="glass-card" style={{ padding: "1.75rem" }}>
        <div className="flex-between" style={{ marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Mashinalar Ro'yxati, Texnik Holat va ROI</h3>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["ALL", "PREMIUM", "SUV", "SEDAN", "ECONOMY"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`btn btn-sm ${filterCategory === cat ? "btn-primary" : "btn-outline"}`}
              >
                {cat === "ALL" ? "Barchasi" : cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)", textAlign: "left", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.85rem 0.5rem" }}>Avtomobil</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>Davlat raqami</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>Yurgan masofasi</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>Kunlik narx</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>Xarajatlar</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>Jami Tushum</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>ROI (Sof foyda)</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>Status</th>
                <th style={{ padding: "0.85rem 0.5rem" }}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => {
                const totalExpenses = car.expenses.reduce((acc, e) => acc + e.amount, 0);
                const totalRevenue = car.bookings.reduce((acc, b) => acc + b.totalPrice, 0);
                const netProfit = totalRevenue - totalExpenses;

                return (
                  <tr
                    key={car.id}
                    style={{
                      borderBottom: "1px solid var(--border-subtle)",
                      transition: "background var(--transition-fast)",
                    }}
                  >
                    <td style={{ padding: "1rem 0.5rem", fontWeight: 700 }}>
                      <div>{car.name}</div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {car.year}-yil • {car.category}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 0.5rem", fontWeight: 600 }}>
                      <span
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid var(--border-glass)",
                          fontFamily: "monospace",
                        }}
                      >
                        {car.plateNumber}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 0.5rem" }}>{car.mileage.toLocaleString()} km</td>
                    <td style={{ padding: "1rem 0.5rem", fontWeight: 600 }}>{formatPrice(car.dailyPrice)}</td>
                    <td style={{ padding: "1rem 0.5rem", color: "var(--accent-rose)" }}>
                      {formatPrice(totalExpenses)}
                    </td>
                    <td style={{ padding: "1rem 0.5rem", color: "var(--accent-emerald)", fontWeight: 700 }}>
                      {formatPrice(totalRevenue)}
                    </td>
                    <td style={{ padding: "1rem 0.5rem", fontWeight: 800, color: netProfit >= 0 ? "var(--accent-blue)" : "var(--accent-rose)" }}>
                      {formatPrice(netProfit)}
                    </td>
                    <td style={{ padding: "1rem 0.5rem" }}>
                      <select
                        value={car.status}
                        onChange={(e) => handleStatusChange(car.id, e.target.value)}
                        className="form-select"
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.78rem" }}
                      >
                        <option value="AVAILABLE">Bo'sh (Available)</option>
                        <option value="RENTED">Ijarada (Rented)</option>
                        <option value="MAINTENANCE">Servisda (Maintenance)</option>
                        <option value="RESERVED">Band (Reserved)</option>
                      </select>
                    </td>
                    <td style={{ padding: "1rem 0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Keyingi servis: {new Date(car.nextServiceDate).toLocaleDateString("uz-UZ")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <CarEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refreshCars}
      />
    </div>
  );
}
