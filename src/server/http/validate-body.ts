import { NextResponse } from "next/server";
import { z } from "zod";

export function validateBody<T>(schema: z.ZodType<T>, body: unknown): T | NextResponse {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: z.flattenError(parsed.error) }, { status: 400 });
  }
  return parsed.data;
}
