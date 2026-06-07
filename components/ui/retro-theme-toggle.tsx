"use client";

import { useId } from "react";
import { useTheme } from "next-themes";

export function RetroThemeToggle() {
  const id = useId();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative z-0 flex items-center" style={{ marginLeft: "18px", marginRight: "12px" }}>
      <input
        type="checkbox"
        id={id}
        className="retro-switch-input"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle dark mode"
      />
      <label htmlFor={id} className="retro-switch" />
    </div>
  );
}
