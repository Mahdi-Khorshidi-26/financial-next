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
  const supabase = createClient(cookies());
  const email = formData.get("email");
  const { error } = await supabase.auth.signInWithOtp({
    email: email as string,
    options: {
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      shouldCreateUser: true,
    },
  });
  if (error) {
    return { message: "Error Authenticating User", error: true };
  }
  return {
    message: `email got sent to ${email} please check your inbox`,
    error: false,
  };
}

export async function signOut() {
  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Failed to log out");
  }
  return redirect("/login");
}

export async function uploadAvatar(
  prevState: { error: boolean; message: string },
  formData: FormData
) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { error: true, message: "No file selected " };
  }
  if (file.size > 512 * 1024) {
    return { error: true, message: "File size exceeds 512KB" };
  }
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: true, message: "User not authenticated" };
  }
  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}.${fileExt}`;
  const filePath = `${fileName}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    return { error: true, message: "Failed to upload avatar" };
  }
  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar: filePath },
  });
  if (updateError) {
    return { error: true, message: "Failed to update avatar" };
  }
  revalidatePath("/dashboard");
  return redirect("/dashboard");
}
