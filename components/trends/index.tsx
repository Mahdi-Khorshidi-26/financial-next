"use client";
import { useMemo } from "react";
import { TrendsProps } from "./types";
import { calcPercentageChange, colorClasses } from "./utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";

export default function Trends({ type, amount, prevAmount }: TrendsProps) {
  const percentageChange: number = useMemo(
    () => Number(calcPercentageChange(amount, prevAmount).toFixed(2)),
    [amount, prevAmount]
  );

  const formattedAmount = useFormatCurrency(amount);

  return (
    <div>
      <div
        className={`font-semibold ${
          colorClasses[type as keyof typeof colorClasses]
        }`}
      >
        {type}
      </div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {formattedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {percentageChange <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        <div>{percentageChange}% vs last period</div>
      </div>
    </div>
  );
}
