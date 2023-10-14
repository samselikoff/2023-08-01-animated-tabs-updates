"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useResizeObserver from "use-resize-observer";

let tabs = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y." },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
];

export default function Demo() {
  let [activeTab, setActiveTab] = useState(tabs[1].id);
  let [speed, setSpeed] = useState(1);
  let [bounds, setBounds] = useState({
    measured: false,
    animate: false,
    left: 0,
    right: 0,
  });
  let ref = useRef<HTMLDivElement>(null);

  useResizeObserver<HTMLDivElement>({
    ref,
    onResize: ({ width }) => {
      if (ref.current) {
        let parentBounds = ref.current.getBoundingClientRect();
        let activeBounds =
          ref.current.children[
            tabs.findIndex((t) => t.id === activeTab)
          ].getBoundingClientRect();

        setBounds({
          measured: true,
          animate: false,
          left: activeBounds.left - parentBounds.left + 8,
          right: parentBounds.right - activeBounds.right + 8,
        });
      }
    },
  });

  useEffect(() => {
    if (ref.current) {
      let parentBounds = ref.current.getBoundingClientRect();
      let activeBounds =
        ref.current.children[
          tabs.findIndex((t) => t.id === activeTab)
        ].getBoundingClientRect();

      setBounds({
        measured: true,
        animate: true,
        left: activeBounds.left - parentBounds.left + 8,
        right: parentBounds.right - activeBounds.right + 8,
      });
    }
  }, [activeTab]);

  console.log(bounds);

  return (
    <div className="relative flex aspect-[5/4] min-w-0 flex-col items-center justify-center rounded-lg bg-gray-800 ring-1 ring-inset ring-white/10 sm:aspect-[4/3] md:aspect-[2/1]">
      <div className="absolute right-0 top-0 inline-flex space-x-3 p-4">
        {[0.1, 1].map((factor) => (
          <button
            key={factor}
            onClick={() => setSpeed(factor)}
            className={`${
              factor === speed ? "text-white" : "text-white/50 hover:text-white"
            } inline-flex h-8 w-8 items-center justify-center rounded text-sm font-semibold transition`}
          >
            {factor}x
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="flex gap-1 sm:gap-8" ref={ref}>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id && !bounds.measured
                  ? "bg-lime-400 text-lime-900"
                  : activeTab === tab.id
                  ? "text-white"
                  : "text-white hover:text-white/60"
              } relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {bounds.measured && (
          <motion.div
            className="pointer-events-none absolute -inset-2 flex gap-1 overflow-visible bg-lime-400 p-2 text-lime-900 sm:gap-8"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: bounds.animate ? 0.6 / speed : 0,
            }}
            initial={false}
            animate={{
              clipPath: `inset(8px ${bounds.right}px 8px ${bounds.left}px round 9999px)`,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className="relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2"
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
