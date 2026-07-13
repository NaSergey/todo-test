import { NextResponse } from "next/server";
import { Prisma } from "@/server/generated/prisma/client";

const defaults: Record<string, { status: number; message: string }> = {
  P2025: { status: 404, message: "Not found" },
  P2002: { status: 409, message: "Already exists" },
  P2003: { status: 400, message: "Referenced record does not exist" },
};

/** Maps a known Prisma error code to an HTTP response. Returns null for anything else — caller should rethrow. */
export function mapPrismaError(e: unknown, overrides: Partial<Record<keyof typeof defaults, string>> = {}) {
  if (!(e instanceof Prisma.PrismaClientKnownRequestError)) return null;

  const known = defaults[e.code];
  if (!known) return null;

  const message = overrides[e.code as keyof typeof defaults] ?? known.message;
  return NextResponse.json({ error: message }, { status: known.status });
}
