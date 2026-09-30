import SiteIcon, { type SiteIconName } from "@/components/SiteIcon";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: SiteIconName;
  trend?: string;
  color?: "blue" | "green" | "amber" | "rose";
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "blue",
}: StatCardProps) {
  const getColorStyles = () => {
    switch (color) {
      case "green":
        return {
          glow: "rgba(16, 185, 129, 0.15)",
          accent: "var(--accent-emerald)",
        };
      case "amber":
        return {
          glow: "rgba(245, 158, 11, 0.15)",
          accent: "var(--accent-amber)",
        };
      case "rose":
        return {
          glow: "rgba(239, 68, 68, 0.15)",
          accent: "var(--accent-rose)",
        };
      default:
        return {
          glow: "var(--accent-blue-glow)",
          accent: "var(--accent-blue)",
        };
    }
  };

  const style = getColorStyles();

  return (
    <div
      className="glass-card"
      style={{
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
      }}
    >
      <div className="flex-between">
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
          {title}
        </span>
        <span
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-md)",
            background: style.glow,
            color: style.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
          }}
        >
          <SiteIcon name={icon} size={24} />
        </span>
      </div>

      <div>
        <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>
          {value}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
          {trend && (
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: trend.startsWith("+") ? "var(--accent-emerald)" : "var(--accent-rose)",
              }}
            >
              {trend}
            </span>
          )}
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
