import type { components } from "@/shared/api/schema";

type ErrorResponse = components["schemas"]["ErrorResponse"];

/** Human-readable message from an API error (or a network Error). */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  return (error as Partial<ErrorResponse> | undefined)?.error?.message ?? fallback;
}

/** Per-field validation messages, for rendering next to form inputs. */
export function getFieldErrors(error: unknown): Record<string, string[]> | undefined {
  return (error as Partial<ErrorResponse> | undefined)?.error?.fieldErrors;
}
