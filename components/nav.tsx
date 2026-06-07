"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CommandTrigger } from "@/components/command-menu";
import { RetroThemeToggle } from "@/components/ui/retro-theme-toggle";
import { cn } from "@/lib/utils";
import { useCommandMenu } from "@/lib/command-menu-context";
import { List } from "@phosphor-icons/react";

const links = [
  { label: "Ideas",    href: "#ideas"    },
  { label: "Guides",   href: "#guides"   },
  { label: "Products", href: "#products" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { toggle } = useCommandMenu();

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div id="nav-sentinel" className="absolute top-0 h-px w-full pointer-events-none" aria-hidden />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-400",
            scrolled
              ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              : "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-black/8 dark:border-white/8"
          )}
        >
          <a href="/" className="flex items-center gap-2 pl-1 pr-2">
            <Image
              src="/logo.png"
              alt="Mad House"
              width={26}
              height={26}
              className="rounded-sm drop-shadow-sm"
              priority
            />
            <span className="text-sm font-black tracking-tight text-foreground">Mad House</span>
          </a>

          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-black/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-1 pl-1">
            <CommandTrigger />
            <RetroThemeToggle />
          </div>

          {/* Mobile: shadcn Sheet */}
          <Sheet open={sheetOpen} onOpenChange={(open: boolean) => setSheetOpen(open)}>
            <SheetTrigger className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/6 transition-colors text-foreground ml-1">
              <List weight="bold" size={16} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:max-w-full flex flex-col justify-center items-center gap-5 bg-white dark:bg-zinc-900 border-0"
            >
              <Image src="/logo.png" alt="Mad House" width={72} height={72} className="mb-2 drop-shadow-md" />

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setSheetOpen(false)}
                  className="text-3xl font-black tracking-tight text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={() => { setSheetOpen(false); toggle(); }}
                className="mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Search ⌘K
              </button>

              <div className="mt-2">
                <RetroThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </motion.nav>
      </header>
    </>
  );
}
