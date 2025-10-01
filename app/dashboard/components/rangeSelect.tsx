import { JSX, ClassAttributes, SelectHTMLAttributes } from "react";

export function RangeSelect(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLSelectElement> & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150 pr-10"
      aria-label="Filter by time"
    >
      <option value="last24hours">Last 24 Hours</option>
      <option value="last7days">Last 7 Days</option>
      <option value="last30days">Last 30 Days</option>
      <option value="last12months">Last 12 Months</option>
      <option value="lifetime">Life Time</option>
    </select>
  );
}
