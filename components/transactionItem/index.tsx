import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { TransactionItemProps } from "./types";
import { typesMap } from "./utils";
import TransactionRemoveButton from "@/app/dashboard/components/transactionRemoveButton";

export default function TransactionItem({
  type,
  category,
  description,
  amount,
  id,
  onRemoved,
}: TransactionItemProps) {
  const formattedAmount = useFormatCurrency(amount);

  // Normalize type to match typesMap keys (capitalize first letter)
  const normalizedType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  const typeConfig = typesMap[normalizedType];

  // Fallback icon/colors if type is not found
  const IconComponent = typeConfig
    ? typeConfig.icon
    : () => <span className="w-4 h-4 mr-2" />;
  const colors = typeConfig ? typeConfig.colors : "text-gray-400";

  return (
    <div className="w-full flex items-center">
      <div className="flex items-center mr-4 grow">
        <IconComponent className={`${colors} mr-2 w-4 h-4 hidden sm:block`} />
        <span>{description}</span>
      </div>

      <div className="min-w-[150px] items-center hidden md:flex">
        {category && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
            {category}
          </div>
        )}
      </div>

      <div className="min-w-[70px] text-right">{formattedAmount}</div>
      <div className="min-w-[50px] flex justify-end">
        <TransactionRemoveButton id={id} onRemoved={onRemoved} />
      </div>
    </div>
  );
}
