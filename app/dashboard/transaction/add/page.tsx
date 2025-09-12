import { Metadata } from "next";
import TransactionForm from "../../components/transactionForm";

export const metadata: Metadata = {
  title: "Add Transaction",
  description: "Add a new transaction",
};

export default function AddTransactionPage() {
  return <TransactionForm />;
}
