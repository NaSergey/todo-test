import { useState } from "react";
import { Select } from "@/shared/ui/select";
import { Priority } from "@/entities/todo/types";
import { PRIORITY_OPTIONS } from "@/entities/todo/priority";

export type TodoFiltersValue = {
  priority?: Priority;
  completed?: boolean;
};

type TodoFiltersProps = {
  onFilterChange: (value: TodoFiltersValue) => void;
};

const COMPLETED_OPTIONS = [
  { value: "false", label: "Активные" },
  { value: "true", label: "Выполненные" },
];

export function TodoFilters({ onFilterChange }: TodoFiltersProps) {
  const [priority, setPriority] = useState("");
  const [completed, setCompleted] = useState("");

  function emit(nextPriority: string, nextCompleted: string) {
    onFilterChange({
      priority: nextPriority ? (nextPriority as Priority) : undefined,
      completed: nextCompleted ? nextCompleted === "true" : undefined,
    });
  }

  return (
    <div className="flex gap-2">
      <Select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
          emit(e.target.value, completed);
        }}
        placeholder="Все приоритеты"
        options={PRIORITY_OPTIONS}
        aria-label="Фильтр по приоритету"
      />
      <Select
        value={completed}
        onChange={(e) => {
          setCompleted(e.target.value);
          emit(priority, e.target.value);
        }}
        placeholder="Все задачи"
        options={COMPLETED_OPTIONS}
        aria-label="Фильтр по статусу"
      />
    </div>
  );
}
