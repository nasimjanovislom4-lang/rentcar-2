"use client";

import { useState } from "react";
import SiteIcon, { type SiteIconName } from "@/components/SiteIcon";

interface TeamClientViewProps {
  initialUsers: any[];
}

export default function TeamClientView({ initialUsers }: TeamClientViewProps) {
  const [users, setUsers] = useState<any[]>(initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MANAGER");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const refreshUsers = async () => {
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Yangi xodim muvaffaqiyatli qo'shildi!");
        setName("");
        setEmail("");
        setPassword("");
        setShowAddModal(false);
        refreshUsers();
      } else {
        setMessage(data.error || "Xatolik yuz berdi");
      }
    } catch (err) {
      setMessage("Server bilan aloqa uzildi");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        refreshUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusToggle = async (userId: string, currentActive: boolean) => {
    try {
      const res = await fetch("/api/admin/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, isActive: !currentActive }),
      });
      const data = await res.json();
      if (data.success) {
        refreshUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case "SUPER_ADMIN":
        return { label: "Super Admin", color: "badge-danger", icon: "crown" as SiteIconName };
      case "MANAGER":
        return { label: "Menejer (Operator)", color: "badge-primary", icon: "briefcase" as SiteIconName };
      case "MECHANIC":
        return { label: "Bosh Mexanik", color: "badge-warning", icon: "wrench" as SiteIconName };
      case "ACCOUNTANT":
        return { label: "Buxgalter", color: "badge-success", icon: "chart" as SiteIconName };
      default:
        return { label: r, color: "badge-outline", icon: "user" as SiteIconName };
    }
  };

  return (
    <div>
      {/* Header and Add Button */}
      <div className="flex-between" style={{ marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>Xodimlar va Ruxsatlar (RBAC)</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Tizim foydalanuvchilari huquqlarini va kirish darajalarini boshqarish
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          id="add-staff-btn"
        >
          <SiteIcon name="plus" size={16} /> Yangi Xodim Qo'shish
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: "0.8rem 1.2rem",
            borderRadius: "var(--radius-sm)",
            background: message.includes("muvaffaqiyatli") ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
            color: message.includes("muvaffaqiyatli") ? "#10b981" : "#ef4444",
            marginBottom: "1.5rem",
          }}
        >
          {message}
        </div>
      )}

      {/* Permissions Matrix Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}><SiteIcon name="crown" size={22} /></div>
          <h4 style={{ fontWeight: 800, fontSize: "1rem" }}>Super Admin</h4>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Cheklovlarsiz to'liq huquqlar: xodimlarni boshqarish, moliyaviy hisobotlar, sozlamalar va narxlarni o'zgartirish.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}><SiteIcon name="briefcase" size={22} /></div>
          <h4 style={{ fontWeight: 800, fontSize: "1rem" }}>Menejer (Operator)</h4>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Buyurtmalar qabuli, mijozlar bilan aloqa, statuslarni yangilash, shartnoma chiqarish va avtomobil topshirish.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}><SiteIcon name="wrench" size={22} /></div>
          <h4 style={{ fontWeight: 800, fontSize: "1rem" }}>Mexanik</h4>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Avtopark texnik monitoringi, ta'mirlash xarajatlari, moy va ehtiyot qismlarni yangilash, odometr ko'rsatkichlari.
          </p>
        </div>

        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}><SiteIcon name="chart" size={22} /></div>
          <h4 style={{ fontWeight: 800, fontSize: "1rem" }}>Buxgalter</h4>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Moliyaviy hisobotlar, tushum va xarajatlar statistikasi, to'lovlar tahlili va Excel (CSV) eksporti.
          </p>
        </div>
      </div>

      {/* Staff Table */}
      <div className="glass-card" style={{ overflowX: "auto", borderRadius: "var(--radius-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--glass-border)", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
              <th style={{ padding: "1rem" }}>Xodim F.I.SH</th>
              <th style={{ padding: "1rem" }}>Elektron Pochta</th>
              <th style={{ padding: "1rem" }}>Hozirgi Roli</th>
              <th style={{ padding: "1rem" }}>Rolni O'zgartirish</th>
              <th style={{ padding: "1rem" }}>Holat</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Faollik</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const roleMeta = getRoleBadge(u.role);
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }} className="table-row-hover">
                  <td style={{ padding: "1rem", fontWeight: 700 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "var(--glass-bg)",
                          border: "1px solid var(--glass-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                        }}
                      >
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div>{u.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          Qo'shilgan: {new Date(u.createdAt).toLocaleDateString("uz-UZ")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>{u.email}</td>
                  <td style={{ padding: "1rem" }}>
                    <span className={`badge ${roleMeta.color}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                      {roleMeta.icon} {roleMeta.label}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="input-field"
                      style={{ padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                      id={`select-role-${u.id}`}
                    >
                      <option value="SUPER_ADMIN">Super Admin</option>
                      <option value="MANAGER">Menejer (Operator)</option>
                      <option value="MECHANIC">Mexanik</option>
                      <option value="ACCOUNTANT">Buxgalter</option>
                    </select>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span className={`badge ${u.isActive ? "badge-success" : "badge-danger"}`}>
                      {u.isActive ? "Faol" : "Bloklangan"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <button
                      onClick={() => handleStatusToggle(u.id, u.isActive)}
                      className={`btn btn-sm ${u.isActive ? "btn-outline" : "btn-primary"}`}
                      id={`toggle-active-${u.id}`}
                    >
                      {u.isActive ? "Muzlatish" : "Faollashtirish"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
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
              maxWidth: "520px",
              padding: "2rem",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Yangi Xodim Ro'yxatdan O'tkazish</h3>
              <button onClick={() => setShowAddModal(false)} style={{ fontSize: "1.4rem", color: "var(--text-muted)" }}>
                <SiteIcon name="x" size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUser} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "var(--text-muted)" }}>
                  Xodim F.I.SH *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor Aliyev"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  style={{ width: "100%" }}
                  id="staff-name-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "var(--text-muted)" }}>
                  Elektron Pochta *
                </label>
                <input
                  type="email"
                  required
                  placeholder="masalan: sardor@autorent.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ width: "100%" }}
                  id="staff-email-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "var(--text-muted)" }}>
                  Tizimdagi Roli *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field"
                  style={{ width: "100%" }}
                  id="staff-role-select"
                >
                  <option value="MANAGER">Menejer (Operator) — Buyurtmalar & Shartnomalar</option>
                  <option value="MECHANIC">Mexanik — Texnik holat & Xarajatlar</option>
                  <option value="ACCOUNTANT">Buxgalter — Moliyaviy tahlil & Eksport</option>
                  <option value="SUPER_ADMIN">Super Admin — Cheksiz boshqaruv</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "var(--text-muted)" }}>
                  Kirish Paroli *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Parolni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ width: "100%" }}
                  id="staff-password-input"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  id="submit-new-staff-btn"
                >
                  {loading ? "Qo'shilmoqda..." : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
