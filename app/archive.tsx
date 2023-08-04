// Attempt to stay outside of react
"use client";

import useResizeObserver from "use-resize-observer";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { flushSync } from "react-dom";

const useBreakpoints = (breakpoints) => {
  const [breakpoint, setBreakpoint] = useState(undefined);
  const { ref } = useResizeObserver({
    onResize: useCallback(
      ({ width }) => {
        for (let i = 0; i < breakpoints.length; i++) {
          if (width < breakpoints[i][1]) {
            setBreakpoint(breakpoints[i][0]);
            break;
          }
        }
      },
      [breakpoints],
    ),
  });

  return { ref, breakpoint };
};

export default function App() {
  let ref = useRef<HTMLDivElement>(null);
  let ref2 = useRef<HTMLDivElement>(null);
  // let width = useMotionValue(0);
  // let x = useTransform(width, (w) => w / 10);

  let [width1, setWidth1] = useState(0);
  let [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(width1);
  }, [width1]);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        let newWidth = entries[0].contentRect.width;

        // this doesn't work, because it schedules a re-render but
        // the browser has already painted the new layout
        setWidth(newWidth);

        // what I really want is to "preventDefault" on the paint,
        // then tell react to re-render my component. that way I could
        // re-measure the relevant element in a layoutEffect, and get
        // two renders but only one paint.

        // i guess that's similar to what flushSync is!
      });

      resizeObserver.observe(ref.current);
    }
  }, [width]);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        setWidth1(entries[0].contentRect.width);
        // if (ref2.current) {
        //   ref2.current.innerText = `${entries[0].contentRect.width}`;
        // }
        // width.set(entries[0].contentRect.width);
        // flushSync(() => {
        //   setWidth(entries[0].contentRect.width);
        // });
      });

      resizeObserver.observe(ref.current);
    }
  }, [width]);

  // debugger;

  // const { ref, width } = useResizeObserver();
  // const { ref } = useResizeObserver({
  //   onResize: ({ width }) => {
  //     console.log(width);
  //     //
  //   },
  // });

  // const { ref, breakpoint } = useBreakpoints(breakpoints);
  // useMotionValue()
  // const { ref } = useResizeObserver({
  //   onResize: useCallback(
  //     ({ width }) => {
  //       for (let i = 0; i < breakpoints.length; i++) {
  //         if (width < breakpoints[i][1]) {
  //           setBreakpoint(breakpoints[i][0]);
  //           break;
  //         }
  //       }
  //     },
  //     [breakpoints],
  //   ),
  // });

  return (
    <div
      className="text-4xl flex max-w-sm mx-auto sm:max-w-lg items-center h-80 bg-green-500 sm:bg-blue-500"
      ref={ref}
    >
      {/* <motion.div style={{ x }} className="bg-black rounded-full w-10 h-10" /> */}
      <div ref={ref2}>{width}</div>
    </div>
  );
}

// From breakpoints demo
// "use client";

// import useResizeObserver from "use-resize-observer";
// import React, { useState, useCallback } from "react";

// const useBreakpoints = (breakpoints) => {
//   const [breakpoint, setBreakpoint] = useState(undefined);
//   const { ref } = useResizeObserver({
//     onResize: useCallback(
//       ({ width }) => {
//         for (let i = 0; i < breakpoints.length; i++) {
//           if (width < breakpoints[i][1]) {
//             setBreakpoint(breakpoints[i][0]);
//             break;
//           }
//         }
//       },
//       [breakpoints],
//     ),
//   });

//   return { ref, breakpoint };
// };

// const breakpoints = [
//   ["md", 768],
//   ["lg", Infinity],
// ];

// export default function App() {
//   const { ref, breakpoint } = useBreakpoints(breakpoints);
//   debugger;

//   return (
//     <div
//       className="text-4xl flex items-center justify-center h-80 bg-green-500 md:bg-blue-500"
//       ref={ref}
//     >
//       Current breakpoint: {breakpoint}
//     </div>
//   );
// }

// My version
// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import useResizeObserver from "use-resize-observer";

// export default function Home() {
//   // let { ref, width } = useResizeObserver();

//   // debugger;
//   // console.log("render");
//   let [on, setOn] = useState(false);

//   return (
//     <div>
//       <div
//         // ref={ref}
//         className={`text-3xl mx-auto max-w-xs py-8 bg-gray-200 flex mt-8 ${
//           on ? "justify-end" : ""
//         }`}
//       >
//         <motion.div layout className="bg-red-500 w-4 h-4 rounded-full" />
//       </div>

//       <button onClick={() => setOn(!on)}>toggle</button>

//       <div className="w-[640px] h-1 bg-red-500 mx-auto mt-8" />
//     </div>
//   );
// }
