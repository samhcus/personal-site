"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandOption,
  CommandGroup,
  CommandEmpty,
  CommandSeparator,
} from "@kmenu/react";
import {
  House,
  Lightbulb,
  BookOpen,
  Wrench,
  UsersThree,
  EnvelopeSimple,
  Package,
  Handshake,
  MagnifyingGlass,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useCommandMenu } from "@/lib/command-menu-context";

type CmdData = {
  group: "nav" | "actions";
  icon: React.ElementType;
  href: string;
};

const allOptions: { id: string; label: string; data: CmdData }[] = [
  { id: "home",      label: "Home",                    data: { group: "nav",     icon: House,          href: "/"           } },
  { id: "ideas",     label: "Browse ideas",            data: { group: "nav",     icon: Lightbulb,      href: "#ideas"      } },
  { id: "guides",    label: "Read guides",             data: { group: "nav",     icon: BookOpen,       href: "#guides"     } },
  { id: "how-tos",   label: "How-tos",                 data: { group: "nav",     icon: Wrench,         href: "#guides"     } },
  { id: "community", label: "Community",               data: { group: "nav",     icon: UsersThree,     href: "#about"      } },
  { id: "subscribe", label: "Subscribe to newsletter", data: { group: "actions", icon: EnvelopeSimple, href: "#newsletter" } },
  { id: "products",  label: "Browse products",         data: { group: "actions", icon: Package,        href: "#products"   } },
  { id: "contact",   label: "Work with us",            data: { group: "actions", icon: Handshake,      href: "#contact"    } },
];

const navOptions    = allOptions.filter((o) => o.data.group === "nav");
const actionOptions = allOptions.filter((o) => o.data.group === "actions");
const ease          = [0.16, 1, 0.3, 1] as const;

const optionCn = cn(
  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground cursor-pointer",
  "hover:bg-black/4 transition-colors duration-100",
  "data-[active=true]:bg-black/5 data-[active=true]:text-foreground",
  "outline-none select-none"
);

function OptionIcon({ Icon }: { Icon: React.ElementType }) {
  return (
    <span className="flex items-center justify-center w-7 h-7 rounded-md bg-black/5 border border-black/6 text-muted-foreground shrink-0">
      <Icon weight="duotone" size={14} />
    </span>
  );
}

export function CommandMenu() {
  const { open, setOpen } = useCommandMenu();

  const handleSelect = (option: { id?: string; label?: string; data?: CmdData }) => {
    setOpen(false);
    const href = option.data?.href;
    if (!href) return;
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[16vh] px-4 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-black/8 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            <Command open={open} onOpenChange={setOpen} options={allOptions} onSelect={handleSelect}>
              <div className="flex items-center gap-3 px-4 border-b border-black/6">
                <MagnifyingGlass weight="regular" size={15} className="text-muted-foreground shrink-0" />
                <CommandInput
                  placeholder="Search Mad House..."
                  className="w-full py-4 text-sm bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center shrink-0 rounded border border-black/8 bg-black/4 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                  esc
                </kbd>
              </div>

              <CommandList className="max-h-[340px] overflow-y-auto py-2 px-2">
                <CommandEmpty className="py-10 text-center text-sm text-muted-foreground">
                  No results.
                </CommandEmpty>

                <CommandGroup heading={
                  <span className="px-2 pb-1.5 pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground block">
                    Navigate
                  </span>
                }>
                  {navOptions.map((opt) => (
                    <CommandOption key={opt.id} value={opt} className={optionCn}>
                      <OptionIcon Icon={opt.data.icon} />
                      {opt.label}
                      <ArrowUpRight weight="bold" size={11} className="ml-auto text-muted-foreground/40 shrink-0" />
                    </CommandOption>
                  ))}
                </CommandGroup>

                <CommandSeparator className="my-1.5 h-px bg-black/6 mx-2" />

                <CommandGroup heading={
                  <span className="px-2 pb-1.5 pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground block">
                    Actions
                  </span>
                }>
                  {actionOptions.map((opt) => (
                    <CommandOption key={opt.id} value={opt} className={optionCn}>
                      <OptionIcon Icon={opt.data.icon} />
                      {opt.label}
                    </CommandOption>
                  ))}
                </CommandGroup>
              </CommandList>

              <div className="border-t border-black/6 px-4 py-2 flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
                {[
                  { keys: ["↑", "↓"], label: "navigate" },
                  { keys: ["↵"],      label: "select"   },
                  { keys: ["esc"],    label: "close"    },
                ].map(({ keys, label }) => (
                  <span key={label} className="flex items-center gap-1">
                    {keys.map((k) => (
                      <kbd key={k} className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded border border-black/8 bg-black/4 text-[9px]">
                        {k}
                      </kbd>
                    ))}
                    {label}
                  </span>
                ))}
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandTrigger() {
  const { toggle } = useCommandMenu();
  return (
    <button
      onClick={toggle}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all duration-200"
      aria-label="Open command menu"
    >
      <MagnifyingGlass weight="regular" size={13} />
      <span>Search</span>
      <span className="text-[10px] font-mono opacity-50">⌘K</span>
    </button>
  );
}
