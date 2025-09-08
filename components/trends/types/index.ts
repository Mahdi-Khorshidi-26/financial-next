export type TrendsProps = {
  type: string;
  amount: number;
  prevAmount: number;
};

export type calcPercentageChangeType = (
  amount: number,
  prevAmount: number
) => number;

export type formatCurrencyType = (amount: number) => string;

export type Category = "Income" | "Expense" | "Investment" | "Saving";
