"use client";

import { useAllTodos, useCreateTodo, useDeleteTodo, useUpdateTodo } from "@/entities/todo/hooks";
import type { CreateTodoInput } from "@/entities/todo/types";
import { useCreateUser, useDeleteUser, useUsers } from "@/entities/user/hooks";
import type { CreateUserInput, User } from "@/entities/user/types";
import { TodoForm, type TodoFormValues } from "./components/todo/todo-form";
import { CreateUserForm } from "./components/user/create-user-form";
import { TodoBoard } from "./components/todo/todo-board";

type MainPageProps = {
  initialUsers: User[];
};

export function MainPage({ initialUsers }: MainPageProps) {
  const { data: users = [] } = useUsers(initialUsers);
  const { data: todos = [] } = useAllTodos();

  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  function handleCreateUser(data: CreateUserInput) {
    createUser.mutate({ body: data });
  }

  function handleCreateTodo(data: CreateTodoInput) {
    createTodo.mutate({ body: data });
  }

  function handleToggleCompleted(id: number, completed: boolean) {
    updateTodo.mutate({ params: { path: { id } }, body: { completed } });
  }

  function handleTogglePinned(id: number, pinned: boolean) {
    updateTodo.mutate({ params: { path: { id } }, body: { pinned } });
  }

  function handleEditTodo(id: number, data: TodoFormValues) {
    updateTodo.mutate({ params: { path: { id } }, body: data });
  }

  function handleDelete(id: number) {
    deleteTodo.mutate({ params: { path: { id } } });
  }

  function handleDeleteUser(id: number) {
    if (!window.confirm("Удалить пользователя вместе со всеми его задачами?")) return;
    deleteUser.mutate({ params: { path: { id } } });
  }

  return (
    <div className="mx-auto flex w-full max-w-11/12 flex-1 gap-6 px-4 py-10">
      <aside className="flex w-64 shrink-0 flex-col gap-4">
        <CreateUserForm onSubmit={handleCreateUser} />
        <TodoForm users={users} onSubmit={handleCreateTodo} />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-6">
        <TodoBoard
          todos={todos}
          users={users}
          onCreateTodo={handleCreateTodo}
          onToggleCompleted={handleToggleCompleted}
          onTogglePinned={handleTogglePinned}
          onEdit={handleEditTodo}
          onDelete={handleDelete}
          onDeleteUser={handleDeleteUser}
        />
      </main>
    </div>
  );
}
