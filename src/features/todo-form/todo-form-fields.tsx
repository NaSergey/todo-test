import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import type { Level, Priority, TodoParticipant } from "@/entities/todo/types";
import { LEVEL_OPTIONS, PRIORITY_OPTIONS } from "@/entities/todo/priority";

export function toUserOptions(users: TodoParticipant[]) {
  return users.map((user) => ({ value: String(user.id), label: user.name }));
}

type TodoFormFieldsProps = {
  users: TodoParticipant[];
  description: string;
  onDescriptionChange: (value: string) => void;
  priority: Priority;
  onPriorityChange: (value: Priority) => void;
  level: Level;
  onLevelChange: (value: Level) => void;
  assigneeId: string;
  onAssigneeIdChange: (value: string) => void;
  dueDate: string;
  onDueDateChange: (value: string) => void;
};

/** Shared field set for creating/editing a todo — everything except title and creator. */
export function TodoFormFields({
  users,
  description,
  onDescriptionChange,
  priority,
  onPriorityChange,
  level,
  onLevelChange,
  assigneeId,
  onAssigneeIdChange,
  dueDate,
  onDueDateChange,
}: TodoFormFieldsProps) {
  return (
    <>
      <Input
        label="Описание"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Необязательно"
      />

      <Select
        label="Приоритет"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as Priority)}
        options={PRIORITY_OPTIONS}
      />

      <Select
        label="Уровень"
        value={level}
        onChange={(e) => onLevelChange(e.target.value as Level)}
        options={LEVEL_OPTIONS}
      />

      <Select
        label="Исполнитель"
        value={assigneeId}
        onChange={(e) => onAssigneeIdChange(e.target.value)}
        placeholder="Не назначено"
        options={toUserOptions(users)}
      />

      <Input
        label="Срок"
        type="date"
        value={dueDate}
        onChange={(e) => onDueDateChange(e.target.value)}
      />
    </>
  );
}
