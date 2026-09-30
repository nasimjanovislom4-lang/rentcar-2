import Link from "next/link";
import SiteIcon from "@/components/SiteIcon";

export interface CarItemProps {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  dailyPrice: number;
  depositAmount: number;
  status: string;
  images: string;
}

export default function CarCard({ car }: { car: CarItemProps }) {
  let parsedImages: string[] = [];
  try {
    parsedImages = JSON.parse(car.images);
  } catch {
    parsedImages = ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"];
  }
  const mainImage = parsedImages[0] || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80";

  const isAvailable = car.status === "AVAILABLE";

  const getStatusBadge = () => {
    switch (car.status) {
      case "AVAILABLE":
        return <span className="badge badge-available"><SiteIcon name="circleDot" size={12} /> Bo'sh</span>;
      case "RENTED":
        return <span className="badge badge-rented"><SiteIcon name="circleDot" size={12} /> Ijarada</span>;
      case "MAINTENANCE":
        return <span className="badge badge-maintenance"><SiteIcon name="circleDot" size={12} /> Servisda</span>;
      default:
        return <span className="badge badge-info"><SiteIcon name="circleDot" size={12} /> Band</span>;
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  };

  return (
    <div
      className="glass-card"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Image container */}
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={car.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />
        <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 2 }}>
          {getStatusBadge()}
        </div>
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 2,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            padding: "0.2rem 0.6rem",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          {car.category}
        </div>
      </div>

      {/* Body details */}
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ marginBottom: "0.8rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.2rem" }}>
            {car.name}
          </h3>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {car.brand} • {car.year}-yil
          </span>
        </div>

        {/* Feature icons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.6rem",
            padding: "0.75rem",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-subtle)",
            fontSize: "0.82rem",
            color: "var(--text-secondary)",
            marginBottom: "1.25rem",
          }}
        >
          <div><SiteIcon name="settings" size={14} /> {car.transmission === "AUTOMATIC" ? "Avtomat" : "Mexanika"}</div>
          <div><SiteIcon name="users" size={14} /> {car.seats} o'rindiq</div>
          <div><SiteIcon name="fuel" size={14} /> {car.fuelType}</div>
          <div><SiteIcon name="shieldCheck" size={14} /> KASKO sug'urta</div>
        </div>

        {/* Price & Action */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.8rem",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Kunlik ijara:</div>
            <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent-blue)" }}>
              {formatPrice(car.dailyPrice)}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/cars/${car.id}`} className="btn btn-outline btn-sm">
              Batafsil
            </Link>
            {isAvailable ? (
              <Link href={`/checkout?carId=${car.id}`} className="btn btn-primary btn-sm">
                Bron qilish
              </Link>
            ) : (
              <button disabled className="btn btn-outline btn-sm" style={{ opacity: 0.5 }}>
                Band
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
