"use client";

import { useState } from "react";
import SiteIcon from "@/components/SiteIcon";

interface ClientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
  onUpdated: () => void;
}

export default function ClientDetailModal({
  isOpen,
  onClose,
  client,
  onUpdated,
}: ClientDetailModalProps) {
  const [status, setStatus] = useState(client?.status || "VERIFIED");
  const [blacklistReason, setBlacklistReason] = useState(client?.blacklistReason || "");
  const [rating, setRating] = useState(client?.rating || 5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen || !client) return null;

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: client.id,
          status,
          blacklistReason: status === "BLACKLISTED" ? blacklistReason : null,
          rating,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Mijoz ma'lumotlari muvaffaqiyatli saqlandi!");
        setTimeout(() => {
          onUpdated();
          onClose();
        }, 800);
      } else {
        setMessage(data.error || "Xatolik yuz berdi");
      }
    } catch (err) {
      setMessage("Server bilan aloqa uzildi");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
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
          maxWidth: "750px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
          <div>
            <span
              className={`badge ${
                status === "VERIFIED"
                  ? "badge-success"
                  : status === "BLACKLISTED"
                  ? "badge-danger"
                  : "badge-warning"
              }`}
            >
              {status === "VERIFIED"
                ? "Tasdiqlangan"
                : status === "BLACKLISTED"
                ? "Qora Ro'yxatda (Blacklist)"
                : "Kutilmoqda"}
            </span>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: "0.4rem" }}>
              {client.fullName}
            </h2>
          </div>
          <button onClick={onClose} style={{ fontSize: "1.4rem", color: "var(--text-muted)" }}>
            <SiteIcon name="x" size={18} />
          </button>
        </div>

        {message && (
          <div
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-sm)",
              background: message.includes("muvaffaqiyatli")
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(239, 68, 68, 0.2)",
              color: message.includes("muvaffaqiyatli") ? "#10b981" : "#ef4444",
              marginBottom: "1.2rem",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {/* Contact & IDs */}
          <div className="glass-card" style={{ padding: "1.2rem" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.8rem", color: "var(--accent-blue)" }}>
              Shaxsiy Ma'lumotlar
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem" }}>
              <div><strong>Telefon:</strong> {client.phone}</div>
              <div><strong>Email:</strong> {client.email || "Mavjud emas"}</div>
              <div><strong>Pasport seriyasi:</strong> {client.passportNumber}</div>
              <div><strong>Haydovchilik guvohnomasi:</strong> {client.driverLicenseNumber}</div>
              <div><strong>Ro'yxatdan o'tgan sana:</strong> {new Date(client.createdAt).toLocaleDateString("uz-UZ")}</div>
            </div>
          </div>

          {/* Verification & Rating */}
          <div className="glass-card" style={{ padding: "1.2rem" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.8rem", color: "var(--accent-yellow)" }}>
              Xavfsizlik va Verifikatsiya
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <div>
                <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "block", marginBottom: "0.3rem" }}>
                  Mijoz Statusi
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="input-field"
                  style={{ width: "100%", padding: "0.5rem" }}
                  id="client-status-select"
                >
                  <option value="VERIFIED">Tasdiqlangan (Ishonchli)</option>
                  <option value="PENDING">Kutilmoqda / Qayta tekshiruv</option>
                  <option value="REJECTED">Rad etilgan</option>
                  <option value="BLACKLISTED">Qora Ro'yxat (Bloklangan)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "block", marginBottom: "0.3rem" }}>
                  Mijoz Reytingi (1 dan 5 gacha)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="input-field"
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>

              {status === "BLACKLISTED" && (
                <div>
                  <label style={{ fontSize: "0.82rem", color: "#ef4444", display: "block", marginBottom: "0.3rem" }}>
                    Qora ro'yxatga kiritish sababi
                  </label>
                  <textarea
                    rows={2}
                    value={blacklistReason}
                    onChange={(e) => setBlacklistReason(e.target.value)}
                    placeholder="Masalan: Avtomobilni mast holatda boshqargan, jarimalarni to'lamagan..."
                    className="input-field"
                    style={{ width: "100%", padding: "0.5rem", borderColor: "#ef4444" }}
                    id="blacklist-reason-input"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document Verification Preview */}
        <div className="glass-card" style={{ padding: "1.2rem", marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.8rem", color: "var(--accent-blue)" }}>
            Hujjatlar Fotosuratlari Verifikatsiyasi
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div
              style={{
                border: "1px dashed var(--glass-border)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
                textAlign: "center",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.3rem" }}><SiteIcon name="idCard" size={28} /></div>
              <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>Fuqarolik Pasporti / ID Karta</p>
              <span className="badge badge-success" style={{ marginTop: "0.5rem" }}>
                <SiteIcon name="check" size={14} /> Asli tekshirildi ({client.passportNumber})
              </span>
            </div>
            <div
              style={{
                border: "1px dashed var(--glass-border)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
                textAlign: "center",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.3rem" }}><SiteIcon name="car" size={28} /></div>
              <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>Haydovchilik Guvohnomasi</p>
              <span className="badge badge-success" style={{ marginTop: "0.5rem" }}>
                <SiteIcon name="check" size={14} /> Asli tekshirildi ({client.driverLicenseNumber})
              </span>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="glass-card" style={{ padding: "1.2rem", marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.8rem", color: "var(--accent-blue)" }}>
            Buyurtmalar Tarixi ({client.bookings?.length || 0} ta)
          </h4>
          {(!client.bookings || client.bookings.length === 0) ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Hozircha buyurtmalar mavjud emas.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {client.bookings.map((b: any) => (
                <div
                  key={b.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.6rem 0.8rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem",
                  }}
                >
                  <div>
                    <strong>{b.bookingNumber}</strong> — {b.car?.name} ({b.car?.plateNumber})
                    <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                      {new Date(b.startDate).toLocaleDateString("uz-UZ")} — {new Date(b.endDate).toLocaleDateString("uz-UZ")}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "var(--accent-green)" }}>
                      {formatPrice(b.totalPrice)}
                    </div>
                    <span className="badge badge-outline" style={{ fontSize: "0.72rem" }}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button onClick={onClose} className="btn btn-outline">
            Bekor qilish
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn btn-primary"
            id="save-client-changes-btn"
          >
            {loading ? "Saqlanmoqda..." : "O'zgarishlarni Saqlash"}
          </button>
        </div>
      </div>
    </div>
  );
}
