"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export default function App() {
  let ref = useRef<HTMLDivElement>(null);
  let target = useRef<HTMLDivElement>(null);
  let [width, setWidth] = useState(0);
  let widthMotion = useMotionValue(0);

  useEffect(() => {
    if (ref.current) {
      let resizeObserver = new ResizeObserver((entries) => {
        let newWidth = entries[0].contentRect.width;

        // debugger;
        // flushSync(() => {
        // setWidth(newWidth);
        // });

        widthMotion.set(newWidth);

        requestAnimationFrame(() => {
          if (target.current) {
            target.current.style.width = `${newWidth}px`;
          }
        });
        // debugger;
      });

      resizeObserver.observe(ref.current);
    }
  }, [widthMotion]);

  debugger;

  return (
    <div className="text-white text-3xl">
      <div
        className="max-w-sm mx-auto sm:max-w-lg h-32 bg-purple-500 flex justify-center items-center"
        ref={ref}
      >
        Source
      </div>

      <div
        ref={target}
        className="mx-auto mt-8 bg-red-500 h-32 text-white flex items-center justify-center"
      >
        ref.style = newWidth
      </div>

      <div
        style={{ width }}
        className="mx-auto mt-8 bg-green-500 h-32 text-white flex items-center justify-center"
      >
        {inlineStyle}
      </div>

      <motion.div
        style={{ width: widthMotion }}
        className="mx-auto mt-8 bg-blue-500 h-32 text-white flex items-center justify-center"
      >
        motion.div
      </motion.div>
    </div>
  );
}

let inlineStyle = `
<div style={{ width }} />
`;
