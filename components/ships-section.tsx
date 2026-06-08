"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ships } from "@/lib/ships";

const ease = [0.16, 1, 0.3, 1] as const;

export function ShipsSection() {
  return (
    <section id="work" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <h2 className="text-2xl font-medium tracking-tight text-foreground">ships.</h2>
        </motion.div>
        <div>
          {ships.map((ship, i) => (
            <motion.a
              key={ship.name}
              href={ship.href}
              target={ship.href.startsWith("http") ? "_blank" : undefined}
              rel={ship.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              className="group flex items-start justify-between py-5 border-b border-foreground/[0.06] hover:border-foreground/[0.12] transition-colors duration-200 cursor-pointer"
            >
              <div className="flex flex-col gap-1 min-w-0 pr-4">
                <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {ship.name}
                </span>
                <span className="text-sm text-muted-foreground/60 leading-relaxed">
                  {ship.description}
                </span>
              </div>
              <div className="flex items-center gap-5 shrink-0 pt-0.5">
                <span className="text-[11px] font-mono text-muted-foreground/40 hidden sm:block">
                  {ship.type}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground/50 w-10 text-right">
                  {ship.mrr}
                </span>
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="text-muted-foreground/25 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,transform] duration-200"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
