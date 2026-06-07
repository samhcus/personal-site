"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { ImagesBadge } from "@/components/ui/images-badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LaptopLoader } from "@/components/laptop-loader";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.75, delay, ease },
  };
}


export function Hero() {
  return (
    <section className="min-h-[100dvh] flex items-center pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <div className="flex flex-col gap-7">
            <motion.div {...fadeUp(0.05)}>
              <ImagesBadge
                text="Vol. 1 arriving soon"
                images={[]}
              />
            </motion.div>

            <motion.h1
              {...fadeUp(0.15)}
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.92] text-foreground"
            >
              Mad
              <br />
              <span className="text-primary">House.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.28)}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-sm font-medium"
            >
              Ideas, guides, and tools for builders who don&apos;t wait for permission.
            </motion.p>

            <motion.div {...fadeUp(0.42)} className="flex flex-wrap items-center gap-3">
              <a
                href="#newsletter"
                className="group inline-flex items-center gap-2 rounded-full h-12 px-7 font-bold text-sm bg-primary hover:bg-primary/88 active:scale-[0.97] text-white transition-[background-color,transform] duration-200"
              >
                Get the newsletter
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight weight="bold" size={11} />
                </span>
              </a>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href="#ideas"
                    className="inline-flex items-center rounded-full h-12 px-7 font-bold text-sm text-foreground hover:text-primary active:scale-[0.97] border border-foreground/10 hover:border-primary/30 transition-[color,border-color,transform] duration-200"
                    tabIndex={-1}
                  >
                    Browse ideas
                  </a>
                </TooltipTrigger>
                <TooltipContent>Ideas, guides, and how-tos</TooltipContent>
              </Tooltip>
            </motion.div>
          </div>

          {/* Right: laptop loader → Mad House reveal */}
          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="flex items-center justify-center lg:justify-end"
          >
            <LaptopLoader />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
