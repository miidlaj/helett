"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useId } from "react";
import { IconBrandAmazon } from "@tabler/icons-react";

import { ProductFeature } from "@/api/types";

export function FeaturesSection({ features }: { features: ProductFeature[] }) {
  return (
    <div className=" mx-auto">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <div
            key={feature.label}
            className="relative bg-gradient-to-b lg:mx-10 dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 min-h-20 to-white p-6 rounded-3xl overflow-hidden hover-scale"
          >
            <Grid size={20} />
            <div className="flex justify-start gap-2 items-center">
              <IconBrandAmazon className="size-10 bg-primary text-white rounded-xl p-2" />

              <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.label}
              </p>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const generatePattern = () => [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];

  const [generatedPattern, setGeneratedPattern] = useState(
    pattern || generatePattern,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGeneratedPattern(generatePattern());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
          height={size ?? 20}
          squares={generatedPattern}
          width={size ?? 20}
          x="-12"
          y="4"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          height={height}
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={width}
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        fill={`url(#${patternId})`}
        height="100%"
        strokeWidth={0}
        width="100%"
      />
      {squares && (
        <svg className="overflow-visible" x={x} y={y}>
          {squares.map(([x, y]: any, index: number) => (
            <motion.rect
              key={`${x}-${y}`}
              animate={{ opacity: 1, scale: 1 }}
              height={height + 1}
              initial={{ opacity: 0, scale: 0.5 }}
              strokeWidth="0"
              transition={{
                delay: index * 0.1, // Delay for each square
                duration: 0.3, // Animation duration
                ease: "easeInOut",
              }}
              width={width + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
