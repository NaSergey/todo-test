import { useState } from "react";
import { Badge } from "@/shared/ui/badge";
import { Checkbox } from "@/shared/ui/checkbox";
import type { Todo, TodoParticipant } from "@/entities/todo/types";
import { priorityVariant, priorityLabels } from "@/entities/todo/priority";
import { useDeleteTodo, useUpdateTodo } from "@/entities/todo/hooks";
import { TodoForm } from "@/features/todo-form/todo-form";

type TodoItemProps = {
  todo: Todo;
  users: TodoParticipant[];
};

export function TodoItem({ todo, users }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  if (isEditing) {
    return (
      <TodoForm
        todo={todo}
        users={users}
        onCancel={() => setIsEditing(false)}
        onSubmit={(data) => {
          updateTodo.mutate({ params: { path: { id: todo.id } }, body: data });
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <li
      className={`flex flex-col gap-3 rounded-xl border p-4 transition-colors ${
        todo.completed
          ? "border-zinc-100 bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-900/40"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-2">
        <h3
          title={todo.title}
          className={`min-w-0 flex-1 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50 ${
            todo.completed ? "opacity-50 line-through" : ""
          }`}
        >
          {todo.title}
        </h3>

        <div className={`shrink-0 ${todo.completed ? "opacity-50" : ""}`}>
          <Badge variant={priorityVariant[todo.priority]}>{priorityLabels[todo.priority]}</Badge>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-0.5">
          <Checkbox
            checked={todo.completed}
            onChange={(e) =>
              updateTodo.mutate({
                params: { path: { id: todo.id } },
                body: { completed: e.target.checked },
              })
            }
            aria-label={todo.completed ? "Отметить как невыполненное" : "Отметить как выполненное"}
          />

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Редактировать"
            className="cursor-pointer p-1 text-sm leading-none text-zinc-400 hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-300"
          >
            ✎
          </button>

          <button
            type="button"
            onClick={() =>
              updateTodo.mutate({
                params: { path: { id: todo.id } },
                body: { pinned: !todo.pinned },
              })
            }
            aria-label={todo.pinned ? "Открепить" : "Закрепить"}
            className={`cursor-pointer p-1 text-lg leading-none ${
              todo.pinned ? "text-amber-500" : "text-zinc-300 dark:text-zinc-700"
            }`}
          >
            ★
          </button>

          <button
            type="button"
            onClick={() => deleteTodo.mutate({ params: { path: { id: todo.id } } })}
            aria-label="Удалить"
            className="cursor-pointer p-1 text-sm leading-none text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
          >
            ✕
          </button>
        </div>
      </div>

      <div className={todo.completed ? "opacity-50" : ""}>
        {todo.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {todo.description}
          </p>
        )}

        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
          От: {todo.creator?.name ?? "Пользователь удалён"}
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
          {todo.dueDate &&
            `Срок: ${new Date(todo.dueDate).toLocaleDateString(undefined, { timeZone: "UTC" })}`}
        </p>
      </div>
    </li>
  );
}
