"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Drawer } from "vaul";
import { RetroThemeToggle } from "@/components/ui/retro-theme-toggle";
import { cn } from "@/lib/utils";
import { useCommandMenu } from "@/lib/command-menu-context";
import { List } from "@phosphor-icons/react";

const links = [
  { label: "Ships",      href: "#work"        },
  { label: "Newsletter", href: "#newsletter"  },
  { label: "Studio",     href: "/studio"      },
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
            "flex items-center gap-1 rounded-full px-2 py-1.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[400ms]",
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
            <span className="text-sm font-medium tracking-tight text-foreground">Mad House</span>
          </a>

          <div className="flex items-center gap-1 pl-1">
            <RetroThemeToggle />
            <Drawer.Root open={sheetOpen} onOpenChange={setSheetOpen}>
              <Drawer.Trigger className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/[0.06] transition-colors text-foreground">
                <List weight="bold" size={16} />
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-white dark:bg-zinc-900 outline-none">
                  <Drawer.Handle className="mx-auto mt-3 mb-1 h-1.5 w-12 rounded-full bg-black/10 dark:bg-white/10" />
                  <div className="flex flex-col items-center gap-5 px-6 pt-4 pb-12">
                    <Image src="/logo.png" alt="Mad House" width={56} height={56} className="mb-1 drop-shadow-md" />
                    {links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="text-3xl font-medium tracking-tight text-foreground active:scale-[0.97] transition-[color,transform] duration-150"
                      >
                        {link.label}
                      </a>
                    ))}
                    <button
                      onClick={() => { setSheetOpen(false); toggle(); }}
                      className="mt-2 text-sm text-muted-foreground active:scale-[0.97] transition-[color,transform] duration-150"
                    >
                      Search ⌘K
                    </button>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </motion.nav>
      </header>
    </>
  );
}
