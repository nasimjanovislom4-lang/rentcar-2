"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteIcon, { type SiteIconName } from "@/components/SiteIcon";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems: { label: string; href: string; icon: SiteIconName }[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "chart" },
    { label: "Avtopark & GPS", href: "/admin/fleet", icon: "carFront" },
    { label: "Buyurtmalar & Kanban", href: "/admin/bookings", icon: "clipboard" },
    { label: "Mijozlar & Blacklist", href: "/admin/clients", icon: "users" },
    { label: "Moliya & Hisobotlar", href: "/admin/finance", icon: "chart" },
    { label: "Xodimlar & RBAC", href: "/admin/team", icon: "shield" },
  ];

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-glass)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 1rem",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }}
    >
      {/* Brand logo */}
      <div style={{ marginBottom: "2rem", padding: "0 0.5rem" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: 800,
            fontSize: "1.2rem",
          }}
        >
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-sm)",
              background: "linear-gradient(135deg, var(--accent-blue) 0%, #1d4ed8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "0.9rem",
            }}
          >
            <SiteIcon name="zap" size={18} />
          </span>
          <span>
            AutoRent <span style={{ color: "var(--accent-blue)" }}>CRM</span>
          </span>
        </Link>
        <span
          style={{
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            display: "block",
            marginTop: "0.3rem",
            paddingLeft: "0.5rem",
          }}
        >
          Fleet & Business Management
        </span>
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: isActive ? "#ffffff" : "var(--text-secondary)",
                background: isActive
                  ? "linear-gradient(135deg, var(--accent-blue) 0%, #1d4ed8 100%)"
                  : "transparent",
                boxShadow: isActive ? "0 4px 12px var(--accent-blue-glow)" : "none",
                transition: "all var(--transition-fast)",
              }}
            >
              <span><SiteIcon name={item.icon} size={18} /></span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Switch back to Client Site */}
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <Link
          href="/"
          className="btn btn-outline btn-sm"
          style={{ width: "100%", justifyContent: "flex-start", gap: "0.6rem" }}
        >
          <SiteIcon name="globe" size={16} /> Mijoz saytiga o'tish
        </Link>
        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", paddingLeft: "0.5rem" }}>
          Tizim versiyasi: v1.0.0 Pro
        </div>
      </div>
    </aside>
  );
}
