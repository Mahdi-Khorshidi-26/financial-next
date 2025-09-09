"use client";

import React from "react";
import Button from "../button";
type ButtonProps = React.ComponentProps<typeof Button>;
import { Moon, Sun, Monitor } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

export type DarkModeToggleProps = {
  icons?: {
    dark?: React.ReactNode;
    light?: React.ReactNode;
    system?: React.ReactNode;
  };

  ariaLabels?: {
    dark?: string;
    light?: string;
    system?: string;
  };

  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  onToggleTheme?: (theme: "light" | "dark" | "system") => void;
  loadingPlaceholder?: React.ReactNode;
  children?: React.ReactNode;
};

export default function DarkModeToggle({
  icons,
  ariaLabels,
  className,
  variant = "ghost",
  size = "sm",
  onToggleTheme,
  loadingPlaceholder,
  children,
}: DarkModeToggleProps) {
  const { theme, toggleTheme, mounted } = useDarkMode();

  if (!mounted) {
    return (
      loadingPlaceholder ?? (
        <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
      )
    );
  }

  // Determine which icon to show based on current theme
  const Icon = () => {
    if (icons?.[theme]) return <>{icons[theme]}</>;
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

  // Determine aria-label for accessibility
  const getAriaLabel = () => {
    if (ariaLabels?.[theme]) return ariaLabels[theme];
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

  const handleClick = () => {
    if (onToggleTheme) {
      onToggleTheme(theme);
    } else {
      toggleTheme();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className ?? "p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"}
      aria-label={getAriaLabel()}
      size={size}
      variant={variant}
    >
      {children ? children : <Icon />}
    </Button>
  );
}
