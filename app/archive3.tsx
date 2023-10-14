"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

let speeds = [1, 0.1];
let labels = ["World", "N.Y.", "Business", "Arts", "Science"];

export default function Page() {
  let [activeSpeed, setActiveSpeed] = useState(1);
  let [active, set] = useState(1);
  let ref = useRef<HTMLDivElement>(null);
  let [offsets, setOffsets] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (ref.current) {
      let parentLeft = ref.current.getBoundingClientRect().left;
      let newOffsets = [...ref.current.children].map(
        (el) => el.getBoundingClientRect().left - parentLeft,
      );

      setOffsets(newOffsets);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center">
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80)",
        }}
        className="h-80 w-[600px] flex flex-col text-sm bg-cover bg-siz bg-no-repeat justify-center items-center bg-zinc-950 bg-bottom rounded-xl"
      >
        <div className="flex gap-5" ref={ref}>
          {[...Array(5).keys()].map((i) => (
            <button
              key={i}
              onClick={() => set(i)}
              className="px-6 bg-black/50 hover:bg-black/75 transition rounded-full py-2 relative flex items-center justify-center text-white"
            >
              <span className="iinvisible">{labels[i]}</span>
              {/* {i === active && (
                <motion.span
                  layoutId="bubble"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6 / activeSpeed,
                  }}
                  style={{
                    borderRadius: 9999,
                  }}
                  className="absolute pointer-events-none z-10 inset-0 bg-white text-black flex gap-5 overflow-hidden"
                >
                  {[...Array(5).keys()].map((k) => (
                    <motion.span
                      style={{ x: -offsets[i] }}
                      key={k}
                      className="px-6 py-2 flex items-center justify-center shrink-0"
                      layoutId={`b-${k}`}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6 / activeSpeed,
                      }}
                    >
                      {labels[k]}
                    </motion.span>
                  ))}
                </motion.span>
              )} */}
            </button>
          ))}
        </div>
      </div>

      <div className="w-[600px] mx-auto mt-4 flex gap-4">
        {speeds.map((speed) => (
          <button
            className={
              speed === activeSpeed
                ? "text-white"
                : "text-white/50 hover:text-white"
            }
            onClick={() => setActiveSpeed(speed)}
            key={speed}
          >
            {speed}x
          </button>
        ))}
      </div>
    </div>
  );
}
