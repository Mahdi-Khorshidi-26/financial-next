import { HandCoins, Landmark, PiggyBank, Wallet } from "lucide-react";
import { typesMapType } from "../types";

export const typesMap: typesMapType = {
  Income: {
    icon: HandCoins,
    colors: "text-green-500 dark:text-green-400",
  },
  Expense: {
    icon: Wallet,
    colors: "text-red-500 dark:text-red-400",
  },
  Saving: {
    icon: PiggyBank,
    colors: "text-indigo-500 dark:text-indigo-400",
  },
  Investment: {
    icon: Landmark,
    colors: "text-yellow-500 dark:text-yellow-400",
  },
};
