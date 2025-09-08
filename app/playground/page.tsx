import Button from "@/components/button";
import FormInput from "@/components/formInput";
import FormSelect from "@/components/formSelect";
import PageHeader from "@/components/pageHeader";
import TransactionItem from "@/components/transactionItem";
import TransactionSummaryItem from "@/components/transactionSummaryItem";
import Trends from "@/components/trends";
import React from "react";

export default function Playground() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">Components Playground</h1>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <PlaygroundItemContainer title="Page Header Component">
          <PageHeader />
        </PlaygroundItemContainer>
        <PlaygroundItemContainer title="Trends Component">
          <Trends type="Income" amount={1000} prevAmount={500} />
          <Trends type="Expense" amount={3000} prevAmount={500} />
          <Trends type="Investment" amount={5000} prevAmount={500} />
          <Trends type="Saving" amount={100} prevAmount={500} />
        </PlaygroundItemContainer>
        <PlaygroundItemContainer
          title="Transaction Item Component"
          childrenWrapperClassName="flex flex-col space-y-4"
        >
          <TransactionItem
            type="Income"
            description="Salary"
            amount={2000}
            category="House"
          />
          <TransactionItem
            type="Expense"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="Saving"
            description="For children"
            amount={500}
            category="Work"
          />
          <TransactionItem
            type="Investment"
            description="In Microsoft"
            amount={2000}
            category="Cleaning"
          />
        </PlaygroundItemContainer>
        <PlaygroundItemContainer
          title="Transaction Summary Item"
          childrenWrapperClassName="flex flex-col space-y-4"
        >
          <TransactionSummaryItem date="2025-4-6" amount={1500} />
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <TransactionItem
            type="Income"
            description="Salary"
            amount={2000}
            category="House"
          />
          <TransactionItem
            type="Expense"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="Saving"
            description="For children"
            amount={500}
            category="Work"
          />
          <TransactionItem
            type="Investment"
            description="In Microsoft"
            amount={2000}
            category="Cleaning"
          />
        </PlaygroundItemContainer>
        <PlaygroundItemContainer title="Button Component">
          <Button variant="default" size="base">
            Test
          </Button>
          <Button variant="outline" size="lg">
            Test
          </Button>
          <Button variant="ghost" size="sm">
            Test
          </Button>
          <Button variant="ghost" size="xs">
            Test
          </Button>
        </PlaygroundItemContainer>
        <PlaygroundItemContainer
          title="Form Components"
          childrenWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <FormInput placeholder="Test input" />
          <FormInput type="password" placeholder="Test password" />
          <FormInput type="checkbox" />
          <FormInput type="email" placeholder="Test email" />
          <FormInput type="number" placeholder="Test number" />
          <FormInput type="date" placeholder="Test date" />
          <FormInput type="tel" placeholder="Test tel" />
          <FormSelect
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
          />
        </PlaygroundItemContainer>
      </div>
    </main>
  );
}

export function PlaygroundItemContainer({
  title,
  titleClassName,
  childrenWrapperClassName,
  containerClassName,
  children,
}: {
  children: React.ReactNode;
  title: string;
  titleClassName?: string;
  childrenWrapperClassName?: string;
  containerClassName?: string;
}) {
  return (
    <div className={`my-8 ${containerClassName}`}>
      <h2 className={`mb-4 text-5xl font-mono ${titleClassName}`}>{title}</h2>
      <hr className="mb-4 border-gray-200 dark:border-gray-800" />
      <div className={`flex space-x-8 ${childrenWrapperClassName}`}>
        {children}
      </div>
    </div>
  );
}
