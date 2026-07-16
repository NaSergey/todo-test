import type { components } from "@/shared/api/schema";

type ErrorResponse = components["schemas"]["ErrorResponse"];

/** Human-readable message from an API error (or a network Error). */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  return (error as Partial<ErrorResponse> | undefined)?.error?.message ?? fallback;
}
