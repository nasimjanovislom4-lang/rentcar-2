import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateBookingPrice } from "@/lib/pricing";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      carId,
      fullName,
      phone,
      email,
      passportNumber,
      driverLicenseNumber,
      startDate,
      endDate,
      extraServices = [],
      paymentMethod = "PAYME",
    } = body;

    if (!carId || !fullName || !phone || !passportNumber || !driverLicenseNumber || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "Barcha majburiy maydonlarni to'ldiring." },
        { status: 400 }
      );
    }

    // 1. Check Car existence and availability
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json(
        { success: false, error: "Avtomobil topilmadi." },
        { status: 404 }
      );
    }

    // 2. Check Blacklist
    const existingBlacklistedClient = await prisma.client.findFirst({
      where: {
        OR: [
          { phone },
          { passportNumber },
          { driverLicenseNumber },
        ],
        status: "BLACKLISTED",
      },
    });

    if (existingBlacklistedClient) {
      return NextResponse.json(
        {
          success: false,
          error: `Kechirasiz, ushbu mijoz xavfsizlik tekshiruvidan o'tmadi (Qora ro'yxatda). Sabab: ${
            existingBlacklistedClient.blacklistReason || "Kompaniya qoidalarining buzilishi"
          }`,
        },
        { status: 403 }
      );
    }

    // 3. Double Booking Conflict Check
    const start = new Date(startDate);
    const end = new Date(endDate);

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        status: { notIn: ["CANCELLED", "COMPLETED"] },
        OR: [
          {
            startDate: { lte: end },
            endDate: { gte: start },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: "Tanlangan sanalarda ushbu avtomobil allaqachon band qilingan. Iltimos, boshqa sanalarni yoki boshqa avtomobilni tanlang.",
        },
        { status: 409 }
      );
    }

    // 4. Calculate final pricing
    const pricing = calculateBookingPrice({
      dailyRate: car.dailyPrice,
      startDate: start,
      endDate: end,
      depositAmount: car.depositAmount,
      extraServices,
    });

    // 5. Upsert client
    let client = await prisma.client.findFirst({
      where: {
        OR: [{ phone }, { passportNumber }],
      },
    });

    if (client) {
      client = await prisma.client.update({
        where: { id: client.id },
        data: {
          fullName,
          phone,
          email: email || client.email,
          passportNumber,
          driverLicenseNumber,
        },
      });
    } else {
      client = await prisma.client.create({
        data: {
          fullName,
          phone,
          email,
          passportNumber,
          driverLicenseNumber,
          status: "VERIFIED",
        },
      });
    }

    // 6. Generate booking number & save booking
    const bookingNumber = `RAC-${Math.floor(10000 + Math.random() * 90000)}`;

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        carId: car.id,
        clientId: client.id,
        startDate: start,
        endDate: end,
        totalDays: pricing.totalDays,
        dailyRate: car.dailyPrice,
        extraServices: JSON.stringify(extraServices),
        totalPrice: pricing.totalPrice,
        depositAmount: pricing.depositAmount,
        status: "NEW",
        paymentStatus: "PAID", // Simulated instant mock payment
        paymentMethod,
      },
    });

    // 7. Add notification for Admin Panel
    await prisma.notification.create({
      data: {
        title: "Yangi bron qabul qilindi",
        message: `${client.fullName} tomonidan ${car.name} avtomobiliga yangi buyurtma #${bookingNumber} berildi (${pricing.totalDays} kunlik).`,
        type: "NEW_BOOKING",
      },
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      bookingNumber,
    });
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
