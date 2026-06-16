"use client";

import { useRef, useState, useMemo } from "react";
import Gravity, { MatterBody, GravityRef } from "@/components/fancy/physics/gravity";
import { Reveal } from "@/components/reveal";
import { techStacks } from "@/lib/tech-stacks";
import { cn } from "@/lib/utils";

const SPREAD_POSITIONS = [
  "12%", "28%", "45%", "62%", "78%",
  "20%", "55%", "38%", "70%", "15%",
];
const ANGLES = [0, -8, 6, -4, 10, -12, 3, -6, 9, -3];

export function TechStackGame() {
  const [active, setActive] = useState(techStacks[0].slug);
  const [key, setKey] = useState(0);
  const gravityRef = useRef<GravityRef>(null);

  const brand = useMemo(() => techStacks.find((s) => s.slug === active)!, [active]);

  function switchBrand(slug: string) {
    if (slug === active) return;
    setActive(slug);
    setKey((k) => k + 1);
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Tech Stack<span className="text-primary">.</span>
          </h2>
          <p className="mt-1.5 text-[12px] text-muted-foreground">
            Pick a project. Watch it fall into place.
          </p>
        </Reveal>

        {/* Brand selector */}
        <Reveal index={1}>
          <div className="mt-5 flex flex-wrap gap-2">
            {techStacks.map((s) => (
              <button
                key={s.slug}
                onClick={() => switchBrand(s.slug)}
                className={cn(
                  "h-7 px-3 rounded-full text-[11px] font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.95]",
                  s.slug === active
                    ? "text-white"
                    : "bg-foreground/[0.05] text-muted-foreground hover:bg-foreground/[0.09] hover:text-foreground"
                )}
                style={s.slug === active ? { backgroundColor: s.accent } : {}}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Physics arena */}
        <Reveal index={2}>
          <div
            className="relative mt-4 h-[280px] rounded-2xl border border-border overflow-hidden"
            style={{ background: `${brand.panel}18` }}
          >
            <Gravity
              key={key}
              ref={gravityRef}
              gravity={{ x: 0, y: 1.2 }}
              grabCursor
              addTopWall={false}
              className="rounded-2xl"
            >
              {brand.stack.map((item, i) => (
                <MatterBody
                  key={`${brand.slug}-${item.name}`}
                  x={SPREAD_POSITIONS[i % SPREAD_POSITIONS.length]}
                  y={`${-5 + (i % 4) * 8}%`}
                  angle={ANGLES[i % ANGLES.length]}
                  matterBodyOptions={{
                    restitution: 0.25,
                    friction: 0.35,
                    density: 0.0015,
                  }}
                >
                  <span
                    className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-medium whitespace-nowrap select-none"
                    style={{
                      backgroundColor: brand.panel,
                      color: brand.panelFg,
                    }}
                  >
                    {item.name}
                  </span>
                </MatterBody>
              ))}
            </Gravity>

            {/* Faint label */}
            <span
              className="absolute bottom-3 right-4 text-[10px] font-mono opacity-30 pointer-events-none"
              style={{ color: brand.panelFg }}
            >
              drag to rearrange
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
