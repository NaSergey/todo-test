import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { TodoFormFields, toUserOptions } from "./todo-form-fields";
import { buildDefaultValues } from "./default-values";
import type { TodoFormProps, TodoFormState, TodoFormValues } from "./types";

export function TodoForm(props: TodoFormProps) {
  const { users, todo, defaultAssigneeId, onCancel } = props;
  const { register, handleSubmit, reset } = useForm<TodoFormState>({
    defaultValues: buildDefaultValues(todo, defaultAssigneeId),
  });

  async function onSubmit(values: TodoFormState) {
    const payload: TodoFormValues = {
      title: values.title.trim(),
      description: values.description.trim() || null,
      priority: values.priority,
      dueDate: values.dueDate || null,
      assigneeId: values.assigneeId ? Number(values.assigneeId) : null,
    };

    try {
      if (props.todo) {
        await props.onSubmit(payload);
      } else {
        await props.onSubmit({ ...payload, creatorId: Number(values.creatorId) });
        reset(buildDefaultValues(undefined, defaultAssigneeId));
      }
    } catch {
      // The mutation's onError already alerts the user; keep the entered values so they can retry.
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          placeholder="Выберите автора"
          options={toUserOptions(users)}
          required
          {...register("creatorId")}
        />
      )}

      <Input
        label="Название"
        placeholder="Что нужно сделать?"
        required
        {...register("title")}
      />

      <TodoFormFields users={users} register={register} />

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
