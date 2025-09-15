'use client"';

import Button from "@/components/button";
import { deleteTransaction } from "@/lib/actions";
import { Loader, X } from "lucide-react";
import { useState } from "react";

export default function TransactionRemoveButton({
  id,
  onRemoved,
}: {
  id?: number;
  onRemoved?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    try {
      setLoading(true);
      await deleteTransaction(id!);
      onRemoved?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={!confirmed ? "ghost" : "danger"}
      size="xs"
      className="hover:text-red-500 hover:bg-red-500"
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
}
