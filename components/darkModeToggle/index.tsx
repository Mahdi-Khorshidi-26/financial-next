"use client";

import Button from "../button";
import { Moon, Sun, Monitor } from "lucide-react"; // 👈 Added Monitor for "system"
import { useDarkMode } from "@/hooks/useDarkMode";

export default function DarkModeToggle() {
  const { theme, toggleTheme, mounted } = useDarkMode();

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
    );
  }

  // 👇 Determine which icon to show based on current theme
  const Icon = () => {
    switch (theme) {
      case "dark":
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case "system":
        return <Monitor className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
      case "light":
      default:
        return <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />;
    }
  };

  // 👇 Determine aria-label for accessibility
  const getAriaLabel = () => {
    switch (theme) {
      case "dark":
        return "Switch to system theme";
      case "system":
        return "Switch to light theme";
      case "light":
      default:
        return "Switch to dark theme";
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label={getAriaLabel()}
      size="sm"
      variant="ghost"
    >
      <Icon />
    </Button>
  );
}
