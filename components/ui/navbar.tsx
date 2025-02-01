"use client";

import React, { useEffect, useState } from "react";
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
import { categoriesApi } from "@/api/categories";
import { Category, Product } from "@/api/types";
import { productsApi } from "@/api/products";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [top, setTop] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<number, Product[]>>({});

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious() || 0;
      const direction = current - previous;

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

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await categoriesApi.fetchAllCategories();
        const cats = categoryResponse.data;
        setCategories(cats);

        const productsPromises = cats.map(async (cat: Category) => {
          const prodResponse = await productsApi.fetchProducts({
            filters: { category: cat.id },
            pagination: { page: 0, pageSize: 3 },
          });
          return { catId: cat.id, products: prodResponse.data };
        });

        const productsResults = await Promise.all(productsPromises);
        const productsMap: Record<number, Product[]> = {};
        productsResults.forEach(({ catId, products }) => {
          productsMap[catId] = products;
        });
        setCategoryProducts(productsMap);
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

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
              const products = categoryProducts[item.id] || [];
              const noChild = products.length === 0;

              return (
                <MenuItem
                  key={`${item.id}-${index}`}
                  active={active}
                  className="px-2 cursor-pointer py-6"
                  item={item.name}
                  link={`/products?cat=${item.id}`}
                  noChild={noChild}
                  setActive={setActive}
                >
                  <div className="text-sm flex flex-wrap py-20 justify-center gap-16 p-4 h-80">
                    {products.map((prod, idx) => (
                      <ProductItem
                        key={prod.id || idx}
                        href={`/products/${prod.slug}`}
                        src={prod.thumbnail.url}
                        title={prod.name}
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
            link={`/contact-us`}
            setActive={setActive}
          >
            <div className="flex justify-center items-center gap-10 h-80">
              <Link href="/contact-us">
                <Button variant="link">Contact Us</Button>
              </Link>

              <Link href="/warranty">
                <Button variant="link">Warranty</Button>
              </Link>
            </div>
          </MenuItem>
        </Menu>
      </motion.div>
    </AnimatePresence>
  );
}
