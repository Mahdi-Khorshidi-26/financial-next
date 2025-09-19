import { TransactionsType } from "@/app/dashboard/components/transactionsList";
import { formatCurrencyType } from "@/types";

const formatCurrency: formatCurrencyType = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

export { formatCurrency };

export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

export const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax${
    location.protocol === "https:" ? "; Secure" : ""
  }`;
};

export const groupAndSumTransactionsByDate = (
  transactions: TransactionsType[]
) => {
  const grouped: Record<
    string,
    { transactions: TransactionsType[]; amount: number }
  > = {};

  for (const transaction of transactions) {
    // Extract date part (e.g., "2023-03-15" from "2023-03-15T23:00:00")
    const date = transaction.created_at.split("T")[0];

    // Initialize if not exists
    if (!grouped[date]) {
      grouped[date] = {
        transactions: [],
        amount: 0,
      };
    }

    // Add transaction to group
    grouped[date].transactions.push(transaction);

    // Calculate amount: subtract expenses, add income
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;

    // Add to total amount
    grouped[date].amount += amount;
  }

  return grouped;
};

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
