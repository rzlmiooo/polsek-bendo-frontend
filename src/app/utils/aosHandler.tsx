'use client'

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimateOnScroll({ children, className, delay = 0 }: AnimateOnScrollProps) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5, // 50% elemen kelihatan → baru jalan animasi
    triggerOnce: true, // cuma sekali animasi
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.6, delay } 
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}