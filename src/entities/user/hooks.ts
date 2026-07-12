import { useQueryClient } from "@tanstack/react-query";
import { rqClient } from "@/shared/api/client";
import type { User } from "./types";


export function useUsers(initialData?: User[]) {
  return rqClient.useQuery("get", "/api/users", undefined, { initialData });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("post", "/api/users", {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get", "/api/users"] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return rqClient.useMutation("delete", "/api/users/{id}", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "/api/users"] });
      queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] });
    },
  });
}
