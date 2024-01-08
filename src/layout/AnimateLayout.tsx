import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["0 1", "1.36 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.87, 1]);

  return (
    <motion.div
      ref={targetRef}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
    >
      {children}
    </motion.div>
  );
}
