import { fetchTransactions } from "@/lib/actions";
import TransactionList from "./transactionsList";

export default async function TransactionListWrapper({
  range,
  limit = 10,
  offset = 0,
}: {
  range: string;
  limit?: number;
  offset?: number;
}) {
  const transactions = await fetchTransactions(range, limit, offset);
  return <TransactionList initialTransactions={transactions} key={range} range={range} />;
}
