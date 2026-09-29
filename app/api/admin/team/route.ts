import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("GET /api/admin/team error:", error);
    return NextResponse.json(
      { success: false, error: "Xodimlarni yuklashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, password } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, error: "Barcha maydonlarni to'ldirish shart" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Ushbu email bilan xodim allaqachon mavjud" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        passwordHash: password || "temp123456",
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    console.error("POST /api/admin/team error:", error);
    return NextResponse.json(
      { success: false, error: "Xodim qo'shishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, role, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Xodim ID si ko'rsatilishi shart" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/admin/team error:", error);
    return NextResponse.json(
      { success: false, error: "Xodim ma'lumotlarini yangilashda xatolik" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Xodim ID si ko'rsatilmadi" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Xodim o'chirildi" });
  } catch (error) {
    console.error("DELETE /api/admin/team error:", error);
    return NextResponse.json(
      { success: false, error: "Xodimni o'chirishda xatolik" },
      { status: 500 }
    );
  }
}
