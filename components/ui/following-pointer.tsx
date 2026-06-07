"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect) {
      x.set(e.clientX - rect.left + window.scrollX);
      y.set(e.clientY - rect.top + window.scrollY);
    }
  };

  return (
    <div
      ref={ref}
      onMouseLeave={() => setIsInside(false)}
      onMouseEnter={() => setIsInside(true)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none" }}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y: any;
  title?: string | React.ReactNode;
}) => (
  <motion.div
    className="absolute z-50 pointer-events-none"
    style={{ top: y, left: x }}
    initial={{ scale: 1, opacity: 1 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
  >
    {/* Cursor arrow */}
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      viewBox="0 0 16 16"
      className="h-5 w-5 -translate-x-[10px] -translate-y-[8px] -rotate-[70deg] text-foreground stroke-background"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
    {/* Label */}
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      className="min-w-max rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background whitespace-nowrap"
    >
      {title ?? "Mad House"}
    </motion.div>
  </motion.div>
);
