import SiteIcon from "@/components/SiteIcon";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: Date;
}

export default function NotificationList({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  const getBadge = (type: string) => {
    switch (type) {
      case "SERVICE_DUE":
        return <span className="badge badge-warning"><SiteIcon name="wrench" size={14} /> Texnik ko'rik</span>;
      case "INSURANCE_EXPIRING":
        return <span className="badge badge-danger"><SiteIcon name="shieldCheck" size={14} /> Sug'urta</span>;
      case "NEW_BOOKING":
        return <span className="badge badge-success"><SiteIcon name="sparkles" size={14} /> Yangi bron</span>;
      default:
        return <span className="badge badge-info"><SiteIcon name="bell" size={14} /> Eslatma</span>;
    }
  };

  return (
    <div className="glass-card" style={{ padding: "1.75rem" }}>
      <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
        <div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Tezkor Ogohlantirishlar</h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Zudlik bilan e'tibor qaratish kerak bo'lgan holatlar
          </span>
        </div>
        <span className="badge badge-warning">{notifications.length} ta xabar</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {notifications.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Hozircha yangi ogohlantirishlar yo'q.</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <div className="flex-between">
                <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                  {notif.title}
                </strong>
                {getBadge(notif.type)}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {notif.message}
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                {new Date(notif.createdAt).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
