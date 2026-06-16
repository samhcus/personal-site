"use client";

import { beliefs } from "@/lib/beliefs";
import { Reveal } from "@/components/reveal";

/**
 * Ethos — the belief lines from the original samhc.us.
 * Visual treatment slot: Samuel supplies the final component for this body;
 * until then the lines render in the house's plain, numbered style.
 */
export function EthosSection() {
  return (
    <section id="ethos" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Ethos<span className="text-primary">.</span>
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            What I believe about building things.
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {beliefs.map((b, i) => (
            <Reveal key={b.id} index={Math.min(i, 4)}>
              <p className="group flex items-baseline gap-3 text-[13.5px] text-muted-foreground leading-relaxed">
                <span className="font-mono text-[10px] text-muted-foreground/35 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="transition-colors duration-150 group-hover:text-foreground">
                  {b.line}
                </span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
