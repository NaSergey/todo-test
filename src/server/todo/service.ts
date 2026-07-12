import { db } from "@/server/db";
import type { createTodoSchema, updateTodoSchema } from "./schema";
import type { z } from "zod";

const participantSelect = { select: { id: true, name: true } } as const;

export function createTodo(input: z.infer<typeof createTodoSchema>) {
  return db.todo.create({
    data: input,
    include: { creator: participantSelect, assignee: participantSelect },
  });
}

export function listTodos(userId?: number) {
  return db.todo.findMany({
    where:
      userId !== undefined
        ? { OR: [{ creatorId: userId }, { assigneeId: userId }] }
        : undefined,
    orderBy: { createdAt: "desc" },
    include: { creator: participantSelect, assignee: participantSelect },
  });
}

export function updateTodo(id: number, input: z.infer<typeof updateTodoSchema>) {
  return db.todo.update({
    where: { id },
    data: input,
    include: { creator: participantSelect, assignee: participantSelect },
  });
}

export function deleteTodo(id: number) {
  return db.todo.delete({ where: { id } });
}
