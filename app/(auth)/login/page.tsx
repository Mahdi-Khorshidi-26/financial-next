import LoginForm from "./components/loginForm";

export default function Login() {
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
