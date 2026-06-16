'use client';

import { useState } from 'react';
import { Cursor } from '@/components/motion-primitives/cursor';
import { AnimatePresence, motion } from 'motion/react';
import { PlusIcon } from 'lucide-react';

export function SiteCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const handlePositionChange = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y);
    if (!el) {
      setIsHovering(false);
      return;
    }
    const interactive = el.closest('a, button, [role="button"], [tabindex="0"]');
    const style = window.getComputedStyle(el);
    setIsHovering(!!interactive || style.cursor === 'pointer');
  };

  return (
    <Cursor
      springConfig={{ bounce: 0.001 }}
      variants={{
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
      }}
      transition={{ ease: 'easeInOut', duration: 0.15 }}
      onPositionChange={handlePositionChange}
    >
      <motion.div
        animate={{
          width: isHovering ? 80 : 16,
          height: isHovering ? 32 : 16,
        }}
        className='flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40'
      >
        <AnimatePresence>
          {isHovering ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className='inline-flex w-full items-center justify-center'
            >
              <div className='inline-flex items-center text-sm text-white dark:text-black'>
                More <PlusIcon className='ml-1 h-4 w-4' />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </Cursor>
  );
}
