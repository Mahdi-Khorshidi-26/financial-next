import { Metadata } from "next";
import TransactionForm from "../../components/transactionForm";

export const metadata: Metadata = {
  title: "Add Transaction",
  description: "Add a new transaction",
};

export default function AddTransactionPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Add Transaction</h1>
      <TransactionForm />
    </>
  );
}
