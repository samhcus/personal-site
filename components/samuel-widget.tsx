"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const VIDEO_URL: string | null = null;
const GIF_URL: string | null = null;

export function SamuelWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 z-50 w-72 rounded-2xl border border-foreground/[0.08] bg-background shadow-2xl overflow-hidden"
          >
            {VIDEO_URL ? (
              <video
                src={VIDEO_URL}
                controls
                autoPlay
                playsInline
                className="w-full aspect-video block"
              />
            ) : (
              <div className="p-5">
                <p className="text-sm font-medium text-foreground">
                  {"Samuel's intro is on its way."}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Check back soon.
                </p>
              </div>
            )}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-lg bg-foreground/10 text-foreground/50 hover:bg-foreground/20 transition-colors text-[10px] font-medium"
              aria-label="Close"
            >
              x
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-xl overflow-hidden border-2 border-foreground/10 hover:border-primary/40 transition-colors duration-200 active:scale-[0.97] shadow-lg bg-foreground/[0.04]"
        aria-label="Meet Samuel"
      >
        {GIF_URL ? (
          <img
            src={GIF_URL}
            alt="Samuel waving"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-xs font-semibold text-muted-foreground">
            S
          </span>
        )}
      </button>
    </>
  );
}
