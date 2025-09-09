"use client";
import Link from "next/link";
// import DarkModeToggle from "../darkModeToggle";
import { DarkModeToggler, useDarkMode } from "dark-mode-toggler";

export default function PageHeader({ className }: { className?: string }) {
  const { theme, resolvedTheme, toggleTheme, setTheme, mounted } =
    useDarkMode();

  return (
    <header className={`flex justify-between items-center ${className}`}>
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
          toggleTheme={toggleTheme}
          mounted={mounted}
        />
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
