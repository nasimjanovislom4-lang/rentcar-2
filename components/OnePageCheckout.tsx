"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateBookingPrice } from "@/lib/pricing";

interface CarDetail {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  dailyPrice: number;
  depositAmount: number;
  category: string;
  plateNumber: string;
  images: string;
}

export default function OnePageCheckout({
  cars,
  selectedCarId,
}: {
  cars: CarDetail[];
  selectedCarId?: string;
}) {
  const router = useRouter();

  const [carId, setCarId] = useState(selectedCarId || cars[0]?.id || "");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split("T")[0];
  });

  const [extraServices, setExtraServices] = useState<string[]>([
    "KASKO sug'urta",
  ]);

  // Client info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [email, setEmail] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("CLICK");

  // State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentCar = cars.find((c) => c.id === carId) || cars[0];

  const pricing = currentCar
    ? calculateBookingPrice({
        dailyRate: currentCar.dailyPrice,
        startDate,
        endDate,
        depositAmount: currentCar.depositAmount,
        extraServices,
      })
    : null;

  const toggleExtra = (serviceName: string) => {
    if (extraServices.includes(serviceName)) {
      setExtraServices(extraServices.filter((s) => s !== serviceName));
    } else {
      setExtraServices([...extraServices, serviceName]);
    }
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("uz-UZ").format(val) + " so'm";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          fullName,
          phone,
          email,
          passportNumber,
          driverLicenseNumber,
          startDate,
          endDate,
          extraServices,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Buyurtma berishda xatolik yuz berdi.");
      }

      router.push(`/booking/${data.bookingId}`);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "var(--accent-rose)",
            marginBottom: "2rem",
            fontSize: "0.95rem",
          }}
        >
          ⚠️ {errorMessage}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "2.5rem",
          alignItems: "flex-start",
        }}
      >
        {/* Left Form: Steps 1 - 4 on One Page */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Step 1: Car & Dates */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--accent-blue)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                1
              </span>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Avtomobil va Ijara Muddatini Tanlang</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div className="form-group">
                <label className="form-label">Tanlangan avtomobil</label>
                <select
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  className="form-select"
                  id="checkout-car-select"
                >
                  {cars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {formatPrice(c.dailyPrice)}/kun
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.2rem",
                }}
              >
                <div className="form-group">
                  <label className="form-label">Olish sanasi</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Qaytarish sanasi</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Extra Services */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--accent-blue)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                2
              </span>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Qo'shimcha Xizmatlar</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                { name: "KASKO sug'urta", desc: "To'liq sug'urta kafolati (kuniga 100,000 so'm)", price: "100 000 so'm/kun" },
                { name: "Bolalar o'rindig'i", desc: "0-7 yoshdagi bolalar uchun qulay o'rindiq", price: "50 000 so'm (bir martalik)" },
                { name: "Shaxsiy haydovchi", desc: "Tajribali shaxsiy haydovchi xizmati", price: "200 000 so'm/kun" },
                { name: "GPS navigator", desc: "Oflayn xaritalar va radar ogohlantirgich", price: "30 000 so'm (bir martalik)" },
              ].map((srv) => {
                const active = extraServices.includes(srv.name);
                return (
                  <div
                    key={srv.name}
                    onClick={() => toggleExtra(srv.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      borderRadius: "var(--radius-md)",
                      background: active ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.02)",
                      border: active ? "1px solid var(--accent-blue)" : "1px solid var(--border-subtle)",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => {}}
                        style={{ width: "18px", height: "18px", accentColor: "var(--accent-blue)" }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{srv.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{srv.desc}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-blue)" }}>
                      {srv.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Customer Information */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--accent-blue)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                3
              </span>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Mijoz Ma'lumotlari</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
              }}
            >
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">To'liq F.I.SH *</label>
                <input
                  type="text"
                  placeholder="Masalan: Sardorbek Olimov"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  required
                  id="checkout-fullname"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefon raqam *</label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  required
                  id="checkout-phone"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Elektron pochta (email)</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pasport seriyasi va raqami *</label>
                <input
                  type="text"
                  placeholder="AA1234567"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="form-input"
                  required
                  id="checkout-passport"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Haydovchilik guvohnomasi raqami *</label>
                <input
                  type="text"
                  placeholder="AB9876543"
                  value={driverLicenseNumber}
                  onChange={(e) => setDriverLicenseNumber(e.target.value)}
                  className="form-input"
                  required
                  id="checkout-license"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Payment Method */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--accent-blue)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                4
              </span>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>To'lov Usulini Tanlang</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
              {[
                { id: "CLICK", name: "Click Up", icon: "🟢" },
                { id: "PAYME", name: "Payme", icon: "🔵" },
                { id: "CASH", name: "Naqd to'lov", icon: "💵" },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPaymentMethod(p.id)}
                  style={{
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    border: paymentMethod === p.id ? "2px solid var(--accent-blue)" : "1px solid var(--border-glass)",
                    background: paymentMethod === p.id ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.02)",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  <div style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>{p.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Column: Order Summary & Checkout Trigger */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div className="glass-card-elevated" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.2rem" }}>
              Buyurtma Tafsilotlari
            </h3>

            {currentCar && pricing && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    paddingBottom: "1.2rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    marginBottom: "1.2rem",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{currentCar.name}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {currentCar.plateNumber} • {currentCar.category}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div className="flex-between">
                    <span>Ijara davri:</span>
                    <strong style={{ color: "var(--text-primary)" }}>{pricing.totalDays} kun</strong>
                  </div>
                  <div className="flex-between">
                    <span>Kunlik narx:</span>
                    <span>{formatPrice(currentCar.dailyPrice)}</span>
                  </div>
                  {pricing.discountPercentage > 0 && (
                    <div className="flex-between" style={{ color: "var(--accent-emerald)" }}>
                      <span>Uzoq muddatli chegirma ({pricing.discountPercentage}%):</span>
                      <span>Qo'llandi ✓</span>
                    </div>
                  )}
                  <div className="flex-between">
                    <span>Qo'shimcha xizmatlar:</span>
                    <span>{formatPrice(pricing.extrasPrice)}</span>
                  </div>
                  <div className="flex-between">
                    <span>Garov depoziti (qaytariladi):</span>
                    <span>{formatPrice(pricing.depositAmount)}</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(59, 130, 246, 0.08)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "1.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                  }}
                >
                  <div className="flex-between">
                    <span style={{ fontWeight: 600 }}>Jami to'lov:</span>
                    <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-blue)" }}>
                      {formatPrice(pricing.totalPrice)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginTop: "0.4rem",
                      textAlign: "right",
                    }}
                  >
                    + {formatPrice(pricing.depositAmount)} depozit bilan: {formatPrice(pricing.grandTotalWithDeposit)}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
                  id="checkout-submit-btn"
                >
                  {loading ? "Rasmiylashtirilmoqda..." : "🔒 Buyurtmani Tasdiqlash"}
                </button>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    textAlign: "center",
                    marginTop: "1rem",
                    lineHeight: 1.4,
                  }}
                >
                  "Tasdiqlash" tugmasini bosish orqali siz avtomobilni ijaraga berish ommaviy ofertasi shartlariga rozilik bildirasiz.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
