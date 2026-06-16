"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, MoonStars } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function PillToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isLight = !mounted || resolvedTheme === "light";

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setTheme(isLight ? "dark" : "light")}
        className="relative w-10 h-[60px] rounded-xl border border-border bg-card flex flex-col overflow-hidden shadow-sm active:scale-[0.96] transition-transform duration-150"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        <span
          className={cn(
            "flex-1 flex items-center justify-center transition-[background-color,box-shadow] duration-200",
            isLight
              ? "bg-primary/10 shadow-[inset_0_3px_6px_rgba(0,0,0,0.12)]"
              : "bg-transparent"
          )}
        >
          <Sun size={13} weight="bold" className={isLight ? "text-primary" : "text-muted-foreground/25"} />
        </span>
        <span className="h-px bg-border shrink-0" />
        <span
          className={cn(
            "flex-1 flex items-center justify-center transition-[background-color,box-shadow] duration-200",
            !isLight
              ? "bg-foreground/[0.08] shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)]"
              : "bg-transparent"
          )}
        >
          <MoonStars size={13} weight="bold" className={!isLight ? "text-foreground" : "text-muted-foreground/25"} />
        </span>
      </button>
      <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wide">
        {mounted ? (isLight ? "light" : "dark") : ""}
      </span>
    </div>
  );
}
