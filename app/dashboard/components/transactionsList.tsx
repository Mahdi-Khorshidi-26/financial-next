"use client";
import Separator from "@/components/seperator";
import TransactionItem from "@/components/transactionItem";
import TransactionSummaryItem from "@/components/transactionSummaryItem";
import { groupAndSumTransactionsByDate } from "@/utils";
import { Suspense, useState } from "react";
import { TransactionSummaryItemFallback } from "./transactionListFallback";
import Button from "@/components/button";
import { fetchTransactions } from "@/lib/actions";
import { Loader } from "lucide-react";

export type TransactionsType = {
  id: number;
  amount: number;
  type: "Income" | "Expense" | "Investment" | "Saving";
  description: string;
  category: string;
  created_at: string;
};

export default function TransactionList({
  initialTransactions,
  range,
}: {
  initialTransactions: TransactionsType[];
  range: string;
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [offset, setOffset] = useState(initialTransactions.length);
  const grouped = groupAndSumTransactionsByDate(transactions ?? []);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );
  const [loading, setLoading] = useState(false);
  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const nextTransactions = await fetchTransactions(range, offset, 10);
      if (nextTransactions.length === 0) {
        setButtonHidden(true);
      }
      setOffset((prev) => prev + 10);
      setTransactions((prev) => [...prev, ...nextTransactions]);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleRemoved = (id: number) => {
    setTransactions((prev) => [...prev].filter((t) => t.id !== id));
  };

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
                <TransactionItem
                  {...transaction}
                  onRemoved={() => handleRemoved(transaction.id)}
                />
              </div>
            ))}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No Transactions Found
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center my-4">
          <Button variant="ghost" onClick={handleLoadMore} disabled={loading}>
            {loading ? (
              <div className="flex items-center space-x-1">
                <div>loading</div>
                <Loader className="animate-spin" />
              </div>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
