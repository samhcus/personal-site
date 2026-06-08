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
