"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

const links = [
  { label: "Projects", href: "/#projects" },
  { label: "Guide", href: "/guide" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 pt-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className={cn(
            "pointer-events-auto flex items-center gap-1 h-12 px-1.5 rounded-full border transition-[border-color,background-color,box-shadow] duration-300",
            scrolled
              ? "border-border bg-background/90 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
              : "border-border/60 bg-background/70 backdrop-blur-sm"
          )}
        >
          {/* Menu */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="push-btn outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="push-btn-back" />
            <span className="push-btn-front" />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/25"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="nav-panel"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
              className="fixed top-[72px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-sm rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Samuel</p>
                    <p className="text-[11px] text-muted-foreground">@samhcus · samhc.us</p>
                  </div>
                  <div className="ml-auto">
                    {mounted && (
                      <AnimatedThemeToggler
                        theme={resolvedTheme === "dark" ? "dark" : "light"}
                        onThemeChange={setTheme}
                        aria-label="Toggle light and dark mode"
                        className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] active:scale-[0.92] transition-[color,background-color,transform] duration-150 [&_svg]:w-4 [&_svg]:h-4"
                      />
                    )}
                  </div>
                </div>

                <nav className="mt-3 flex flex-col gap-0.5">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center h-10 px-3 rounded-xl text-[15px] font-medium text-foreground hover:bg-foreground/[0.04] active:scale-[0.98] transition-[background-color,transform] duration-150"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
