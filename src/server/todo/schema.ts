import "@/server/openapi/zod-extend";
import { z } from "zod";

const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]).openapi("Priority");

export const createTodoSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    priority: prioritySchema.optional(),
    dueDate: z.coerce.date().optional(),
    creatorId: z.number().int(),
    assigneeId: z.number().int().optional(),
  })
  .openapi("CreateTodoInput");

export const updateTodoSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    priority: prioritySchema.optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.number().int().nullable().optional(),
    completed: z.boolean().optional(),
    pinned: z.boolean().optional(),
  })
  .openapi("UpdateTodoInput");

const participantSchema = z
  .object({
    id: z.number().int(),
    name: z.string(),
  })
  .openapi("TodoParticipant");

export const todoSchema = z
  .object({
    id: z.number().int(),
    title: z.string(),
    description: z.string().nullable(),
    priority: prioritySchema,
    pinned: z.boolean(),
    dueDate: z.coerce.date().nullable(),
    completed: z.boolean(),
    createdAt: z.coerce.date(),
    creatorId: z.number().int(),
    assigneeId: z.number().int().nullable(),
    creator: participantSchema,
    assignee: participantSchema.nullable(),
  })
  .openapi("Todo");
