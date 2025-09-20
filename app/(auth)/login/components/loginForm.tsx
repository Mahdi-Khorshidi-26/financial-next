"use client";
import SubmitButton from "@/components/submitButton";
import { login } from "@/lib/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form action={formAction} className="flex flex-col space-y-6">
      <input
        type="email"
        name="email"
        placeholder="name@example.com"
        required
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-transparent"
      />
      <SubmitButton type="submit" className="w-full">
        Sign in with email
      </SubmitButton>
      {state.error && (
        <p className="text-sm text-red-500 text-center">{state.message}</p>
      )}
      {!state.error && state.message && (
        <p className="text-sm text-green-500 text-center">{state.message}</p>
      )}
    </form>
  );
}
