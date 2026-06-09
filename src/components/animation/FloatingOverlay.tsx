"use client";
import { motion } from "framer-motion";

export default function FloatingOverlay({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -4, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 5, ease: "easeInOut", repeat: Infinity, delay },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
