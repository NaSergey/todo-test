import { NextRequest, NextResponse } from "next/server";
import { mapPrismaError } from "@/server/http/prisma-error";
import { parseId } from "@/server/http/id-schema";
import { validateBody } from "@/server/http/validate-body";
import { updateTodoSchema } from "@/server/todo/schema";
import { updateTodo, deleteTodo } from "@/server/todo/service";
import { DomainError } from "@/server/shared/errors";
import { errorResponse } from "@/server/http/error-response";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id instanceof NextResponse) return id;

  const body = await req.json();
  const parsed = validateBody(updateTodoSchema, body);
  if (parsed instanceof NextResponse) return parsed;

  try {
    const todo = await updateTodo(id, parsed);
    return NextResponse.json(todo);
  } catch (e) {
    if (e instanceof DomainError) return errorResponse(e.status, e.message);
    const mapped = mapPrismaError(e, { P2025: "Todo not found", P2003: "Invalid assigneeId" });
    if (mapped) return mapped;
    throw e;
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id instanceof NextResponse) return id;

  try {
    await deleteTodo(id);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    const mapped = mapPrismaError(e, { P2025: "Todo not found" });
    if (mapped) return mapped;
    throw e;
  }
}
