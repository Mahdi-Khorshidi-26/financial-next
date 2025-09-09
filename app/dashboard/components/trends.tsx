import Trends from "@/components/trends";
import { Suspense } from "react";

export default async function Trend({ type }: { type: string }) {
  const response = await fetch(`http://localhost:3100/trends/${type}`, {
    cache: "no-store",
  });
  const { amount, prevAmount } = await response.json();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Trends type={type} amount={amount} prevAmount={prevAmount} />
    </Suspense>
  );
}
