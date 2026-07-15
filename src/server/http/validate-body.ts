import { NextResponse } from "next/server";
import { z } from "zod";
import { errorResponse } from "./error-response";

export function validateBody<T>(schema: z.ZodType<T>, body: unknown): T | NextResponse {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const { formErrors, fieldErrors } = z.flattenError(parsed.error) as {
      formErrors: string[];
      fieldErrors: Record<string, string[] | undefined>;
    };
    const cleanFieldErrors = Object.fromEntries(
      Object.entries(fieldErrors).filter(([, messages]) => messages?.length)
    ) as Record<string, string[]>;
    const message =
      formErrors[0] ?? Object.values(cleanFieldErrors).flat()[0] ?? "Validation failed";
    return errorResponse(400, message, cleanFieldErrors);
  }
  return parsed.data;
}
