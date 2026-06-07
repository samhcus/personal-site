"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { PushButton } from "@/components/ui/push-button";
import { toast } from "sonner";
import { ArrowRight, Star } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

const perks = [
  "Ideas to build this weekend",
  "Honest breakdowns, no pitch decks",
  "Tools we actually use",
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're in.", {
        description: "First issue hits your inbox soon.",
        duration: 5000,
      });
    }, 600);
  };

  return (
    <section id="newsletter" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="relative rounded-3xl overflow-hidden border border-primary/12 bg-white px-8 md:px-16 py-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% -10%, rgba(240,55,40,0.08) 0%, transparent 60%), #FFFFFF",
          }}
        >
          {/* Decorative top line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-primary/40 rounded-full" />

          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-primary/70 uppercase mb-5">
              <Star weight="fill" size={10} />
              Free newsletter
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[0.95]">
              In your inbox.
              <br />
              Every week.
            </h2>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ArrowRight weight="bold" size={11} className="text-primary flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-full px-5 bg-black/4 border-black/10 text-sm flex-1 min-w-0 placeholder:text-muted-foreground/40 focus:border-primary/40 focus:ring-primary/20"
              />
              <PushButton type="submit" disabled={loading}>
                <ArrowRight weight="bold" size={16} />
              </PushButton>
            </form>

            <p className="mt-4 text-xs text-muted-foreground/50">
              Free forever. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
