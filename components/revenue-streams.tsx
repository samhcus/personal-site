"use client";

import { motion } from "motion/react";
import { EnvelopeSimple, Package, Handshake, Star } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ease = [0.16, 1, 0.3, 1] as const;

const streams = [
  {
    icon: EnvelopeSimple,
    title: "Newsletter",
    description: "Weekly. Ideas and tactics, straight to your inbox. Free to read. Paid tier unlocks the archive.",
    cta: "Subscribe free",
    href: "#newsletter",
    badge: "Free",
    badgeClass: "text-foreground/70 bg-muted border-border",
  },
  {
    icon: Package,
    title: "Digital products",
    description: "Templates, playbooks, and toolkits built in the process. Priced to be bought.",
    cta: "Browse products",
    href: "#products",
    badge: "Dropping soon",
    badgeClass: "text-primary/80 bg-primary/8 border-primary/20",
  },
  {
    icon: Star,
    title: "Affiliate picks",
    description: "Tools we actually use. We get a small cut if you sign up. We only list what we'd use anyway.",
    cta: "See the stack",
    href: "#stack",
    badge: "Curated",
    badgeClass: "text-foreground/70 bg-muted border-border",
  },
  {
    icon: Handshake,
    title: "Work together",
    description: "A small number of consulting engagements per quarter. If it fits, it fits.",
    cta: "Get in touch",
    href: "#contact",
    badge: "Limited",
    badgeClass: "text-primary bg-primary/8 border-primary/20",
  },
];

export function RevenueStreams() {
  return (
    <section id="products" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Ways in
          </h2>
          <p className="mt-3 text-muted-foreground max-w-sm">
            Multiple ways to get value. Pick what works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {streams.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
            >
              <Card className="rounded-2xl border-border hover:ring-black/12 transition-all duration-300 gap-0 py-0">
                <CardHeader className="p-7 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-black/5 text-muted-foreground">
                      <s.icon weight="duotone" size={18} />
                    </div>
                    <Badge variant="outline" className={s.badgeClass}>
                      {s.badge}
                    </Badge>
                  </div>
                  <CardTitle className="font-black text-foreground tracking-tight">
                    {s.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {s.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="px-7 py-4 bg-transparent border-t-0">
                  <a
                    href={s.href}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors gap-1 group"
                  >
                    {s.cta}
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
