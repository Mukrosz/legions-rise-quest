'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  variant?: 'fade' | 'scroll-unroll' | 'break-chains' | 'crack';
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  },
  'scroll-unroll': {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.95 },
    transition: { duration: 0.6, ease: 'easeInOut' as const }
  },
  'break-chains': {
    initial: { opacity: 0, x: -100, rotateY: -15 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: 100, rotateY: 15 },
    transition: { duration: 0.7, ease: 'easeOut' as const }
  },
  crack: {
    initial: { opacity: 0, scale: 1.1, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    transition: { duration: 0.6 }
  }
};

export function PageTransition({ children, variant = 'scroll-unroll' }: PageTransitionProps) {
  const pathname = usePathname();
  const selectedVariant = variants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={selectedVariant.transition}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

