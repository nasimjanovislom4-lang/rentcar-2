import Link from "next/link";
import SiteIcon from "@/components/SiteIcon";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-secondary)",
        padding: "3.5rem 0 2rem",
        marginTop: "5rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 800,
                fontSize: "1.2rem",
                marginBottom: "1rem",
              }}
            >
              <SiteIcon name="carFront" size={20} /> AutoRent <span style={{ color: "var(--accent-blue)" }}>Pro</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Toshkent va butun O'zbekiston bo'ylab premium va ishonchli avtomobillar ijarasi.
              To'liq KASKO sug'urta va cheklovlarsiz erkin harakat.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "1rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
              Tezkor havolalar
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
              }}
            >
              <li>
                <Link href="/cars">Barcha avtomobillar</Link>
              </li>
              <li>
                <Link href="/cars?category=PREMIUM">Premium toifa</Link>
              </li>
              <li>
                <Link href="/cars?category=SUV">Krossoverlar & SUV</Link>
              </li>
              <li>
                <Link href="/admin/dashboard">Admin Boshqaruv Paneli</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "1rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
              Aloqa ma'lumotlari
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
              }}
            >
              <p><SiteIcon name="mapPin" size={16} /> Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi 42</p>
              <p><SiteIcon name="phone" size={16} /> +998 71 200 00 00 / +998 90 123 45 67</p>
              <p><SiteIcon name="mail" size={16} /> info@autorent.uz</p>
              <p><SiteIcon name="clock" size={16} /> Ish tartibi: 24/7 dam olish kunlarisiz</p>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p>© 2026 AutoRent Pro. Barcha huquqlar himoyalangan.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Ommaviy oferta</span>
            <span>Maxfiylik siyosati</span>
            <span>Shartnoma shartlari</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
