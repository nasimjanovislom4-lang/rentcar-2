"use client";

import { useState } from "react";
import { generateContractPDF, ContractData } from "@/lib/contractGenerator";
import SiteIcon from "@/components/SiteIcon";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: any;
}

export default function ContractModal({ isOpen, onClose, bookingData }: ContractModalProps) {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !bookingData) return null;

  const contractData: ContractData = {
    contractNumber: `SH-${bookingData.bookingNumber.replace("RAC-", "")}`,
    bookingNumber: bookingData.bookingNumber,
    date: new Date().toLocaleDateString("uz-UZ"),
    carName: bookingData.car.name,
    plateNumber: bookingData.car.plateNumber,
    vinCode: bookingData.car.vinCode,
    year: bookingData.car.year,
    color: bookingData.car.color,
    clientName: bookingData.client.fullName,
    passportNumber: bookingData.client.passportNumber,
    driverLicenseNumber: bookingData.client.driverLicenseNumber,
    phone: bookingData.client.phone,
    startDate: new Date(bookingData.startDate).toLocaleDateString("uz-UZ"),
    endDate: new Date(bookingData.endDate).toLocaleDateString("uz-UZ"),
    totalDays: bookingData.totalDays,
    dailyRate: bookingData.dailyRate,
    totalPrice: bookingData.totalPrice,
    depositAmount: bookingData.depositAmount,
    mileageAtStart: bookingData.car.mileage,
  };

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      const doc = generateContractPDF(contractData);
      doc.save(`Ijara_Shartnomasi_${contractData.bookingNumber}.pdf`);
    } catch (err) {
      console.error("PDF download error", err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    try {
      const doc = generateContractPDF(contractData);
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    } catch (err) {
      console.error("Print error", err);
    }
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        className="glass-card-elevated"
        style={{
          width: "100%",
          maxWidth: "750px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2.5rem",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
          <div>
            <span className="badge badge-success">Yuridik Hujjat Tayyor</span>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginTop: "0.3rem" }}>
              Ijara Shartnomasi va Qabul-topshirish Dalolatnomasi
            </h2>
          </div>
          <button onClick={onClose} style={{ fontSize: "1.3rem", color: "var(--text-muted)" }}>
            <SiteIcon name="x" size={18} />
          </button>
        </div>

        {/* Paper Contract Preview Box */}
        <div
          style={{
            background: "#ffffff",
            color: "#0f172a",
            padding: "2rem",
            borderRadius: "var(--radius-md)",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            marginBottom: "2rem",
          }}
        >
          <div style={{ textAlign: "center", borderBottom: "2px solid #0f172a", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase" }}>
              Avtotransport Vositasini Ijaraga Berish Shartnomasi
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.8rem", color: "#475569" }}>
              <span>Shartnoma №: {contractData.contractNumber}</span>
              <span>Sana: {contractData.date}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <p>
              <strong>Ijaraga beruvchi:</strong> "AutoRent Pro" MCHJ (Toshkent sh., Bunyodkor 42).
            </p>
            <p>
              <strong>Ijaraga oluvchi:</strong> {contractData.clientName} (Pasport: {contractData.passportNumber}, Tel: {contractData.phone}).
            </p>
            <p>
              <strong>Avtomobil:</strong> {contractData.carName} (Davlat raqami: {contractData.plateNumber}, VIN: {contractData.vinCode}, Yurgan masofa: {contractData.mileageAtStart.toLocaleString()} km).
            </p>
            <p>
              <strong>Muddat va To'lov:</strong> {contractData.startDate} dan {contractData.endDate} gacha ({contractData.totalDays} kun). Jami: {formatPrice(contractData.totalPrice)} (Depozit: {formatPrice(contractData.depositAmount)}).
            </p>
            <p style={{ fontStyle: "italic", color: "#334155", background: "#f1f5f9", padding: "0.5rem", borderRadius: "4px" }}>
              <SiteIcon name="check" size={14} /> Dalolatnoma: Avtomobil soz, toza holatda, to'liq KASKO sug'urta bilan qabul qilindi va topshirildi.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
          <button onClick={handlePrint} className="btn btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <SiteIcon name="printer" size={16} /> Chop etish
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            id="download-contract-pdf-btn"
          >
            <SiteIcon name="download" size={16} /> {downloading ? "Generatsiya..." : "PDF Shartnomani Yuklab Olish"}
          </button>
        </div>
      </div>
    </div>
  );
}
