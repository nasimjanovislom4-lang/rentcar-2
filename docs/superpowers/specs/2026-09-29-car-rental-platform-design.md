# Avtomobil Ijarasi Platformasi (Rent-a-Car Ecosystem) — Texnik Spetsifikatsiya

## 1. Loyihaning Maqsadi va Umumiy Tavsifi
Ushbu loyiha avtomobillarni ijaraga berish biznesi uchun to‘liq funksional, zamonaviy va yuqori darajada avtomatlashtirilgan web platformadir. Platforma ikki asosiy mustaqil qismdan iborat:
1. **Mijoz Portali (Client Booking Portal)** — foydalanuvchilar uchun avtomobil qidirish, jonli filtrlar orqali tanlash, 360-gradus/galereya ko‘rinishida o‘rganish, bandlik taqvimini tekshirish va 1 sahifada (One-page Checkout) buyurtma berish imkoniyati.
2. **Admin Panel & CRM (Fleet Management)** — avtopark nazorati (GPS xarita monitoringi, texnik holat va xarajatlar/ROI), buyurtmalar oqimini Kanban/Jadvalda boshqarish, PDF shartnoma va qabul-topshirish aktini bir tugma bilan shakllantirish, mijozlar bazasi (hujjat verifikatsiyasi va Blacklist), moliyaviy hisobotlar va RBAC (rollarga asoslangan huquqlar).

---

## 2. Texnologik Stek va Arxitektura
* **Asosiy Freymvork**: Next.js (App Router, React 19, TypeScript).
* **Ma'lumotlar Bazasi va ORM**: SQLite (`prisma/dev.db`) + Prisma ORM. Lokal faylli relyatsion baza, hech qanday tashqi servis talab qilmaydi.
* **Dizayn Tizimi**: Maxsus ishlab chiqilgan **Vanilla CSS Dizayn Tizimi** (CSS Variables, Clean Glassmorphism & Neomorphism aksentlar, Dark/Light Mode, mikro-animatsiyalar, to‘liq adaptiv dizayn).
* **Xaritalar**: Leaflet va OpenStreetMap (avtomobillarning GPS koordinatalarini jonli ko‘rsatish).
* **Hujjatlar (PDF Generator)**: HTML/CSS shablonlar asosida dinamik PDF generatsiya qilish (`jspdf` / `html2canvas` yoki server-side PDF generator).
* **Grafiklar va Vizualizatsiya**: Zamonaviy SVG/Canvas asosidagi analitika vidjetlari.

---

## 3. UI/UX Dizayn Talablari
* **Dizayn tili**: Neomorphic va Clean Glassmorphism uyg‘unlashgan minimalist premium interfeys.
* **Ranglar**:
  * Chuqur Dark rejim fon: `#0a0e17`, yuzalar: `rgba(255, 255, 255, 0.04)` bilan `backdrop-filter: blur(16px)`.
  * Yorug‘ Light rejim fon: `#f8fafc`, yuzalar: `rgba(255, 255, 255, 0.85)`.
  * Asosiy brend rangi: Chuqur to‘q ko‘k (`#0f172a`, `#1e293b`).
  * Aksent ranglar: Neon ko‘k (`#2563eb`, `#38bdf8`), Oltin-sariq (`#f59e0b`), Zangori yashil (`#10b981`), Qizil rad/ogohlantirish (`#ef4444`).
* **Mavzuni almashtirish (Theme Switcher)**: Foydalanuvchi tanlagan mavzu `localStorage`da saqlanadi va brauzer qayta ochilganda eslab qolinadi.
* **Responsivlik**: Mobil telefonlar (360px+), planshetlar va desktop (1920px+) ekranlarga to‘liq moslashuvchan.

---

## 4. Foydalanuvchi Yo‘llari va Sahifalar (User Flows)

