"use client";

import { motion } from "motion/react";
import { ExpandableCardGrid, type ExpandableCardItem } from "@/components/ui/expandable-card";

const ease = [0.16, 1, 0.3, 1] as const;

const cards: ExpandableCardItem[] = [
  {
    title: "The Weekly",
    description: "Newsletter",
    ctaText: "Subscribe",
    ctaLink: "#newsletter",
    content: <p>Details coming soon.</p>,
  },
  {
    title: "Builder Pack #1",
    description: "Digital product",
    ctaText: "Get notified",
    ctaLink: "#newsletter",
    content: <p>Details coming soon.</p>,
  },
  {
    title: "The Real Stack",
    description: "Affiliate picks",
    ctaText: "Coming soon",
    ctaLink: "#newsletter",
    content: <p>Details coming soon.</p>,
  },
  {
    title: "Build With Mad House",
    description: "Consulting",
    ctaText: "Get in touch",
    ctaLink: "#contact",
    content: <p>Details coming soon.</p>,
  },
];

export function IncomingSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Incoming
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">Tap a card to open it.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <ExpandableCardGrid cards={cards} />
        </motion.div>
      </div>
    </section>
  );
}
