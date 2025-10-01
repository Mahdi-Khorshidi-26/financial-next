import Avatar from "@/components/avatar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="text-center mt-10">No user data available.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow bg-white border border-gray-200">
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24" />
        <p className="text-gray-600 mb-1">
          <strong>Email:</strong> {user?.email}
        </p>
        {user?.user_metadata &&
          Object.entries(user.user_metadata).map(
            ([key, value]) =>
              key !== "avatar_url" &&
              key !== "full_name" && (
                <p className="text-gray-600 mb-1" key={key}>
                  <strong>{key.replace(/_/g, " ")}:</strong> {String(value)}
                </p>
              )
          )}
        <p className="text-gray-500 text-sm mt-4">
          <strong>User ID:</strong> {user?.id}
        </p>
      </div>
    </div>
  );
}
