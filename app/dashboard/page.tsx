import { Suspense } from "react";
import TransactionList from "./components/transactionsList";
import TransactionListFallback from "./components/transactionListFallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";

export default async function Dashboard() {

  return (
    <main className="space-y-8">
      {/* <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Trend type="income" />
        <Trend type="expense" />
        <Trend type="saving" />
        <Trend type="investment" />
      </section> */}

      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center space-x-1 ${variants["default"]} ${sizes["sm"]}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </main>
  );
}
