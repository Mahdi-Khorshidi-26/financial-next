"use server";

import { revalidatePath } from "next/cache";

export function addTransaction(data: FormData) {
  const type = data.get("type") as string;
  const category = data.get("category") as string;
  const amount = data.get("amount") as string;
  const description = data.get("description") as string;
  const created_at = data.get("created_at") as string;

  // console.log({
  //   type,
  //   category,
  //   amount,
  //   description,
  //   created_at,
  // });

  revalidatePath("/dashboard");
  // Here you can add logic to save the transaction to your database
  return true;
}
