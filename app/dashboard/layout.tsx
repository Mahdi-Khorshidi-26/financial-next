import Button from "@/components/button";
import SignOutButton from "@/components/signout";
import { createClient } from "@/utils/supabase/server";
import { CircleUser } from "lucide-react";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        {user && user.id && <SignOutButton />}
        <div>
          {user && user.id && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <CircleUser className="mr-2" />
              <span>{user.email}</span>
            </Button>
          )}
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
