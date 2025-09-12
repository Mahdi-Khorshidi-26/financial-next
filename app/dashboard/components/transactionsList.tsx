import Separator from "@/components/seperator";
import TransactionItem from "@/components/transactionItem";
import TransactionSummaryItem from "@/components/transactionSummaryItem";
import { groupAndSumTransactionsByDate } from "@/utils";
import { Suspense } from "react";
import { TransactionSummaryItemFallback } from "./transactionListFallback";
import { createClient } from "@/utils/supabase/client";

export type TransactionsType = {
  id: number;
  amount: number;
  type: "Income" | "Expense" | "Investment" | "Saving";
  description: string;
  category: string;
  created_at: string;
};

export default async function TransactionList() {
  const supabase = createClient();
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });
  const grouped = groupAndSumTransactionsByDate(transactions ?? []);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <Suspense fallback={<TransactionSummaryItemFallback />}>
            <TransactionSummaryItem date={date} amount={amount} />
          </Suspense>
          <Separator />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}
