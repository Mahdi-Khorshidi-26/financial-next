"use client";
import Button from "@/components/button";
import { categories, types } from "@/lib/consts";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validation";
import { addTransaction } from "@/lib/actions";

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit = (data: FieldValues) => {
    addTransaction(data);
    reset();
  };

  return (
    <form
      className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Type
          </label>
          <select
            {...register("type")}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 px-3 py-2 outline-none"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className="text-xs text-red-600 dark:text-red-400 mt-1">
              {errors.type.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Category
          </label>
          <select
            {...register("category")}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 px-3 py-2 outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-xs text-red-600 dark:text-red-400 mt-1">
              {errors.category.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Date
          </label>
          <input
            type="date"
            {...register("created_at")}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 px-3 py-2 outline-none"
          />
          {errors.created_at && (
            <span className="text-xs text-red-600 dark:text-red-400 mt-1">
              {errors.created_at.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Amount
          </label>
          <input
            type="number"
            {...register("amount")}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 px-3 py-2 outline-none"
          />
          {errors.amount && (
            <span className="text-xs text-red-600 dark:text-red-400 mt-1">
              {errors.amount.message}
            </span>
          )}
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 px-3 py-2 outline-none"
          />
          {errors.description && (
            <span className="text-xs text-red-600 dark:text-red-400 mt-1">
              {errors.description.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
        <div
          className="min-h-[24px] text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {Object.keys(errors).length > 0 && "Please fix the errors above."}
        </div>
      </div>
    </form>
  );
}
