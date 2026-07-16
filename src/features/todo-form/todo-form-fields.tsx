import type { UseFormRegister } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import type { TodoParticipant } from "@/entities/todo/types";
import { PRIORITY_OPTIONS } from "@/entities/todo/priority";
import type { TodoFormState } from "./types";

export function toUserOptions(users: TodoParticipant[]) {
  return users.map((user) => ({ value: String(user.id), label: user.name }));
}

type TodoFormFieldsProps = {
  users: TodoParticipant[];
  register: UseFormRegister<TodoFormState>;
};

/** Shared field set for creating/editing a todo — everything except title and creator. */
export function TodoFormFields({ users, register }: TodoFormFieldsProps) {
  return (
    <>
      <Input label="Описание" placeholder="Необязательно" {...register("description")} />

      <Select label="Приоритет" options={PRIORITY_OPTIONS} {...register("priority")} />

      <Select
        label="Исполнитель"
        placeholder="Не назначено"
        options={toUserOptions(users)}
        {...register("assigneeId")}
      />

      <Input label="Срок" type="date" {...register("dueDate")} />
    </>
  );
}
