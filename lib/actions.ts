"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { transactionSchema } from "./validation";

export async function addTransaction(data: FieldValues) {
  const validated = transactionSchema.safeParse(data);
  if (!validated.success) {
    throw new Error(`Validation failed`);
  }

  const cookieStore = cookies();
  const { error } = await createClient(cookieStore)
    .from("transactions")
    .insert(validated.data);
  if (error) {
    throw new Error("Failed to add transaction");
  }
  revalidatePath("/dashboard");
  return redirect("/dashboard");
}

export async function fetchTransactions(
  range: string,
  limit: number = 10,
  offset: number = 0
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: transactions, error } = await supabase.rpc(
    "fetch_transactions",
    {
      limit_arg: limit ?? 20,
      offset_arg: offset ?? 0,
      range_arg: range ?? "last30days",
    }
  );
  if (error) console.error(error);
  return transactions;
}

export async function deleteTransaction(id: number) {
  const cookieStore = cookies();
  const { error } = await createClient(cookieStore)
    .from("transactions")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error("Failed to delete transaction");
  }
  revalidatePath("/dashboard");
}

export async function updateTransaction(
  id: number | undefined,
  data: FieldValues
) {
  const validated = transactionSchema.safeParse(data);
  if (!validated.success) {
    throw new Error(`Validation failed`);
  }
  const cookieStore = cookies();
  const { error } = await createClient(cookieStore)
    .from("transactions")
    .update(validated.data)
    .eq("id", id);
  if (error) {
    throw new Error(error + "Failed to update transaction");
  }
  revalidatePath("/dashboard");
  return redirect("/dashboard");
}

export async function login(prevState: unknown, formData: FormData) {
  if ("mahdi@1234.com" == formData.get("email")) {
    return { message: "Magic link sent! Check your email.", error: false };
  }
  return { message: "wrong email supplied !!! ", error: true };
}
