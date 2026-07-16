import "@/server/openapi/zod-extend";
import { NextResponse } from "next/server";
import { z } from "zod";

/** Single error envelope for every non-2xx API response. */
export const errorResponseSchema = z
  .object({
    error: z.object({
      message: z.string(),
      fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
    }),
  })
  .openapi("ErrorResponse");

export type ErrorResponseBody = z.infer<typeof errorResponseSchema>;

export function errorResponse(
  status: number,
  message: string,
  fieldErrors?: Record<string, string[]>
) {
  const body: ErrorResponseBody = { error: fieldErrors ? { message, fieldErrors } : { message } };
  return NextResponse.json(body, { status });
}
