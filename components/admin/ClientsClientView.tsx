"use client";

import { useState } from "react";
import ClientDetailModal from "./ClientDetailModal";
import SiteIcon from "@/components/SiteIcon";

interface ClientsClientViewProps {
  initialClients: any[];
}

export default function ClientsClientView({ initialClients }: ClientsClientViewProps) {
  const [clients, setClients] = useState<any[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshClients = async () => {
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.success) {
        setClients(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = clients.filter((c) => {
    const matchesStatus = filterStatus === "ALL" || c.status === filterStatus;
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.passportNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalClients = clients.length;
  const verifiedCount = clients.filter((c) => c.status === "VERIFIED").length;
  const pendingCount = clients.filter((c) => c.status === "PENDING").length;
  const blacklistedCount = clients.filter((c) => c.status === "BLACKLISTED").length;

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  return (
    <div>
      {/* Top Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem", marginBottom: "2rem" }}>
        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Jami Mijozlar</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginTop: "0.3rem" }}>{totalClients}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Tasdiqlangan Mijozlar</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginTop: "0.3rem", color: "var(--accent-green)" }}>
            {verifiedCount}
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Verifikatsiya Kutilmoqda</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginTop: "0.3rem", color: "var(--accent-yellow)" }}>
            {pendingCount}
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Qora Ro'yxat (Blacklist)</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, marginTop: "0.3rem", color: "#ef4444" }}>
            {blacklistedCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: "1.2rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[
              { id: "ALL", label: "Barchasi" },
              { id: "VERIFIED", label: "Tasdiqlangan" },
              { id: "PENDING", label: "Kutilmoqda" },
              { id: "BLACKLISTED", label: "Qora Ro'yxat" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`btn btn-sm ${filterStatus === tab.id ? "btn-primary" : "btn-outline"}`}
                id={`filter-${tab.id.toLowerCase()}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", minWidth: "300px" }}>
            <input
              type="text"
              placeholder="Qidiruv: F.I.SH, telefon, pasport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ width: "100%", paddingLeft: "2.2rem" }}
              id="clients-search-input"
            />
            <span style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
              <SiteIcon name="search" size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="glass-card" style={{ overflowX: "auto", borderRadius: "var(--radius-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--glass-border)", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
              <th style={{ padding: "1rem" }}>Mijoz F.I.SH</th>
              <th style={{ padding: "1rem" }}>Telefon / Pasport</th>
              <th style={{ padding: "1rem" }}>Buyurtmalar</th>
              <th style={{ padding: "1rem" }}>Jami Xarajat</th>
              <th style={{ padding: "1rem" }}>Reyting</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Mijozlar topilmadi
                </td>
              </tr>
            ) : (
              filtered.map((client) => {
                const totalSpent = client.bookings?.reduce((acc: number, b: any) => acc + (b.totalPrice || 0), 0) || 0;
                return (
                  <tr
                    key={client.id}
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", transition: "background 0.2s" }}
                    className="table-row-hover"
                  >
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: 700 }}>{client.fullName}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        ID: {client.id.slice(-6)}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div>{client.phone}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        {client.passportNumber}
                      </div>
                    </td>
                    <td style={{ padding: "1rem", fontWeight: 600 }}>
                      {client.bookings?.length || 0} ta
                    </td>
                    <td style={{ padding: "1rem", fontWeight: 700, color: "var(--accent-green)" }}>
                      {formatPrice(totalSpent)}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ color: "var(--accent-yellow)", fontWeight: 700 }}>
                        <SiteIcon name="star" size={14} /> {client.rating.toFixed(1)}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        className={`badge ${
                          client.status === "VERIFIED"
                            ? "badge-success"
                            : client.status === "BLACKLISTED"
                            ? "badge-danger"
                            : "badge-warning"
                        }`}
                      >
                        {client.status === "VERIFIED"
                          ? "Tasdiqlangan"
                          : client.status === "BLACKLISTED"
                          ? "Qora Ro'yxat"
                          : "Kutilmoqda"}
                      </span>
                      {client.blacklistReason && (
                        <div style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.2rem", maxWidth: "200px" }}>
                          <SiteIcon name="alert" size={14} /> {client.blacklistReason}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="btn btn-sm btn-outline"
                        id={`view-client-${client.id}`}
                      >
                        Tafsilotlar & Qora ro'yxat
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <ClientDetailModal
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          client={selectedClient}
          onUpdated={refreshClients}
        />
      )}
    </div>
  );
}
