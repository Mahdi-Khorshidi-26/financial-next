"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export async function addTransaction(data: FieldValues) {
  const cookieStore = cookies();
  const { error } = await createClient(cookieStore)
    .from("transactions")
    .insert(data);
  if (error) {
    console.log("Error adding transaction:", error.message);
  }
  revalidatePath("/dashboard");
  return redirect("/dashboard");
}
