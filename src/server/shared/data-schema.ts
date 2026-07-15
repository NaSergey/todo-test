import { z } from "zod";

export const dueDateSchema = z
  .coerce.date()
  .nullable()
  .optional()
  .refine(
    (date) => {
      if (!date) return true;
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);
      return date >= startOfToday;
    },
    { message: "Due date cannot be in the past" }
  );
