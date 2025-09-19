'use client"';

import Button from "@/components/button";
import { TransactionItemProps } from "@/components/transactionItem/types";
import { updateTransaction } from "@/lib/actions";
import { Edit2, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TransactionUpdateButton({
  id,
}: {
  id?: number;
}) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const handleClick = async () => {
    setConfirmed((perv) => !perv);
    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link href={`/dashboard/transaction/${id}/edit`}>
        <Button
          variant={!confirmed ? "ghost" : "success"}
          size="xs"
          className="hover:text-green-500 hover:bg-green-500"
          onClick={handleClick}
          aria-disabled={loading}
        >
          {!loading && <Edit2 className="w-4 h-4" />}
          {loading && <Loader className="w-4 h-4 animate-spin" />}
        </Button>
      </Link>
    </>
  );
}
