"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 550, damping: 42 });
  const smoothY = useSpring(y, { stiffness: 550, damping: 42 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
      setHidden(false);
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, [data-cursor='card']")));
    };

    const onLeave = () => setHidden(true);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-5 w-5 rounded-full border border-accent/80 mix-blend-difference md:block"
      style={{ x: smoothX, y: smoothY }}
      animate={{
        scale: active ? 2.2 : 1,
        opacity: hidden ? 0 : active ? 0.9 : 0.55,
        backgroundColor: active ? "rgb(var(--accent) / 0.22)" : "rgb(var(--accent) / 0)"
      }}
      transition={{ duration: 0.18 }}
    />
  );
}
