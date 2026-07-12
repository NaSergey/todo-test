import { useQueryClient } from "@tanstack/react-query";
import { rqClient } from "@/shared/api/client";

export function useTodos(userId: number | null) {
  return rqClient.useQuery(
    "get",
    "/api/todos",
    { params: { query: { userId: userId as number } } },
    { enabled: userId !== null }
  );
}

/** All todos across every user — used for the board view. */
export function useAllTodos() {
  return rqClient.useQuery("get", "/api/todos");
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("post", "/api/todos", {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] }),
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("patch", "/api/todos/{id}", {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("delete", "/api/todos/{id}", {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] }),
  });
}
