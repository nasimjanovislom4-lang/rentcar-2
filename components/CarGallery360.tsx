"use client";

import { useState } from "react";

interface CarGallery360Props {
  images: string[];
  carName: string;
}

export default function CarGallery360({ images, carName }: CarGallery360Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const safeImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  ];

  const handleRotateToggle = () => {
    if (!isRotating) {
      setIsRotating(true);
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % safeImages.length);
      }, 900);
      setTimeout(() => {
        clearInterval(interval);
        setIsRotating(false);
      }, safeImages.length * 900 * 2);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Main Image Container */}
      <div
        className="glass-card"
        style={{
          position: "relative",
          width: "100%",
          height: "460px",
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safeImages[activeIndex]}
          alt={`${carName} ko'rinishi ${activeIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.3s ease",
          }}
        />

        {/* 360 Interactive Badge & Button */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            display: "flex",
            gap: "0.6rem",
          }}
        >
          <button
            onClick={handleRotateToggle}
            className="btn btn-primary btn-sm"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(37, 99, 235, 0.85)",
            }}
          >
            🔄 {isRotating ? "Aylanmoqda..." : "360° Ko'rish"}
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            padding: "0.3rem 0.8rem",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.8rem",
            color: "#ffffff",
          }}
        >
          Burchak {activeIndex + 1} / {safeImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: "0.8rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
        {safeImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            style={{
              width: "100px",
              height: "70px",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: activeIndex === idx ? "2px solid var(--accent-blue)" : "1px solid var(--border-glass)",
              opacity: activeIndex === idx ? 1 : 0.6,
              transition: "all var(--transition-fast)",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
