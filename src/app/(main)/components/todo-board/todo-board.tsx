import { useMemo, useState } from "react";
import { Menu, MenuItem } from "@/shared/ui/menu";
import type { Todo, TodoParticipant } from "@/entities/todo/types";
import { useCreateTodo } from "@/entities/todo/hooks";
import { useDeleteUser } from "@/entities/user/hooks";
import { TodoForm } from "@/features/todo-form/todo-form";
import { TodoItem } from "./todo-item";

type TodoBoardProps = {
  todos: Todo[];
  users: TodoParticipant[];
};

function sortByPinned(todos: Todo[]) {
  return [...todos].sort((a, b) => Number(b.pinned) - Number(a.pinned));
}

function buildColumns(todos: Todo[], users: TodoParticipant[]) {
  const sorted = sortByPinned(todos);

  return [
    ...users.map((user) => ({
      key: String(user.id),
      userId: user.id as number | null,
      title: user.name,
      todos: sorted.filter((todo) => todo.assignee?.id === user.id),
    })),
    {
      key: "unassigned",
      userId: null as number | null,
      title: "Не назначено",
      todos: sorted.filter((todo) => todo.assignee === null),
    },
  ];
}

export function TodoBoard({ todos, users }: TodoBoardProps) {
  const [addingForColumn, setAddingForColumn] = useState<string | null>(null);
  const createTodo = useCreateTodo();
  const deleteUser = useDeleteUser();

  const columns = useMemo(() => buildColumns(todos, users), [todos, users]);

  function handleDeleteUser(id: number) {
    if (!window.confirm("Удалить пользователя вместе со всеми его задачами?")) return;
    deleteUser.mutate({ params: { path: { id } } });
  }

  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:snap-none">
      {columns.map((column) => (
        <div
          key={column.key}
          className="flex w-72 max-w-[80vw] shrink-0 snap-start flex-col gap-3 sm:max-w-none"
        >
          <h2 className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            <span className="flex items-center gap-2">
              {column.title}
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-normal text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {column.todos.length}
              </span>
            </span>

            {column.userId === null ? (
              users.length > 0 && (
                <button
                  type="button"
                  onClick={() => setAddingForColumn(column.key)}
                  aria-label="Добавить задачу без исполнителя"
                  className="cursor-pointer p-1 text-base leading-none text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                >
                  +
                </button>
              )
            ) : (
              <Menu trigger="⋯" triggerLabel={`Действия для ${column.title}`}>
                <MenuItem onClick={() => setAddingForColumn(column.key)}>
                  Добавить задачу
                </MenuItem>
                <MenuItem
                  variant="danger"
                  onClick={() => handleDeleteUser(column.userId as number)}
                >
                  Удалить пользователя
                </MenuItem>
              </Menu>
            )}
          </h2>

          {addingForColumn === column.key && (
            <TodoForm
              users={users}
              defaultAssigneeId={column.userId ?? undefined}
              onCancel={() => setAddingForColumn(null)}
              onSubmit={(data) => {
                createTodo.mutate({ body: data });
                setAddingForColumn(null);
              }}
            />
          )}

          {column.todos.length === 0 ? (
            <p className="rounded-xl border border-dashed border-zinc-300 p-4 text-center text-xs text-zinc-400 dark:border-zinc-700 dark:text-zinc-600">
              Пусто
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {column.todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} users={users} />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
