"use client";
import Link from "next/link";
import { DarkModeToggler, useDarkMode } from "dark-mode-toggler";

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
          }}
        />
      </div>
    </header>
  );
}
