import Avatar from "@/components/avatar";
import Button from "@/components/button";
import SignOutButton from "@/components/signout";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

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
            <Link href="/dashboard/settings" className="mr-4">
              <Button variant="ghost" size="sm">
                <div className="flex items-center gap-2">
                  <Avatar />
                  <span>{user.user_metadata.fullName ?? user.email}</span>
                </div>
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
