import "@/server/openapi/zod-extend";
import { z } from "zod";
import { dueDateSchema } from "@/server/shared/schema/data-schema";

const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]).openapi("Priority");

export const createTodoSchema = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().nullable().optional(),
    priority: prioritySchema.optional(),
    dueDate: dueDateSchema,
    creatorId: z.number().int(),
    assigneeId: z.number().int().nullable().optional(),
  })
  .openapi("CreateTodoInput");

export const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    description: z.string().nullable().optional(),
    priority: prioritySchema.optional(),
    dueDate: z.coerce.date().nullable().optional(),
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

const nullableParticipant = z.union([participantSchema, z.null()]);

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
    creatorId: z.number().int().nullable(),
    assigneeId: z.number().int().nullable(),
    creator: nullableParticipant,
    assignee: nullableParticipant,
  })
  .openapi("Todo");
