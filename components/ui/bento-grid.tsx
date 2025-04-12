"use client";

import type { ProductFeature } from "@/api/types";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useId } from "react";

export function FeaturesSection({ features }: { features: ProductFeature[] }) {
  return (
    <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, idx) => (
        <FeatureCard key={idx} feature={feature} index={idx} />
      ))}
    </div>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: ProductFeature;
  index: number;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="relative cursor-pointer h-full overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white p-6 shadow-sm transition-all duration-200 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 dark:shadow-none group-hover:shadow-md dark:group-hover:border-neutral-700">
        <Grid size={20} />

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-primary dark:text-white">
                {feature.label}
              </h3>
            </div>

            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              <p className="mt-2 text-pretty text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {feature.value}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
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
    pattern || generatePattern()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGeneratedPattern(generatePattern());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(white,transparent)]">
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
                delay: index * 0.1,
                duration: 0.3,
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
