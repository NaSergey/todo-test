import { useQueryClient } from "@tanstack/react-query";
import { rqClient } from "@/shared/api/client";
import { getErrorMessage } from "@/shared/api/error/error";
import { Priority } from "@/entities/todo/types"; 

export function useAllTodos(search?: string, priority?: Priority, completed?: boolean) {
  return rqClient.useQuery("get", "/api/todos", { params: { query: { search, priority, completed } } });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("post", "/api/todos", {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] }),
    onError: (error) => {
      alert(getErrorMessage(error, "Failed to create todo"));
    }, //Сделал как по тз, можно сделать по другому.
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("patch", "/api/todos/{id}", {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] }),
    onError: (error) => {
      alert(getErrorMessage(error, "Failed to update todo"));
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("delete", "/api/todos/{id}", {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] }),
  });
}
