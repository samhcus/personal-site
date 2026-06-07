"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

export type TooltipItem = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

export const AnimatedTooltip = ({ items }: { items: TooltipItem[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const rafRef = useRef<number | null>(null);

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
      x.set((event.nativeEvent as MouseEvent).offsetX - halfWidth);
    });
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.name}
          className="group relative -mr-3"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.6 }}
                animate={{
                  opacity: 1, y: 0, scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 16, scale: 0.6 }}
                style={{ translateX, rotate, whiteSpace: "nowrap" }}
                className="absolute -top-14 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-lg bg-foreground px-3 py-1.5 text-xs shadow-xl"
              >
                <div className="relative z-30 text-sm font-bold text-background">
                  {item.name}
                </div>
                <div className="text-[10px] text-background/60">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            src={item.image}
            alt={item.name}
            className="relative m-0 h-9 w-9 rounded-full border-2 border-white object-cover object-top p-0 transition-transform duration-300 group-hover:z-30 group-hover:scale-110"
          />
        </div>
      ))}
    </>
  );
};
