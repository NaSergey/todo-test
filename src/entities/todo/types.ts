import type { components } from "@/shared/api/schema";

export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export const Level = {
  LOW: "LOW",
  HIGH: "HIGH",
} as const;

export type Priority = components["schemas"]["Priority"];
export type Level = components["schemas"]["Level"];
export type TodoParticipant = components["schemas"]["TodoParticipant"];

export type Todo = components["schemas"]["Todo"];
export type CreateTodoInput = components["schemas"]["CreateTodoInput"];
export type UpdateTodoInput = components["schemas"]["UpdateTodoInput"];
