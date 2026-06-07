"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { X } from "@phosphor-icons/react";

export type ExpandableCardItem = {
  title: string;
  description: string;
  src?: string;
  ctaText: string;
  ctaLink: string;
  content: React.ReactNode | (() => React.ReactNode);
};

export function ExpandableCardGrid({ cards }: { cards: ExpandableCardItem[] }) {
  const [active, setActive] = useState<ExpandableCardItem | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50 p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white rounded-3xl overflow-hidden border border-black/8 shadow-[0_32px_80px_rgba(0,0,0,0.15)]"
            >
              <div className="relative bg-card">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-black/8 hover:bg-white transition-colors"
                >
                  <X weight="bold" size={13} className="text-foreground" />
                </motion.button>
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  {active.src ? (
                    <img src={active.src} alt={active.title} className="w-full h-72 object-cover object-top" />
                  ) : (
                    <div className="w-full h-72 bg-muted" />
                  )}
                </motion.div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-start p-5 gap-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-foreground text-base tracking-tight"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-muted-foreground text-sm mt-0.5"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 text-xs rounded-full font-medium bg-primary text-white hover:bg-primary/85 transition-colors whitespace-nowrap"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="px-5 pb-6">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-muted-foreground text-sm leading-relaxed h-40 md:h-fit overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none]"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.map((card) => (
          <motion.li
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col gap-4 rounded-2xl cursor-pointer hover:bg-card border border-transparent hover:border-border transition-all duration-200 group"
          >
            <motion.div layoutId={`image-${card.title}-${id}`} className="rounded-xl overflow-hidden">
              {card.src ? (
                <img src={card.src} alt={card.title} className="h-52 w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" />
              ) : (
                <div className="h-52 w-full bg-muted" />
              )}
            </motion.div>
            <div>
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-medium text-foreground text-sm tracking-tight"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-muted-foreground text-xs mt-0.5"
              >
                {card.description}
              </motion.p>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
