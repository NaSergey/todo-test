import { NextResponse } from "next/server";
import { z } from "zod";
import { errorResponse } from "./error-response";

export const idSchema = z.coerce.number().int().positive();

export function parseId(raw: string): number | NextResponse {
  const parsed = idSchema.safeParse(raw);
  if (!parsed.success) {
    return errorResponse(400, "id must be a positive integer");
  }
  return parsed.data;
}
