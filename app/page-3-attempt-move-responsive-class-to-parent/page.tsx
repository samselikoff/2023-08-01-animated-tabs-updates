"use client";

import { LayoutGroup, motion, useMotionValue } from "framer-motion";
import { CSSProperties, useEffect, useRef, useState } from "react";

export default function Page() {
  let [active, set] = useState(0);
  let ref = useRef<HTMLDivElement>(null);
  let x = useMotionValue(10);

  // useEffect(() => {
  //   if (ref.current) {
  //     let parentBounds = ref.current.getBoundingClientRect();
  //     let activeBounds = ref.current.children[active].getBoundingClientRect();

  //     x.set(parentBounds.left - activeBounds.left + 0.1);
  //   }
  // }, [active, x]);

  return (
    <div className="min-h-screen flex flex-col text-3xl justify-center items-center bg-zinc-950">
      <div className="flex gap-4 md:gap-8" ref={ref}>
        {[...Array(5).keys()].map((i) => (
          <button
            onClick={() => set(i)}
            key={i}
            className="w-20 h-20 relative flex items-center justify-center text-lime-700"
          >
            <span className="iinvisible">{i}</span>
            {i === active && (
              <motion.span
                layoutId="bubble"
                transition={{ duration: 1, type: "tween", ease: "linear" }}
                // transition={{ type: "spring" }}
                // transition={{ type: "spring", bounce: 0.2, duration: 2 }}
                className="absolute pointer-events-none z-10 inset-0 rounded-full bg-lime-700 overflow-hiddenn"
              >
                {[...Array(5).keys()].map((k) => (
                  <span
                    style={
                      {
                        "--x": `${96 * k - 96 * i}px`,
                        "--xl": `${112 * k - 112 * i}px`,
                      } as CSSProperties
                    }
                    className="gap-4 flex md:gap-8 absolute translate-x-[--x] md:translate-x-[--xl] "
                    key={k}
                  >
                    <motion.span
                      // style={{ x: 96 * k - 96 * i }}
                      // style={
                      //   {
                      //     "--x": 96 * k - 96 * i,
                      //     "--xl": 112 * k - 112 * i,
                      //   } as CSSProperties
                      // }
                      layoutId={`b-${k}`}
                      // transition={{ type: "spring", bounce: 0.2, duration: 2 }}
                      transition={{
                        duration: 1,
                        type: "tween",
                        ease: "linear",
                      }}
                      className="w-20 h-20 flex items-center justify-center text-white"
                      // className="w-20 h-20 absolute left-[calc(var(--x)_*_1px)] md:left-[calc(var(--xl)_*_1px)] flex items-center justify-center shrink-0 text-white"
                    >
                      {k}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
