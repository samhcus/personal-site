"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function LaptopLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 5200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-[220px] h-[220px]">
      {/* Loader */}
      <AnimatePresence>
        {!done && (
          <motion.div
            className="loader absolute inset-0"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="box">
              <div className="top-side" />
              <div className="bottom-side" />
              <div className="screen">
                <div className="lightray-limit">
                  <div className="lightray" />
                </div>
                <div className="loader-box">
                  <div className="progress" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mad House logo revealed after load */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-[220px] h-[220px] rounded-[20px] flex flex-col items-center justify-center gap-1"
              style={{ background: "rgb(84,84,84)", border: "5px solid gray", boxShadow: "3px 4px 5px rgb(193,193,193)" }}
            >
              <div className="rounded-[10px] bg-black w-[calc(100%-40px)] h-[calc(100%-40px)] flex flex-col items-center justify-center gap-0.5">
                <span className="text-4xl font-black tracking-[-0.03em] leading-none text-white">Mad</span>
                <span className="text-4xl font-black tracking-[-0.03em] leading-none" style={{ color: "#F03728" }}>House.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
