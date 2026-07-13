import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createUserSchema } from "@/server/user/schema";
import { createUser, listUsers } from "@/server/user/service";
import { mapPrismaError } from "@/server/http/prisma-error";

export async function GET() {
  const users = await listUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: z.flattenError(parsed.error) }, { status: 400 });
  }

  try {
    const user = await createUser(parsed.data);
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    const mapped = mapPrismaError(e, { P2002: "Email already exists" });
    if (mapped) return mapped;
    throw e;
  }
}
