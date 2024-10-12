"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

import { Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import Logo from "../common/logo";

import { Button } from "./button";

import { cn } from "@/lib/utils";
import { filterProduct } from "@/constants/products";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const [top, setTop] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
        setTop(true);
      } else {
        if (direction < 0) {
          setVisible(true);
          setTop(false);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const categories = [
    "Laptop",
    "Projectors",
    "Printer",
    "Network Devices",
    // "Android TV Streaming",
    "Barcode Scanner",
    "Digital Door Lock",
    "Wireless Mic",
    // "Smart Car Accessories",
    "Smart Home",
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        className={cn("fixed top-0 inset-x-0 w-full mx-auto z-50", className)}
        initial={{
          opacity: 1,
          y: -100,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <Menu
          className={`${!top && "backdrop-filter relative backdrop-blur-sm bg-primary/15 z-50 "}`}
          setActive={setActive}
        >
          <Link className="py-6" href="/">
            <div>
              <Logo height={80} width={80} />
            </div>
          </Link>

          <div className="flex justify-center w-full space-x-0">
            {categories.map((item, index) => {
              const products = filterProduct({ cats: [item] })
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);

              const noChild = products.length === 0;

              return (
                <MenuItem
                  key={`${item}-${index}`}
                  active={active}
                  className={"px-2 cursor-pointer py-6"}
                  item={item}
                  link={`products?cat=${item}`}
                  noChild={noChild}
                  setActive={setActive}
                >
                  <div className="text-sm flex flex-wrap py-20 justify-center gap-16 p-4 h-80">
                    {products.map((prod, idx) => (
                      <ProductItem
                        key={idx}
                        href={`products/${prod.slug}`}
                        src={`${prod.src}/${prod.thumbnail}`}
                        title={prod.title}
                      />
                    ))}
                  </div>
                </MenuItem>
              );
            })}
          </div>

          <MenuItem
            active={active}
            className="px-2 cursor-pointer py-6"
            item="Support"
            link={`contact-us`}
            setActive={setActive}
          >
            <div className="flex justify-center items-center gap-10 h-80">
              <Link href="contact-us">
                <Button variant="link">Contact Us</Button>
              </Link>

              <Link href="warranty">
                <Button variant="link">Warranty</Button>
              </Link>
          
            </div>
          </MenuItem>
        </Menu>
      </motion.div>
    </AnimatePresence>
  );
}
