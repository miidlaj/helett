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
          className,
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
              <HoveredLink href="/">Category 1</HoveredLink>
              <HoveredLink href="/">Category 2</HoveredLink>
              <HoveredLink href="/">Category 3</HoveredLink>
              <HoveredLink href="/">Category 4</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem active={active} item="Products" setActive={setActive}>
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                description="Helett® HT410 Wired 1D & 2D Barcode Scanner"
                href="https://www.amazon.in/helett-HT410-Handheld-Indicator-Induction/dp/B0CBC9G7W2/ref=sr_1_6?sr=8-6"
                src="https://m.media-amazon.com/images/I/61Ij6iC-fhL._SX679_.jpg"
                title="Barcode Scanner"
              />
              <ProductItem
                description="Helett H65C Portable Bluetooth Thermal Label Printer"
                href="https://www.amazon.in/H65C-Portable-Bluetooth-Printing-Resolution/dp/B0D1P7SC46/ref=sr_1_3?sr=8-3"
                src="https://m.media-amazon.com/images/I/51pi4DwBZGL._SY450_.jpg"
                title="Label Printer"
              />
              <ProductItem
                description="Axor Helmets Apex Hex-2 Helmet (Neon Yellow Blue, Large)"
                href="https://www.amazon.in/Helmets-Hex-2-Helmet-Yellow-Large/dp/B0BDZLB872/ref=sr_1_29?sr=8-29"
                src="https://m.media-amazon.com/images/I/61RWzFIHe-L._SX569_.jpg"
                title="Helmets "
              />
              <ProductItem
                description="Helett® AC1200 Dual Band (2.4GHz & 5GHz) 1200 Mbps 6 Wi-Fi Router"
                href="https://www.amazon.in/AC1200-High-Gain-Antennas-Repeater-Ethernet/dp/B0DGF32QRT/ref=sr_1_14?sr=8-14"
                src="https://m.media-amazon.com/images/I/41OV3cPzUhL._SX300_SY300_QL70_FMwebp_.jpg"
                title="Wi-Fi Router"
              />
            </div>
          </MenuItem>
          <MenuItem active={active} item="Links" setActive={setActive}>
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/">Link 1</HoveredLink>
              <HoveredLink href="/">Link 2</HoveredLink>
              <HoveredLink href="/">Link 3</HoveredLink>
              <HoveredLink href="/">Link 4</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </motion.div>
    </AnimatePresence>
  );
}
