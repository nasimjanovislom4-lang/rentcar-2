import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    const where: any = {};

    if (category && category !== "ALL") {
      where.category = category;
    }
    if (transmission && transmission !== "ALL") {
      where.transmission = transmission;
    }
    if (fuelType && fuelType !== "ALL") {
      where.fuelType = fuelType;
    }
    if (maxPrice) {
      where.dailyPrice = {
        lte: parseFloat(maxPrice),
      };
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
      ];
    }

    const cars = await prisma.car.findMany({
      where,
      orderBy: { dailyPrice: "asc" },
    });

    return NextResponse.json({ success: true, cars });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
