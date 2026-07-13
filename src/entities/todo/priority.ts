import { Priority } from "@/entities/todo/types";

export const priorityVariant: Record<Priority, "neutral" | "warning" | "danger"> = {
  LOW: "neutral",
  MEDIUM: "warning",
  HIGH: "danger",
};

export const priorityLabels: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const PRIORITY_OPTIONS = (Object.keys(priorityLabels) as Priority[]).map(
  (value) => ({ value, label: priorityLabels[value] })
);
