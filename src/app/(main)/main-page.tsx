"use client";

import { useState } from "react";
import { useAllTodos, useCreateTodo } from "@/entities/todo/hooks";
import { useUsers } from "@/entities/user/hooks";
import type { User } from "@/entities/user/types";
import { TodoForm } from "@/features/todo-form/todo-form";
import { CreateUserForm } from "@/features/create-user/create-user-form";
import { TodoSearch } from "@/features/todo-search/todo-search";
import { TodoFilters, type TodoFiltersValue } from "@/features/todo-filters/todo-filters";
import { TodoBoard } from "@/app/(main)/components/todo-board/todo-board";

type MainPageProps = {
  initialUsers: User[];
};

export function MainPage({ initialUsers }: MainPageProps) {
  const { data: users = [] } = useUsers(initialUsers);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<TodoFiltersValue>({});
  const { data: todos = [] } = useAllTodos(search, filters.priority, filters.completed);
  const createTodo = useCreateTodo();

  return (
    <div className="mx-auto flex w-full max-w-11/12 flex-1 flex-col gap-6 px-4 py-6 lg:flex-row lg:py-10">
      <aside className="grid shrink-0 gap-4 sm:grid-cols-2 sm:items-start lg:flex lg:w-64 lg:flex-col lg:items-stretch">
        <CreateUserForm />
        <TodoForm users={users} onSubmit={(data) => createTodo.mutateAsync({ body: data })} />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <TodoSearch onSearchChange={setSearch} />
          <TodoFilters onFilterChange={setFilters} />
        </div>
        <TodoBoard todos={todos} users={users} />
      </main>
    </div>
  );
}
