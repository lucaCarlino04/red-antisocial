import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeBoton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-md border border-zinc-400 dark:border-gray-700 bg-zinc-300 dark:bg-gray-900 flex items-center justify-center overflow-hidden"
    >
      <Sun
        className={`absolute transition-all duration-300
          ${isDark ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}
      />
      <Moon
        className={`absolute transition-all duration-300
          ${isDark ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}
      />
    </button>
  );
}
