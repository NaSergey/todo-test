import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useCreateUser } from "@/entities/user/hooks";

type CreateUserFormValues = {
  name: string;
  email: string;
};

export function CreateUserForm() {
  const createUser = useCreateUser();
  const { register, handleSubmit, reset } = useForm<CreateUserFormValues>({
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(values: CreateUserFormValues) {
    try {
      await createUser.mutateAsync({
        body: { name: values.name.trim(), email: values.email.trim() },
      });
      reset();
    } catch {
      // onError in useCreateUser already surfaces the message; keep field values so the user can retry.
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Input label="Имя" placeholder="Иван" required {...register("name")} />
      <Input
        label="Email"
        type="email"
        placeholder="ivan@example.com"
        required
        {...register("email")}
      />
      <Button type="submit">Создать пользователя</Button>
    </form>
  );
}
