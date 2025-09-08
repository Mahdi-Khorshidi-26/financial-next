import { formatCurrencyType } from "@/types";

const formatCurrency: formatCurrencyType = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

export { formatCurrency };
