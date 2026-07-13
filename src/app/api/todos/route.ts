import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createTodoSchema } from "@/server/todo/schema";
import { createTodo, listTodos } from "@/server/todo/service";
import { mapPrismaError } from "@/server/http/prisma-error";

export async function GET() {
  const todos = await listTodos();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createTodoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: z.flattenError(parsed.error) }, { status: 400 });
  }

  try {
    const todo = await createTodo(parsed.data);
    return NextResponse.json(todo, { status: 201 });
  } catch (e) {
    const mapped = mapPrismaError(e, { P2003: "Invalid creatorId or assigneeId" });
    if (mapped) return mapped;
    throw e;
  }
}
