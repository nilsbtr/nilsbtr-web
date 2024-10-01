"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun, LuTv2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    let nextTheme: Theme;

    if (systemTheme === "light") {
      nextTheme =
        theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    } else if (systemTheme === "dark") {
      nextTheme =
        theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    } else {
      nextTheme = "light"; // Fallback if systemTheme is neither light nor dark
    }

    setTheme(nextTheme);
  };

  if (!mounted) return null;

  const currentTheme: Theme =
    theme === "system" && (systemTheme === "light" || systemTheme === "dark")
      ? "system"
      : (theme as Theme);

  return (
    <Button variant="default" size="icon" onClick={handleThemeChange}>
      {currentTheme === "light" && <LuSun />}
      {currentTheme === "system" && <LuTv2 />}
      {currentTheme === "dark" && <LuMoon />}
    </Button>
  );
};

export default ThemeSwitcher;
