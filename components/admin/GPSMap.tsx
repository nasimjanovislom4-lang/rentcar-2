"use client";

import { useState } from "react";

export interface GPSVehicle {
  id: string;
  name: string;
  plateNumber: string;
  category: string;
  status: string;
  currentLat: number;
  currentLng: number;
  mileage: number;
}

export default function GPSMap({ vehicles }: { vehicles: GPSVehicle[] }) {
  const [selectedVehicle, setSelectedVehicle] = useState<GPSVehicle | null>(vehicles[0] || null);

  // Tashkent bounding box approximation for rendering SVG interactive radar / map:
  // Lat: 41.25 to 41.38, Lng: 69.18 to 69.34
  const minLat = 41.25;
  const maxLat = 41.38;
  const minLng = 69.18;
  const maxLng = 69.34;

  const getCoordinatesPercent = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    };
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "var(--accent-emerald)";
      case "RENTED":
        return "var(--accent-blue)";
      case "MAINTENANCE":
        return "var(--accent-amber)";
      default:
        return "var(--text-muted)";
    }
  };

  return (
    <div className="glass-card" style={{ padding: "1.75rem", overflow: "hidden" }}>
      <div className="flex-between" style={{ marginBottom: "1.2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.3rem" }}>🛰️</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>GPS Monitoring & Real-Vaqt Xaritasi</h3>
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Toshkent shahri va viloyat bo'yicha ulangan GPS trekerlar signali
          </span>
        </div>

        {/* Status Legend */}
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent-emerald)" }} />
            <span>Bo'sh (To'xtagan)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent-blue)" }} />
            <span>Ijarada (Harakatda)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent-amber)" }} />
            <span>Servis / Ta'mir</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "1.5rem",
          alignItems: "stretch",
        }}
      >
        {/* Interactive Map Visualizer */}
        <div
          style={{
            position: "relative",
            height: "440px",
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(180deg, #09111e 0%, #0d1a2d 100%)",
            border: "1px solid var(--border-glass)",
            overflow: "hidden",
            boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Subtle Grid Lines simulating GIS map */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Map Overlay Landmark Labels */}
          <div style={{ position: "absolute", top: "15px", left: "20px", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.3)" }}>
            📍 Toshkent (Yunusobod)
          </div>
          <div style={{ position: "absolute", bottom: "15px", left: "20px", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.3)" }}>
            📍 Sergeli & Janubiy Vokzal
          </div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.25)" }}>
            📍 Amir Temur Xiyoboni (Markaz)
          </div>
          <div style={{ position: "absolute", top: "40%", right: "20px", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.3)" }}>
            📍 Chilonzor & Bunyodkor
          </div>

          {/* Vehicle Markers */}
          {vehicles.map((v) => {
            const { x, y } = getCoordinatesPercent(v.currentLat, v.currentLng);
            const isSelected = selectedVehicle?.id === v.id;
            const markerColor = getMarkerColor(v.status);

            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  zIndex: isSelected ? 20 : 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* Ping animation for active cars */}
                {v.status === "RENTED" && (
                  <span
                    style={{
                      position: "absolute",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(59, 130, 246, 0.35)",
                      animation: "pulse 2s infinite ease-out",
                    }}
                  />
                )}

                {/* Marker pin */}
                <div
                  style={{
                    width: isSelected ? "32px" : "24px",
                    height: isSelected ? "32px" : "24px",
                    borderRadius: "50%",
                    background: markerColor,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isSelected ? "1rem" : "0.75rem",
                    boxShadow: isSelected
                      ? `0 0 20px ${markerColor}`
                      : `0 0 10px ${markerColor}`,
                    border: "2px solid #ffffff",
                  }}
                >
                  🚘
                </div>

                {/* Tag */}
                <div
                  style={{
                    marginTop: "4px",
                    background: "rgba(0, 0, 0, 0.75)",
                    backdropFilter: "blur(6px)",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "4px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    border: isSelected ? "1px solid var(--accent-blue)" : "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {v.plateNumber}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Vehicle Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
            Tanlangan Avtomobil
          </div>

          {selectedVehicle ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{selectedVehicle.name}</h4>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  Davlat raqami: <strong style={{ color: "var(--accent-blue)" }}>{selectedVehicle.plateNumber}</strong>
                </div>
              </div>

              <div style={{ padding: "0.75rem", background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>
                <div className="flex-between" style={{ marginBottom: "0.4rem" }}>
                  <span>Status:</span>
                  <span className="badge badge-info">{selectedVehicle.status}</span>
                </div>
                <div className="flex-between" style={{ marginBottom: "0.4rem" }}>
                  <span>Tezlik:</span>
                  <strong style={{ color: selectedVehicle.status === "RENTED" ? "var(--accent-emerald)" : "var(--text-muted)" }}>
                    {selectedVehicle.status === "RENTED" ? "48 km/soat" : "0 km/soat (parkovka)"}
                  </strong>
                </div>
                <div className="flex-between" style={{ marginBottom: "0.4rem" }}>
                  <span>Odometr:</span>
                  <span>{selectedVehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex-between">
                  <span>GPS signali:</span>
                  <span style={{ color: "var(--accent-emerald)" }}>Alo darajada (4G)</span>
                </div>
              </div>

              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Koordinatalar: {selectedVehicle.currentLat.toFixed(5)}, {selectedVehicle.currentLng.toFixed(5)}
              </div>
            </div>
          ) : (
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Xaritadan avtomobilni tanlang</p>
          )}

          {/* Quick List */}
          <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-subtle)", paddingTop: "0.8rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
              Tezkor tanlash:
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", maxHeight: "140px", overflowY: "auto" }}>
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  style={{
                    padding: "0.35rem 0.6rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    background: selectedVehicle?.id === v.id ? "rgba(59, 130, 246, 0.2)" : "transparent",
                    color: selectedVehicle?.id === v.id ? "var(--accent-blue)" : "var(--text-secondary)",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{v.name}</span>
                  <strong>{v.plateNumber}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
