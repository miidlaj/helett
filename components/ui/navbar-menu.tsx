"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  noChild = false,
  link,
  className = "",
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  link?: string;
  noChild?: boolean;
  className?: string;
}) => {
  return (
    <>
      <div
        className={className}
        onMouseEnter={() => setActive(item)}
        onMouseLeave={() => setActive(null)}
      >
        {link && (
          <Link href={link}>
            <motion.p
              className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white text-sm"
              transition={{ duration: 0.3 }}
            >
              {item}
            </motion.p>
          </Link>
        )}

        {!link && (
          <motion.p
            className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.p>
        )}

        {active === item && !noChild && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed top-20 inset-0 bg-black/50 z-40"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={transition}
              onClick={() => setActive(null)}
            />

            <motion.div
              key={item}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              style={{
                width: "100vw",
                position: "absolute",
                left: 0,
                top: "calc(100% + 0rem)",
                zIndex: 50,
              }}
              transition={transition}
            >
              <motion.div
                className="bg-white dark:bg-black backdrop-blur-sm overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                layoutId="active"
                transition={transition}
              >
                <motion.div layout className="w-full h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};
export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <nav
      className={cn(
        "relative bg-white dark:bg-black border-b border-neutral-200  flex justify-start gap-10 px-8 z-50 top-0",
        className
      )}
      onMouseLeave={() => setActive(null)}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description?: string;
  href: string;
  src: string;
}) => {
  return (
    <Link
      className={cn(
        "flex items-center justify-center space-x-2 hover-scale",
        description ? "flex-row" : "flex-col"
      )}
      href={href}
    >
      <Image
        alt={title}
        className="flex-shrink-0 rounded-md"
        height={70}
        src={src}
        width={140}
      />
      <div>
        <h4 className="text-xl font-poppins mb-1 text-black dark:text-white">
          {title}
        </h4>
        {description && (
          <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300 line-clamp-4">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
