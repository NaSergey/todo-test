import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/server/generated/prisma/client";
import { updateTodoSchema } from "@/server/todo/schema";
import { updateTodo, deleteTodo } from "@/server/todo/service";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsedId = Number(id);

  const body = await req.json();
  const parsed = updateTodoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const todo = await updateTodo(parsedId, parsed.data);
    return NextResponse.json(todo);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    throw e;
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsedId = Number(id);

  try {
    await deleteTodo(parsedId);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    throw e;
  }
}
