import ThemeToggle from "@/components/ThemeToggle";

export default function AdminHeader({ title }: { title: string }) {
  return (
    <header
      style={{
        padding: "1rem 2rem",
        borderBottom: "1px solid var(--border-glass)",
        background: "var(--bg-surface)",
        backdropFilter: "var(--glass-blur)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 800 }}>{title}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--accent-emerald)" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-emerald)" }}></span>
          <span>Baza bilan sinxronizatsiya: Real-vaqt faol</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <ThemeToggle />

        {/* User profile chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "var(--radius-full)",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border-glass)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-amber) 0%, #d97706 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#ffffff",
            }}
          >
            AU
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Alisher Usmonov</span>
            <span style={{ fontSize: "0.7rem", color: "var(--accent-amber)" }}>Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
