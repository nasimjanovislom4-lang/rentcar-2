# Car Rental Platform (Rent-a-Car Ecosystem) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Avtomobil ijarasi biznesi uchun to‘liq funksional, zamonaviy UI/UX (Glassmorphism, Dark/Light mode) ga ega Mijoz Portali va Admin CRM & Avtopark nazorati (GPS xarita, Kanban, PDF shartnoma generatori, Blacklist, Moliyaviy hisobotlar, RBAC) tizimini yaratish.

**Architecture:** Next.js App Router (TypeScript, React 19) asosida bitta fullstack tizim. Relyatsion ma'lumotlar bazasi sifatida SQLite va Prisma ORM, dizayn uchun maxsus Vanilla CSS dizayn tizimi, xaritalar uchun Leaflet (OpenStreetMap) va hujjatlar uchun PDF generator ishlatiladi.

**Tech Stack:** Next.js, React 19, TypeScript, Prisma ORM, SQLite (`prisma/dev.db`), Vanilla CSS (CSS Variables & Glassmorphism), Leaflet / OpenStreetMap, Canvas/SVG Charts.

**Spec:** `docs/superpowers/specs/2026-09-29-car-rental-platform-design.md`

## Global Constraints
- Freymvork: Next.js App Router (TypeScript).
- Ma'lumotlar bazasi: SQLite (`prisma/dev.db`) Prisma ORM orqali boshqariladi.
- Dizayn: Maxsus Vanilla CSS (TailwindCSS ishlatilmaydi; CSS custom properties, backdrop-filter, responsive flexbox/grid).
- Til va valyuta: Interfeys o'zbek tilida, valyuta so'mda (UZS).
- Barcha sahifalar va interaktiv tugmalar noyob `id` yoki semantik selektorlarga ega bo'lishi shart.

## Review Focus
1. Sanalar to'qnashuvi (Double booking): avtomobil bir vaqtning o'zida ikkita buyurtma tomonidan band qilinmasligi kerak.
2. Qora ro'yxat (Blacklist): `BLACKLISTED` statusidagi mijoz yangi buyurtma yuborganida tizim xatolik qaytarishi shart.
3. Narx hisob-kitobi: ijara kunlari, qo'shimcha xizmatlar va depozit aniq matematik hisoblanishi kerak.
4. Shartnoma generatsiyasi: PDF shartnomada barcha rekvizitlar (avtomobil, mijoz, sana, narx) to'liq aks etishi shart.
5. RBAC: operatorlar narx va xodimlarni o'zgartira olmasligi, mexanik faqat texnik qismini boshqarishi kerak.

---

### Task 1: Next.js Loyihasini Initsializatsiya Qilish va Boshlang'ich Sozlamalar
**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`
- Create: `app/layout.tsx`, `app/page.tsx`

**Interfaces:**
- Produces: Ishchi Next.js App Router serveri va TypeScript konfiguratsiyasi.

- [x] **Step 1: package.json va bog'liqliklarni o'rnatish**
  * `next`, `react`, `react-dom`, `@prisma/client`, `prisma`, `typescript`, `@types/node`, `@types/react` paketlarini sozlash va o'rnatish.
- [x] **Step 2: tsconfig.json va next.config.ts yaratish**
- [x] **Step 3: Boshlang'ich app/layout.tsx va app/page.tsx ni tekshirish**
- [x] **Step 4: Ishga tushirishni va buildni tekshirish (`npm run build`)**
- [x] **Step 5: Commit**
  ```bash
  git add .
  git commit -m "chore: scaffold Next.js TypeScript project with basic layout"
  ```

---

### Task 2: Vanilla CSS Dizayn Tizimi (Design Tokens, Glassmorphism va Dark/Light Theme)
**Files:**
- Create: `app/globals.css`
- Create: `components/ThemeToggle.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `--bg-primary`, `--bg-surface`, `--text-primary`, `--accent-blue`, `--accent-yellow`, `--accent-green`, `--glass-bg`, `--glass-border` CSS o'zgaruvchilari va rejim almashtiruvchi komponent.

- [x] **Step 1: app/globals.css da to'liq ranglar va Glassmorphic sinflarni yozish**
- [x] **Step 2: components/ThemeToggle.tsx yaratish (localStorage bilan ishlash)**
- [x] **Step 3: app/layout.tsx ga ThemeToggle va globals.css ni ulash**
- [x] **Step 4: Mavzu almashinishini brauzerda tekshirish**
- [x] **Step 5: Commit**
  ```bash
  git add app/globals.css components/ThemeToggle.tsx app/layout.tsx
  git commit -m "feat: implement Vanilla CSS design tokens and dark/light theme switcher"
  ```

---

