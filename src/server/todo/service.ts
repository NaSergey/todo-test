import { db } from "@/server/db";
import type { createTodoSchema, updateTodoSchema } from "./schema";
import type { z } from "zod";
import { assertTaskLimit } from "./rules/assert-assign";


const participantSelect = { select: { id: true, name: true } } as const;

export async function createTodo(todo: z.infer<typeof createTodoSchema>) {
  await assertTaskLimit(todo.assigneeId);
  return db.todo.create({
    data: todo,
    include: { creator: participantSelect, assignee: participantSelect },
  });
}

export function listTodos() {
  return db.todo.findMany({
    orderBy: { createdAt: "desc" },
    include: { creator: participantSelect, assignee: participantSelect },
  });
}

export async function updateTodo(id: number, todo: z.infer<typeof updateTodoSchema>) {
  const existingTodo = await db.todo.findUnique({ where: { id } });

  if (todo.assigneeId !== undefined && todo.assigneeId !== existingTodo?.assigneeId) {
    await assertTaskLimit(todo.assigneeId, id);
  }

  return db.todo.update({
    where: { id },
    data: todo,
    include: { creator: participantSelect, assignee: participantSelect },
  });
}
export function deleteTodo(id: number) {
  return db.todo.delete({ where: { id } });
}
