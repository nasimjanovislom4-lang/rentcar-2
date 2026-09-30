"use client";

import SiteIcon from "@/components/SiteIcon";

export interface FilterState {
  search: string;
  category: string;
  transmission: string;
  fuelType: string;
  maxPrice: number;
}

interface LiveCarFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalFound: number;
}

export default function LiveCarFilters({
  filters,
  onFilterChange,
  onReset,
  totalFound,
}: LiveCarFiltersProps) {
  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  return (
    <aside
      className="glass-card"
      style={{
        padding: "1.75rem",
        position: "sticky",
        top: "80px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <div className="flex-between">
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Filtrlar</h3>
        <span style={{ fontSize: "0.82rem", color: "var(--accent-blue)", fontWeight: 600 }}>
          {totalFound} ta mashina
        </span>
      </div>

      {/* Search Input */}
      <div className="form-group">
        <label className="form-label"><SiteIcon name="search" size={16} /> Tezkor qidiruv</label>
        <input
          type="text"
          placeholder="Model yoki brend..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="form-input"
          id="car-search-input"
        />
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label"><SiteIcon name="carFront" size={16} /> Kuzov toifasi</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
          {[
            { label: "Barchasi", val: "ALL" },
            { label: "Premium", val: "PREMIUM" },
            { label: "SUV / Jip", val: "SUV" },
            { label: "Sedan", val: "SEDAN" },
            { label: "Ekonom", val: "ECONOMY" },
          ].map((cat) => (
            <button
              key={cat.val}
              type="button"
              onClick={() => onFilterChange({ ...filters, category: cat.val })}
              className={`btn btn-sm ${
                filters.category === cat.val ? "btn-primary" : "btn-outline"
              }`}
              style={{ fontSize: "0.8rem", padding: "0.4rem" }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="form-group">
        <label className="form-label"><SiteIcon name="settings" size={16} /> Uzatmalar qutisi</label>
        <select
          value={filters.transmission}
          onChange={(e) => onFilterChange({ ...filters, transmission: e.target.value })}
          className="form-select"
        >
          <option value="ALL">Barchasi</option>
          <option value="AUTOMATIC">Faqat Avtomat</option>
          <option value="MANUAL">Mexanika</option>
        </select>
      </div>

      {/* Fuel Type */}
      <div className="form-group">
        <label className="form-label"><SiteIcon name="fuel" size={16} /> Yonilg'i turi</label>
        <select
          value={filters.fuelType}
          onChange={(e) => onFilterChange({ ...filters, fuelType: e.target.value })}
          className="form-select"
        >
          <option value="ALL">Barchasi</option>
          <option value="PETROL">Benzin</option>
          <option value="ELECTRIC">Elektr (EV)</option>
          <option value="HYBRID">Gibrid</option>
        </select>
      </div>

      {/* Price Slider */}
      <div className="form-group">
        <div className="flex-between">
          <label className="form-label"><SiteIcon name="circleDollar" size={16} /> Maksimal narx / kun</label>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-blue)" }}>
            {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="300000"
          max="2500000"
          step="50000"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          style={{ width: "100%", accentColor: "var(--accent-blue)", cursor: "pointer" }}
        />
        <div className="flex-between" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          <span>300 ming</span>
          <span>2.5 mln</span>
        </div>
      </div>

      {/* Reset button */}
      <button onClick={onReset} className="btn btn-outline btn-sm" style={{ marginTop: "0.5rem" }}>
        Filtrlarni tozalash
      </button>
    </aside>
  );
}
