import React from "react";
import PageHeader from "@/components/pageHeader/page";
import Trends from "@/components/trends/page";

export default function Playground() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">Playground</h1>
      <div>
        <h2 className="mb-4 text-lg font-mono">ComponentName</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div>
          <h2 className="mb-4 text-lg font-mono">PageHeader</h2>
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <div>
            <PageHeader />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-mono">Trend</h2>
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <div className="flex space-x-4">
            <Trends type="Income" amount={1000} prevAmount={500} />
            <Trends type="Expense" amount={3000} prevAmount={500} />
            <Trends type="Investment" amount={5000} prevAmount={500} />
            <Trends type="Saving" amount={100} prevAmount={500} />
          </div>
        </div>
      </div>
    </main>
  );
}
