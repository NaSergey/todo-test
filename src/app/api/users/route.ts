import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "@/server/user/schema";
import { createUser, listUsers } from "@/server/user/service";
import { mapPrismaError } from "@/server/http/prisma-error";
import { validateBody } from "@/server/http/validate-body";

export async function GET() {
  const users = await listUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = validateBody(createUserSchema, body);
  if (parsed instanceof NextResponse) return parsed;

  try {
    const user = await createUser(parsed);
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    const mapped = mapPrismaError(e, { P2002: "Email already exists" });
    if (mapped) return mapped;
    throw e;
  }
}
