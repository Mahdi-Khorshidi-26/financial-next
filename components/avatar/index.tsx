import { createClient } from "@/utils/supabase/server";
import { CircleUser } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Avatar() {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(user?.user_metadata.avatar || "", 60 * 5 /* 5 minutes */);

  if (error || !data || !data.signedUrl) {
    return <CircleUser className="w-6 h-6 text-gray-400" />;
  }

  return <Image src={data.signedUrl} alt="User Avatar" className="w-6 h-6 rounded-full" width={24} height={24} />;
}
