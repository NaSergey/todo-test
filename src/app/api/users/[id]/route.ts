import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/server/generated/prisma/client";
import { deleteUser } from "@/server/user/service";

type RouteParams = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsedId = Number(id);

  try {
    await deleteUser(parsedId);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    throw e;
  }
}
