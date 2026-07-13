import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { mapPrismaError } from "@/server/http/prisma-error";
import { idSchema } from "@/server/http/id-schema";
import { updateTodoSchema } from "@/server/todo/schema";
import { updateTodo, deleteTodo } from "@/server/todo/service";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    return NextResponse.json({ error: "id must be a positive integer" }, { status: 400 });
  }

  const body = await req.json();
  const parsed = updateTodoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: z.flattenError(parsed.error) }, { status: 400 });
  }

  try {
    const todo = await updateTodo(parsedId.data, parsed.data);
    return NextResponse.json(todo);
  } catch (e) {
    const mapped = mapPrismaError(e, { P2025: "Todo not found", P2003: "Invalid assigneeId" });
    if (mapped) return mapped;
    throw e;
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) {
    return NextResponse.json({ error: "id must be a positive integer" }, { status: 400 });
  }

  try {
    await deleteTodo(parsedId.data);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    const mapped = mapPrismaError(e, { P2025: "Todo not found" });
    if (mapped) return mapped;
    throw e;
  }
}
