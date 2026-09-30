import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroQuickSearch from "@/components/HeroQuickSearch";
import CarCard from "@/components/CarCard";
import SiteIcon from "@/components/SiteIcon";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cars = await prisma.car.findMany({
    take: 6,
    orderBy: { dailyPrice: "desc" },
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "5rem 0 4rem",
          overflow: "hidden",
          background: "radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              color: "var(--accent-blue)",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            <SiteIcon name="sparkles" size={16} /> O'zbekistondagi №1 Premium Avtomobillar Ijarasi
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
              margin: "0 auto 1.5rem",
            }}
          >
            Sizning qulayligingiz uchun{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #93c5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              eng so'nggi rusumdagi
            </span>{" "}
            avtomobillar
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              maxWidth: "650px",
              margin: "0 auto 3rem",
              lineHeight: 1.6,
            }}
          >
            Keraksiz byurokratiyasiz, 5 daqiqada onlayn bron qiling. Toza salon, to'liq KASKO sug'urtasi
            va Toshkent bo'ylab bepul yetkazib berish.
          </p>

          {/* Quick Search Widget */}
          <HeroQuickSearch />
        </div>
      </section>

      {/* Featured Cars Section */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span
                style={{
                  color: "var(--accent-blue)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Bizning Avtopark
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.3rem" }}>
                Ommabop Avtomobillar
              </h2>
            </div>

            <Link href="/cars" className="btn btn-outline">
              Barcha modellarni ko'rish <SiteIcon name="arrowRight" size={16} />
            </Link>
          </div>

          <div className="grid-cols-auto-fit">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          padding: "5rem 0",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span
              style={{
                color: "var(--accent-amber)",
                fontSize: "0.85rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Afzalliklarimiz
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginTop: "0.4rem" }}>
              Nega mijozlar bizni tanlashadi?
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            <div className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}><SiteIcon name="shieldCheck" size={40} /></div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                100% KASKO Sug'urta
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Barcha avtomobillarimiz to'liq sug'urtalangan. Siz faqat yo'l rohatidan bahramand bo'lasiz.
              </p>
            </div>

            <div className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}><SiteIcon name="zap" size={40} /></div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                5 Daqiqada Rasmiylashtirish
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Passport va haydovchilik guvohnomasi kifoya. Ortiqcha qog'ozbozliksiz bir ekranda buyurtma bering.
              </p>
            </div>

            <div className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}><SiteIcon name="sparkles" size={40} /></div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Ideal Texnik Holat
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Har bir topshirishdan oldin to'liq deteyling va texnik tekshiruvdan o'tgan toza mashinalar.
              </p>
            </div>

            <div className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}><SiteIcon name="mapPin" size={40} /></div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Istalgan Joyga Yetkazish
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Toshkent aeroporti, mehmonxona yoki uyingiz eshigigacha 24/7 avtomobilni yetkazib beramiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>Mijozlarimiz fikrlari</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              500 dan ortiq mamnun mijozlarimizdan haqqoniy sharhlar
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div className="glass-card" style={{ padding: "1.75rem" }}>
              <div style={{ color: "var(--accent-amber)", marginBottom: "0.75rem" }}>
                {Array.from({ length: 5 }, (_, index) => <SiteIcon key={index} name="star" size={16} />)}
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                "Chevrolet Tahoe avtomobilini mehmonlarni kutib olish uchun ijaraga oldik. Mashina yangi, toza,
                aeroportga vaqtida yetkazib berildi. Juda minnatdormiz!"
              </p>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Ulug'bek Fayzullayev</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Biznesmen, Toshkent</div>
            </div>

            <div className="glass-card" style={{ padding: "1.75rem" }}>
              <div style={{ color: "var(--accent-amber)", marginBottom: "0.75rem" }}>
                {Array.from({ length: 5 }, (_, index) => <SiteIcon key={index} name="star" size={16} />)}
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                "BYD Song Plus EV bilan Samarqand va Buxoroga sayohat qildik. Juda tejamkor va qulay krossover.
                Shartnoma tuzish 3 daqiqa vaqt oldi xolos."
              </p>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Shahnoza Karimova</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sayyoh</div>
            </div>

            <div className="glass-card" style={{ padding: "1.75rem" }}>
              <div style={{ color: "var(--accent-amber)", marginBottom: "0.75rem" }}>
                {Array.from({ length: 5 }, (_, index) => <SiteIcon key={index} name="star" size={16} />)}
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                "Kompaniya avtoparki doim alo darajada. Malibu 2 ni tez-tez ish uchrashuvlari uchun olaman.
                Qora ro'yxat va depozit qaytarish tartibi ham juda adolatli."
              </p>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Bobur Mansurov</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>IT Menejer</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
