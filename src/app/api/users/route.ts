import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "@/server/user/schema";
import { createUser, listUsers } from "@/server/user/service";

export async function GET() {
  const users = await listUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const user = await createUser(parsed.data);
  return NextResponse.json(user, { status: 201 });
}
