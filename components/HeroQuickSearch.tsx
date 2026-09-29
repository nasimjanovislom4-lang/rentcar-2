"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroQuickSearch() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("Toshkent markaziy ofisi");
  const [category, setCategory] = useState("ALL");
  const [pickupDate, setPickupDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split("T")[0];
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category !== "ALL") params.set("category", category);
    if (pickupDate) params.set("from", pickupDate);
    if (returnDate) params.set("to", returnDate);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div
      className="glass-card-elevated"
      style={{
        padding: "2rem",
        borderRadius: "var(--radius-lg)",
        maxWidth: "1050px",
        margin: "0 auto",
        boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <form onSubmit={handleSearch}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.2rem",
            alignItems: "flex-end",
          }}
        >
          {/* Pickup location */}
          <div className="form-group">
            <label className="form-label">📍 Olish manzili</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="form-select"
            >
              <option value="Toshkent markaziy ofisi">Markaziy ofis (Bunyodkor 42)</option>
              <option value="Toshkent Xalqaro Aeroporti">Toshkent Xalqaro Aeroporti</option>
              <option value="Shimoliy vokzal">Shimoliy Temir Yo'l Vokzali</option>
              <option value="Mehmonxona yoki manzil">Manzilga yetkazib berish</option>
            </select>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">🚘 Avtomobil toifasi</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="ALL">Barcha toifalar</option>
              <option value="PREMIUM">Premium toifa</option>
              <option value="SUV">Krossoverlar & SUV</option>
              <option value="SEDAN">Biznes & Sedan</option>
              <option value="ECONOMY">Ekonom toifa</option>
            </select>
          </div>

          {/* Pickup Date */}
          <div className="form-group">
            <label className="form-label">📅 Olish sanasi</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Return Date */}
          <div className="form-group">
            <label className="form-label">📅 Qaytarish sanasi</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", height: "46px" }}
              id="hero-search-btn"
            >
              🔍 Mashina qidirish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
