"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const rowOne = [
  { tag: "Idea",    text: "——" },
  { tag: "Guide",   text: "——" },
  { tag: "How-to",  text: "——" },
  { tag: "Idea",    text: "——" },
  { tag: "Guide",   text: "——" },
  { tag: "How-to",  text: "——" },
];

const rowTwo = [
  { tag: "How-to",  text: "——" },
  { tag: "Idea",    text: "——" },
  { tag: "Guide",   text: "——" },
  { tag: "How-to",  text: "——" },
  { tag: "Idea",    text: "——" },
  { tag: "Guide",   text: "——" },
];

const tagColors: Record<string, string> = {
  Idea:     "text-foreground/70",
  Guide:    "text-primary",
  "How-to": "text-muted-foreground",
};

function MarqueeItem({ tag, text }: { tag: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-5 whitespace-nowrap select-none">
      <span className={`text-xs font-medium tracking-widest uppercase ${tagColors[tag]}`}>
        {tag}
      </span>
      <span className="text-foreground/70 text-sm font-medium">{text}</span>
      <span className="text-border text-lg font-light ml-3">·</span>
    </span>
  );
}

function Marquee({ items, dir }: { items: typeof rowOne; dir: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-window py-1">
      <div className={`marquee-track marquee-track--${dir}`}>
        {doubled.map((item, i) => (
          <MarqueeItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

const stats = [
  { value: "—",      label: "pieces in draft" },
  { value: "—",      label: "dropping soon" },
  { value: "Free",   label: "forever" },
];

export function ContentFeed() {
  return (
    <section id="guides" className="py-24">
      <div className="px-4 max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[11px] font-medium tracking-[0.14em] text-primary/70 uppercase">
            In the pipeline
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            What we&apos;re making.
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="flex flex-col gap-2 border-y border-border py-4"
      >
        <Marquee items={rowOne} dir="left" />
        <Marquee items={rowTwo} dir="right" />
      </motion.div>

      <div className="px-4 max-w-7xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="grid grid-cols-3 divide-x divide-border border border-border rounded-2xl overflow-hidden"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-8 px-4 bg-card">
              <span className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                {value}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
