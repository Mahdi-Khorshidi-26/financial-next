"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RangeSelect } from "./rangeSelect";


interface UserMetadata {
  defaultPreference?: string;
}

interface User {
  user_metadata?: UserMetadata;
}

export default function Range({ user }: { user?: User }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const range =
    searchParams.get("range") ?? user?.user_metadata?.defaultPreference ?? "last30days";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams();
    params.set("range", e.target.value);
    replace(`${pathName}?${params.toString()}`);
  }

  return <RangeSelect value={range} onChange={handleChange} />;
}