### Task 3: Prisma Sxemasi, SQLite Bazasi va Dastlabki Ma'lumotlar (Seed)
**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/prisma.ts`
- Create: `prisma/seed.ts`
- Modify: `package.json` (prisma seed skripti)

**Interfaces:**
- Produces: `Car`, `Client`, `Booking`, `Contract`, `Expense`, `User`, `Notification` modellari va `prisma` singleton mijozi.

- [x] **Step 1: prisma/schema.prisma faylini spetsifikatsiyadagi modellar bilan to'ldirish**
- [x] **Step 2: lib/prisma.ts faylida PrismaClient singleton yaratish**
- [x] **Step 3: prisma/seed.ts da O'zbekiston bozoridagi real avtomobillar (Tahoe, Malibu 2, Tracker 2, BYD Song Plus, Cobalt, Kia K5), dastlabki mijozlar, buyurtmalar va admin xodimlarni kiritish**
- [x] **Step 4: `npx prisma db push` va `npx tsx prisma/seed.ts` komandalarini yurgizib bazani to'ldirish**
- [x] **Step 5: Commit**
  ```bash
  git add prisma/ lib/prisma.ts
  git commit -m "feat: setup Prisma SQLite schema and seed mock automotive data"
  ```

---

### Task 4: Mijoz Portali — Asosiy Bosh Sahifa (Landing Page)
**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`
- Create: `components/HeroQuickSearch.tsx`
- Create: `components/CarCard.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `prisma.car.findMany()`
- Produces: Bosh sahifadagi qidiruv paneli, mashhurlar vidjeti, afzalliklar va sharhlar bloklari.

- [x] **Step 1: components/Navbar.tsx va components/Footer.tsx yaratish**
- [x] **Step 2: components/CarCard.tsx (Glassmorphism, hover effektlar, narx, o'rindiqlar va transmissiya ko'rinishi)**
- [x] **Step 3: components/HeroQuickSearch.tsx (olish joyi, sana/vaqt tanlash va katalogga yo'naltirish)**
- [x] **Step 4: app/page.tsx ni yig'ish va server component orqali avtomobillarni ko'rsatish**
- [x] **Step 5: Commit**
  ```bash
  git add app/page.tsx components/
  git commit -m "feat: build modern client landing page with hero search and car cards"
  ```

---

### Task 5: Mijoz Portali — Katalog, Jonli Filtrlar va Avtomobil Sahifasi
**Files:**
- Create: `app/cars/page.tsx`
- Create: `components/LiveCarFilters.tsx`
- Create: `app/cars/[id]/page.tsx`
- Create: `components/CarGallery360.tsx`
- Create: `components/AvailabilityCalendar.tsx`

**Interfaces:**
- Consumes: `/api/cars` va `prisma.car.findUnique()`
- Produces: Dinamik filtrlash (sahifani yangilamasdan), 360/galereya ko'rinishi va bandlik taqvimi.

- [x] **Step 1: app/api/cars/route.ts API handlerini yaratish**
- [x] **Step 2: components/LiveCarFilters.tsx (kuzov, yoqilg'i, transmissiya, narx slayderi)**
- [x] **Step 3: app/cars/page.tsx katalog sahifasini yaratish**
- [x] **Step 4: components/CarGallery360.tsx va AvailabilityCalendar.tsx yaratish**
- [x] **Step 5: app/cars/[id]/page.tsx mashina tafsilotlari sahifasini qurish**
- [x] **Step 6: Commit**
  ```bash
  git add app/cars/ app/api/cars/ components/
  git commit -m "feat: car catalog with live filters and car detail page with gallery and calendar"
  ```

---

### Task 6: Mijoz Portali — 1-Sahifali Tezkor Buyurtma (Checkout) va Buyurtma Holati
**Files:**
- Create: `app/checkout/page.tsx`
- Create: `app/booking/[id]/page.tsx`
- Create: `app/api/bookings/route.ts`
- Create: `lib/pricing.ts`
- Create: `tests/pricing.test.ts`

**Interfaces:**
- Consumes: `calculateBookingPrice(days, dailyRate, extraServices, deposit)`
- Produces: Yangi buyurtma yaratish, sanalar to'qnashuvi va qora ro'yxat tekshiruvi.

- [x] **Step 1: lib/pricing.ts da narx hisoblagichini yaratish va unit test yozish**
- [x] **Step 2: app/api/bookings/route.ts (POST: tekshirish, mijoz yaratish/yangilash, buyurtma yozish)**
- [x] **Step 3: app/checkout/page.tsx (sana -> qo'shimcha xizmatlar -> mijoz ma'lumotlari -> to'lov usuli)**
- [x] **Step 4: app/booking/[id]/page.tsx (buyurtma kodi, holati va qisqacha ma'lumotlar)**
- [x] **Step 5: Commit**
  ```bash
  git add app/checkout/ app/booking/ app/api/bookings/ lib/pricing.ts tests/
  git commit -m "feat: implement one-page checkout flow with conflict checks and receipt page"
  ```

---

### Task 7: Admin Panel — Dashboard (Real-vaqt Ko'rsatkichlari va Bildirishnomalar)
**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/dashboard/page.tsx`
- Create: `components/admin/AdminSidebar.tsx`
- Create: `components/admin/StatCard.tsx`
- Create: `components/admin/NotificationList.tsx`
- Create: `app/api/admin/stats/route.ts`

**Interfaces:**
- Produces: Bugungi tushum, faol ijaradagi mashinalar, kutilayotgan buyurtmalar va texnik ogohlantirishlar vidjeti.

