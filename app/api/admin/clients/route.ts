import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { phone: { contains: search } },
        { passportNumber: { contains: search } },
      ];
    }

    const clients = await prisma.client.findMany({
      where,
      include: {
        bookings: {
          select: {
            id: true,
            bookingNumber: true,
            totalPrice: true,
            status: true,
            startDate: true,
            endDate: true,
            car: {
              select: {
                name: true,
                plateNumber: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    console.error("GET /api/admin/clients error:", error);
    return NextResponse.json(
      { success: false, error: "Mijozlarni olishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, blacklistReason, rating } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Mijoz ID si ko'rsatilishi shart" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (blacklistReason !== undefined) updateData.blacklistReason = blacklistReason;
    if (rating !== undefined) updateData.rating = parseFloat(rating);

    const updated = await prisma.client.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/admin/clients error:", error);
    return NextResponse.json(
      { success: false, error: "Mijoz ma'lumotlarini yangilashda xatolik" },
      { status: 500 }
    );
  }
}