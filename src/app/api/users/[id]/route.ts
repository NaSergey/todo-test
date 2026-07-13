import { NextRequest, NextResponse } from "next/server";
import { mapPrismaError } from "@/server/http/prisma-error";
import { idSchema } from "@/server/http/id-schema";
import { deleteUser } from "@/server/user/service";

type RouteParams = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    return NextResponse.json({ error: "id must be a positive integer" }, { status: 400 });
  }

  try {
    await deleteUser(parsedId.data);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    const mapped = mapPrismaError(e, { P2025: "User not found" });
    if (mapped) return mapped;
    throw e;
  }
}
