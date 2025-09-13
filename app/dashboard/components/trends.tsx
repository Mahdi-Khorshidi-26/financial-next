import Trends from "@/components/trends";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Trend({ type }: { type: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
  });
  if (error) throw new Error(error.message);
  const amount = data ?? 0;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Trends type={type} amount={amount} prevAmount={amount - 500} />
    </Suspense>
  );
}
