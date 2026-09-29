import { jsPDF } from "jspdf";

export interface ContractData {
  contractNumber: string;
  bookingNumber: string;
  date: string;
  carName: string;
  plateNumber: string;
  vinCode: string;
  year: number;
  color: string;
  clientName: string;
  passportNumber: string;
  driverLicenseNumber: string;
  phone: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyRate: number;
  totalPrice: number;
  depositAmount: number;
  mileageAtStart: number;
}

export function generateContractPDF(data: ContractData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
  };

  // Header / Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("AVTOTRANSPORT VOSITASINI IJARAGA BERISH SHARTNOMASI", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Shartnoma №: ${data.contractNumber}`, 20, 30);
  doc.text(`Sana: ${data.date}`, 190, 30, { align: "right" });
  doc.text(`Toshkent shahri`, 20, 35);

  // Line separator
  doc.setLineWidth(0.4);
  doc.line(20, 38, 190, 38);

  // Parties
  doc.setFont("helvetica", "bold");
  doc.text("1. SHARTNOMA TOMONLARI", 20, 45);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Ijaraga beruvchi: "AutoRent Pro" MCHJ (Manzil: Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi 42, Tel: +998 71 200 00 00).`,
    20,
    52,
    { maxWidth: 170 }
  );
  doc.text(
    `Ijaraga oluvchi: ${data.clientName} (Pasport: ${data.passportNumber}, Guvohnoma: ${data.driverLicenseNumber}, Tel: ${data.phone}).`,
    20,
    62,
    { maxWidth: 170 }
  );

  // Object of Contract
  doc.setFont("helvetica", "bold");
  doc.text("2. SHARTNOMA PREDMETI VA AVTOMOBIL REKVIZITLARI", 20, 75);
  doc.setFont("helvetica", "normal");
  doc.text(`• Rusumi va modeli: ${data.carName}`, 25, 82);
  doc.text(`• Davlat raqam belgisi: ${data.plateNumber}`, 25, 88);
  doc.text(`• VIN-kod (Kuzov raqami): ${data.vinCode}`, 25, 94);
  doc.text(`• Ishlab chiqarilgan yili: ${data.year}-yil, Rangi: ${data.color}`, 25, 100);
  doc.text(`• Topsirish vaqtidagi odometr ko'rsatkichi: ${data.mileageAtStart.toLocaleString()} km`, 25, 106);

  // Rental Period & Price
  doc.setFont("helvetica", "bold");
  doc.text("3. IJARA MUDDATI, TO'LOV VA DEPOZIT GAROVI", 20, 116);
  doc.setFont("helvetica", "normal");
  doc.text(`• Ijara boshlanish sanasi: ${data.startDate}`, 25, 123);
  doc.text(`• Qaytarish sanasi: ${data.endDate} (Jami muddat: ${data.totalDays} sutka)`, 25, 129);
  doc.text(`• Kunlik ijara qiymati: ${formatPrice(data.dailyRate)}`, 25, 135);
  doc.text(`• Jami to'lov miqdori: ${formatPrice(data.totalPrice)}`, 25, 141);
  doc.text(`• Qaytariladigan garov depoziti: ${formatPrice(data.depositAmount)}`, 25, 147);

  // Handover section
  doc.setFont("helvetica", "bold");
  doc.text("4. AVTOMOBILNI QABUL QILISH-TOPSHIRISH DALOLATNOMASI", 20, 158);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Ushbu dalolatnoma bilan Ijaraga beruvchi yuqorida ko'rsatilgan avtomobilni toza, texnik soz holatda, to'liq KASKO sug'urta polisi va texnik pasport bilan birga Ijaraga oluvchiga topshirdi. Ijaraga oluvchi avtomobilni qabul qilib oldi va unda ko'rinib turgan nuqsonlar yo'qligini tasdiqlaydi.`,
    20,
    165,
    { maxWidth: 170 }
  );

  // Obligations
  doc.setFont("helvetica", "bold");
  doc.text("5. TOMONLARNING JAVOBGARLIGI", 20, 185);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Ijaraga oluvchi yo'l harakati qoidalariga qat'iy rioya qilishi, ijara muddatida yuzaga kelgan radar jarimalarini to'lashi va avtomobilni o'z vaqtida qaytarishi shart. Kechiktirilgan har bir soat uchun 50 000 so'm qo'shimcha jarima hisoblanadi.`,
    20,
    192,
    { maxWidth: 170 }
  );

  // Signatures
  doc.line(20, 215, 190, 215);

  doc.setFont("helvetica", "bold");
  doc.text("IJARAGA BERUVCHI:", 25, 225);
  doc.text("IJARAGA OLUVCHI:", 120, 225);

  doc.setFont("helvetica", "normal");
  doc.text('"AutoRent Pro" MCHJ vakili', 25, 233);
  doc.text("Imzo: _____________________", 25, 245);
  doc.text("M.O'. (Muhr o'rni)", 25, 255);

  doc.text(`${data.clientName}`, 120, 233);
  doc.text("Imzo: _____________________", 120, 245);

  return doc;
}
