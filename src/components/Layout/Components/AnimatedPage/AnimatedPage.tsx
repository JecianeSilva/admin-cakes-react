// src/components/AnimatedPage.tsx
import { motion } from "framer-motion";
import { IAnimatedPageProps } from "./AnimatedPage.types";

export function AnimatedPage({ children }: IAnimatedPageProps) {
  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={animations.transition}
      variants={animations}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
