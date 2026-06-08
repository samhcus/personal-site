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
