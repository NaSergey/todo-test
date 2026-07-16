import type { CreateTodoInput, Priority, Todo, TodoParticipant } from "@/entities/todo/types";

export type TodoFormValues = Omit<CreateTodoInput, "creatorId">;

export type TodoFormState = {
  creatorId: string;
  title: string;
  description: string;
  priority: Priority;
  assigneeId: string;
  dueDate: string;
};

export type TodoFormProps = {
  users: TodoParticipant[];
  defaultAssigneeId?: number;
  onCancel?: () => void;
} & (
  | { todo: Todo; onSubmit: (data: TodoFormValues) => Promise<unknown> }
  | { todo?: undefined; onSubmit: (data: CreateTodoInput) => Promise<unknown> }
);
