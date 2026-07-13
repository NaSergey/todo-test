import { useState, type FormEvent } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useCreateUser } from "@/entities/user/hooks";

export function CreateUserForm() {
  const createUser = useCreateUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    createUser.mutate({ body: { name: name.trim(), email: email.trim() } });
    setName("");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Input
        label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Иван"
        required
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ivan@example.com"
        required
      />
      <Button type="submit">Создать пользователя</Button>
      
    </form>
  );
}
