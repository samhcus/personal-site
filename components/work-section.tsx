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
