export type TransactionItemProps = {
  type: "Income" | "Expense" | "Investment" | "Saving";
  category: string;
  description: string;
  amount: number;
};

export type typesMapType = {
  [key: string]: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    colors: string;
  };
};
