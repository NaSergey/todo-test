import { db } from "@/server/db";
import { DomainError } from "@/server/shared/errors";


export async function assertTaskLimit(assigneeId: number | null | undefined, excludeTodoId?: number) {
  if (assigneeId != null) {
    const count = await db.todo.count({
      where: { assigneeId, id: excludeTodoId !== undefined ? { not: excludeTodoId } : undefined },
    });
    if (count >= 4) {
      throw new DomainError("У пользователя уже 4 задачи, нельзя назначить больше");
    }
  }
}
