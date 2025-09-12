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
