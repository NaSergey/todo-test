import { NextRequest, NextResponse } from "next/server";
import { createTodoSchema } from "@/server/endpoint/todo/schema";
import { createTodo, listTodos } from "@/server/endpoint/todo/service";
import { mapPrismaError } from "@/server/http/prisma-error";
import { validateBody } from "@/server/http/validate-body";
import { errorResponse } from "@/server/http/error-response";
import { DomainError } from "@/server/shared/errors";
import { Priority } from "@/server/generated/prisma/browser";


export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") ?? undefined;
  const priority = req.nextUrl.searchParams.get("priority") ?? undefined;
  const completed = req.nextUrl.searchParams.get("completed") ?? undefined;

  const todos = await listTodos({ search, priority: priority as Priority | undefined,   completed: completed === "true" ? true : completed === "false" ? false : undefined });
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = validateBody(createTodoSchema, body);
  if (parsed instanceof NextResponse) return parsed;

  try {
    const todo = await createTodo(parsed);
    return NextResponse.json(todo, { status: 201 });
  } catch (e) {
    if (e instanceof DomainError) return errorResponse(e.status, e.message);
    const mapped = mapPrismaError(e, { P2003: "Invalid creatorId or assigneeId" });
    if (mapped) return mapped;
    throw e;
  }
}
