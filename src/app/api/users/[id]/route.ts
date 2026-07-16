import { NextRequest, NextResponse } from "next/server";
import { mapPrismaError } from "@/server/http/prisma-error";
import { parseId } from "@/server/http/id-schema";
import { deleteUser } from "@/server/endpoint/user/service";

type RouteParams = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id instanceof NextResponse) return id;

  try {
    await deleteUser(id);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    const mapped = mapPrismaError(e, { P2025: "User not found" });
    if (mapped) return mapped;
    throw e;
  }
}
