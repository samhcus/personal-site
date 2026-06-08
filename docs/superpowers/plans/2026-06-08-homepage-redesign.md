# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic startup homepage with a raw, personal creative build house for Samuel, removing the lanyard badge and lame sections and building a tweet-quote rotator, floating Samuel widget, pinboard work section, and honest community + newsletter sections.

**Architecture:** Data lives in `lib/` (quotes, work items as typed arrays), components are each their own file, page.tsx is updated last after all components exist. No state management needed beyond local component state.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, motion/react (AnimatePresence + motion.div), Phosphor icons, existing shadcn Input + PushButton

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `lib/quotes.ts` | Quote data array + Quote type |
| Create | `lib/work-items.ts` | WorkItem data array + WorkItem type |
| Create | `components/quote-rotator.tsx` | Tweet-style rotating quote card |
| Rewrite | `components/hero.tsx` | Single-column hero, no lanyard, uses QuoteRotator |
| Create | `components/samuel-widget.tsx` | Fixed floating GIF + video panel widget |
| Create | `components/work-section.tsx` | Pinboard grid of work tiles |
| Rewrite | `components/community-section.tsx` | Statement + social links, no LaunchCard/EventTicket |
| Update | `components/newsletter.tsx` | New copy, same form logic |
| Update | `app/page.tsx` | Remove Bento + IncomingSection, add new components |

---

## Task 1: Quote data

**Files:**
- Create: `lib/quotes.ts`

- [ ] **Step 1: Create the data file**

```ts
export type Quote = {
  name: string;
  handle: string;
  text: string;
  avatar: string | null;
};

export const quotes: Quote[] = [
  {
    name: "tbd",
    handle: "@tbd",
    text: "A quote that moves you goes here.",
    avatar: null,
  },
];
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/quotes.ts
git commit -m "feat: add quotes data file"
```

---

## Task 2: Work items data

**Files:**
- Create: `lib/work-items.ts`

- [ ] **Step 1: Create the data file**

```ts
export type WorkItemType = "tool" | "guide" | "video" | "art";

export type WorkItem = {
  type: WorkItemType;
  title: string;
  description: string;
  href: string;
  wide?: boolean;
};

export const workItems: WorkItem[] = [
  {
    type: "tool",
    title: "Something useful",
    description: "A tool is being built. It'll be here soon.",
    href: "#",
    wide: true,
  },
  {
    type: "guide",
    title: "Something worth reading",
    description: "A guide is in progress.",
    href: "#",
  },
  {
    type: "video",
    title: "Something worth watching",
    description: "Coming.",
    href: "#",
  },
];
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/work-items.ts
git commit -m "feat: add work items data file"
```

---

## Task 3: QuoteRotator component

**Files:**
- Create: `components/quote-rotator.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { quotes } from "@/lib/quotes";

const ease = [0.16, 1, 0.3, 1] as const;

export function QuoteRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const quote = quotes[index];

  return (
    <div className="max-w-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease }}
          className="border border-foreground/[0.08] rounded-2xl p-4 bg-foreground/[0.02]"
        >
          <div className="flex items-center gap-2.5 mb-3">
            {quote.avatar ? (
              <img
                src={quote.avatar}
                alt={quote.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-foreground/10 shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground leading-none truncate">
                {quote.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {quote.handle}
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{quote.text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/quote-rotator.tsx
git commit -m "feat: add QuoteRotator component"
```

---

## Task 4: Rewrite hero.tsx

**Files:**
- Rewrite: `components/hero.tsx`

Removes the 2-column grid, lanyard badge, "Est. 2025" label, and stat line. Adds QuoteRotator. Single-column, left-aligned, max-w-3xl.

- [ ] **Step 1: Replace the entire file**

