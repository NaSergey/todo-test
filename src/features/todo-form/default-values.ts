import { Priority, type Todo } from "@/entities/todo/types";
import type { TodoFormState } from "./types";

export function buildDefaultValues(
  todo: Todo | undefined,
  defaultAssigneeId: number | undefined
): TodoFormState {
  return {
    creatorId: "",
    title: todo?.title ?? "",
    description: todo?.description ?? "",
    priority: todo?.priority ?? Priority.MEDIUM,
    dueDate: todo?.dueDate ? todo.dueDate.slice(0, 10) : "",
    assigneeId: todo?.assignee
      ? String(todo.assignee.id)
      : defaultAssigneeId
        ? String(defaultAssigneeId)
        : "",
  };
}
