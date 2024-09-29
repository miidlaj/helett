"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;

      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      className="select-none"
      height="100%"
      viewBox="0 0 300 100"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <defs>
        <linearGradient
          cx="50%"
          cy="50%"
          gradientUnits="userSpaceOnUse"
          id="textGradient"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor={"yellow"} />
              <stop offset="25%" stopColor={"green"} />
              <stop offset="50%" stopColor={"red"} />
              <stop offset="75%" stopColor={"blue"} />
              <stop offset="100%" stopColor={"red"} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          animate={maskPosition}
          gradientUnits="userSpaceOnUse"
          id="revealMask"
          r="20%"
          transition={{ duration: duration ?? 0, ease: "easeOut" }}

          // example for a smoother animation below

          //   transition={{
          //     type: "spring",
          //     stiffness: 300,
          //     damping: 50,
          //   }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            fill="url(#revealMask)"
            height="100%"
            width="100%"
            x="0"
            y="0"
          />
        </mask>
      </defs>
      <text
        className={cn(
          "font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl  ",
          className,
        )}
        dominantBaseline="middle"
        strokeWidth="0.3"
        style={{ opacity: hovered ? 0.7 : 0 }}
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {text}
      </text>
      <motion.text
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        className={cn(
          "font-[helvetica] font-bold fill-transparent text-7xl   stroke-neutral-200 dark:stroke-neutral-800",
          className,
        )}
        dominantBaseline="middle"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        strokeWidth="0.3"
        textAnchor="middle"
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        x="50%"
        y="50%"
      >
        {text}
      </motion.text>
      <text
        className={cn(
          "font-[helvetica] font-bold fill-transparent text-7xl  ",
          className,
        )}
        dominantBaseline="middle"
        mask="url(#textMask)"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {text}
      </text>
    </svg>
  );
};
