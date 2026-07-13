import { useState, type FormEvent } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import {
  Priority,
  type CreateTodoInput,
  type Todo,
  type TodoParticipant,
} from "@/entities/todo/types";
import { TodoFormFields, toUserOptions } from "./todo-form-fields";

export type TodoFormValues = Omit<CreateTodoInput, "creatorId">;

type TodoFormProps = {
  users: TodoParticipant[];
  todo?: Todo;
  defaultAssigneeId?: number;
  onCancel?: () => void;
  onSubmit: (data: CreateTodoInput) => void;
};

export function TodoForm({ users, todo, defaultAssigneeId, onCancel, onSubmit }: TodoFormProps) {
  const [creatorId, setCreatorId] = useState("");
  const [title, setTitle] = useState(todo?.title ?? "");
  const [description, setDescription] = useState(todo?.description ?? "");
  const [priority, setPriority] = useState<Priority>(todo?.priority ?? Priority.MEDIUM);
  const [dueDate, setDueDate] = useState(todo?.dueDate ? todo.dueDate.slice(0, 10) : "");
  const [assigneeId, setAssigneeId] = useState(
    todo?.assignee
      ? String(todo.assignee.id)
      : defaultAssigneeId
        ? String(defaultAssigneeId)
        : ""
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || (!todo && !creatorId)) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      dueDate: dueDate || null,
      assigneeId: assigneeId ? Number(assigneeId) : null,
      creatorId: todo ? todo.creator.id : Number(creatorId),
    });

    if (!todo) {
      setTitle("");
      setDescription("");
      setPriority(Priority.MEDIUM);
      setDueDate("");
      setAssigneeId(defaultAssigneeId ? String(defaultAssigneeId) : "");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {!todo && !onCancel && (
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Новая задача
        </h2>
      )}

      {!todo && (
        <Select
          label="От кого"
          value={creatorId}
          onChange={(e) => setCreatorId(e.target.value)}
          placeholder="Выберите автора"
          options={toUserOptions(users)}
          required
        />
      )}

      <Input
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Что нужно сделать?"
        required
      />

      <TodoFormFields
        users={users}
        description={description}
        onDescriptionChange={setDescription}
        priority={priority}
        onPriorityChange={setPriority}
        assigneeId={assigneeId}
        onAssigneeIdChange={setAssigneeId}
        dueDate={dueDate}
        onDueDateChange={setDueDate}
      />

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {todo ? "Сохранить" : "Создать задачу"}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
        )}
      </div>
    </form>
  );
}
