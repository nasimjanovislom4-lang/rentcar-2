import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        car: true,
        client: true,
        contract: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status required" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { car: true, client: true },
    });

    // If car handed, set car status to RENTED; if completed, set to AVAILABLE
    if (status === "CAR_HANDED") {
      await prisma.car.update({
        where: { id: booking.carId },
        data: { status: "RENTED" },
      });
    } else if (status === "COMPLETED" || status === "CANCELLED") {
      await prisma.car.update({
        where: { id: booking.carId },
        data: { status: "AVAILABLE" },
      });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