### 4.1. Mijoz Portali (Client Facing)
1. **Bosh Sahifa (`/`)**:
   * Hero qismi: jozibador shior, tezkor qidiruv paneli (Olish va qaytarish joyi, sana va vaqt).
   * Ommabop avtomobillar vidjeti: kategoriyalar bo‘yicha ajratilgan (Premium, SUV, Sedan, Ekonom).
   * "Nega aynan biz?" afzalliklar bloki (KASKO sug‘urta, 24/7 yordam, 100% toza avtomobillar, yashirin to‘lovlarsiz).
   * Haqiqiy mijozlar sharhlari va FAQ (ko‘p so‘raladigan savollar).
2. **Katalog va Qidiruv (`/cars`)**:
   * Jonli interaktiv filtrlar (sahifani yangilamasdan): kuzov turi, transmissiya (Avtomat/Mexanika), yoqilg‘i turi (Benzin/Dizel/Gibrid/Elektr), narx diapazoni slayderi.
   * Avtomobil kartochkalari: surat, brend, model, narx/kun, o‘rindiqlar soni, uzatmalar qutisi, yoqilg‘i sarfi va "Bron qilish" tezkor tugmasi.
3. **Avtomobil Tafsilotlari (`/cars/[id]`)**:
   * 360-gradus / interaktiv fotogalereya (tashqi va ichki salon ko‘rinishlari).
   * To‘liq texnik xususiyatlar jadvali.
   * Bandlik taqvimi (bo‘sh va band kunlar rangli indikatorlar bilan ko‘rsatiladi).
   * Narx kalkulyatori va "Bron qilish"ga yo‘naltiruvchi vidjet.
4. **1-Sahifali Tezkor Buyurtma (`/checkout`)**:
   * 1-bosqich: Ijara sanalari va vaqtini aniqlash.
   * 2-bosqich: Qo‘shimcha xizmatlar (Bolalar o‘rindig‘i, KASKO sug‘urta, Shaxsiy haydovchi, GPS navigator).
   * 3-bosqich: Mijoz shaxsiy ma’lumotlari (F.I.SH, telefon raqami, pasport seriyasi, haydovchilik guvohnomasi).
   * 4-bosqich: To‘lov usuli (Payme, Click, Naqd) va jami hisob-kitob (ijara narxi + depozit garov summasi).
5. **Buyurtma Muvaffaqiyati va Holati (`/booking/[id]`)**:
   * Buyurtma kodi (masalan, `RAC-84920`), holat indikatori, chek ko‘rinishi va yuklab olish imkoniyati.

---

### 4.2. Admin Panel & CRM (Admin Facing: `/admin`)
1. **Asosiy Dashboard (`/admin/dashboard`)**:
   * Real-vaqt ko‘rsatkichlari: Bugungi tushum, faol ijaradagi mashinalar soni, bo‘sh mashinalar foizi, kutilayotgan buyurtmalar soni.
   * Tezkor bildirishnomalar (Notifications center): Sug‘urta muddati tugayotgan mashinalar, texnik ko‘rik (moy almashtirish) vaqti yetganlar, kechiktirilayotgan qaytarishlar.
2. **Avtoparkni Boshqarish (`/admin/fleet`)**:
   * Mashinalar ro‘yxati va holati (Bo‘sh, Ijarada, Ta’mirda, Band).
   * GPS Monitoring: Leaflet xaritasi orqali mashinalarning real vaqtdagi koordinatalari, oxirgi tezligi va joylashuvi markerlari.
   * Texnik xizmat va Xarajatlar (ROI): ta’mirlash, moy almashtirish, jarimalar va har bir mashina keltirgan sof daromad tahlili.
   * Yangi avtomobil qo‘shish / tahrirlash modali.
