import { Suspense } from "react";
import TransactionListFallback from "./components/transactionListFallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import Trend from "./components/trends";
import { ErrorBoundary } from "react-error-boundary";
import Range from "./components/range";
import TransactionListWrapper from "./components/transactionListWrapper";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { range: string };
}) {
  const { range } = await searchParams;
  const selectedRange = range || "last30days";
  return (
    <main className="space-y-8">
      <section className="flex justify-between items-center mb-8 top-0 z-10 ">
        <h2 className="text-2xl">Summary</h2>
        <ErrorBoundary fallback={<p>Error loading range</p>}>
          <Range />
        </ErrorBoundary>
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <ErrorBoundary fallback={<p>Error loading trend data</p>}>
          <Trend type="Income" range={selectedRange} />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading trend data</p>}>
          <Trend type="Expense" range={selectedRange} />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading trend data</p>}>
          <Trend type="Saving" range={selectedRange} />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Error loading trend data</p>}>
          <Trend type="Investment" range={selectedRange} />
        </ErrorBoundary>
      </section>
      <section className="flex justify-between items-center mb-8 sticky top-0 z-10 ">
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
        <TransactionListWrapper range={selectedRange} />
      </Suspense>
    </main>
  );
}
