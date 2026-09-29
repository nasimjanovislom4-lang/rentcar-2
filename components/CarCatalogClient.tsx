"use client";

import { useState, useMemo } from "react";
import LiveCarFilters, { FilterState } from "@/components/LiveCarFilters";
import CarCard, { CarItemProps } from "@/components/CarCard";

interface CarCatalogClientProps {
  initialCars: CarItemProps[];
  initialCategory?: string;
}

export default function CarCatalogClient({ initialCars, initialCategory }: CarCatalogClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: initialCategory || "ALL",
    transmission: "ALL",
    fuelType: "ALL",
    maxPrice: 2500000,
  });

  const filteredCars = useMemo(() => {
    return initialCars.filter((car) => {
      // Category filter
      if (filters.category !== "ALL" && car.category !== filters.category) {
        return false;
      }
      // Transmission
      if (filters.transmission !== "ALL" && car.transmission !== filters.transmission) {
        return false;
      }
      // Fuel type
      if (filters.fuelType !== "ALL" && car.fuelType !== filters.fuelType) {
        return false;
      }
      // Max price
      if (car.dailyPrice > filters.maxPrice) {
        return false;
      }
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matches =
          car.name.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [initialCars, filters]);

  const handleReset = () => {
    setFilters({
      search: "",
      category: "ALL",
      transmission: "ALL",
      fuelType: "ALL",
      maxPrice: 2500000,
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "290px 1fr",
        gap: "2.5rem",
        alignItems: "flex-start",
      }}
    >
      <LiveCarFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleReset}
        totalFound={filteredCars.length}
      />

      <main>
        {filteredCars.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "3rem" }}>🔍</span>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Hech qanday avtomobil topilmadi</h3>
            <p style={{ color: "var(--text-secondary)", maxWidth: "450px" }}>
              Tanlangan filtrlar bo'yicha mos keladigan avtomobil mavjud emas. Filtrlarni o'zgartirib yoki
              tozalab ko'ring.
            </p>
            <button onClick={handleReset} className="btn btn-primary btn-sm">
              Filtrlarni qayta o'rnatish
            </button>
          </div>
        ) : (
          <div className="grid-cols-auto-fit">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
