import { NextResponse } from "next/server";
import { z } from "zod";

export const idSchema = z.coerce.number().int().positive();

export function parseId(raw: string): number | NextResponse {
  const parsed = idSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "id must be a positive integer" }, { status: 400 });
  }
  return parsed.data;
}
