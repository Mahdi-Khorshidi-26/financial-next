import TransactionForm from "@/app/dashboard/components/transactionForm";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Edit Transaction",
  description: "Edit an Existing Transaction",
};

export default async function EditTransactionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: transaction } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
}
