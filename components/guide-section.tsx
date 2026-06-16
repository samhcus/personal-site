"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { GUIDE } from "@/lib/guide";

export function GuideSection() {
  return (
    <section id="guide" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Guides
          </h2>
        </Reveal>

        <Reveal index={1}>
          <Link
            href="/guide"
            className="group mt-6 block rounded-2xl border border-border hover:border-foreground/20 transition-colors duration-200 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {GUIDE.title}
                </h3>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed max-w-md">
                  {GUIDE.pitch}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  ${GUIDE.price}
                </p>
                <p className="text-[11px] text-muted-foreground/60">once</p>
              </div>
            </div>
            <p className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
              Read the first chapter free
              <ArrowRight
                size={13}
                weight="bold"
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </p>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
