"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

import ImageStack from "./ImageStack";

import { ProductType } from "@/constants/products";
import ImageScroll from "./ImageScroll";

export const SingleProduct = ({ product }: { product: ProductType }) => {
  const [activeImage, setActiveImage] = useState<StaticImageData | string>(
    product.thumbnail
  );

  return (
    <div className="py-10">
      <ImageScroll product={product} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          key={activeImage.toString()}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          className="relative shadow-lg shadow-white rounded-md"
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Image
            alt="thumbnail"
            className="rounded-md object-contain"
            height="1000"
            src={`${product.src}/${activeImage}`}
            width="1000"
          />
          <div className="absolute bottom-0 bg-white rounded-md h-40 w-full [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </motion.div>

        <div className="flex flex-row justify-center my-8 gap-2 flex-wrap">
          {product.images.map((image, idx) => (
            <button
              key={`image-thumbnail-${idx}`}
              className="hover-scale overflow-hidden"
              onMouseEnter={() => setActiveImage(image)}
            >
              <Image
                alt="product thumbnail"
                className="h-14 w-16 md:h-40 md:w-60 object-cover object-top mr-4 mb-r border rounded-lg border-neutral-100 shadow-lg"
                height="1000"
                src={`${product.src}/${image}`}
                width="1000"
              />
            </button>
          ))}
        </div>

        {product.wideImages && (
          <ImageStack
            images={product.wideImages.map((i) => product.src + "/wide/" + i)}
          />
        )}
      </div>
    </div>
  );
};