```tsx
"use client";

import { motion } from "motion/react";
import { QuoteRotator } from "@/components/quote-rotator";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, delay, ease },
  };
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(240,55,40,0.07),transparent)]" />
      </div>

      <div className="max-w-3xl mx-auto w-full relative">
        <div className="flex flex-col gap-6">
          <motion.h1
            {...fadeUp(0)}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.92]"
          >
            Mad
            <br />
            <span className="text-primary">House.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="text-base text-muted-foreground"
          >
            Samuel.
          </motion.p>

          <motion.div {...fadeUp(0.2)}>
            <QuoteRotator />
          </motion.div>

          <motion.div
            {...fadeUp(0.32)}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 rounded-full h-12 px-7 font-medium text-sm bg-primary text-white transition-colors duration-200 hover:bg-primary/85 active:scale-[0.97]"
            >
              Get inside
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full h-12 px-7 font-medium text-sm text-foreground border border-foreground/[0.12] hover:border-primary/30 hover:text-primary transition-colors duration-200 active:scale-[0.97]"
            >
              See the work
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify hero looks right**

```bash
pnpm dev
```

Open http://localhost:3000. Verify:
- "Mad House." large type, left-aligned
- "Samuel." below in muted text
- Quote card below that with placeholder quote
- Two CTAs: "Get inside" and "See the work"
- No lanyard, no badge, no "Est. 2025" label
- Hero is full viewport height

- [ ] **Step 4: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: rewrite hero — remove lanyard, add quote rotator"
```

---

## Task 5: SamuelWidget component

**Files:**
- Create: `components/samuel-widget.tsx`

Fixed bottom-right floating circle. GIF_URL and VIDEO_URL are null until Samuel provides them. Null GIF shows initials "S". Null video shows honest coming-soon state.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const VIDEO_URL: string | null = null;
const GIF_URL: string | null = null;

export function SamuelWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 z-50 w-72 rounded-2xl border border-foreground/[0.08] bg-background shadow-2xl overflow-hidden"
          >
            {VIDEO_URL ? (
              <video
                src={VIDEO_URL}
                controls
                autoPlay
                playsInline
                className="w-full aspect-video block"
              />
            ) : (
              <div className="p-5">
                <p className="text-sm font-medium text-foreground">
                  Samuel's intro is on its way.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Check back soon.
                </p>
              </div>
            )}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-foreground/10 text-foreground/50 hover:bg-foreground/20 transition-colors text-[10px] font-medium"
              aria-label="Close"
            >
              x
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full overflow-hidden border-2 border-foreground/10 hover:border-primary/40 transition-colors duration-200 active:scale-[0.97] shadow-lg bg-foreground/[0.04]"
        aria-label="Meet Samuel"
      >
        {GIF_URL ? (
          <img
            src={GIF_URL}
            alt="Samuel waving"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-xs font-semibold text-muted-foreground">
            S
          </span>
        )}
      </button>
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/samuel-widget.tsx
git commit -m "feat: add SamuelWidget floating component"
```

---

## Task 6: WorkSection component

**Files:**
- Create: `components/work-section.tsx`

Pinboard grid. `wide: true` items span 2 columns on desktop. Tiles fade in staggered on scroll.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";
import { workItems, type WorkItem } from "@/lib/work-items";

const ease = [0.16, 1, 0.3, 1] as const;

function WorkTile({ item, index }: { item: WorkItem; index: number }) {
  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      className={[
        "group block rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6 hover:border-foreground/[0.14] transition-colors duration-200",
        item.wide ? "lg:col-span-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-[11px] font-mono text-muted-foreground/50 mb-3">
        {item.type}
      </p>
      <p className="text-base font-medium text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
        {item.title}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>
    </motion.a>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-muted-foreground/50 mb-3">
            the work
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            What comes out of here.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {workItems.map((item, i) => (
            <WorkTile key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/work-section.tsx
git commit -m "feat: add WorkSection pinboard component"
```

---

## Task 7: Rewrite community-section.tsx

**Files:**
- Rewrite: `components/community-section.tsx`

