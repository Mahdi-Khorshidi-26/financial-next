import { Suspense } from "react";
import TransactionList from "./components/transactionsList";
import TransactionListFallback from "./components/transactionListFallback";
// import Trend from "./components/trends";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("transactions").select();
  console.log("Dashboard rendered");
  console.log("transactions", data);
  return (
    <main className="space-y-8">
      {/* <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Trend type="income" />
        <Trend type="expense" />
        <Trend type="saving" />
        <Trend type="investment" />
      </section> */}
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </main>
  );
}
