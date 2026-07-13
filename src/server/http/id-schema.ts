import { z } from "zod";

/** Path-параметр id: без валидации Number("abc") = NaN уходит в Prisma и роняет запрос в 500 вместо 400. */
export const idSchema = z.coerce.number().int().positive();