3. **Buyurtmalar va Shartnomalar (`/admin/bookings`)**:
   * Kanban doskasi va filtrlangan Jadval ko‘rinishi.
   * Statuslar: `Yangi` $\rightarrow$ `Hujjat tekshirilmoqda` $\rightarrow$ `Tasdiqlandi` $\rightarrow$ `Mashina topshirildi` $\rightarrow$ `Yakunlandi` $\rightarrow$ `Bekor qilindi`.
   * **Avtomatik Hujjat Generatori**: Mijoz va buyurtma rekvizitlari asosida bir bosishda "Ijara shartnomasi" va "Qabul qilish-topshirish dalolatnomasi"ni PDF formatda shakllantirish, ko‘rish va chop etish.
4. **Mijozlar va Xavfsizlik (`/admin/clients`)**:
   * Mijoz profili: buyurtmalar tarixi, to‘lagan jami summasi, xatti-harakatlar reytingi.
   * Hujjatlarni verifikatsiya qilish (pasport va guvohnoma fotosuratlari tekshiruvi: Tasdiqlash / Rad etish).
   * Qora ro‘yxat (Blacklist): qoidabuzar yoki firibgar mijozlarni sababini yozib bloklash; bloklangan mijozlar sayt orqali buyurtma berolmaydi.
5. **Moliyaviy Hisobotlar (`/admin/finance`)**:
   * Kunlik, haftalik, oylik va yillik tushumlar va xarajatlar dinamikasi grafigi.
   * To‘lov usullari ulushi (Payme, Click, Naqd, Bank o‘tkazmasi).
   * Hisobotlarni Excel (CSV) va PDF formatlarida yuklab olish.
6. **Xodimlar va Huquqlar (`/admin/team` - RBAC)**:
   * Rollar:
     * `Super Admin`: Tizimdagi barcha amallarni bajarish, xodimlar qo‘shish, moliyani to‘liq ko‘rish.
     * `Menejer (Operator)`: Buyurtmalarni qabul qilish, statuslarni o‘zgartirish, mijozlar bilan ishlash, shartnoma chiqarish (narxlarni va xodimlarni o‘zgartira olmaydi).
     * `Mexanik`: Avtopark texnik holati, ta’mirlash xarajatlarini kiritish, odometrni yangilash.
     * `Buxgalter`: Moliyaviy hisobotlar, to‘lovlar va xarajatlar tahlili.

---

## 5. Ma'lumotlar Bazasi Sxemasi (Prisma Models)

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Car {
  id              String      @id @default(cuid())
  name            String
  brand           String
  model           String
  year            Int
  plateNumber     String      @unique
  vinCode         String      @unique
  color           String
  category        String      // "SEDAN", "SUV", "PREMIUM", "ECONOMY"
  transmission    String      // "AUTOMATIC", "MANUAL"
  fuelType        String      // "PETROL", "DIESEL", "HYBRID", "ELECTRIC"
  seats           Int         @default(5)
  dailyPrice      Float
  depositAmount   Float       @default(1000000)
  mileage         Int         @default(0)
  status          String      @default("AVAILABLE") // "AVAILABLE", "RENTED", "MAINTENANCE", "RESERVED"
  features        String      // JSON array string of perks
  images          String      // JSON array of image URLs
  currentLat      Float       @default(41.311081)
  currentLng      Float       @default(69.240562)
  insuranceExpiry DateTime
  nextServiceDate DateTime
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  bookings        Booking[]
  expenses        Expense[]
}

model Client {
  id                  String      @id @default(cuid())
  fullName            String
  phone               String      @unique
  email               String?
  passportNumber      String      @unique
  driverLicenseNumber String      @unique
  passportDocUrl      String?
  licenseDocUrl       String?
  status              String      @default("VERIFIED") // "VERIFIED", "PENDING", "REJECTED", "BLACKLISTED"
  blacklistReason     String?
  rating              Float       @default(5.0)
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  bookings            Booking[]
}

