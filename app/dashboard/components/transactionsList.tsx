import TransactionItem from "@/components/transactionItem";
import TransactionSummaryItem from "@/components/transactionSummaryItem";
import { groupAndSumTransactionsByDate } from "@/utils";

export type TransactionsType = {
  id: number;
  amount: number;
  type: "Income" | "Expense" | "Investment" | "Saving";
  description: string;
  category: string;
  created_at: string;
};

export default async function TransactionList() {
  const response = await fetch("http://localhost:3100/transactions", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.status}`);
  }

  const transactions = await response.json();
  const grouped = groupAndSumTransactionsByDate(transactions);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />
          <hr className="my-4 border-gray-200 dark:border-gray-800" />
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
