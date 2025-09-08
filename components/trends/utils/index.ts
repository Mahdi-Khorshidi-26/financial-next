import {
  calcPercentageChangeType,
  Category,
} from "../types";

const calcPercentageChange: calcPercentageChangeType = (amount, prevAmount) => {
  if (prevAmount === 0) return 0;
  return ((amount - prevAmount) / prevAmount) * 100;
};



const colorClasses: Record<Category, string> = {
  Income: "text-green-700 dark:text-green-300",
  Expense: "text-red-700 dark:text-red-300",
  Investment: "text-indigo-700 dark:text-indigo-300",
  Saving: "text-yellow-700 dark:text-yellow-300",
};

export { calcPercentageChange, colorClasses };
