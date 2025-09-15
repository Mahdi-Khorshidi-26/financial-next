import { sizeTypes, variantTypes } from "@/components/button/types";

export const variants: Record<variantTypes, string> = {
  default:
    "bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed",
  outline:
    "border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed",
  ghost:
    "rounded-md bg-white dark:bg-black hover:bg-gray-300 dark:hover:bg-gray-500 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed",
  danger:
    "bg-red-500 text-white dark:bg-red-500 rounded-md hover:bg-red-700 dark:hover:bg-red-700 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed",
};

export const sizes: Record<sizeTypes, string> = {
  base: "text-base px-4 py-2",
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  lg: "text-lg px-4 py-2",
};
