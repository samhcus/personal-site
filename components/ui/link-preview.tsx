"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src: string;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetFromCenter = (event.clientX - targetRect.left - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      <div className="hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote screenshot service; not optimizable by next/image */}
        <img src={src} width={width} height={height} alt="" aria-hidden />
      </div>
      <HoverCardPrimitive.Root openDelay={50} closeDelay={100} onOpenChange={setOpen}>
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-foreground", className)}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl"
                style={{ x: translateX }}
              >
                <a
                  href={url}
                  className="block p-1 bg-background border border-border shadow rounded-xl hover:border-foreground/20"
                  style={{ fontSize: 0 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote screenshot service; not optimizable by next/image */}
                  <img src={isStatic ? imageSrc : src} width={width} height={height} className="rounded-lg" alt="preview" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
