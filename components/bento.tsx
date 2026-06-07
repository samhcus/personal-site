"use client";

import { motion } from "motion/react";
import { Lightbulb, BookOpen, Wrench, UsersThree } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: Lightbulb,
    label: "Ideas",
    description: "Raw, unfiltered starting points. The kind you wish you'd had earlier.",
    span: "lg:col-span-2",
    bg: "bg-zinc-950",
    textClass: "text-white",
    descClass: "text-white/50",
    iconBg: "bg-white/8",
    iconClass: "text-white/50 group-hover:text-primary",
    tooltip: "Starting sparks for anything you want to build",
    image: null,
  },
  {
    icon: BookOpen,
    label: "Guides",
    description: "Deep dives on what actually matters for independent builders.",
    span: "lg:col-span-1",
    bg: "bg-white",
    textClass: "text-foreground",
    descClass: "text-muted-foreground",
    iconBg: "bg-black/5",
    iconClass: "text-muted-foreground group-hover:text-primary",
    tooltip: "Long reads worth the time",
    image: null,
  },
  {
    icon: Wrench,
    label: "How-tos",
    description: "Step-by-step. Tools, tactics, and workflows we actually use.",
    span: "lg:col-span-1",
    bg: "bg-zinc-50",
    textClass: "text-foreground",
    descClass: "text-muted-foreground",
    iconBg: "bg-black/5",
    iconClass: "text-muted-foreground group-hover:text-primary",
    tooltip: "Practical, no fluff",
    image: null,
  },
  {
    icon: UsersThree,
    label: "Community",
    description: "Builders sharing what they're working on. No fluff, no theater.",
    span: "lg:col-span-2",
    bg: "bg-primary",
    textClass: "text-white",
    descClass: "text-white/65",
    iconBg: "bg-white/12",
    iconClass: "text-white/60 group-hover:text-white",
    tooltip: "Real builders, real projects",
    image: null,
  },
];

export function Bento() {
  return (
    <section id="ideas" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            What we ship
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className={`${f.span} ${f.bg} group relative flex flex-col gap-5 p-8 cursor-default overflow-hidden`}
            >
              {f.image && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
                  style={{ backgroundImage: `url(${f.image})` }}
                />
              )}
              <div className="relative z-10 flex flex-col gap-5">
                <Tooltip>
                  <TooltipTrigger className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.iconBg} transition-colors duration-200`}>
                    <f.icon
                      weight="duotone"
                      size={20}
                      className={`transition-colors duration-300 ${f.iconClass}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>{f.tooltip}</TooltipContent>
                </Tooltip>
                <div>
                  <h3 className={`text-lg font-black tracking-tight ${f.textClass}`}>
                    {f.label}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${f.descClass}`}>
                    {f.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
