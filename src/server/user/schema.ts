import "@/server/openapi/zod-extend";
import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
  })
  .openapi("CreateUserInput");

export const userSchema = z
  .object({
    id: z.number().int(),
    name: z.string(),
    email: z.string().email(),
  })
  .openapi("User");
