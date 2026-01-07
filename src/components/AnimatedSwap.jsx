"use client"

import { AnimatePresence, motion } from "framer-motion"

export default function AnimatedSwap({ children, swapKey }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        key={swapKey}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}