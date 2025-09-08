// hooks/useDarkMode.ts
"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

// 👇 Helper: Read from localStorage
const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system"
    ? (stored as Theme)
    : null;
};

// 👇 Helper: Save to localStorage
const setStoredTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, theme);
};

// 👇 Resolve actual theme (if 'system', resolve to light/dark based on system)
const resolveTheme = (theme: Theme): "light" | "dark" => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
};

export const useDarkMode = (defaultTheme: Theme = "system") => {
  // Internal state holds user’s choice: 'light', 'dark', or 'system'
  const [userTheme, setUserTheme] = useState<Theme>(defaultTheme);
  // Resolved theme is what’s actually applied to UI (always 'light' or 'dark')
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize on client
  useEffect(() => {
    // 1. Try localStorage
    const storedTheme = getStoredTheme();

    // 2. Fallback to default
    const initialTheme = storedTheme || defaultTheme;
    setUserTheme(initialTheme);
    setResolvedTheme(resolveTheme(initialTheme));
    setMounted(true);

    // 3. Listen for system preference changes (if in 'system' mode)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = () => {
      if (userTheme === "system") {
        setResolvedTheme(resolveTheme("system"));
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    // 4. Listen for localStorage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme !== userTheme) {
          setUserTheme(newTheme);
          setResolvedTheme(resolveTheme(newTheme));
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Run once on mount

  // Apply resolved theme to <html> element
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme, mounted]);

  // Toggle theme — cycles: light → dark → system → light → ...
  const toggleTheme = () => {
    setUserTheme((prev) => {
      const next =
        prev === "light" ? "dark" : prev === "dark" ? "system" : "light";
      setStoredTheme(next);
      setResolvedTheme(resolveTheme(next));
      return next;
    });
  };

  // Optional: Set specific theme
  const setTheme = (theme: Theme) => {
    setUserTheme(theme);
    setStoredTheme(theme);
    setResolvedTheme(resolveTheme(theme));
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return {
      theme: defaultTheme,
      resolvedTheme: resolveTheme(defaultTheme),
      toggleTheme,
      setTheme,
      mounted: false,
    };
  }

  return {
    theme: userTheme, // What user selected: 'light' | 'dark' | 'system'
    resolvedTheme, // Actual applied theme: 'light' | 'dark'
    toggleTheme, // Cycles between modes
    setTheme, // Set specific mode
    mounted: true,
  };
};
