import { TrendsProps } from "./types";
import { colorClasses, formatCurrency } from "./utils";

export default function Trends({ type, amount, prevAmount }: TrendsProps) {
  return (
    <div>
      <div className={`font-semibold ${colorClasses[type as keyof typeof colorClasses]}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {amount ? formatCurrency(amount) : formatCurrency(0)}
      </div>
    </div>
  );
}
