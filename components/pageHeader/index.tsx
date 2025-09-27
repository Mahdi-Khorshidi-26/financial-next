"use client";
import Link from "next/link";
import { DarkModeToggler, useDarkMode } from "dark-mode-toggler";
import Button from "../button";
import { CircleUser } from "lucide-react";

export default function PageHeader({
  className,
}: {
  className?: string;
}) {
  const { theme, resolvedTheme, toggleTheme, setTheme, mounted } =
    useDarkMode();
  const toggleDarkLight = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // const supabase = createClient();
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();

  return (
    <header
      className={`flex justify-between items-center ${className}`}
      suppressHydrationWarning
    >
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-4">
        <DarkModeToggler
          theme={theme}
          resolvedTheme={resolvedTheme}
          toggleTheme={toggleDarkLight}
          mounted={mounted}
          icons={{
            dark: <span>🌙</span>,
            light: <span>☀️</span>,
            // system: null, // will fallback to default if not provided
          }}
        />
        {/* <div>
          {user && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <CircleUser className="mr-2" />
              <span>{user.email}</span>
            </Button>
          )}
        </div> */}
      </div>
    </header>
  );
}
