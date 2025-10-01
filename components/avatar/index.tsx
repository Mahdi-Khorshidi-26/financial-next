import { createClient } from "@/utils/supabase/server";
import { CircleUser } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Avatar({ className }: { className?: string }) {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(user?.user_metadata.avatar || "", 60 * 5 /* 5 minutes */);

  if (error || !data || !data.signedUrl) {
    return <CircleUser className={`w-6 h-6 text-gray-400 ${className}`} />;
  }

  // Determine size based on className for optimal image dimensions
  const isLarge = className?.includes("w-24") || className?.includes("h-24");
  const intrinsicSize = isLarge ? 200 : 96; // Use higher resolution for better quality
  const sizes = isLarge ? "96px" : "24px";

  return (
    <div className={`w-6 h-6 rounded-full overflow-hidden ${className}`}>
      <Image
        src={data.signedUrl}
        alt="User Avatar"
        className="w-full h-full object-cover"
        width={intrinsicSize}
        height={intrinsicSize}
        quality={100}
        sizes={sizes}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
