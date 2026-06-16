"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { reading } from "@/lib/reading";
import { Reveal } from "@/components/reveal";
import { Cursor } from "@/components/motion-primitives/cursor";

const TILT = [-2.5, 1.8];

export function ReadingSection() {
  return (
    <section id="reading" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Currently reading<span className="text-primary">.</span>
          </h2>
        </Reveal>

        <div className="relative mt-8 flex flex-wrap gap-6">
          <Cursor
            attachToParent
            springConfig={{ bounce: 0.01 }}
            variants={{
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.5, opacity: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/reading/reading.gif"
              alt=""
              className="h-20 w-20 rounded-full object-cover ring-2 ring-background shadow-xl"
            />
          </Cursor>

          {reading.map((book, i) => (
            <Reveal key={book.title} index={Math.min(i, 4)}>
              <motion.figure
                className="w-[130px]"
                initial={{ rotate: TILT[i % TILT.length] }}
                whileHover={{ rotate: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="overflow-hidden rounded-lg border border-border shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.18)] transition-shadow duration-300">
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    width={260}
                    height={390}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="text-[12px] font-medium text-foreground leading-tight">
                    {book.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/60 leading-snug">
                    {book.author}
                  </p>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