- [x] **Step 1: app/admin/layout.tsx va components/admin/AdminSidebar.tsx navigatsiyasini qurish**
- [x] **Step 2: app/api/admin/stats/route.ts (real tushum, mashinalar holati, statistikalar)**
- [x] **Step 3: app/admin/dashboard/page.tsx va StatCard / NotificationList komponentlarini yig'ish**
- [x] **Step 4: Commit**
  ```bash
  git add app/admin/ components/admin/ app/api/admin/
  git commit -m "feat: admin layout and dashboard with real-time stats and alert notifications"
  ```

---

### Task 8: Admin Panel — Avtopark Boshqaruvi va GPS Xarita Monitoringi
**Files:**
- Create: `app/admin/fleet/page.tsx`
- Create: `components/admin/GPSMap.tsx`
- Create: `components/admin/CarEditModal.tsx`
- Create: `app/api/admin/cars/route.ts`

**Interfaces:**
- Produces: Avtopark ro'yxati, Leaflet GPS xaritasi, yangi avtomobil qo'shish va texnik xizmat/ROI hisobi.

- [x] **Step 1: components/admin/GPSMap.tsx (Leaflet xaritasi bilan avtomobillar joylashuvi markerlari)**
- [x] **Step 2: components/admin/CarEditModal.tsx (avtomobil qo'shish va tahrirlash)**
- [x] **Step 3: app/admin/fleet/page.tsx sahifasida avtopark jadvali va xarajatlar/ROI moduli**
- [x] **Step 4: Commit**
  ```bash
  git add app/admin/fleet/ components/admin/GPSMap.tsx components/admin/CarEditModal.tsx
  git commit -m "feat: fleet management with interactive GPS tracking map and vehicle ROI editor"
  ```

---

### Task 9: Admin Panel — Buyurtmalar Boshqaruvi (Kanban) va Avtomatik PDF Shartnoma Generatori
**Files:**
- Create: `app/admin/bookings/page.tsx`
- Create: `components/admin/KanbanBoard.tsx`
- Create: `components/admin/ContractModal.tsx`
- Create: `lib/contractGenerator.ts`
- Create: `app/api/admin/contracts/route.ts`

**Interfaces:**
- Produces: Buyurtmalar holatini drag/click bilan o'zgartirish, O'zbekiston qonunchiligiga mos rasmiy PDF shartnoma va qabul-topshirish aktini generatsiya qilish.

- [x] **Step 1: components/admin/KanbanBoard.tsx (statuslar oqimi)**
- [x] **Step 2: lib/contractGenerator.ts (shartnoma va topshirish dalolatnomasi matnlari va PDF generator)**
- [x] **Step 3: components/admin/ContractModal.tsx (shartnomani ko'rish, chop etish va yuklab olish)**
- [x] **Step 4: app/admin/bookings/page.tsx ga ulash**
- [x] **Step 5: Commit**
  ```bash
  git add app/admin/bookings/ components/admin/KanbanBoard.tsx lib/contractGenerator.ts
  git commit -m "feat: bookings Kanban board and automated PDF contract & handover act generator"
  ```

---

### Task 10: Admin Panel — Mijozlar Bazasi, Hujjat Verifikatsiyasi, Blacklist va RBAC
**Files:**
- Create: `app/admin/clients/page.tsx`
- Create: `app/admin/finance/page.tsx`
- Create: `app/admin/team/page.tsx`
- Create: `components/admin/ClientDetailModal.tsx`

**Interfaces:**
- Produces: Mijoz profili, hujjatlarni tasdiqlash/rad etish, qora ro'yxatga olish, moliyaviy hisobotlar va xodimlar rollari (RBAC).

- [x] **Step 1: app/admin/clients/page.tsx va ClientDetailModal (verifikatsiya va Blacklist)**
- [x] **Step 2: app/admin/finance/page.tsx (tushumlar grafigi, to'lov turlari, CSV/Excel eksport)**
- [x] **Step 3: app/admin/team/page.tsx (rollar: Super Admin, Menejer, Mexanik, Buxgalter)**
- [x] **Step 4: Commit**
  ```bash
  git add app/admin/clients/ app/admin/finance/ app/admin/team/
  git commit -m "feat: customer CRM with blacklist verification, financial reports and RBAC"
  ```

---

### Task 11: To'liq Tizim Verifikatsiyasi, Build va Sinovdan O'tkazish
**Files:**
- Modify: barcha sahifalar (kerakli tuzatishlar)

**Interfaces:**
- Produces: Xatosiz TypeScript kompilyatsiyasi (`tsc --noEmit`), muvaffaqiyatli `npm run build` va to'liq ishchi tizim.

- [x] **Step 1: TypeScript tekshiruvini yurgizish (`npx tsc --noEmit`)**
- [x] **Step 2: Next.js ishlab chiqarish buildini yurgizish (`npm run build`)**
- [x] **Step 3: Mijoz portali va Admin CRM to'liq integratsiyasini tekshirish**
- [x] **Step 4: Yakuniy commit**
  ```bash
  git add .
  git commit -m "chore: complete car rental platform verification and build"
  ```
