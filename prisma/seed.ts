import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");
  await prisma.notification.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.client.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding users (RBAC)...");
  await prisma.user.createMany({
    data: [
      {
        name: "Alisher Usmonov",
        email: "admin@autorent.uz",
        passwordHash: "hash_admin_123",
        role: "SUPER_ADMIN",
      },
      {
        name: "Jasur Rahimov",
        email: "manager@autorent.uz",
        passwordHash: "hash_manager_123",
        role: "MANAGER",
      },
      {
        name: "Temur Xalilov",
        email: "mechanic@autorent.uz",
        passwordHash: "hash_mechanic_123",
        role: "MECHANIC",
      },
      {
        name: "Dilnoza Karimova",
        email: "accountant@autorent.uz",
        passwordHash: "hash_accountant_123",
        role: "ACCOUNTANT",
      },
    ],
  });

  console.log("Seeding cars fleet...");
  const car1 = await prisma.car.create({
    data: {
      name: "Chevrolet Tahoe RST",
      brand: "Chevrolet",
      model: "Tahoe",
      year: 2023,
      plateNumber: "01 777 AAA",
      vinCode: "1GNSKCKD9PR123456",
      color: "Qora (Black Metallic)",
      category: "PREMIUM",
      transmission: "AUTOMATIC",
      fuelType: "PETROL",
      seats: 7,
      dailyPrice: 1800000,
      depositAmount: 3000000,
      mileage: 24500,
      status: "AVAILABLE",
      features: JSON.stringify([
        "V8 6.2L dvigatel",
        "Bose 10-dinamikli akustika",
        "Panorama tom",
        "360-kamera",
        "Ventilyatsiyali charm o'rindiqlar",
        "Moslashuvchan kruiz-kontrol",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      ]),
      currentLat: 41.311081,
      currentLng: 69.240562,
      insuranceExpiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      nextServiceDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
  });

  const car2 = await prisma.car.create({
    data: {
      name: "Chevrolet Malibu 2 Premier",
      brand: "Chevrolet",
      model: "Malibu 2",
      year: 2024,
      plateNumber: "01 101 BBA",
      vinCode: "1G1ZD5ST8MF654321",
      color: "Oq marvarid (Pearl White)",
      category: "SEDAN",
      transmission: "AUTOMATIC",
      fuelType: "PETROL",
      seats: 5,
      dailyPrice: 850000,
      depositAmount: 1500000,
      mileage: 18200,
      status: "RENTED",
      features: JSON.stringify([
        "2.0 Turbo 250 ot kuchi",
        "Apple CarPlay & Android Auto",
        "Ikki zonali klimat-kontrol",
        "Charm salon",
        "Elektron qo'l tormozi",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      ]),
      currentLat: 41.328,
      currentLng: 69.281,
      insuranceExpiry: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      nextServiceDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
  });

  const car3 = await prisma.car.create({
    data: {
      name: "BYD Song Plus Champion EV",
      brand: "BYD",
      model: "Song Plus",
      year: 2024,
      plateNumber: "01 888 EEE",
      vinCode: "LGXC41400P1112233",
      color: "Kulrang (Cyber Grey)",
      category: "SUV",
      transmission: "AUTOMATIC",
      fuelType: "ELECTRIC",
      seats: 5,
      dailyPrice: 750000,
      depositAmount: 1200000,
      mileage: 9400,
      status: "AVAILABLE",
      features: JSON.stringify([
        "Bir quvvatda 520 km masofa",
        "15.6 dyuymli aylanuvchi sensorli ekran",
        "Infinity audio tizimi",
        "360 gradusli shaffof kamera",
        "Avtomatik parkovka",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      ]),
      currentLat: 41.299,
      currentLng: 69.225,
      insuranceExpiry: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000),
      nextServiceDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  });

  const car4 = await prisma.car.create({
    data: {
      name: "Kia K5 GT-Line",
      brand: "Kia",
      model: "K5",
      year: 2023,
      plateNumber: "01 900 KAA",
      vinCode: "KNAGM4A79P5998877",
      color: "To'q ko'k (Gravity Blue)",
      category: "SEDAN",
      transmission: "AUTOMATIC",
      fuelType: "PETROL",
      seats: 5,
      dailyPrice: 950000,
      depositAmount: 1500000,
      mileage: 28900,
      status: "MAINTENANCE",
      features: JSON.stringify([
        "Sport uslubidagi GT-Line salon",
        "Rul lepestoklari",
        "LED optika",
        "Simsiz zaryadlash",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
      ]),
      currentLat: 41.345,
      currentLng: 69.215,
      insuranceExpiry: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Expirng soon!
      nextServiceDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Due in 2 days!
    },
  });

  const car5 = await prisma.car.create({
    data: {
      name: "Chevrolet Tracker 2 Premier",
      brand: "Chevrolet",
      model: "Tracker",
      year: 2023,
      plateNumber: "01 543 TTA",
      vinCode: "3GAKFPR29PL443322",
      color: "Qizil (Flame Red)",
      category: "SUV",
      transmission: "AUTOMATIC",
      fuelType: "PETROL",
      seats: 5,
      dailyPrice: 500000,
      depositAmount: 1000000,
      mileage: 32000,
      status: "AVAILABLE",
      features: JSON.stringify([
        "1.2 Turbo motor",
        "Panorama lyuk",
        "Kruiz kontrol",
        "Yorug'lik datchigi",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      ]),
      currentLat: 41.315,
      currentLng: 69.27,
      insuranceExpiry: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000),
      nextServiceDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    },
  });

  const car6 = await prisma.car.create({
    data: {
      name: "Chevrolet Cobalt 4-pozitsiya Style",
      brand: "Chevrolet",
      model: "Cobalt",
      year: 2024,
      plateNumber: "01 321 CCA",
      vinCode: "KL1TF4873PB778899",
      color: "Kumushrang (Switchblade Silver)",
      category: "ECONOMY",
      transmission: "AUTOMATIC",
      fuelType: "PETROL",
      seats: 5,
      dailyPrice: 320000,
      depositAmount: 800000,
      mileage: 14500,
      status: "AVAILABLE",
      features: JSON.stringify([
        "Konditsioner",
        "Old o'rindiqlar isitgichi",
        "Orqa parktronik",
        "Yengil qotishmali disklar",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      ]),
      currentLat: 41.275,
      currentLng: 69.215,
      insuranceExpiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      nextServiceDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
    },
  });

  console.log("Seeding clients...");
  const client1 = await prisma.client.create({
    data: {
      fullName: "Sardorbek Olimov",
      phone: "+998901234567",
      email: "sardor.olimov@gmail.com",
      passportNumber: "AA1234567",
      driverLicenseNumber: "AB9876543",
      status: "VERIFIED",
      rating: 4.9,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      fullName: "Azizbek Yusupov",
      phone: "+998935554433",
      email: "aziz.yusupov@mail.ru",
      passportNumber: "AB7654321",
      driverLicenseNumber: "BC1122334",
      status: "PENDING",
      rating: 5.0,
    },
  });

  const clientBlacklisted = await prisma.client.create({
    data: {
      fullName: "Rustam Qodirov",
      phone: "+998979998877",
      email: "rustam.bad@test.uz",
      passportNumber: "AC9988776",
      driverLicenseNumber: "CD4455667",
      status: "BLACKLISTED",
      blacklistReason: "Avtomobilni 4 kun kechiktirib topshirgan, 2 ta to'lanmagan radar jarimasi mavjud.",
      rating: 1.2,
    },
  });

  console.log("Seeding bookings and contracts...");
  const booking1 = await prisma.booking.create({
    data: {
      bookingNumber: "RAC-2026-001",
      carId: car2.id,
      clientId: client1.id,
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      totalDays: 3,
      dailyRate: car2.dailyPrice,
      extraServices: JSON.stringify(["KASKO sug'urta", "Bolalar o'rindig'i"]),
      totalPrice: car2.dailyPrice * 3 + 250000,
      depositAmount: car2.depositAmount,
      status: "CAR_HANDED",
      paymentStatus: "PAID",
      paymentMethod: "CLICK",
    },
  });

  await prisma.contract.create({
    data: {
      contractNumber: "SH-2026-001",
      bookingId: booking1.id,
      contractDate: new Date(),
      mileageAtStart: 18200,
      fuelLevelAtStart: "100%",
      signedAt: new Date(),
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      bookingNumber: "RAC-2026-002",
      carId: car1.id,
      clientId: client2.id,
      startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      totalDays: 3,
      dailyRate: car1.dailyPrice,
      extraServices: JSON.stringify(["Shaxsiy haydovchi"]),
      totalPrice: car1.dailyPrice * 3 + 600000,
      depositAmount: car1.depositAmount,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      paymentMethod: "PAYME",
    },
  });

  console.log("Seeding expenses...");
  await prisma.expense.createMany({
    data: [
      {
        carId: car1.id,
        type: "OIL_CHANGE",
        amount: 850000,
        description: "Mobil 1 sintetik moy va filtrlarni almashtirish",
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        carId: car4.id,
        type: "REPAIR",
        amount: 1400000,
        description: "Old tormoz kalodkalarini yangilash va kalibrovka",
        date: new Date(),
      },
    ],
  });

  console.log("Seeding notifications...");
  await prisma.notification.createMany({
    data: [
      {
        title: "Texnik ko'rik talab etiladi",
        message: "Kia K5 GT-Line (01 900 KAA) avtomobili 2 kundan so'ng navbatdagi servisga kirishi shart.",
        type: "SERVICE_DUE",
      },
      {
        title: "Sug'urta muddati yaqinlashmoqda",
        message: "Kia K5 GT-Line sug'urta muddati 15 kundan keyin tugaydi.",
        type: "INSURANCE_EXPIRING",
      },
      {
        title: "Yangi buyurtma qabul qilindi",
        message: "Chevrolet Tahoe RST uchun 3 kunlik yangi buyurtma #RAC-2026-002 tasdiqlandi.",
        type: "NEW_BOOKING",
      },
    ],
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
