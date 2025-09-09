import Skeleton from "@/components/skeleton";

export default function TransactionListFallback() {
  return (
    <div className="space-y-4">
      <TransactionItemListFallback />
    </div>
  );
}

export function TransactionSummaryItemFallback() {
  return (
    <div className="space-y-4 mb-4">
      <TransactionSummaryItemSkeleton />
    </div>
  );
}

function TransactionItemListFallback() {
  return (
    <div className="w-full flex items-center">
      <div className="flex items-center mr-4 grow">
        <Skeleton />
      </div>

      <div className="min-w-[150px] items-center hidden md:flex">
        <Skeleton />
      </div>

      <div className="min-w-[70px] text-right">
        <Skeleton />
      </div>
      <div className="min-w-[50px] flex justify-end">
        <Skeleton />
      </div>
    </div>
  );
}

function TransactionSummaryItemSkeleton() {
  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow">
        <Skeleton />
      </div>
      <div className="min-w-[70px] text-right font-semibold">
        <Skeleton />
      </div>
      <div className="min-w-[50px]">
        <Skeleton />
      </div>
    </div>
  );
}
