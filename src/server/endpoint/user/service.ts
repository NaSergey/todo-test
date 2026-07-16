import { db } from "@/server/db";
import type { createUserSchema } from "./schema";
import type { z } from "zod";

export function createUser(input: z.infer<typeof createUserSchema>) {
  return db.user.create({ data: input });
}

export function listUsers() {
  return db.user.findMany({ orderBy: { id: "asc" } });
}

export function deleteUser(id: number) {
  return db.user.delete({ where: { id } });
}
