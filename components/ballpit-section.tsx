"use client";

import { motion } from "motion/react";
import { BallpitCanvas } from "@/components/BallpitCanvas";

const ease = [0.16, 1, 0.3, 1] as const;

export function BallpitSection() {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Sandbox
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">Push things around.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease }}
          className="rounded-3xl border border-border overflow-hidden bg-[#0A0A0A]"
          style={{ height: 500 }}
        >
          <BallpitCanvas count={52} />
        </motion.div>
      </div>
    </section>
  );
}
