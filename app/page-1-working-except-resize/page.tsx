"use client";

import {
  LayoutGroup,
  animate,
  motion,
  useAnimate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  let [active, set] = useState(0);
  let ref = useRef<HTMLDivElement>(null);
  let x = useMotionValue(10);

  useEffect(() => {
    if (ref.current) {
      let parentBounds = ref.current.getBoundingClientRect();
      let activeBounds = ref.current.children[active].getBoundingClientRect();

      x.set(parentBounds.left - activeBounds.left + 0.1);
    }
  }, [active, x]);

  return (
    <div className="min-h-screen flex flex-col text-3xl justify-center items-center bg-zinc-950">
      <div className="flex gap-4 md:gap-8" ref={ref}>
        {[...Array(5).keys()].map((i) => (
          <button
            onClick={() => set(i)}
            key={i}
            className="w-20 h-20 relative flex items-center justify-center text-lime-700"
          >
            {i}
            {i === active && (
              <motion.span
                layoutId="bubble"
                // transition={{ duration: 1, type: "tween", ease: "linear" }}
                // transition={{ type: "spring" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="absolute pointer-events-none z-10 inset-0 rounded-full bg-lime-700 flex gap-4 md:gap-8 overflow-hidden"
              >
                {[...Array(5).keys()].map((i) => (
                  <motion.span
                    style={{ x }}
                    layoutId={`b-${i}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    key={i}
                    className="w-20 h-20 relative flex items-center justify-center shrink-0 text-white"
                  >
                    {i}
                  </motion.span>
                ))}
              </motion.span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
