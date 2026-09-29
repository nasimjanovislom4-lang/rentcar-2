import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      include: {
        expenses: true,
        bookings: {
          select: { totalPrice: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, cars });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      brand,
      model,
      year,
      plateNumber,
      vinCode,
      color,
      category,
      transmission,
      fuelType,
      seats,
      dailyPrice,
      depositAmount,
      mileage,
      status,
      features,
      images,
      currentLat,
      currentLng,
      insuranceExpiry,
      nextServiceDate,
    } = body;

    const car = await prisma.car.create({
      data: {
        name,
        brand,
        model,
        year: Number(year) || 2024,
        plateNumber,
        vinCode,
        color,
        category: category || "SEDAN",
        transmission: transmission || "AUTOMATIC",
        fuelType: fuelType || "PETROL",
        seats: Number(seats) || 5,
        dailyPrice: parseFloat(dailyPrice),
        depositAmount: parseFloat(depositAmount) || 1000000,
        mileage: Number(mileage) || 0,
        status: status || "AVAILABLE",
        features: typeof features === "string" ? features : JSON.stringify(features || []),
        images: typeof images === "string" ? images : JSON.stringify(images || ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"]),
        currentLat: currentLat ? parseFloat(currentLat) : 41.311081,
        currentLng: currentLng ? parseFloat(currentLng) : 69.240562,
        insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : new Date(Date.now() + 180 * 86400000),
        nextServiceDate: nextServiceDate ? new Date(nextServiceDate) : new Date(Date.now() + 60 * 86400000),
      },
    });

    return NextResponse.json({ success: true, car });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, mileage, currentLat, currentLng } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Car ID required" }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (mileage !== undefined) updateData.mileage = Number(mileage);
    if (currentLat !== undefined) updateData.currentLat = parseFloat(currentLat);
    if (currentLng !== undefined) updateData.currentLng = parseFloat(currentLng);

    const car = await prisma.car.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, car });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
