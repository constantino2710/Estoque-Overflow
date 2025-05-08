"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="relative w-[3.5rem] h-[2rem] rounded-full border border-[var(--border)] transition-all duration-300 flex items-center justify-start mr-4 cursor-pointer"
      style={{
        backgroundColor: "var(--bg2)",
        border: "2px solid var(--border)",
      }}
    >
      {/* Bolinha deslizante com ícone */}
      <div
        className={`absolute left-[3px] w-[1.4rem] h-[1.4rem] rounded-full flex items-center justify-center transition-transform duration-300`}
        style={{
          backgroundColor: "var(--primary)",
          transform: isDark ? "translateX(1.45rem)" : "translateX(0)",
        }}
      >
        {isDark ? (
          // Ícone da lua
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          // Ícone do sol
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </div>
    </button>
  );
}
