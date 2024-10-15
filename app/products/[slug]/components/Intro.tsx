import React from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

import { ProductType } from "@/constants/products";

export default function Intro({ product }: { product: ProductType }) {
  const container = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <div className="h-screen overflow-hidden">
      <motion.div className="relative h-full" style={{ y }}>
        {product.wideImages?.length !== 0 &&
          product.wideImages !== undefined && (
            <Image
              fill
              alt="image"
              src={`${product.src}/${product?.wideImages[0]}`}
              style={{ objectFit: "cover" }}
            />
          )}
      </motion.div>
    </div>
  );
}