Strips LaunchCard, EventTicket, neo-card, and et-card entirely. Replaces with a statement + social links row. Keeps the `id="community"` anchor. The dead neo-/et-/sc- CSS in globals.css is left in place (out of scope).

- [ ] **Step 1: Replace the entire file**

```tsx
"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const socials = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-xs font-mono text-muted-foreground/50 mb-4">
            community
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-tight mb-4">
            Real people. Real work. No theater.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-8">
            A place for builders who are actually building. Follow along and get involved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-foreground/[0.08] text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors duration-200 active:scale-[0.97]"
              >
                {icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/community-section.tsx
git commit -m "feat: rewrite community section — remove launch card and event ticket"
```

---

## Task 8: Update newsletter.tsx

**Files:**
- Update: `components/newsletter.tsx`

Keeps all form logic and structure identical. Updates: heading, label, perks, and bottom copy only.

- [ ] **Step 1: Replace the file**

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { PushButton } from "@/components/ui/push-button";
import { toast } from "sonner";
import { ArrowRight } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're in.", {
        description: "First issue hits your inbox soon.",
        duration: 5000,
      });
    }, 600);
  };

  return (
    <section id="newsletter" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="relative rounded-3xl overflow-hidden border border-primary/12 px-8 md:px-16 py-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% -10%, rgba(240,55,40,0.08) 0%, transparent 60%), var(--card)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-primary/40 rounded-full" />

          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[0.95]">
              Get inside
              <br />
              Mad House.
            </h2>

            <p className="mt-5 text-sm text-muted-foreground/70 max-w-xs mx-auto leading-relaxed">
              A small, close rotation. What I'm building, what I'm learning, what ships next.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-full px-5 bg-foreground/[0.04] border-foreground/[0.1] text-sm flex-1 min-w-0 placeholder:text-muted-foreground/40 focus:border-primary/40 focus:ring-primary/20"
              />
              <PushButton type="submit" disabled={loading}>
                <ArrowRight weight="bold" size={16} />
              </PushButton>
            </form>

            <p className="mt-4 text-xs text-muted-foreground/50">
              Small list. High signal. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/newsletter.tsx
git commit -m "feat: update newsletter copy — get inside mad house"
```

---

## Task 9: Update page.tsx

**Files:**
- Update: `app/page.tsx`

Remove Bento and IncomingSection. Add WorkSection (after Hero) and SamuelWidget (after CommandMenu, outside the main content flow since it's fixed).

- [ ] **Step 1: Replace the file**

```tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WorkSection } from "@/components/work-section";
import { StudioSection } from "@/components/studio-section";
import { ContentFeed } from "@/components/content-feed";
import { CommunitySection } from "@/components/community-section";
import { CookieBanner } from "@/components/cookie-banner";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";
import { FileTreeNav } from "@/components/file-tree-nav";
import { SamuelWidget } from "@/components/samuel-widget";

export default function Home() {
  return (
    <main>
      <CommandMenu />
      <FileTreeNav />
      <SamuelWidget />
      <Nav />
      <Hero />
      <WorkSection />
      <StudioSection />
      <ContentFeed />
      <CommunitySection />
      <CookieBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Build**

```bash
pnpm build
```

Expected: build succeeds with no errors.

- [ ] **Step 4: Visual verification**

```bash
pnpm dev
```

Open http://localhost:3000. Walk through in order:
- Hero: "Mad House." large, "Samuel." below, quote card, two CTAs. No lanyard, no badge, no "Est. 2025".
- Work section: "What comes out of here." heading, 3 honest placeholder tiles.
- Studio section: unchanged.
- Content feed: unchanged.
- Community: "Real people. Real work. No theater." + 3 social icons.
- Newsletter: "Get inside Mad House." heading, single-line description, form.
- Footer: unchanged.
- Samuel widget: fixed bottom-right "S" circle. Click opens panel with "Samuel's intro is on its way."

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up homepage — remove bento/incoming, add work section and samuel widget"
```
