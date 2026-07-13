import { Badge } from "@/shared/ui/badge";
import { Priority } from "@/entities/todo/types";

const priorityVariant: Record<Priority, "neutral" | "warning" | "danger"> = {
  LOW: "neutral",
  MEDIUM: "warning",
  HIGH: "danger",
};

const priorityLabels: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const PRIORITY_OPTIONS = (Object.keys(priorityLabels) as Priority[]).map(
  (value) => ({ value, label: priorityLabels[value] })
);

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge variant={priorityVariant[priority]}>{priorityLabels[priority]}</Badge>;
}
