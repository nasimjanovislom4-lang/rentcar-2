import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SiteIcon from "@/components/SiteIcon";

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--bg-surface)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        borderBottom: "1px solid var(--border-glass)",
        transition: "all var(--transition-fast)",
      }}
    >
      <div className="container" style={{ padding: "0.85rem 1.5rem" }}>
        <div className="flex-between">
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontWeight: 800,
              fontSize: "1.3rem",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, var(--accent-blue) 0%, #1d4ed8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 4px 12px var(--accent-blue-glow)",
              }}
            >
              <SiteIcon name="carFront" size={20} />
            </span>
            <span>
              AutoRent <span style={{ color: "var(--accent-blue)" }}>Pro</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
          >
            <Link href="/" style={{ color: "var(--text-primary)" }}>
              Bosh sahifa
            </Link>
            <Link
              href="/cars"
              style={{ color: "var(--text-secondary)", transition: "color var(--transition-fast)" }}
            >
              Katalog
            </Link>
            <Link
              href="/admin/dashboard"
              style={{
                color: "var(--accent-amber)",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <SiteIcon name="zap" size={16} /> CRM & Admin
            </Link>
          </nav>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                fontSize: "0.8rem",
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>24/7 Qo'llab-quvvatlash</span>
              <strong style={{ color: "var(--accent-blue)" }}>+998 71 200 00 00</strong>
            </div>

            <ThemeToggle />

            <Link href="/cars" className="btn btn-primary btn-sm">
              Bron qilish
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
