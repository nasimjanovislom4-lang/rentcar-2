"use client";

import { useEffect, useState } from "react";
import SiteIcon from "@/components/SiteIcon";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("autorent_theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("autorent_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  if (!mounted) {
    return <div style={{ width: "42px", height: "42px" }} />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-outline btn-sm"
      style={{
        borderRadius: "var(--radius-full)",
        width: "42px",
        height: "42px",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
      }}
      title={theme === "dark" ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
      aria-label="Mavzuni almashtirish"
      id="theme-toggle-btn"
    >
      <SiteIcon name={theme === "dark" ? "sun" : "moon"} size={20} />
    </button>
  );
}
