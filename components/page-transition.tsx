"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HamsterLoader } from "@/components/hamster-loader";

export function PageTransition() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname === prevPath) return;
    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      setPrevPath(pathname);
    }, 900);
    return () => clearTimeout(t);
  }, [pathname, prevPath]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="hamster-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <HamsterLoader />
          <p className="mt-6 text-sm text-muted-foreground font-medium tracking-wide">
            Loading...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
