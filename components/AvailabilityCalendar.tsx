"use client";

import { useState } from "react";

interface AvailabilityCalendarProps {
  dailyPrice: number;
}

export default function AvailabilityCalendar({ dailyPrice }: AvailabilityCalendarProps) {
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Format month name in Uzbek
  const monthNames = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
  ];

  // Days in month
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday

  // Simulated booked days (e.g. days 12, 13, 14, 25 are booked)
  const bookedDays = [3, 4, 12, 13, 14, 25];

  const formatShortPrice = (p: number) => {
    return Math.round(p / 1000) + "k";
  };

  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: (firstDayIndex + 6) % 7 }, (_, i) => i);

  return (
    <div className="glass-card" style={{ padding: "1.75rem" }}>
      <div className="flex-between" style={{ marginBottom: "1.2rem" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Bandlik Taqvimi</h3>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {monthNames[month]} {year}
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--accent-emerald)",
              }}
            />
            <span>Bo'sh</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--accent-rose)",
              }}
            />
            <span>Band</span>
          </div>
        </div>
      </div>

      {/* Weekday headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          marginBottom: "0.6rem",
        }}
      >
        <div>Du</div>
        <div>Se</div>
        <div>Ch</div>
        <div>Pa</div>
        <div>Ju</div>
        <div>Sh</div>
        <div>Ya</div>
      </div>

      {/* Days grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.4rem" }}>
        {emptySlots.map((s) => (
          <div key={`empty-${s}`} />
        ))}

        {daysArray.map((day) => {
          const isBooked = bookedDays.includes(day);
          return (
            <div
              key={day}
              style={{
                padding: "0.5rem 0.2rem",
                borderRadius: "var(--radius-sm)",
                textAlign: "center",
                background: isBooked ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.08)",
                border: isBooked
                  ? "1px solid rgba(239, 68, 68, 0.3)"
                  : "1px solid rgba(16, 185, 129, 0.25)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: isBooked ? 0.7 : 1,
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: isBooked ? "var(--accent-rose)" : "var(--text-primary)",
                }}
              >
                {day}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: isBooked ? "var(--accent-rose)" : "var(--accent-emerald)",
                  fontWeight: 600,
                }}
              >
                {isBooked ? "Band" : formatShortPrice(dailyPrice)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
