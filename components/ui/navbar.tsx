"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";

import { cn } from "@/lib/utils";
import { categories, products } from "@/constants/products";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        className={cn(
          "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ",
          className
        )}
        initial={{
          opacity: 1,
          y: -100,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <Menu setActive={setActive}>
          <MenuItem active={active} item="Category" setActive={setActive}>
            <div className="flex flex-col space-y-4 text-sm">
              {categories.map((cat, index) => (
                <HoveredLink key={index} href={`products?cat=${cat}`}>
                  {cat}
                </HoveredLink>
              ))}
            </div>
          </MenuItem>
          <MenuItem
            active={active}
            item="Products"
            link="products"
            setActive={setActive}
          >
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              {products.slice(0, 4).map((item, index) => (
                <ProductItem
                  key={index}
                  description={item.description}
                  href={`products/${item.slug}`}
                  src={`${item.src}/${item.thumbnail}`}
                  title={item.title}
                />
              ))}
            </div>
          </MenuItem>
        </Menu>
      </motion.div>
    </AnimatePresence>
  );
}