model Booking {
  id             String    @id @default(cuid())
  bookingNumber  String    @unique
  carId          String
  car            Car       @relation(fields: [carId], references: [id])
  clientId       String
  client         Client    @relation(fields: [clientId], references: [id])
  startDate      DateTime
  endDate        DateTime
  totalDays      Int
  dailyRate      Float
  extraServices  String    @default("[]") // JSON string of selected options
  totalPrice     Float
  depositAmount  Float
  status         String    @default("NEW") // "NEW", "CONFIRMED", "VERIFYING_DOCS", "CAR_HANDED", "COMPLETED", "CANCELLED"
  paymentStatus  String    @default("PENDING") // "PENDING", "PAID", "REFUNDED"
  paymentMethod  String    @default("PAYME") // "PAYME", "CLICK", "CASH", "BANK_TRANSFER"
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  contract       Contract?
}

model Contract {
  id                String    @id @default(cuid())
  contractNumber    String    @unique
  bookingId         String    @unique
  booking           Booking   @relation(fields: [bookingId], references: [id])
  contractDate      DateTime  @default(now())
  mileageAtStart    Int
  mileageAtReturn   Int?
  fuelLevelAtStart  String    @default("100%")
  fuelLevelAtReturn String?
  signedAt          DateTime?
  pdfUrl            String?
}

model Expense {
  id          String   @id @default(cuid())
  carId       String
  car         Car      @relation(fields: [carId], references: [id])
  type        String   // "MAINTENANCE", "OIL_CHANGE", "REPAIR", "FINE", "INSURANCE"
  amount      Float
  description String
  date        DateTime @default(now())
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         String   @default("MANAGER") // "SUPER_ADMIN", "MANAGER", "MECHANIC", "ACCOUNTANT"
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
}

model Notification {
  id        String   @id @default(cuid())
  title     String
  message   String
  type      String   // "INSURANCE_EXPIRING", "SERVICE_DUE", "OVERDUE_RETURN", "NEW_BOOKING"
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## 6. Xatoliklarni Boshqarish va Xavfsizlik Qoidalari
1. **Sanalarni to‘qnashuvini oldini olish**:
   * Buyurtma berish paytida tanlangan sanalar oralig‘ida avtomobil band bo‘lsa (`status != CANCELLED`), buyurtma bloklanadi.
2. **Qora ro‘yxat nazorati**:
   * Agar mijozning telefon raqami yoki pasport ma’lumotlari `BLACKLISTED` statusida bo‘lsa, buyurtma qabul qilinmaydi va tegishli tushuntirish beriladi.
3. **Ma’lumotlar tekshiruvi (Input Validation)**:
   * O‘zbekiston telefon raqamlari formati (`+998 XX XXX XX XX`), pasport seriyasi (`AA1234567`) va guvohnoma tekshiriladi.
4. **Rolga asoslangan ruxsatlar**:
   * Har bir admin moduli tegishli rolga mos ravishda cheklanadi (masalan, mexanik faqat `/admin/fleet` texnik qismini va xarajatlarni ko‘radi, moliyaviy hisobotlarni emas).

---

## 7. Testlash va Ishonchlilikni Ta'minlash
* **Unit Testlar**:
  * Narxlarni hisoblash funksiyasi (kunlar soni, chegirmalar, qo‘shimcha xizmatlar, depozit).
  * Sanalarning kesishishini (overlap) tekshiruvchi algoritm.
  * Qora ro‘yxat filtri.
* **Integratsion va E2E Testlar**:
  * Mijoz portalida mashina tanlashdan boshlab, Checkout jarayoni va buyurtma tasdig‘igacha bo‘lgan to‘liq jarayon.
  * Admin panelda yangi mashina qo‘shish, statusni o‘zgartirish, shartnoma generatsiya qilish va yuklab olish.
* **Tizim Tekshiruvi**:
  * `tsc --noEmit` bilan to‘liq TypeScript xatoliklarini tekshirish.
  * `npm run build` orqali ishlab chiqarish buildini xatosiz yig‘ish.
