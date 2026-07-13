import "./zod-extend";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { createUserSchema, userSchema } from "@/server/user/schema";
import { createTodoSchema, todoSchema, updateTodoSchema } from "@/server/todo/schema";

export const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/api/users",
  summary: "List users",
  responses: {
    200: {
      description: "List of users",
      content: { "application/json": { schema: z.array(userSchema) } },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/users",
  summary: "Create a user",
  request: {
    body: { content: { "application/json": { schema: createUserSchema } } },
  },
  responses: {
    201: {
      description: "Created user",
      content: { "application/json": { schema: userSchema } },
    },
    400: { description: "Validation error" },
    409: { description: "Email already exists" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/users/{id}",
  summary: "Delete a user (cascades: their created todos are deleted; assigned todos become unassigned)",
  request: {
    params: z.object({ id: z.coerce.number().int() }),
  },
  responses: {
    204: { description: "Deleted" },
    400: { description: "Invalid id" },
    404: { description: "User not found" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/todos",
  summary: "List all todos",
  responses: {
    200: {
      description: "List of todos",
      content: { "application/json": { schema: z.array(todoSchema) } },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/todos",
  summary: "Create a todo",
  request: {
    body: { content: { "application/json": { schema: createTodoSchema } } },
  },
  responses: {
    201: {
      description: "Created todo",
      content: { "application/json": { schema: todoSchema } },
    },
    400: { description: "Validation error or unknown creatorId/assigneeId" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/todos/{id}",
  summary: "Update a todo",
  request: {
    params: z.object({ id: z.coerce.number().int() }),
    body: { content: { "application/json": { schema: updateTodoSchema } } },
  },
  responses: {
    200: {
      description: "Updated todo",
      content: { "application/json": { schema: todoSchema } },
    },
    400: { description: "Validation error, invalid id, or unknown assigneeId" },
    404: { description: "Todo not found" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/todos/{id}",
  summary: "Delete a todo",
  request: {
    params: z.object({ id: z.coerce.number().int() }),
  },
  responses: {
    204: { description: "Deleted" },
    400: { description: "Invalid id" },
    404: { description: "Todo not found" },
  },
});
