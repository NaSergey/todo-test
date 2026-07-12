import type { components } from "@/shared/api/schema";

export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type Priority = components["schemas"]["Priority"];
export type TodoParticipant = components["schemas"]["TodoParticipant"];

export type Todo = Omit<components["schemas"]["Todo"], "assignee"> & {
  assignee: TodoParticipant | null;
};
export type CreateTodoInput = components["schemas"]["CreateTodoInput"];
export type UpdateTodoInput = components["schemas"]["UpdateTodoInput"];
