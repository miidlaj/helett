import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

import { ProductType } from "@/constants/products";

export default function Section({ product }: { product: ProductType }) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
        <p className="w-[50vw] text-[2vw] self-end uppercase mix-blend-difference">
          {product.description}
        </p>
        <p className="text-[5vw] uppercase mix-blend-difference">
          {product.title}
        </p>
      </div>
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div className="relative w-full h-full" style={{ y }}>
          {product.wideImages?.length !== 0 &&
            product.wideImages !== undefined && (
              <Image
                fill
                alt="image"
                src={`${product.src}/${product?.wideImages[1]}`}
                style={{ objectFit: "cover" }}
              />
            )}
        </motion.div>
      </div>
    </div>
  );
}
