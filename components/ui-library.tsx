"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { PillToggle } from "@/components/ui/pill-toggle";
import CSSBox from "@/components/fancy/blocks/css-box";
import Typewriter from "@/components/fancy/text/typewriter";

const PILL_TOGGLE_CODE = `"use client";

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
        className="relative w-10 h-[60px] rounded-xl border border-border bg-card
          flex flex-col overflow-hidden shadow-sm active:scale-[0.96]
          transition-transform duration-150"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        <span className={cn(
          "flex-1 flex items-center justify-center transition-[background-color,box-shadow] duration-200",
          isLight
            ? "bg-primary/10 shadow-[inset_0_3px_6px_rgba(0,0,0,0.12)]"
            : "bg-transparent"
        )}>
          <Sun size={13} weight="bold"
            className={isLight ? "text-primary" : "text-muted-foreground/25"} />
        </span>
        <span className="h-px bg-border shrink-0" />
        <span className={cn(
          "flex-1 flex items-center justify-center transition-[background-color,box-shadow] duration-200",
          !isLight
            ? "bg-foreground/[0.08] shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)]"
            : "bg-transparent"
        )}>
          <MoonStars size={13} weight="bold"
            className={!isLight ? "text-foreground" : "text-muted-foreground/25"} />
        </span>
      </button>
      <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wide">
        {mounted ? (isLight ? "light" : "dark") : ""}
      </span>
    </div>
  );
}`;

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-150 active:scale-[0.96] transition-transform"
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <Check size={12} weight="bold" className="text-primary" />
          <span className="text-primary">Copied</span>
        </>
      ) : (
        <>
          <Copy size={12} weight="bold" />
          Copy
        </>
      )}
    </button>
  );
}

interface ComponentCardProps {
  name: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

function ComponentCard({ name, description, code, children }: ComponentCardProps) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      {/* preview */}
      <div className="flex items-center justify-center min-h-[160px] bg-[radial-gradient(ellipse_at_50%_50%,rgba(70,85,214,0.04),transparent_70%)] border-b border-border p-8">
        {children}
      </div>

      {/* meta */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-[13px] font-semibold text-foreground">{name}</p>
        <p className="mt-0.5 text-[12px] text-muted-foreground">{description}</p>
      </div>

      {/* code */}
      <div className="relative">
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/60">
          <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wide">
            component
          </span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto px-5 py-4 text-[11px] font-mono leading-relaxed text-muted-foreground max-h-64">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function UILibrary() {
  return (
    <section className="pt-36 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-[10px] font-mono tracking-[0.18em] text-primary">
          samhc.us
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          UI Kit<span className="text-primary">.</span>
        </h1>
        <p className="mt-3 text-[14px] text-muted-foreground max-w-md leading-relaxed">
          Small components from the house. No library. Just patterns I keep reusing.
          Copy freely.
        </p>

        <div className="mt-12 flex flex-col gap-8">
          <ComponentCard
            name="Pill Toggle"
            description="Two-position rocker for light/dark mode. Inset shadow shows the active half."
            code={PILL_TOGGLE_CODE}
          >
            <PillToggle />
          </ComponentCard>

          <ComponentCard
            name="CSS Box"
            description="Draggable 3D cube with CSS perspective. Drag to rotate. Accepts any React node on each face."
            code={`import CSSBox from "@/components/fancy/blocks/css-box"\n\n<CSSBox\n  width={120} height={120} depth={120}\n  draggable\n  faces={{\n    front: <div className="w-full h-full bg-primary/20 flex items-center justify-center text-2xl">🏠</div>,\n    back: <div className="w-full h-full bg-foreground/10 flex items-center justify-center text-2xl">😡</div>,\n  }}\n/>`}
          >
            <CSSBox
              width={110}
              height={110}
              depth={110}
              draggable
              faces={{
                front: <div className="w-full h-full rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-3xl">🏠</div>,
                back: <div className="w-full h-full rounded-lg bg-foreground/10 border border-border flex items-center justify-center text-3xl">😡</div>,
                left: <div className="w-full h-full rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-3xl">☕</div>,
                right: <div className="w-full h-full rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-3xl">🚀</div>,
                top: <div className="w-full h-full rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-xs font-mono text-muted-foreground">stay mad</div>,
                bottom: <div className="w-full h-full rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-xs font-mono text-muted-foreground">ship it</div>,
              }}
            />
          </ComponentCard>

          <ComponentCard
            name="Typewriter"
            description="Types and deletes strings in sequence. Loop through an array of text with configurable speed and cursor."
            code={`import Typewriter from "@/components/fancy/text/typewriter"\n\n<Typewriter\n  text={["rage", "coffee", "love"]}\n  speed={60}\n  deleteSpeed={40}\n  waitTime={1800}\n/>`}
          >
            <div className="flex items-center gap-2 text-sm text-foreground font-mono">
              <span>Created with 😡</span>
              <Typewriter
                text={["rage", "coffee", "love"]}
                as="span"
                speed={60}
                deleteSpeed={40}
                waitTime={1800}
                className="text-sm font-mono text-primary"
                cursorClassName="ml-0.5 text-primary"
              />
              <span>by Samuel</span>
            </div>
          </ComponentCard>
        </div>
      </div>
    </section>
  );
}
