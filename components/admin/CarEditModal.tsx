"use client";

import { useState } from "react";

interface CarEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CarEditModal({ isOpen, onClose, onSuccess }: CarEditModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("Chevrolet");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2024);
  const [plateNumber, setPlateNumber] = useState("");
  const [vinCode, setVinCode] = useState("");
  const [color, setColor] = useState("Qora");
  const [category, setCategory] = useState("SEDAN");
  const [transmission, setTransmission] = useState("AUTOMATIC");
  const [fuelType, setFuelType] = useState("PETROL");
  const [seats, setSeats] = useState(5);
  const [dailyPrice, setDailyPrice] = useState(500000);
  const [depositAmount, setDepositAmount] = useState(1000000);
  const [mileage, setMileage] = useState(10000);
  const [status, setStatus] = useState("AVAILABLE");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || `${brand} ${model}`,
          brand,
          model,
          year,
          plateNumber,
          vinCode: vinCode || `VIN${Date.now()}`,
          color,
          category,
          transmission,
          fuelType,
          seats,
          dailyPrice,
          depositAmount,
          mileage,
          status,
          images: [imageUrl],
          features: ["Konditsioner", "Charm salon", "KASKO sug'urta", "Audio tizim"],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Avtomobil qo'shishda xatolik yuz berdi.");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        className="glass-card-elevated"
        style={{
          width: "100%",
          maxWidth: "650px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Yangi Avtomobil Qo'shish</h2>
          <button onClick={onClose} style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
            ✕
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "0.8rem",
              background: "rgba(239, 68, 68, 0.15)",
              color: "var(--accent-rose)",
              borderRadius: "var(--radius-md)",
              marginBottom: "1rem",
              fontSize: "0.85rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Brend</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Model</label>
              <input
                type="text"
                placeholder="Masalan: Malibu 2"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Davlat Raqami</label>
              <input
                type="text"
                placeholder="01 777 AAA"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Yil</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Kuzov Toifasi</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                <option value="SEDAN">Sedan</option>
                <option value="SUV">SUV / Krossover</option>
                <option value="PREMIUM">Premium</option>
                <option value="ECONOMY">Ekonom</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Uzatmalar Qutisi</label>
              <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="form-select">
                <option value="AUTOMATIC">Avtomat (AT)</option>
                <option value="MANUAL">Mexanika (MT)</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Kunlik Ijara Narxi (so'm)</label>
              <input
                type="number"
                value={dailyPrice}
                onChange={(e) => setDailyPrice(Number(e.target.value))}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Garov Depoziti (so'm)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Rasm Havolasi (URL)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Bekor qilish
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
