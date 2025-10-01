import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "./components/settingsForm";
import { cookies } from "next/headers";

export default async function SettingsPage() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return <div>Please log in to access settings.</div>;
  }
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>
      <SettingsForm defaults={data.user.user_metadata} />
    </>
  );
}
