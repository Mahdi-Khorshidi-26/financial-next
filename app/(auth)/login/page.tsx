import { createClient } from "@/utils/supabase/server";
import LoginForm from "./components/loginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (user && user.id) {
    return redirect("/dashboard");
  }
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-4">
      <div className="flex flex-col space-y-8 text-center">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email to sign in/create your account. No password is
          required.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
