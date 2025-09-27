"use client";
import { LogOut } from "lucide-react";
import SubmitButton from "../submitButton";
import { signOut } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form action={signOut} className="flex items-center space-x-2 pt-4">
      <p className="font-bold text-gray-700 dark:text-gray-200 ">Logout</p>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6 text-rose-900 dark:text-rose-400" />
      </SubmitButton>
    </form>
  );
}
