import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createTodoSchema } from "@/server/todo/schema";
import { createTodo, listTodos } from "@/server/todo/service";

export async function GET(req: NextRequest) {
  const userIdParam = req.nextUrl.searchParams.get("userId");

  if (userIdParam === null) {
    const todos = await listTodos();
    return NextResponse.json(todos);
  }

  const parsedUserId = z.coerce.number().int().safeParse(userIdParam);
  if (!parsedUserId.success) {
    return NextResponse.json(
      { error: "userId must be a number" },
      { status: 400 }
    );
  }

  const todos = await listTodos(parsedUserId.data);
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createTodoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const todo = await createTodo(parsed.data);
  return NextResponse.json(todo, { status: 201 });
}
