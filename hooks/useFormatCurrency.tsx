import { useMemo } from "react";

export function useFormatCurrency(amount: number) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);

  return useMemo(() => formatCurrency(amount), [amount]);
}
