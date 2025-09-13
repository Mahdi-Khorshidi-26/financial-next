import { z } from "zod";
import { categories, types } from "./consts";

export const transactionSchema = z
  .object({
    type: z.enum(types),
    category: z.preprocess(
      (val) => (typeof val === "string" && val.length ? val : undefined),
      z.string().optional()
    ),
    amount: z.coerce.number().min(1, {
      message: "Amount must be at least 1",
    }),
    description: z.string().min(1, {
      message: "The description is required",
    }),
    created_at: z.string().refine(
      (value) => {
        return !isNaN(Date.parse(value));
      },
      {
        message: "Invalid date format. Please use a valid date.",
      }
    ),
  })
  .refine(
    (data) => {
      if (data.type === "Expense") {
        return (
          data.category !== undefined && categories.includes(data.category)
        );
      }
      return true;
    },
    {
      path: ["category"],
      message: "Category is required for Expenses",
    }
  );
export type TransactionSchema = z.infer<typeof transactionSchema>;
