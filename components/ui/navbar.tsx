"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import Logo from "../common/logo";

import { cn } from "@/lib/utils";
import { filterProduct, products } from "@/constants/products";

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        className={cn("fixed top-10 inset-x-0 w-full mx-auto z-50 ", className)}
        initial={{
          opacity: 1,
          y: -100,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <Menu
          className={`${!top && "backdrop-filter backdrop-blur-sm bg-primary/15"}`}
          setActive={setActive}
        >
          <Link href="/">
            <div>
              <Logo height={80} width={80} />
            </div>
          </Link>
          <div className="flex justify-between w-full space-x-4">
            <div className="flex justify-center space-x-4">
              <MenuItem
                active={active}
                item="Store"
                link="products"
                setActive={setActive}
              >
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  {[...products]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4)
                    .map((item, index) => (
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

              <MenuItem
                active={active}
                item="Printers"
                link={`products?cat=Printer`}
                setActive={setActive}
              >
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  {[...filterProduct({ cats: ["Printer"] })]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4)
                    .map((item, index) => (
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

              <MenuItem
                active={active}
                item="Scanners"
                link={`products?cat=Barcode%20Scanner`}
                setActive={setActive}
              >
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  {[...filterProduct({ cats: ["Barcode Scanner"] })]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4)
                    .map((item, index) => (
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

              <MenuItem
                active={active}
                item="Door Locks"
                link={`products?cat=Digital%20Door%20Lock`}
                setActive={setActive}
              >
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  {[...filterProduct({ cats: ["Digital Door Lock"] })]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4)
                    .map((item, index) => (
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
            </div>

            <div className="flex justify-center space-x-4">
              <MenuItem
                active={active}
                item="Drivers"
                link="drivers"
                setActive={setActive}
              >
                <div className="flex flex-col space-y-4 text-sm">
                  {products.slice(0, 4).map((product, index) => (
                    <HoveredLink key={index} href={`drivers/${product.slug}`}>
                      {product.title.charAt(0).toUpperCase() +
                        product.title.slice(1).toLowerCase()}
                    </HoveredLink>
                  ))}

                  <HoveredLink href={`drivers`}>More...</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem
                noChild
                active={active}
                item="Warranty"
                link={`products?cat=Printer`}
                setActive={setActive}
              />

              <MenuItem
                noChild
                active={active}
                item="Support"
                link={`contact-us`}
                setActive={setActive}
              />

              <Search className="size-5 cursor-pointer text-black dark:text-white hover-scale" />
            </div>
          </div>
        </Menu>
      </motion.div>
    </AnimatePresence>
  );
}
