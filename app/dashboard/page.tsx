import { Suspense } from "react";
import TransactionList from "./components/transactionsList";
import TransactionListFallback from "./components/transactionListFallback";
import Trend from "./components/trends";

export default function Dashboard() {
  return (
    <main className="space-y-8">
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Trend type="income" />
        <Trend type="expense" />
        <Trend type="saving" />
        <Trend type="investment" />
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </main>
  );
}
